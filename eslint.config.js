const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const pluginSecurity = require("eslint-plugin-security");

module.exports = [
  // Any other config imports go at the top
  eslintPluginPrettierRecommended,
  pluginSecurity.configs.recommended,
];
