---
title: 'カスタムビューの実装でよく使うヘルパー関数を晒す'
date: '20200120'
tags: 'Android Kotlin'
---
カスタムビューの実装など、 `onDraw` を継承して描画を自前で行う場合には、自分で描画位置の計算をしないといけないので計算量が多くなりがちです。

そういった場合に自前でちょっとしたヘルパー関数を用意しておくと便利なので、自分が使っている関数を紹介します。
（ `Float` のバージョンのみを記載していますが、状況に応じて適宜 `Int` のバージョンなども作ると便利です。）

## constrain()
`value` が `min 〜 max` の間に収まるようにする関数です。こいつを一つ挟んでおくことでバリデーションになるので非常に重宝しています。

```kotlin
fun constrain(value: Float, min: Float, max: Float): Float {
    return max(min(value, max), min)
}
```

## map()
`srcStart 〜 srcStop` の範囲にある値を `dstStart 〜 dstStop` の範囲に変換します。グラフを描画したいけれど、グラフの座標系と画面上の座標系が違う...といった場合にサクッと変換を書けるので非常に便利です。（後述する `lerp` と `norm` は `map` の変化系です。）

```kotlin
fun map(value: Float, srcStart: Float, srcStop: Float, dstStart: Float, dstStop: Float): Float {
    if(srcStop - srcStart == 0f) {
        return 0
    }
    return dstStart + (value - srcStart) * (dstStop - dstStart) / (srcStop - srcStart)
}
```

## lerp()
`lerp` は `0.0f 〜 1.0f` の範囲の値を `start 〜 stop` の範囲に変換します。 例えば、２点間を3:1に分割した点の座標を求めたいといった場合に `lerp(0.75f, 0, 100f)` のように書けば、すぐに座標を計算できます。

```kotlin
fun lerp(amt: Float, start: Float, stop: Float): Float {
    return start + (stop - start) * amt
}
```

## norm()
`norm` は `lerp` の反対で、 `start 〜 stop` の範囲にある値を `0.0f 〜 1.0f` の範囲に変換します。

```kotlin
fun norm(value: Float, start: Float, stop: Float): Float {
    return value / (stop - start)
}
```

## おわりに
ヘルパー関数の部分だけを他の描画ロジックから分離することでコードの見通しが良くなり、テストも容易になるのでおすすめです。

自分のプロジェクトではこんなヘルパー関数を使っているよ、などコメントで教えていただけると喜びます :pray: 

