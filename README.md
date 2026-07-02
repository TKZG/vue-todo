# 📝 Vue Todo App

フルスタック Todo アプリケーション。Vue 3 フロントエンド、Express バックエンド、PostgreSQL データベースを使用しています。

## 📋 概要

このプロジェクトは、最新の Web テクノロジーを使用した Todo リスト管理アプリケーションです。ユーザーはタスクを作成、完了マーク、削除できます。すべてのデータは PostgreSQL データベースに永続化されます。

## 🛠️ 技術スタック

### フロントエンド

- **Vue 3** (Beta) - UI フレームワーク
- **TypeScript** - 型安全な開発
- **Vite** - 次世代のビルドツール
- **ESLint & Prettier** - コード品質管理

### バックエンド

- **Node.js** - JavaScript ランタイム
- **Express** - Web フレームワーク
- **TypeScript** - 型安全な開発
- **Prisma** - ORM（Object-Relational Mapping）
- **CORS** - クロスオリジンリクエスト対応

### データベース

- **PostgreSQL** - リレーショナルデータベース
- **Docker** - コンテナ化

## 📁 プロジェクト構成

```
vue-todo/
├── src/                      # フロントエンド (Vue)
│   ├── components/           # Vue コンポーネント
│   ├── api/                  # API 通信ロジック
│   ├── assets/               # CSS など静的ファイル
│   ├── App.vue               # ルートコンポーネント
│   └── main.ts               # Vue アプリケーションのエントリーポイント
│
├── server/                   # バックエンド (Express)
│   ├── index.ts              # Express サーバーのエントリーポイント
│   ├── routes/               # API ルート定義
│   ├── controllers/          # リクエスト処理ロジック
│   ├── models/               # データモデル
│   ├── store/                # ビジネスロジック層
│   └── scripts/              # ユーティリティスクリプト
│
├── prisma/                   # Prisma ORM 設定
│   ├── schema.prisma         # データベーススキーマ定義
│   └── migrations/           # マイグレーション履歴
│
├── public/                   # 静的ファイル
├── docker-compose.yml        # Docker Compose 設定
├── vite.config.ts            # Vite 設定
├── tsconfig.json             # TypeScript 全体設定
└── package.json              # 依存関係とスクリプト
```

## 📦 前提条件

- **Node.js** v20 以上
- **npm** v10 以上
- **Docker** と **Docker Compose**（データベース用）
- または **PostgreSQL** v16 以上（ローカルインストール）

## 🚀 インストール・セットアップ

### 1. リポジトリのクローン

```bash
git clone <repository-url>
cd vue-todo
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env` ファイルにデータベース接続情報を設定します（既に用意されています）：

```env
# データベース接続情報
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vue_todo_db"

# サーバーポート
PORT=3000
```

**⚠️ 注意**: `.env` ファイルはバージョン管理に含まれています。個人用の設定値に変更する場合は必ず `.env.local` ファイルを作成してそこに記述してください。`.env.local` は Git で無視されます。

### 4. 起動方法（2通り）

#### 4-1. 1コマンドで起動

```bash
npm run dev:full
```

このコマンドで以下を順番に実行します。

- PostgreSQL コンテナを起動
- Prisma マイグレーションを実行
- フロントエンド・バックエンドの開発サーバーを起動

#### 4-2. 従来の手動起動

まずデータベースを起動します。

```bash
docker compose up -d
```

その後、マイグレーションと開発サーバーを起動します。

```bash
npm run prisma:migrate
npm run dev
```

Prisma スキーマをデータベースに適用したうえで、開発サーバーを起動できます。

## 🎯 開発

### 開発サーバーの起動

```bash
npm run dev
```

このコマンドで以下が並行で実行されます：

- **フロントエンド**: `http://localhost:5173` で Vue アプリが起動
- **バックエンド**: `http://localhost:3000` で Express サーバーが起動

### フロントエンドのみ開発

```bash
npm run dev:client
```

### バックエンド開発用サーバー

```bash
npm run dev:server
```

ファイル変更時に自動的に再起動します。

## 📜 利用可能なコマンド

| コマンド                 | 説明                                              |
| ------------------------ | ------------------------------------------------- |
| `npm run dev`            | 開発サーバーを起動（フロントエンド+バックエンド） |
| `npm run dev:full`       | DB起動・マイグレーション・開発サーバーを一括起動  |
| `npm run dev:client`     | フロントエンド開発サーバーのみ起動                |
| `npm run dev:server`     | バックエンド開発サーバーのみ起動                  |
| `npm run build`          | 本番用にビルド                                    |
| `npm run preview`        | ビルド結果をプレビュー                            |
| `npm run type-check`     | TypeScript 型チェック                             |
| `npm run lint`           | ESLint でコード解析し自動修正                     |
| `npm run lint:oxlint`    | Oxlint で解析                                     |
| `npm run lint:eslint`    | ESLint で解析                                     |
| `npm run format`         | Prettier でコードをフォーマット                   |
| `npm run prisma:migrate` | Prisma マイグレーション実行                       |
| `npm run prisma:studio`  | Prisma Studio（GUI）を起動                        |
| `npm run migrate:todos`  | Todo データのマイグレーション                     |

## 🗄️ データベース管理

### Prisma Studio の起動

GUI でデータベースを管理できます：

```bash
npm run prisma:studio
```

ブラウザで `http://localhost:5555` が自動で開きます。

**📝 注意**: Prisma Studio は `.env` ファイルを参照して接続します。開発環境で個別の設定が必要な場合は、`.env.local` ファイルを作成して設定値を上書きしてください（`.env.local` は `.env` より優先されます）。

### データベースのリセット

```bash
npx prisma migrate reset
```

**注意**: この操作はすべてのデータを削除します。

### マイグレーションの作成

スキーマを変更した場合：

```bash
npx prisma migrate dev --name <migration-name>
```

## 🏗️ アーキテクチャ

### フロントエンド（Vue 3）

- **API 通信**: `src/api/todoApi.ts` で REST API を呼び出し
- **状態管理**: Vue の Composition API を使用（ref, computed）
- **コンポーネント**: `App.vue` にすべての UI ロジックを実装

### バックエンド（Express）

- **ルーティング**: `server/routes/todos.ts`
- **コントローラ**: `server/controllers/TodoController.ts` でリクエスト処理
- **ストア**: `server/store/todoStore.ts` でビジネスロジック
- **モデル**: `server/models/todo.ts` でデータ構造定義

### データベース

Prisma ORM を使用して PostgreSQL と連携：

- Todo モデル: id, text, completed, createdAt, updatedAt

## 🔧 トラブルシューティング

### エラー: `connect ECONNREFUSED 127.0.0.1:5432`

PostgreSQL が起動していません。以下を確認してください：

```bash
docker-compose up -d
```

### エラー: `PRISMA_DATABASE_URL not set`

環境変数が設定されていません。`.env` または `.env.local` ファイルを確認してください。

### ポート 5173 または 3000 が既に使用されている

別のプロセスがポートを使用しています。ポート番号を変更するか、既存のプロセスを終了してください。

## 💡 推奨開発環境

### IDE

- [VS Code](https://code.visualstudio.com/)
- [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 拡張機能
- Vetur は無効にしてください

### ブラウザツール

- **Chrome/Edge/Brave**: [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- **Firefox**: [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## 📖 参考リンク

- [Vue.js 公式ドキュメント](https://vuejs.org/)
- [Vite ドキュメント](https://vite.dev/)
- [Express.js ドキュメント](https://expressjs.com/)
- [Prisma ドキュメント](https://www.prisma.io/docs/)
- [PostgreSQL ドキュメント](https://www.postgresql.org/docs/)

## 📝 ライセンス

MIT License

## 👤 作成者

Vue Todo App
