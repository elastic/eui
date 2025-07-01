function getTokenMap(tokenInstances) {
  // tokenInstances is the total set of tokens across all files
  // reduce those down to a mapping of token -> defString
  const tokenMap = new Map();

  for (let i = 0; i < tokenInstances.length; i++) {
    const { token, defString } = tokenInstances[i];
    // we're assured that overriding any `token` already encountered
    // has an identical `defString` as the token generation script otherwise fails
    tokenMap.set(token, defString);
  }

  return tokenMap;
}

export function getTokenChanges(oldTokenInstances, newTokenInstances) {
  // we're interested in added, modified, or deleted tokens
  // addition or removal of a token in a single file is uninteresting unless that instance represents the whole usage of the token
  const oldTokens = getTokenMap(oldTokenInstances);
  const newTokens = getTokenMap(newTokenInstances);

  const changes = [];

  // check for token removals or modifications
  oldTokens.forEach((value, key) => {
    if (newTokens.has(key)) {
      // check if definition has changed
      const newValue = newTokens.get(key);
      if (newValue !== value) {
        // token has changed
        changes.push({
          token: key,
          changeType: 'modified',
          value: newValue,
        });
      }
    } else {
      // token has been removed
      changes.push({
        token: key,
        changeType: 'deleted',
      });
    }
  });

  // check for new tokens
  newTokens.forEach((value, key) => {
    if (oldTokens.has(key) === false) {
      // token is new
      changes.push({
        token: key,
        changeType: 'added',
        value,
      });
    }
  });

  return changes;
}
