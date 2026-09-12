const { getDefaultConfig } = require("expo/metro-config");

// I needed to included this so that I could use SVGs as images and backgrounds
// this tells react native to treat .svg files as react components

// default bundler located at root of project
const config = getDefaultConfig(__dirname);


config.transformer.babelTransformerPath =
  require.resolve("react-native-svg-transformer/expo");

config.resolver.assetExts =
  config.resolver.assetExts.filter((ext) => ext !== "svg");

config.resolver.sourceExts.push("svg");

module.exports = config;