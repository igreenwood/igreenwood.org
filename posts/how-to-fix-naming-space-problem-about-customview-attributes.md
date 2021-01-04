---
title: 'カスタムビュー用のattrsの属性の名前が重複する問題を解決する'
date: '20151216'
tags: 'Android'
---
# attrsの属性の名前が重複する
Androidでカスタムビューを作る際に、attrsにカスタム属性を定義することがあると思いますが、重複する名前は宣言することができません。

うかつにカスタムビューの中で同じ属性を使うと`error: Attribute “***” has already been defined when using two library projects in Android`というエラーが出てしまいます。

重複している名前を変更すれば良いのですが、汎用的な名前はAndroid SDKの中で定義済みの事が多いですし、似たような名前の属性がたくさんあると使う時に混乱するので、他の解決策がないか調べてみました。

# 解決策
要約すると、解決策は以下の3通りしかありません。

* 重複する属性にprefixをつける
* 共通の属性を宣言する
* Android SDKで定義されている属性を再利用する

## 重複する属性にprefixをつける 
これが一番簡単な解決策です。

```attrs.xml
<resources>
    <declare-styleable name="CustomView1">
        <attr name="my_text" format="string" />
    </declare-styleable>

    <declare-styleable name="CustomView2">
        <attr name="my_text" format="string" />
    </declare-styleable>
</resources>
```

となっている所を

```attrs.xml
<resources>
    <declare-styleable name="CustomView1">
        <attr name="CustomView1_my_text" format="string" />
    </declare-styleable>

    <declare-styleable name="CustomView2">
        <attr name="CustomView2_my_text" format="string" />
    </declare-styleable>
</resources>
```

と変更します。

これで大抵の場合解決しますが、なんだか冗長で芸がない気がします。（とはいえ、場合によってはこの方法でしか解決できないこともあるでしょう。）

## 共通の属性を宣言する
同じアプリ内で共通の属性を使用したい場合、共通の属性を宣言すれば解決できます。

```attrs.xml
<resources>
    <declare-styleable name="CustomView1">
        <attr name="my_text" format="string" />
    </declare-styleable>

    <declare-styleable name="CustomView2">
        <attr name="my_text" format="string" />
    </declare-styleable>
</resources>
```

となっている所を


```attrs.xml
<resources>
    <attr name="my_text" format="string" />

    <declare-styleable name="CustomView1">
        <attr name="my_text" />
    </declare-styleable>

    <declare-styleable name="CustomView2">
        <attr name="my_text" />
    </declare-styleable>
</resources>
```

と変更すれば同じ属性を複数箇所で使用できます。

この方法だと、読み込んだライブラリに含まれている属性と重複している場合は解決にならないので、他の方法で解決する必要があります。

## Android SDKで定義されている属性を再利用する
backgroundやtextなど、汎用的な単語はandroid:xxxとしてSDK内で既に定義されていることが多いです。

これを使いたい場合は

```attrs.xml
<resources>
    <declare-styleable name="CustomView1">
        <attr name="my_text" format="string" />
    </declare-styleable>

    <declare-styleable name="CustomView2">
        <attr name="my_text" format="string" />
    </declare-styleable>
</resources>
```

となっている所を

```attrs.xml
<resources>
    <declare-styleable name="CustomView1">
        <attr name="android:text" />
    </declare-styleable>

    <declare-styleable name="CustomView2">
        <attr name="android:text" />
    </declare-styleable>
</resources>
```

と書き換えましょう。(`android:text`の箇所はフレームワークで宣言されている属性であれば何でも使用できます。)

この方法を使えば、レイアウトファイル内で
`app:text="hoge"`のような記載をしなくても`android:text="hoge"`で属性を指定できます。

# まとめ

基本的には３番目の方法を使いつつ、それで不足な分は1番目と2番目の方法で補っていくのが良いと思います。


