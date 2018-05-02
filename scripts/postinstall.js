const fs = require('fs');
const path = require('path');

const targetFilePath = path.join(__dirname, '..', 'node_modules', 'nodegit', 'vendor', 'libgit2', 'tests', 'resources', 'status', '这');
if (fs.existsSync(targetFilePath)) {
  console.log(`removing ${targetFilePath}`);
  fs.unlinkSync(targetFilePath);
}
