#!/bin/bash

# スクリプトの使い方を表示する関数
usage() {
  echo "Usage: $0 [-i ignore_dir] [-b base_url] [-h]"
  echo "Generate an HTML file with links to all HTML files found recursively in the directories,"
  echo "and commit the changes with a specific message."
  echo "  -i    Directory to ignore. Can be specified multiple times."
  echo "  -b    Base URL to prepend to links."
  exit 1
}

# 引数のパース
ignore_dirs=()
base_url=""
while getopts "i:b:h" opt; do
  case $opt in
    i) ignore_dirs+=("$OPTARG") ;;
    b) base_url="$OPTARG" ;;
    h|\?) usage ;;
  esac
done

# Gitのステージングエリアにカレントディレクトリのすべての変更を追加
git add .

# "feat: tool update" というコメントで変更をコミット
git commit -m "feat: tool update"

# ./generate_links.sh スクリプトを指定されたオプションで実行
./generate_links.sh -i ignore_dir1 -i ignore_dir2 -b https://tools.juns-app.com/
./generate_cheat_links.sh -base_url https://tools.juns-app.com/
# "feat: tool update" というコメントで再度コミット
git add .
git commit -m "feat: tool update"
git push origin HEAD

