// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  const { sourceExts } = config.resolver;
  config.resolver.sourceExts = [...sourceExts, 'cjs']; // CommonJS 파일 확장자 추가
  return config;
})();