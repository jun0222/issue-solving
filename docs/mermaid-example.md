## 目次

<!-- TOC -->

- [目次](#目次)
- [mermaid のサンプル](#mermaid-のサンプル)
  - [フローチャート](#フローチャート)
  - [シーケンス図](#シーケンス図)
  - [ガントチャート](#ガントチャート)
  - [クラス図](#クラス図)
- [入れた拡張機能](#入れた拡張機能)

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

## 入れた拡張機能

![picture 0](../images/ebd4d114add87bc46ebe8b5a3303ce7a92ff97a28dd728200a89bf9d0232d715.png)
