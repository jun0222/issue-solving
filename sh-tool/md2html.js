// TODO: コメント入れるのと、変数化してわかりやすくする
// TODO: ディレクトリもツールごとに必要ディレクトリを整理する
const fs = require("fs");
const path = require("path");
const { marked } = require("marked"); // 関数としてimportする

const inputDir = "./sh-tool/md/";
const outputFile = "./sh-tool/dist/index.html";

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
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Combined Markdown</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f9; }
                .container { max-width: 800px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                section { margin-bottom: 40px; }
                hr { border: none; border-top: 1px solid #ccc; }
            </style>
        </head>
        <body>
            <div class="container">
                ${combinedContent}
            </div>
        </body>
        </html>
    `;

  // HTMLファイルに書き込み
  fs.writeFileSync(outputFile, finalHtml, "utf8");
  console.log("Markdown files have been combined and saved as", outputFile);
});
