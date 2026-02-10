import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
  manifest_version: 3,
  name: "Yahoo! Auction Seller Blacklist",
  version: "1.0.0",
  description:
    "Hide items from blacklisted sellers on Yahoo! Auctions search results.",
  permissions: ["storage", "activeTab"],
  host_permissions: ["*://auctions.yahoo.co.jp/*"],
  content_scripts: [
    {
      matches: ["*://auctions.yahoo.co.jp/*"],
      js: ["src/content/index.ts"],
    },
  ],
  action: {
    default_popup: "src/popup/index.html",
    default_icon: {
      "16": "src/assets/icon16.png",
      "48": "src/assets/icon48.png",
      "128": "src/assets/icon128.png",
    },
  },
  options_page: "src/options/index.html",
  icons: {
    "16": "src/assets/icon16.png",
    "48": "src/assets/icon48.png",
    "128": "src/assets/icon128.png",
  },
});
