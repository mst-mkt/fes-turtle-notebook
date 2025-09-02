# [PoC] Turtle Notebook

2025年度の赤羽台祭で実施予定の「プログラミング体験」企画に向けて、Turtle Graphicsの教材とプレイグラウンドを兼ねたアプリケーションを、ブラウザ上で動作させられるか検証するためのPoCです。

> [!NOTE]
>
> 現在あるコンテンツの内容 (文章, サンプルコード) やその構成はAIによって生成されたものであり、実際の教材として使用できるものではありません。

## 技術構成

- [Pyodide](https://pyodide.org/en/stable/) - WebAssembly を用いたブラウザ上で動作する Python 実行環境
- [RaspberryPiFoundation/turtle](https://github.com/RaspberryPiFoundation/turtle) - Pyodide 対応の turtle パッケージの実装
- [wasm-fmt/ruff_fmt](https://github.com/wasm-fmt/ruff_fmt) - Python フォーマッタ [ruff](https://docs.astral.sh/ruff/) を WebAssembly で動作させるライブラリ
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Visual Studio Code のエディタエンジンを基盤としたブラウザ向けコードエディタ
