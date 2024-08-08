// TODO: コメント入れるのと、変数化してわかりやすくする
// TODO: inputディレクトリにタイムスタンプのファイルを作成するスクリプト
// TODO: python版も作る?
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");
const hljs = require("highlight.js");

const inputDir = "./sh-tool/md2html/input/";
const outputFile = "./sh-tool/md2html/dist/index.html";

// Highlight.js settings
marked.setOptions({
  highlight: (code, lang) => {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
});

// 出力ファイルが既に存在する場合は削除
if (fs.existsSync(outputFile)) {
  fs.unlinkSync(outputFile);
}

// Markdownファイルを変換してHTMLに追加
fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error("Error reading directory:", err);
    return;
  }

  // 逆順にする必要がなければこの行を削除してください
  const filesR = files.reverse();

  let combinedContent = "";

  for (const fileName of filesR) {
    const filePath = path.join(inputDir, fileName);

    // ファイル読み込み
    const fileContent = fs.readFileSync(filePath, "utf8");

    // MarkdownをHTMLに変換
    const htmlContent = marked(fileContent);

    // ファイル名をセクションとして追加
    combinedContent += `
      <section>
        <h2>${fileName.replace(".md", "")}</h2>
        ${htmlContent}
        <hr>
      </section>
    `;
  }

  // 最終的なHTMLコンテンツ
  const finalHtml = `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>開発ドキュメント</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/default.min.css">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f9; }
        .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
        section { margin-bottom: 40px; }
        hr { border: none; border-top: 1px solid #ccc; }
        pre { position: relative; }
        .copy-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #4CAF50;
          color: #fff;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          border-radius: 3px;
          display: none;
        }
        pre:hover .copy-button {
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="container">
        ${combinedContent}
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/highlight.min.js"></script>
      <script>
        document.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightElement(el);
        });
        document.querySelectorAll('pre').forEach((pre) => {
          const button = document.createElement('button');
          button.className = 'copy-button';
          button.innerText = 'Copy';
          button.addEventListener('click', () => {
            navigator.clipboard.writeText(pre.innerText).then(() => {
              button.innerText = 'Copied';
              setTimeout(() => { button.innerText = 'Copy'; }, 2000);
            });
          });
          pre.appendChild(button);
        });
      </script>
    </body>
    </html>
  `;

  // HTMLファイルに書き込み
  fs.writeFileSync(outputFile, finalHtml, "utf8");
  console.log("Markdown files have been combined and saved as", outputFile);
});
