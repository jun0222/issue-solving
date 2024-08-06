Markdown ファイルを HTML、CSS、JavaScript に変換するスクリプトを作成し、コードブロックのクリックでコピー機能などの一般的な機能を追加します。

### 1. `convert.js`: Markdown を HTML に変換するスクリプト

まず、Markdown ファイルを HTML に変換するために、JavaScript ライブラリを使用します。`marked`と`highlight.js`を利用します。

#### `convert.js`

```javascript
const fs = require("fs");
const marked = require("marked");
const hljs = require("highlight.js");

// コードブロックにシンタックスハイライトを適用
marked.setOptions({
  highlight: function (code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});

// Markdownファイルを読み込んでHTMLに変換
const mdFilePath = process.argv[2];
const mdContent = fs.readFileSync(mdFilePath, "utf-8");
const htmlContent = marked(mdContent);

// HTMLテンプレートに変換した内容を埋め込む
const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Viewer</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    ${htmlContent}
  </div>
  <script src="script.js"></script>
</body>
</html>
`;

// 出力ファイルに書き込む
fs.writeFileSync("output.html", htmlTemplate);
console.log("Markdown has been converted to HTML and saved as output.html");
```

### 2. `styles.css`: 基本的なスタイルとコードブロックのスタイリング

#### `styles.css`

```css
/* styles.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f4f4f9;
}

.container {
  max-width: 800px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

pre {
  background: #2d2d2d;
  color: #f8f8f2;
  padding: 10px;
  border-radius: 5px;
  position: relative;
}

code {
  font-family: "Courier New", Courier, monospace;
}

.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  display: none;
}

pre:hover .copy-button {
  display: block;
}
```

### 3. `script.js`: コードブロックをクリックでコピーする機能

#### `script.js`

```javascript
// script.js
document.addEventListener("DOMContentLoaded", (event) => {
  document.querySelectorAll("pre").forEach((pre) => {
    const button = document.createElement("button");
    button.className = "copy-button";
    button.innerText = "Copy";
    pre.appendChild(button);

    button.addEventListener("click", () => {
      const code = pre.querySelector("code").innerText;
      navigator.clipboard
        .writeText(code)
        .then(() => {
          button.innerText = "Copied!";
          setTimeout(() => {
            button.innerText = "Copy";
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    });
  });
});
```

### 4. パッケージのインストール

以下のコマンドで必要なパッケージをインストールします。

```bash
npm install marked highlight.js
```

### 5. スクリプトの実行

1. 上記のスクリプトファイル（`convert.js`、`styles.css`、`script.js`）を同じディレクトリに保存します。
2. Markdown ファイル（例えば、`example.md`）を用意します。
3. 以下のコマンドでスクリプトを実行し、Markdown ファイルを HTML に変換します。

```bash
node convert.js example.md
```

これで、`output.html`ファイルが生成され、ブラウザで開くと、Markdown の内容が表示され、コードブロックをクリックするとコピーできるようになります。
