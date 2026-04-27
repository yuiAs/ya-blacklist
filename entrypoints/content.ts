import {
  PRODUCT_SELECTOR,
  SELLER_ATTR_SELECTOR,
  SELLER_ATTR_NAME,
} from "~/utils/constants";
import { getBlacklist, getEnabled, onStorageChanged } from "~/utils/storage";

export default defineContentScript({
  matches: ["*://auctions.yahoo.co.jp/*"],
  main() {
    let blacklistSet = new Set<string>();
    let enabled = true;
    let hiddenCount = 0;

    // Skip on pages that never contain product list cards (e.g. item detail).
    // Cheaper than running a MutationObserver for nothing.
    const shouldActivate = (): boolean => {
      if (location.pathname.startsWith("/jp/auction/")) return false;
      return document.querySelector(SELLER_ATTR_SELECTOR) !== null;
    };

    const hideProducts = (): void => {
      hiddenCount = 0;
      const sellerElements = document.querySelectorAll(SELLER_ATTR_SELECTOR);

      for (const el of sellerElements) {
        const sellerId = el.getAttribute(SELLER_ATTR_NAME);
        if (!sellerId) continue;

        const productEl = el.closest(PRODUCT_SELECTOR) as HTMLElement | null;
        if (!productEl) continue;

        if (enabled && blacklistSet.has(sellerId)) {
          productEl.style.display = "none";
          hiddenCount++;
        } else {
          productEl.style.display = "";
        }
      }

      chrome.runtime.sendMessage({ type: "hiddenCount", count: hiddenCount }).catch(() => {
        // Popup may not be open; ignore
      });
    };

    const init = async (): Promise<void> => {
      const [blacklist, isEnabled] = await Promise.all([
        getBlacklist(),
        getEnabled(),
      ]);
      blacklistSet = new Set(blacklist);
      enabled = isEnabled;

      hideProducts();

      const observer = new MutationObserver(() => {
        hideProducts();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      onStorageChanged((changes) => {
        if (changes.blacklist !== undefined) {
          blacklistSet = new Set(changes.blacklist);
        }
        if (changes.enabled !== undefined) {
          enabled = changes.enabled;
        }
        hideProducts();
      });
    };

    // Respond to popup queries for hidden count.
    // Kept outside the activation guard so the popup gets a deterministic 0
    // even on non-list pages instead of "no response".
    chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
      if (message.type === "getHiddenCount") {
        sendResponse({ count: hiddenCount });
      }
    });

    if (shouldActivate()) {
      init();
    }
  },
});
