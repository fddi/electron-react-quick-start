export const packagerConfig = {
  asar: true,
  extraResource: ["./resources/dll-test-ai32.dll", "./resources/dll-test.dll", "./resources/config.json"],
};
export const rebuildConfig = {};
export const makers = [
  {
    name: '@electron-forge/maker-squirrel',
    config: {},
  },
  {
    name: '@electron-forge/maker-zip',
    platforms: ['darwin'],
  },
  {
    name: '@electron-forge/maker-deb',
    config: {},
  },
  {
    name: '@electron-forge/maker-rpm',
    config: {},
  },
];
export const plugins = [
  {
    name: '@electron-forge/plugin-auto-unpack-natives',
    config: {},
  },
];
