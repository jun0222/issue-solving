## 目次

<!-- TOC -->

- [目次](#目次)
- [mermaid のサンプル](#mermaid-のサンプル)
  - [フローチャート](#フローチャート)
  - [シーケンス図](#シーケンス図)
  - [ガントチャート](#ガントチャート)
  - [クラス図](#クラス図)
  - [入れた拡張機能](#入れた拡張機能)
  - [Mermaid Graphical Editor の使い方](#mermaid-graphical-editor-の使い方)
- [図解のルール](#図解のルール)
  - [mermaid](#mermaid)
  - [手書き](#手書き)
  - [参考資料](#参考資料)

<!-- /TOC -->

## mermaid のサンプル

### フローチャート

```mermaid
graph LR
    A[スタート] --> B{判断}
    B -->|はい| C[処理 A]
    B -->|いいえ| D[処理 B]
    C --> E[エンド]
    D --> E
```

### シーケンス図

```mermaid
sequenceDiagram
    アリス->>ボブ: メッセージを送る
    ボブ-->>アリス: 応答する
```

### ガントチャート

```mermaid
gantt
    title プロジェクト計画
    dateFormat YYYY-MM-DD
    section 設計
    詳細設計 :des1, 2024-04-01, 10d
    section 開発
    フロントエンド開発 :2024-04-08, 15d
    バックエンド開発 :2024-04-08, 15d
    section テスト
    テスト : 5d
```

### クラス図

```mermaid
classDiagram
クラス 01 <|-- アリスのクラス
クラス 01 : int 数値
クラス 01 : 文字列を返す()
アリスのクラス : string 名前
アリスのクラス : void 話す()
```

### 入れた拡張機能

![picture 0](../images/ebd4d114add87bc46ebe8b5a3303ce7a92ff97a28dd728200a89bf9d0232d715.png)
![picture 1](../images/00493ddb8ca422ca7c22560af168bcfb9e2d706f7ca4408c69ed2b4fd4a4a4f6.png)

### Mermaid Graphical Editor の使い方

![picture 2](../images/0fc304c473428585901722c5c0ea946b75a94c0f8af4c57c157e3bd0f0c8348b.gif)
[参考](https://ja.astahblog.com/2022/11/01/mermaid/)

## 図解のルール

### mermaid

```mermaid

```

### 手書き

![picture 0](../images/218a7cbe8fb44b9c0e214a7de88f4631968a449ae063b5ff66deee11c566e2f9.jpeg)

### 参考資料

[なんでも図解 絵心ゼロでもできる！　爆速アウトプット術](https://www.diamond.co.jp/book/9784478110249.html)
