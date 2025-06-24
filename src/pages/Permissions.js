function hasPermission(featureName, action) {
  const userObject = JSON.parse(localStorage.getItem("TOKEN")).features;

  const map = {};
  userObject.forEach((feature) => {
    map[feature.name] = feature;
  });

  return map?.[featureName]?.[action] === true;
}

export default hasPermission;
