/**
 * Sync Project Fields
 * 
 * Syncs Created Date, Closed Date, and Started Date fields for all items in a GitHub Project.
 * 
 * This script:
 * - Sets Created Date to the issue's GitHub creation date (if empty)
 * - Sets Closed Date to the issue's GitHub closed date for closed issues (if empty)
 * - Sets Started Date to when the issue moved to "In Progress" (if empty)
 * - Clears Started Date for issues in "Backlog" status
 * 
 * Usage:
 *   node scripts/sync-project-fields.js
 * 
 * GitHub Actions:
 *   This script is executed by .github/workflows/sync-project-fields.yml
 * 
 * Prerequisites:
 * - Node.js 18+
 * - A config.json file in the project root with:
 *   {
 *     "organization": "your-org-name",
 *     "projectNumber": 1234,
 *     "createdDateFieldId": "PVTF_...",
 *     "closedDateFieldId": "PVTF_...",
 *     "startedDateFieldId": "PVTF_...",
 *     "inProgressStatus": "In Progress",
 *     "backlogStatus": "Backlog"
 *   }
 * - GITHUB_TOKEN environment variable with a Fine-grained Personal Access Token
 *   Required permissions:
 *     - Repository: Issues (Read), Metadata (Read)
 *     - Organization: Projects (Read & Write)
 * 
 * Note: Processes all items in the project. Typically takes 4-6 minutes for ~400 items.
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          process.env[key.trim()] = value;
        }
      }
    });
  }
}

// Load environment variables
loadEnvFile();

// Load configuration
let config;
try {
  const configPath = path.join(__dirname, '..', 'config.json');
  const configContent = fs.readFileSync(configPath, 'utf8');
  config = JSON.parse(configContent);
} catch (error) {
  console.error('Error: config.json not found or invalid');
  console.log('Please create a config.json file in the project root. See config.example.json for reference.');
  process.exit(1);
}

// Check if GitHub token is available
if (!process.env.GITHUB_TOKEN) {
  console.error('Error: GITHUB_TOKEN not found in .env file');
  console.log('Please create a .env file with: GITHUB_TOKEN=your_token_here');
  process.exit(1);
}

// Constants from config
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const ORG_NAME = config.organization;
const PROJECT_NUMBER = config.projectNumber;
const CREATED_DATE_FIELD_ID = config.createdDateFieldId;
const CLOSED_DATE_FIELD_ID = config.closedDateFieldId;
const STARTED_DATE_FIELD_ID = config.startedDateFieldId;
const IN_PROGRESS_STATUS = config.inProgressStatus || "In Progress";
const BACKLOG_STATUS = config.backlogStatus || "Backlog";

// GitHub GraphQL API endpoint
const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql';

// Stats tracking
const stats = {
  createdDate: { updated: 0, skipped: 0, failed: 0 },
  closedDate: { updated: 0, skipped: 0, failed: 0 },
  startedDate: { updated: 0, cleared: 0, skipped: 0, failed: 0 },
  total: 0
};

// Helper function to make GraphQL requests with retry logic
async function graphqlRequest(query, variables = {}, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();
      
      // Check for rate limiting
      if (response.status === 429 || (data.errors && data.errors.some(e => e.type === 'RATE_LIMITED'))) {
        if (attempt < retries) {
          const waitTime = Math.pow(2, attempt) * 1000;
          console.log(`   ⚠️  Rate limited. Waiting ${waitTime / 1000}s before retry ${attempt}/${retries}...`);
          await sleep(waitTime);
          continue;
        }
        throw new Error('Rate limited. Please try again later.');
      }
      
      if (data.errors) {
        throw new Error(`GraphQL error: ${data.errors[0].message}`);
      }
      
      return data.data;
    } catch (error) {
      if (attempt === retries) throw error;
      const waitTime = Math.pow(2, attempt) * 1000;
      await sleep(waitTime);
    }
  }
}

// Sleep helper function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Get project information
async function getProjectInfo() {
  const query = `
    query GetProject($org: String!, $projectNumber: Int!) {
      organization(login: $org) {
        projectV2(number: $projectNumber) {
          id
          title
        }
      }
    }
  `;

  const data = await graphqlRequest(query, {
    org: ORG_NAME,
    projectNumber: PROJECT_NUMBER,
  });

  if (!data.organization.projectV2) {
    throw new Error(`Project #${PROJECT_NUMBER} not found in ${ORG_NAME} organization`);
  }

  return data.organization.projectV2;
}

// Get all items from the project with pagination
async function getAllProjectItems(projectId) {
  let hasNextPage = true;
  let cursor = null;
  let allItems = [];

  console.log('   Fetching all items from project...');

  while (hasNextPage) {
    const query = `
      query GetProjectItems($projectId: ID!, $cursor: String) {
        node(id: $projectId) {
          ... on ProjectV2 {
            items(first: 100, after: $cursor) {
              nodes {
                id
                content {
                  ... on Issue {
                    id
                    number
                    title
                    state
                    createdAt
                    closedAt
                    repository {
                      name
                      owner {
                        login
                      }
                    }
                  }
                }
                fieldValues(first: 20) {
                  nodes {
                    ... on ProjectV2ItemFieldSingleSelectValue {
                      name
                      field {
                        ... on ProjectV2SingleSelectField {
                          name
                        }
                      }
                    }
                    ... on ProjectV2ItemFieldDateValue {
                      date
                      field {
                        ... on ProjectV2Field {
                          name
                        }
                      }
                    }
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        }
      }
    `;

    const data = await graphqlRequest(query, { projectId, cursor });
    
    const items = data.node.items.nodes.filter(item => item.content && item.content.id);
    allItems = allItems.concat(items);

    hasNextPage = data.node.items.pageInfo.hasNextPage;
    cursor = data.node.items.pageInfo.endCursor;
    
    if (hasNextPage) {
      process.stdout.write(`\r   Fetched ${allItems.length} items...`);
    }
  }

  console.log(`\r   ✓ Found ${allItems.length} items in project`);
  return allItems;
}

// Get issue timeline for Started Date
async function getIssueStartedDate(repoName, issueNumber) {
  const query = `
    query GetIssueTimeline($owner: String!, $repo: String!, $issueNumber: Int!) {
      repository(owner: $owner, name: $repo) {
        issue(number: $issueNumber) {
          timelineItems(last: 100, itemTypes: [PROJECT_V2_ITEM_STATUS_CHANGED_EVENT]) {
            nodes {
              __typename
              ... on ProjectV2ItemStatusChangedEvent {
                createdAt
                status
              }
            }
          }
        }
      }
    }
  `;

  const data = await graphqlRequest(query, {
    owner: ORG_NAME,
    repo: repoName,
    issueNumber: parseInt(issueNumber),
  });

  const statusChanges = data.repository.issue.timelineItems.nodes
    .filter(node => node.__typename === 'ProjectV2ItemStatusChangedEvent' && node.status === IN_PROGRESS_STATUS)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return statusChanges.length > 0 ? statusChanges[0].createdAt : null;
}

// Update a date field
async function updateDateField(projectId, itemId, fieldId, dateValue) {
  const mutation = `
    mutation UpdateProjectV2ItemFieldValue($projectId: ID!, $itemId: ID!, $fieldId: ID!, $date: Date!) {
      updateProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
        value: { date: $date }
      }) {
        projectV2Item {
          id
        }
      }
    }
  `;

  await graphqlRequest(mutation, {
    projectId,
    itemId,
    fieldId,
    date: dateValue
  });
}

// Clear a date field
async function clearDateField(projectId, itemId, fieldId) {
  const mutation = `
    mutation ClearProjectV2ItemFieldValue($projectId: ID!, $itemId: ID!, $fieldId: ID!) {
      clearProjectV2ItemFieldValue(input: {
        projectId: $projectId
        itemId: $itemId
        fieldId: $fieldId
      }) {
        projectV2Item {
          id
        }
      }
    }
  `;

  await graphqlRequest(mutation, {
    projectId,
    itemId,
    fieldId
  });
}

// Get field value from project item
function getFieldValue(projectItem, fieldName) {
  if (!projectItem.fieldValues || !projectItem.fieldValues.nodes) {
    return null;
  }
  
  const field = projectItem.fieldValues.nodes.find(
    node => node.field && node.field.name === fieldName
  );
  
  return field ? (field.date || field.name) : null;
}

// Get current status from project item
function getCurrentStatus(projectItem) {
  return getFieldValue(projectItem, 'Status');
}

// Process a single item
async function processItem(projectId, item, index, total) {
  const content = item.content;
  const repoName = content.repository.name;
  const issueNumber = content.number;
  const prefix = `   [${index + 1}/${total}] ${repoName}#${issueNumber}:`;
  
  const updates = [];
  
  try {
    // 1. Handle Created Date
    const currentCreatedDate = getFieldValue(item, 'Created Date');
    if (!currentCreatedDate && content.createdAt) {
      const createdDate = content.createdAt.split('T')[0];
      await updateDateField(projectId, item.id, CREATED_DATE_FIELD_ID, createdDate);
      updates.push(`Created:${createdDate}`);
      stats.createdDate.updated++;
    } else {
      stats.createdDate.skipped++;
    }
    
    // 2. Handle Closed Date
    const currentClosedDate = getFieldValue(item, 'Closed Date');
    if (content.closedAt && !currentClosedDate) {
      const closedDate = content.closedAt.split('T')[0];
      await updateDateField(projectId, item.id, CLOSED_DATE_FIELD_ID, closedDate);
      updates.push(`Closed:${closedDate}`);
      stats.closedDate.updated++;
      await sleep(200); // Small delay between updates
    } else {
      stats.closedDate.skipped++;
    }
    
    // 3. Handle Started Date
    const currentStatus = getCurrentStatus(item);
    const currentStartedDate = getFieldValue(item, 'Started Date');
    
    if (currentStatus === BACKLOG_STATUS && currentStartedDate) {
      // Clear Started Date for Backlog items
      await clearDateField(projectId, item.id, STARTED_DATE_FIELD_ID);
      updates.push(`Started:CLEARED`);
      stats.startedDate.cleared++;
      await sleep(200);
    } else if (currentStatus !== BACKLOG_STATUS && !currentStartedDate) {
      // Try to set Started Date if not in Backlog and doesn't have one
      const startedAt = await getIssueStartedDate(repoName, issueNumber);
      if (startedAt) {
        const startedDate = startedAt.split('T')[0];
        await updateDateField(projectId, item.id, STARTED_DATE_FIELD_ID, startedDate);
        updates.push(`Started:${startedDate}`);
        stats.startedDate.updated++;
        await sleep(200);
      } else {
        stats.startedDate.skipped++;
      }
    } else {
      stats.startedDate.skipped++;
    }
    
    // Log results
    if (updates.length > 0) {
      console.log(`${prefix} ✓ ${updates.join(', ')}`);
    } else {
      console.log(`${prefix} ○ Up to date`);
    }
    
  } catch (error) {
    console.log(`${prefix} ✗ Error: ${error.message}`);
    stats.createdDate.failed++;
    stats.closedDate.failed++;
    stats.startedDate.failed++;
  }
  
  // Throttle to avoid rate limiting (500ms between items)
  if (index < total - 1) {
    await sleep(500);
  }
}

// Main function
async function main() {
  console.log('='.repeat(60));
  console.log('GitHub Project Date Sync');
  console.log('='.repeat(60));
  console.log(`Organization: ${ORG_NAME}`);
  console.log(`Project: #${PROJECT_NUMBER}`);
  console.log(`Started: ${new Date().toISOString()}`);
  console.log('='.repeat(60));
  console.log();

  try {
    // Get project info
    console.log('1. Fetching project information...');
    const project = await getProjectInfo();
    console.log(`   ✓ Project: "${project.title}"\n`);

    // Get all items
    console.log('2. Fetching all project items...');
    const allItems = await getAllProjectItems(project.id);
    stats.total = allItems.length;
    console.log();

    if (allItems.length === 0) {
      console.log('⚠️  No items found in project.');
      return;
    }

    // Process each item
    console.log('3. Processing items...\n');
    for (let i = 0; i < allItems.length; i++) {
      await processItem(project.id, allItems[i], i, allItems.length);
    }

    // Print summary
    console.log();
    console.log('='.repeat(60));
    console.log('Summary');
    console.log('='.repeat(60));
    console.log(`Total items processed: ${stats.total}`);
    console.log();
    console.log('Created Date:');
    console.log(`  ✓ Updated: ${stats.createdDate.updated}`);
    console.log(`  ○ Skipped: ${stats.createdDate.skipped}`);
    if (stats.createdDate.failed > 0) console.log(`  ✗ Failed: ${stats.createdDate.failed}`);
    console.log();
    console.log('Closed Date:');
    console.log(`  ✓ Updated: ${stats.closedDate.updated}`);
    console.log(`  ○ Skipped: ${stats.closedDate.skipped}`);
    if (stats.closedDate.failed > 0) console.log(`  ✗ Failed: ${stats.closedDate.failed}`);
    console.log();
    console.log('Started Date:');
    console.log(`  ✓ Updated: ${stats.startedDate.updated}`);
    console.log(`  ○ Cleared (Backlog): ${stats.startedDate.cleared}`);
    console.log(`  ○ Skipped: ${stats.startedDate.skipped}`);
    if (stats.startedDate.failed > 0) console.log(`  ✗ Failed: ${stats.startedDate.failed}`);
    console.log('='.repeat(60));
    console.log(`Completed: ${new Date().toISOString()}`);
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();

