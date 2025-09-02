import { IconBell } from "@tabler/icons-react";
import { Playground } from "./components/playground";

export const App = () => (
  <div className="prose max-w-[92svw] w-192 mx-auto flex flex-col gap-y-8 py-8">
    <header>
      <h1>Python Turtle Graphics</h1>
      <p>
        Python の Turtle Graphics
        を使って、プログラミングの基礎を楽しく学びましょう！
        <br />
        各ステップで実際にコードを実行して、図形がどのように描かれるか確認できます。
      </p>
    </header>

    <div className="flex items-center not-prose p-4 border-2 border-amber-700/10 rounded-lg bg-amber-100/10 gap-x-4">
      <IconBell size={24} className="text-amber-500 shrink-0" />
      <p>
        現在あるコンテンツの内容 (文章, サンプルコード)
        やその構成はAIによって生成されたものであり、実際の教材として使用できるものではありません。
      </p>
    </div>

    <section>
      <h2>ステップ 1: 基本的な線を描く</h2>
      <p>
        まずは一番簡単な線を描いてみましょう。<code>forward()</code>{" "}
        関数を使って前に進み、<code>right()</code> や <code>left()</code>{" "}
        で向きを変えます。
      </p>
      <Playground
        initialCode={`import turtle

# 100ピクセル前に進む
turtle.forward(100)

# 右に90度回転
turtle.right(90)

# また100ピクセル前に進む
turtle.forward(100)`}
      />
    </section>

    <section>
      <h2>ステップ 2: 四角形を描く</h2>
      <p>
        今度は四角形を描いてみましょう。同じ操作を4回繰り返すことで四角形ができます。
        プログラミングでは、繰り返し処理に <code>for</code> ループを使います。
      </p>
      <Playground
        initialCode={`import turtle

# 四角形を描く
for i in range(4):
    turtle.forward(100)
    turtle.right(90)

# 完成！`}
      />
    </section>

    <section>
      <h2>ステップ 3: 色を付けてみよう</h2>
      <p>
        線に色を付けてみましょう。<code>color()</code>{" "}
        関数を使って色を変更できます。 英語の色名（red, blue, green
        など）を使います。
      </p>
      <Playground
        initialCode={`import turtle

# 線の色を赤に設定
turtle.color("red")

# 赤い四角形を描く
for i in range(4):
    turtle.forward(100)
    turtle.right(90)

# 色を青に変更
turtle.color("blue")
turtle.forward(50)`}
      />
    </section>

    <section>
      <h2>ステップ 4: 三角形を描く</h2>
      <p>
        三角形を描くには、3回繰り返して、毎回120度回転します。
        四角形の90度とは違うことに注意しましょう。
      </p>
      <Playground
        initialCode={`import turtle

# 緑の三角形を描く
turtle.color("green")
for i in range(3):
    turtle.forward(100)
    turtle.right(120)

# 位置を移動して別の三角形
turtle.penup()  # ペンを上げる（線を描かない）
turtle.goto(150, 0)  # 座標(150, 0)に移動
turtle.pendown()  # ペンを下ろす（線を描く）

turtle.color("purple")
for i in range(3):
    turtle.forward(80)
    turtle.right(120)`}
      />
    </section>

    <section>
      <h2>ステップ 5: 円を描く</h2>
      <p>
        円を描くのは簡単です！<code>circle()</code> 関数を使います。
        括弧の中の数字は円の半径です。
      </p>
      <Playground
        initialCode={`import turtle

# 半径50の円を描く
turtle.color("blue")
turtle.circle(50)

# 位置を移動
turtle.penup()
turtle.goto(120, 0)
turtle.pendown()

# 半径30の円を描く
turtle.color("red")
turtle.circle(30)

# 位置を移動
turtle.penup()
turtle.goto(60, 80)
turtle.pendown()

# 半径40の円を描く
turtle.color("green")
turtle.circle(40)`}
      />
    </section>

    <section>
      <h2>ステップ 6: 星を描く</h2>
      <p>
        5つの角がある星を描いてみましょう。星を描くには、5回繰り返して、毎回144度回転します。
        なぜ144度なのか考えてみてください！
      </p>
      <Playground
        initialCode={`import turtle

# 黄色い星を描く
turtle.color("gold")
for i in range(5):
    turtle.forward(100)
    turtle.right(144)

# 位置を移動してもう一つの星
turtle.penup()
turtle.goto(150, 50)
turtle.pendown()

# 小さな青い星
turtle.color("blue")
for i in range(5):
    turtle.forward(60)
    turtle.right(144)`}
      />
    </section>

    <section>
      <h2>ステップ 7: 花を描く</h2>
      <p>
        円を組み合わせて花を描いてみましょう。同じ場所で少しずつ回転しながら円を描くと、花のような模様ができます。
      </p>
      <Playground
        initialCode={`import turtle

# 花を描く
turtle.color("pink")
for i in range(8):
    turtle.circle(50)
    turtle.right(45)  # 45度ずつ回転

# 花の中心に小さな円
turtle.color("yellow")
turtle.circle(10)`}
      />
    </section>

    <section>
      <h2>ステップ 8: スパイラル（渦巻き）</h2>
      <p>
        だんだん大きくなる渦巻きを描いてみましょう。
        <code>forward()</code> の値を少しずつ大きくしていきます。
      </p>
      <Playground
        initialCode={`import turtle

# 虹色のスパイラル
colors = ["red", "orange", "yellow", "green", "blue", "purple"]

for i in range(100):
    turtle.color(colors[i % 6])  # 色を順番に変える
    turtle.forward(i * 2)        # だんだん長く
    turtle.right(91)             # 少しずつ角度を変える`}
      />
    </section>

    <section>
      <h2>ステップ 9: 自由に描いてみよう！</h2>
      <p>
        これまで学んだことを組み合わせて、自分だけの作品を作ってみましょう！
        下のコードを参考にして、好きなように変更してください。
      </p>
      <Playground
        initialCode={`import turtle

# ここに自由にコードを書いてみてください！
# 例：家を描く

# 家の土台（四角形）
turtle.color("brown")
for i in range(4):
    turtle.forward(100)
    turtle.right(90)

# 屋根（三角形）
turtle.color("red")
for i in range(3):
    turtle.forward(100)
    turtle.right(120)

# 窓を描いてみましょう
turtle.penup()
turtle.goto(25, 25)
turtle.pendown()

turtle.color("blue")
for i in range(4):
    turtle.forward(20)
    turtle.right(90)

# ドアも描いてみましょう
turtle.penup()
turtle.goto(60, 0)
turtle.pendown()

turtle.color("green")
turtle.left(90)
turtle.forward(50)
turtle.right(90)
turtle.forward(20)
turtle.right(90)
turtle.forward(50)`}
      />
    </section>

    <footer>
      <h2>よく使う Turtle 関数</h2>
      <ul>
        <li>
          <code>turtle.forward(距離)</code> - 前に進む
        </li>
        <li>
          <code>turtle.right(角度)</code> - 右に回転
        </li>
        <li>
          <code>turtle.left(角度)</code> - 左に回転
        </li>
        <li>
          <code>turtle.circle(半径)</code> - 円を描く
        </li>
        <li>
          <code>turtle.color("色名")</code> - 色を変更
        </li>
        <li>
          <code>turtle.penup()</code> - ペンを上げる（線を描かない）
        </li>
        <li>
          <code>turtle.pendown()</code> - ペンを下ろす（線を描く）
        </li>
        <li>
          <code>turtle.goto(x, y)</code> - 指定した座標に移動
        </li>
      </ul>

      <h3>使える色</h3>
      <p>
        red, blue, green, yellow, orange, purple, pink, brown, black, white,
        gold など
      </p>

      <h3>プログラミングのコツ</h3>
      <ul>
        <li>
          <strong>繰り返し</strong>: 同じことを何度もするときは <code>for</code>{" "}
          ループを使う
        </li>
        <li>
          <strong>実験</strong>: 数字を変えて実行してみて、何が起こるか確認する
        </li>
        <li>
          <strong>組み合わせ</strong>: 簡単な図形を組み合わせて複雑な絵を作る
        </li>
      </ul>
    </footer>
  </div>
);
