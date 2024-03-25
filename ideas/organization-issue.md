## 目次

<!-- TOC -->

- [目次](#目次)
- [概要](#概要)
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
- [Git のコミットメッセージ](#git-のコミットメッセージ)
  - [ドキュメントとの紐付け（重要）](#ドキュメントとの紐付け重要)
  - [具体](#具体)
- [backlog 課題のテンプレート](#backlog-課題のテンプレート)
- [issue のテンプレート](#issue-のテンプレート)
- [レビュー観点](#レビュー観点)
- [ファイルの命名ミス対策](#ファイルの命名ミス対策)
- [ファイルの分け方、検索性など](#ファイルの分け方検索性など)

<!-- /TOC -->

## 概要

- 組織課題
  - 業務課題
  - チーム課題
  - BizDev
  - ドキュメンテーション
  - 教育
- 現場で管理職や上流メンバとの雑談などから吸い上げ。

知見を溜めていく。検索性のためこの 1 ファイルにまとめる。

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

flowchart TB
  node_1["図解"]
  node_2["囲み"]
  node_4["線"]
  node_3["人"]
  node_5["矢印"]
  node_6["吹き出し"]
  node_7["イコール"]
  node_8["丸"]
  node_9["四角"]
  node_10["二重"]
  node_11["構造的"]
  node_12["有機的"]
  node_13(["要素や集合を囲む"])
  node_14["破線"]
  node_15["カッコ書き"]
  node_16["強調"]
  node_17["アクター"]
  node_18["指向性"]
  node_19["つまり"]
  node_1 --- node_2
  node_1 --- node_4
  node_1 --- node_3
  node_1 --- node_5
  node_1 --- node_6
  node_1 --- node_7
  node_2 --- node_8
  node_2 --- node_9
  node_4 --- node_10
  node_9 --- node_11
  node_8 --- node_12
  node_2 --- node_13
  node_4 --- node_14
  node_14 --- node_15
  node_10 --- node_16
  node_3 --- node_17
  node_5 --- node_18
  node_7 --- node_19

```

### 手書き

![picture 0](../images/218a7cbe8fb44b9c0e214a7de88f4631968a449ae063b5ff66deee11c566e2f9.jpeg)

### 参考資料

[なんでも図解 絵心ゼロでもできる！　爆速アウトプット術](https://www.diamond.co.jp/book/9784478110249.html)

## Git のコミットメッセージ

### ドキュメントとの紐付け（重要）

- 頭に機能番号や代表的なドキュメント番号をつける。
- プロジェクト管理のチームがあるなら先にルールを聞いておく。
- **コミットメッセージの詳細よりも重要**

### 具体

- 経験上の意見

  - あまりコミットメッセージの細かいことで改善や、問題が起きることはなさそう。
  - 丁寧に書いても、詳細は結局メンバーに聞くことが多い。
  - なので拘らない。他に方針があればそちらで OK。
  - rebase で log を整えるくらいなら組織や PJ の課題に時間を使うべき（これも拘らない）

- 前提
  - 日本語で書く
  - 英字は小文字で始める
  - commit lint を使うとログが汚くなりにくい。（経験浅メンバーに stash の方法は伝える）
- 具体
  - build: ビルドシステムや外部依存関係の変更
  - chore: 雑用。ビルドプロセスや補助ツールの変更
  - ci: CI の設定やスクリプトの変更
  - docs: ドキュメントのみの変更
  - feat: 新機能の追加
  - fix: バグ修正
  - perf: パフォーマンスを向上させるコードの変更
  - refactor: リファクタリング
  - revert: コードの変更を取り消す
  - style: コードの意味に影響を与えない変更（空白、フォーマット、セミコロンの欠落など）
  - test: テストの追加、変更、削除

## backlog 課題のテンプレート

## issue のテンプレート

## レビュー観点

## ファイルの命名ミス対策

## ファイルの分け方、検索性など
