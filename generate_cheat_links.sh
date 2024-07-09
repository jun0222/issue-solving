# cheat/index.htmlファイルとcheat配下のHTMLファイルへのリンクを生成するスクリプト
cheat_output_html="cheat/index.html"
{
  echo "<!DOCTYPE html>"
  echo "<html lang=\"ja\">"
  echo "<head>"
  echo "  <meta charset=\"UTF-8\">"
  echo "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">"
  echo "  <title>Cheat Sheet Links</title>"
  echo "  <style>"
  echo "    body { font-family: Arial, sans-serif; padding: 20px; }"
  echo "    ul { list-style-type: none; padding-left: 0; }"
  echo "    li { margin: 5px 0; }"
  echo "    a { text-decoration: none; color: #0366d6; }"
  echo "    a:hover { text-decoration: underline; }"
  echo "  </style>"
  echo "</head>"
  echo "<body>"
  echo "  <h1>Cheat Sheet Links</h1>"
  echo "  <ul>"

  # cheatディレクトリ内のHTMLファイルのみを対象にリンクを生成
  cheat_html_files=$(find cheat -name '*.html' -print)
  while IFS= read -r file; do
    # "index.html" をパスから除去し、"cheat/"を削除
    clean_file=$(echo "$file" | sed 's|/index\.html$||' | sed 's|cheat/||')
    
    # エスケープ処理を追加してHTMLの安全性を確保
    escaped_file=$(echo "$clean_file" | sed 's/&/\&amp;/g; s/"/\&quot;/g; s/'\''/\&#39;/g; s/</\&lt;/g; s/>/\&gt;/g')
    relative_url="./${escaped_file}"
    
    echo "    <li><a href=\"$relative_url\">$escaped_file</a></li>"
  done <<< "$cheat_html_files"

  echo "  </ul>"
  echo "</body>"
  echo "</html>"
} > $cheat_output_html

# ファイルの生成が成功した場合のメッセージ
if [ $? -eq 0 ]; then
  echo "Cheat sheet HTML file '$cheat_output_html' has been generated successfully."
else
  echo "Failed to generate the cheat sheet HTML file."
fi
