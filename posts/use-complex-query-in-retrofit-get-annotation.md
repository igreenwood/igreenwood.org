---
title: 'Retrofitの@GETで複雑なクエリを投げる'
date: '20151228'
tags: 'Android'
---
Retrofit最近流行ってますね。

RetrofitはRxJavaと連携できてスマートに通信処理を記述できるので非常に便利です。

しかし、まだ新しいので情報が少なく、知らないと落とし穴にハマってしまうことがあります。今回 `@GET` で複雑な文字列をAPIに渡そうとしたらつまずいたので、最終的にたどり着いた解決方法をご紹介します。 

## `@GET` で複雑なクエリを投げられない
`@GET` では `@Query` と `@QueryMap` のパラメータがサポートされています。通常この２つのパラメータで事足りることが多いのですが、今回投げたかったのは以下の様なクエリです。

```
http://www.hoge.com/hoge?values[][max]=100&values[][min]=0&values[][max]=200&values[][min]=100
```

`values[]` という配列に `min` と `max`  という最小値と最大値のペアを格納しています。配列と連想配列の入れ子のような状態ですね。

もしこれが普通の配列なら、 `@Query("values[]") List<Integer> values` のように書けますし、普通の連想配列なら `@QueryMap Map<String, Integer> map` のように書けますが、入れ子にする場合の実装方法が見つけられませんでした。

最初のうちは `@Query` か `@QueryMap` のどちらかの形に無理やり持ち込めないかと色々試したものの、うまく行きませんでした。

RetrofitのIssuesなども漁ってみましたが
https://github.com/square/retrofit/issues/1324
を見ると、まだサポートされていないようでした。

上記のIssueを読むと、`@Query` をカスタムする方法や `Map` を重複するKeyを入れられるようにカスタムする方法が使えそうな会話がなされていますが、具体的な方法は示されておらず、調べていくとなかなか難しそうだったので今回は見送りました。

## 解決策
発想を変えて `baseUrl()` を動的に生成することで実現できました。

```
public interface MyApi { 
    @GET // ここにはURLを書かない
    Call<MyResponse> getWithComplexQuery(@Url String anEmptyString); // 空のURLを設定
} 

String url;
url = xxx; // URLを動的に生成
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl(url)  // 生成したURLを渡す
    .addConverterFactory(GsonConverterFactory.create()) 
    .build(); 
 
ClientService service = retrofit.create(MyApi.class);
 
Response<MyResponse> response = service.getWithComplexQuery("").execute();
```

まとめると、baseUrlに動的に生成したUrlを入れてやるだけですが,
空の `@Url` を設定するのがポイントです。ちなみに `@Url` は１つ目の引数にしないと怒られるので `@Header` などを付けたい場合は2つ目以降の引数で。

## まとめ
`baseUrl` を動的に生成するのはあまり美しくない気がしますが、現状これ以外の方法を見つけられませんでした。
これ以外の方法をご存じの方がいらっしゃいましたらぜひ教えて下さい。

## 参考URL
https://github.com/square/retrofit/issues/1324
http://stackoverflow.com/questions/32559333/retrofit-2-dynamic-url






