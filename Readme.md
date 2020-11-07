# playwrightでe2eテストを作ってみた

## はじめに
playwright + ava でe2eテストを作ってみました。

## 前提条件

* node.js(v14.15.0以上)がインストールされている
* npm(6.14.8以上)がインストールされている
* npx(6.14.8)がインストールされている

## 動かし方
### 初回
```shell script
cd <本リポジトリをcloneした場所>
npm ci
npm test
```

### 2回目以降
```shell script
cd <本リポジトリをcloneした場所>
npm test
```

### テストするブラウザを変更する
環境変数 ```BROWSE```の値により、テストするブラウザが変えられるようになっています。

| 値         | テストブラウザ                    |
|------------|--------------------------------|
| webkit     | webkit(Safariなど)              |
| chromium   | chromium(Chrome、最新版Edgeなど) |
| firefox    | firefox                        |
| 上記以外     | chromium                       |

ブラウザ指定例
```shell script
export BROWSER=firefox
npm test
# firefoxでテストが起動する
```

## フォルダ構成

| フォルダ名 | 説明 |
|----------|-----|
| test     | テストファイル置き場。テストファイルは「****.test.js」という名前にすること。 |
| util     | テストユーティリティ置き場。|