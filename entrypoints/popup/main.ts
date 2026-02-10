import { getBlacklist, getEnabled, setEnabled } from "~/utils/storage";

const blacklistCountEl = document.getElementById(
  "blacklist-count",
) as HTMLElement;
const hiddenCountEl = document.getElementById("hidden-count") as HTMLElement;
const toggleEl = document.getElementById(
  "toggle-enabled",
) as HTMLInputElement;
const openOptionsEl = document.getElementById(
  "open-options",
) as HTMLAnchorElement;

const init = async (): Promise<void> => {
  const [blacklist, enabled] = await Promise.all([
    getBlacklist(),
    getEnabled(),
  ]);

  blacklistCountEl.textContent = String(blacklist.length);
  toggleEl.checked = enabled;

  // Get hidden count from active tab's content script
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    if (tab?.id) {
      const response = await chrome.tabs.sendMessage(tab.id, {
        type: "getHiddenCount",
      });
      if (response?.count !== undefined) {
        hiddenCountEl.textContent = String(response.count);
      }
    }
  } catch {
    // Content script may not be loaded on this page
  }

  toggleEl.addEventListener("change", async () => {
    await setEnabled(toggleEl.checked);
  });

  openOptionsEl.addEventListener("click", (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });
};

// Listen for hidden count updates from content script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "hiddenCount") {
    hiddenCountEl.textContent = String(message.count);
  }
});

init();
