import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  manifest: {
    name: "Yahoo! Auction Seller Blacklist",
    description:
      "Hide items from blacklisted sellers on Yahoo! Auctions search results.",
    permissions: ["storage", "activeTab"],
    host_permissions: ["*://auctions.yahoo.co.jp/*"],
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
