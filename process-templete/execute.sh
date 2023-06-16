commands=()
while IFS= read -r line; do
  commands+=("$line")
done < commands.txt

for cmd in "${commands[@]}"
do
    cmd_part=${cmd%%#*}
    explanation_part=${cmd#*#}

		if [ "$explanation_part" ]; then
			echo "※$explanation_part"
    fi

    # 確認メッセージを表示し、ユーザーの入力を待つ
    read -p "=====$cmd_part を実行しますか？(y/n/s)" -n 1 -r
    echo

    if [[ $REPLY =~ ^[Yy]$ ]]
    then
        echo "=====$cmd_part 実行"
        eval $cmd_part
        echo
    elif [[ $REPLY =~ ^[Ss]$ ]]
    then
        true
    else
        echo "YySs以外が押された為、ツールを終了します"
        exit 1
    fi
done

