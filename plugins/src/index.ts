import type { ConfigPlugin } from 'expo/config-plugins';
import { withPlugins } from 'expo/config-plugins';

import { withAndroidFontsLink, withAndroidMainApplicationMod } from './with-android-fonts-link';

const withAssetsMod: ConfigPlugin = config => {
  return withPlugins(config, [withAndroidFontsLink, withAndroidMainApplicationMod]);
};

export default withAssetsMod;
