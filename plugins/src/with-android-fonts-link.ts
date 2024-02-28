/* eslint-disable @typescript-eslint/no-shadow */
import type { ExpoConfig } from '@expo/config';
import { withDangerousMod, withMainApplication } from 'expo/config-plugins';

const fontXml = `
<font-family xmlns:app="http://schemas.android.com/apk/res-auto">
  <font app:fontStyle="normal" app:fontWeight="100" app:font="@font/poppins_thin" />
  <font app:fontStyle="italic" app:fontWeight="100" app:font="@font/poppins_thinitalic"/>
  <font app:fontStyle="normal" app:fontWeight="200" app:font="@font/poppins_extralight" />
  <font app:fontStyle="italic" app:fontWeight="200" app:font="@font/poppins_extralightitalic"/>
  <font app:fontStyle="normal" app:fontWeight="300" app:font="@font/poppins_light" />
  <font app:fontStyle="italic" app:fontWeight="300" app:font="@font/poppins_lightitalic"/>
  <font app:fontStyle="normal" app:fontWeight="400" app:font="@font/poppins_regular" />
  <font app:fontStyle="italic" app:fontWeight="400" app:font="@font/poppins_italic"/>
  <font app:fontStyle="normal" app:fontWeight="500" app:font="@font/poppins_medium" />
  <font app:fontStyle="italic" app:fontWeight="500" app:font="@font/poppins_mediumitalic"/>
  <font app:fontStyle="normal" app:fontWeight="600" app:font="@font/poppins_semibold" />
  <font app:fontStyle="italic" app:fontWeight="600" app:font="@font/poppins_semibolditalic"/>
  <font app:fontStyle="normal" app:fontWeight="700" app:font="@font/poppins_bold" />
  <font app:fontStyle="italic" app:fontWeight="700" app:font="@font/poppins_bolditalic"/>
  <font app:fontStyle="normal" app:fontWeight="800" app:font="@font/poppins_extrabold" />
  <font app:fontStyle="italic" app:fontWeight="800" app:font="@font/poppins_extrabolditalic"/>
  <font app:fontStyle="normal" app:fontWeight="900" app:font="@font/poppins_black" />
  <font app:fontStyle="italic" app:fontWeight="900" app:font="@font/poppins_blackitalic"/>
</font-family>
`;

// read all the fonts from android/app/src/main/assets/fonts folder and move them to android/app/src/main/res/font folder and update the font path in the xml files
export const withAndroidFontsLink = (config: ExpoConfig) => {
  return withDangerousMod(config, [
    'android',
    config => {
      const {
        modRequest: { projectRoot },
      } = config;

      const fs = require('fs');
      const path = require('path');

      const fontDir = path.join(projectRoot, 'android/app/src/main/assets/fonts');
      const fontFiles = fs.readdirSync(fontDir);
      const fontDestinationDir = path.join(projectRoot, 'android/app/src/main/res/font');

      if (!fs.existsSync(fontDestinationDir)) {
        fs.mkdirSync(fontDestinationDir);
      }

      fontFiles.forEach((fontFile: string) => {
        const fontFilePath = path.join(fontDir, fontFile);
        const fontDestinationFilePath = path.join(fontDestinationDir, fontFile);

        if (fs.existsSync(fontDestinationFilePath)) {
          fs.unlinkSync(fontDestinationFilePath); // remove file if exists
        }
        fs.copyFileSync(fontFilePath, fontDestinationFilePath);
        fs.unlinkSync(fontFilePath);
      });

      // remove assets/fonts empty folder if exists and not empty
      const dirToRemove = path.join(projectRoot, 'android/app/src/main/assets');

      if (fs.existsSync(fontDir)) {
        fs.rmdirSync(fontDir);
      }

      if (fs.existsSync(dirToRemove)) {
        fs.rmdirSync(dirToRemove);
      }

      // create file android/app/src/main/res/font/raleway.xml
      const fontXmlFilePath = path.join(fontDestinationDir, 'poppins.xml');
      fs.writeFileSync(fontXmlFilePath, fontXml);

      return config;
    },
  ]);
};

export const withAndroidMainApplicationMod = (config: ExpoConfig) =>
  withMainApplication(config, config => {
    let mainApplicationFile = config.modResults.contents;

    const reactFontManagerImport = 'import com.facebook.react.views.text.ReactFontManager;';

    if (!mainApplicationFile.includes(reactFontManagerImport)) {
      const reactPackageImport = 'import com.facebook.react.ReactPackage;';
      mainApplicationFile = mainApplicationFile.replace(
        reactPackageImport,
        `${reactPackageImport}\n${reactFontManagerImport}`,
      );
    }

    const reactFontManagerInstance = 'ReactFontManager.getInstance()';

    if (!mainApplicationFile.includes(reactFontManagerInstance)) {
      mainApplicationFile = mainApplicationFile.replace(
        'super.onCreate();',
        `super.onCreate();\n    ${reactFontManagerInstance}.addCustomFont(this, "Poppins", R.font.poppins);`,
      );
    }

    return {
      ...config,
      modResults: {
        ...config.modResults,
        contents: mainApplicationFile,
      },
    };
  });
