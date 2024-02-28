'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const config_plugins_1 = require('expo/config-plugins');

const with_android_fonts_link_1 = require('./with-android-fonts-link');
const withAssetsMod = config => {
  return (0, config_plugins_1.withPlugins)(config, [
    with_android_fonts_link_1.withAndroidFontsLink,
    with_android_fonts_link_1.withAndroidMainApplicationMod,
  ]);
};
exports.default = withAssetsMod;
