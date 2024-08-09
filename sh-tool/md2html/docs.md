## markdown to html 変換ツール

**build コマンド**

```bash
node ./sh-tool/md2html/main.js
```

**新規 input md 作成 コマンド**

```bash
node ./sh-tool/md2html/newInput.js
```

**画像の配置方法**

sh-tool/md2html/input/1.md を参考に画像リンクをつけて、input ディレクトリに配置

**依存ライブラリのインストール**

main.js を実行する前に、依存ライブラリを global にインストールしてください。

**本ツール用のディレクトリ作成コマンド**

```bash
mkdir -p ./md2html/input
mkdir -p ./md2html/dist
touch ./md2html/main.js
touch ./md2html/newInput.js
```
