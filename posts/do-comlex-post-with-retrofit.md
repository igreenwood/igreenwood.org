---
title: 'Retrofitを使って複雑なPOSTをする'
date: '20180826'
tags: 'Android'
---
## Multipartで画像と多次元配列を投げたい
Multipartで画像を投げるだけなら簡単ですが、画像と一緒に `params[][hoge_id]=1&params[][hoge_name]=aaa` みたいな可変長なクエリを投げるとなると方法がわからなかったので、調べた結果をメモします。

## 結論：OkHttpで書いてRequestBodyを渡せば良い
いきなり結論ですが、OkHttpを使ったコードを書いて作ったRequestBodyを渡すことで解決しました。コードはこんな感じです

* Retrofitのインターフェース

```kotlin

    @POST("items")
    fun postItem(@Header("Authorization") token: String, @Body body: RequestBody): Single<Item>

```

* APIを呼ぶ側のコード

```kotlin
        val boundary = System.currentTimeMillis().toString()
        val imageMedia = MediaType.parse("image/png")
        val builder = MultipartBody.Builder(boundary).apply {

            setType(MultipartBody.FORM)

            addFormDataPart("image", "image.png", RequestBody.create(imageMedia, image))

            params.forEach {
                addFormDataPart("params[][hoge_id]", it.id.toString())
                addFormDataPart("params[][hoge_name]", it.name)
            }
        }

        api.postItem(
                body = builder.build(),
                token = getToken()
        )

```

## まとめ
そんなに頻繁に使わないのですが、よく忘れるのでメモ。
クエリでListとMapが入れ子になるような場合は、このやり方を使うのが一番楽な気がしてます。もっと良い方法があれば教えていただけると嬉しいです。

