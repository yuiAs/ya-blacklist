# Yahoo! Auction Seller Blacklist

Yahoo! オークションの検索結果・一覧ページで、指定した出品者（セラー）の商品を非表示にする Chrome 拡張機能。

## 技術スタック

- TypeScript (strict)
- Vite + @crxjs/vite-plugin (Manifest V3)
- Tailwind CSS + DaisyUI
- chrome.storage.sync

## ビルド

### 前提条件

- Node.js v18 以上
- npm

### 手順

```bash
# 依存パッケージのインストール
npm install

# プロダクションビルド
npm run build

# 開発モード（HMR 有効）
npm run dev
```

ビルド成果物は `dist/` ディレクトリに出力される。

## 利用方法

### インストール

1. `npm run build` を実行
2. Chrome で `chrome://extensions` を開く
3. 右上の「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. `dist` フォルダを選択

### ブラックリストの設定

1. ツールバーの拡張機能アイコンをクリックし、「設定を開く」を選択
2. テキストエリアにセラー ID を 1 行に 1 つずつ入力
3. 「保存」をクリック

### 機能

- **商品の非表示**: ブラックリストに登録したセラーの商品が検索結果から自動的に非表示になる
- **リアルタイム反映**: ページ遷移や無限スクロールによる追加読み込みにも対応（MutationObserver）
- **有効/無効の切替**: ポップアップのトグルスイッチで一時的に無効化が可能
- **同期ストレージ**: `chrome.storage.sync` を使用し、Chrome アカウント間でブラックリストを同期
