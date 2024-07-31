const {
  withNativeFederation,
  shareAll,
} = require("@softarc/native-federation/build");

module.exports = {
  name: "host",
  remotes: {
    remote: {
      name: "remote",
      entry: "http://localhost:4174/remoteEntry.js",
      type: "module",
    },
  },
  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
      includeSecondaries: false,
    }),
  },
};
