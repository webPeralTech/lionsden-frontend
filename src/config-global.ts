import packageJson from '../package.json';

// ----------------------------------------------------------------------

export type ConfigValue = {
  appName: string;
  appVersion: string;
  apiBaseUrl: string;
};

export const CONFIG: ConfigValue = {
  appName: 'LionsDen Resorts',
  appVersion: packageJson.version,
  apiBaseUrl: '/api/v1',
};
