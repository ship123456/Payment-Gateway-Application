const STORAGE_KEY = "settings";

const defaultSettings = {
  notifications: {
    paymentAlerts: true,
  },
};

const getSettings = () => {
  const settings = localStorage.getItem(STORAGE_KEY);

  if (!settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));

    return defaultSettings;
  }

  return JSON.parse(settings);
};

const saveSettings = (settings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

  return settings;
};

export { getSettings, saveSettings };
