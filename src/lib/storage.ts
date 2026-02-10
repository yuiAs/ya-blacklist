import {
  STORAGE_KEY_BLACKLIST,
  STORAGE_KEY_ENABLED,
  SELLER_ID_PATTERN,
} from "./constants";

export const getBlacklist = async (): Promise<string[]> => {
  const result = await chrome.storage.sync.get(STORAGE_KEY_BLACKLIST);
  return (result[STORAGE_KEY_BLACKLIST] as string[] | undefined) ?? [];
};

export const setBlacklist = async (ids: string[]): Promise<void> => {
  const validated = ids.filter((id) => SELLER_ID_PATTERN.test(id));
  await chrome.storage.sync.set({ [STORAGE_KEY_BLACKLIST]: validated });
};

export const getEnabled = async (): Promise<boolean> => {
  const result = await chrome.storage.sync.get(STORAGE_KEY_ENABLED);
  return (result[STORAGE_KEY_ENABLED] as boolean | undefined) ?? true;
};

export const setEnabled = async (enabled: boolean): Promise<void> => {
  await chrome.storage.sync.set({ [STORAGE_KEY_ENABLED]: enabled });
};

export const onStorageChanged = (
  callback: (changes: {
    blacklist?: string[];
    enabled?: boolean;
  }) => void,
): void => {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "sync") return;
    const result: { blacklist?: string[]; enabled?: boolean } = {};
    if (changes[STORAGE_KEY_BLACKLIST]) {
      result.blacklist =
        (changes[STORAGE_KEY_BLACKLIST].newValue as string[] | undefined) ?? [];
    }
    if (changes[STORAGE_KEY_ENABLED]) {
      result.enabled =
        (changes[STORAGE_KEY_ENABLED].newValue as boolean | undefined) ?? true;
    }
    if (result.blacklist !== undefined || result.enabled !== undefined) {
      callback(result);
    }
  });
};

export const isValidSellerId = (id: string): boolean =>
  SELLER_ID_PATTERN.test(id);
