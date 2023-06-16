# コマンドを格納する配列を初期化
commands=()
# commands.txt ファイルを一行ずつ読み込み、その内容を配列 commands に追加
while IFS= read -r line; do
  commands+=("$line")
done < commands.txt

# 配列 commands の各要素（コマンド）について処理
for cmd in "${commands[@]}"
do
    # 各コマンドから説明部分とコマンド部分を分離
    cmd_part=${cmd%%#*}
    explanation_part=${cmd#*#}

    # 説明部分が存在すれば表示
    if [ "$explanation_part" ]; then
        echo "※$explanation_part"
    fi

    # ユーザーに対しコマンドの実行確認メッセージを表示し、入力を待つ
    read -p "=====$cmd_part を実行しますか？(y/n/s)" -n 1 -r
    echo    # 改行

    if [[ $REPLY =~ ^[Yy]$ ]]   # 'Y' または 'y' が入力された場合
    then
        # コマンドを実行
        echo "=====$cmd_part 実行"
        eval $cmd_part
        echo    # 改行
    elif [[ $REPLY =~ ^[Ss]$ ]]   # 'S' または 's' が入力された場合
    then
        # 何もせずに次へ
        true
    else
        # 上記以外の入力がされた場合、スクリプトを終了
        echo "YySs以外が押された為、ツールを終了します"
        exit 1
    fi
done
