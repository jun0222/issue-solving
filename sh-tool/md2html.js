// TODO: コメント入れるのと、変数化してわかりやすくする
const fs = require("fs");
const path = "./sh-tool/md/";

fs.readdir(path, (err, files) => {
  const filesR = files.reverse();
  for (let index = 0; index < filesR.length - 1; index++) {
    const element = filesR[index];
    const file = fs.readFileSync(
      path + element,
      { encoding: "utf8" },
      (err, file) => {}
    );
    fs.appendFileSync(
      "./sh-tool/dist/index.html",
      file +
        "\n" +
        "\n" +
        "\n" +
        element.replace(".md", "") +
        "\n" +
        "<hr>" +
        "\n",
      (err) => {
        if (err) throw err;
        console.log("書き込みOK！");
      }
    );
  }
  fs.appendFileSync(
    "./sh-tool/dist/index.html",
    "<title>タイトル</title>",
    (err) => {
      if (err) throw err;
      console.log("書き込みOK！");
    }
  );
});
