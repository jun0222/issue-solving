<!-- 参考: https://qiita.com/moriyannn/items/dbb17fe826fc21b5ff47 -->

```js
function unsubscribeFromAllChannelsWithTextClick() {
  const unsubscribeButtons = document.querySelectorAll(
    "#notification-preference-button > ytd-subscription-notification-toggle-button-renderer-next > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
  );

  let currentIndex = 0; // 現在処理しているチャンネルのインデックス

  function clickByTextContent(tagName, textContent) {
    const elements = document.querySelectorAll(tagName);
    for (let element of elements) {
      if (element.innerText === textContent) {
        element.click();
        return true; // 要素が見つかり、クリックされた
      }
    }
    return false; // 指定されたテキストを持つ要素が見つからなかった
  }

  function processNextChannel() {
    if (currentIndex >= unsubscribeButtons.length) {
      console.log("全てのチャンネルの解除が完了しました。");
      return; // 全てのチャンネルが処理された場合、処理を終了
    }

    unsubscribeButtons[currentIndex].click(); // 「通知設定」ボタンをクリック

    setTimeout(() => {
      if (clickByTextContent("yt-formatted-string", "登録解除")) {
        // 「登録解除」テキストを持つ要素がクリックされた後の処理
        setTimeout(() => {
          document
            .querySelector(
              "#confirm-button > yt-button-shape > button > yt-touch-feedback-shape > div > div.yt-spec-touch-feedback-shape__fill"
            )
            .click(); // 確認ダイアログの「確認」ボタンをクリック
          currentIndex++; // 次のチャンネルへインデックスを進める
          setTimeout(processNextChannel, 1000); // 次のチャンネルの処理を開始する
        }, 1000);
      } else {
        console.error(
          "「登録解除」テキストを持つ要素が見つかりませんでした。セレクターまたはテキスト内容を確認してください。"
        );
        currentIndex++; // エラーが発生した場合でも次のチャンネルへ進む
        setTimeout(processNextChannel, 1000);
      }
    }, 1000);
  }

  processNextChannel(); // 最初のチャンネルの処理を開始
}

unsubscribeFromAllChannelsWithTextClick(); // 関数を呼び出して処理を開始
```
