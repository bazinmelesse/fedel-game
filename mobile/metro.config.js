// The letter, number and song recordings live once at the repo root (../audio, ../songs)
// and are shared with the web version, so Metro also watches the parent folder.
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
const repoRoot = path.resolve(__dirname, "..");
config.watchFolders = [...(config.watchFolders || []), repoRoot];
config.resolver.nodeModulesPaths = [path.resolve(__dirname, "node_modules")];
config.resolver.blockList = [/\/\.git\/.*/];

module.exports = config;
