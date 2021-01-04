---
title: '画像の切り抜きをシンプルに実装できるライブラリを公開しました-SimpleCropView'
date: '20150912'
tags: 'Android'
---



先日、Androidで画像の切り抜きを簡単に実装できるライブラリを公開しました。
>SimpleCropView: A simple image cropping library for Android. 
>https://github.com/IsseiAoki/SimpleCropView

![demo](https://raw.github.com/wiki/IsseiAoki/SimpleCropView/images/gif/demo_basic_usage.gif)

これまで業務でいくつかのアプリで画像の切り抜き機能を実装してきたのですが、
同じようなコードをアプリごとに少しずつカスタマイズする事が多かったため
シンプルでいろんなアプリに簡単に組み込めるライブラリが欲しくて作りました。


##特徴

* Intentを使わずに１つのViewだけで画像の切り抜きができる
* 画像を縦横比を保ったまま、Viewの領域内で最大化する（小さい画像でも引き伸ばす）
* フレーム（切り抜き枠）の縦横比を設定できる
* 円形の切り抜きができる
* フレームの最小サイズを設定できる
* Viewの見た目（色、線の太さ...など）を簡単にカスタマイズできる
* 画像の回転ができる（90度単位）
* Viewの内部状態を自動で保存する（画面回転に自動で対応）


##基本的な使い方

まず、 `build.gradle`にライブラリを追加します。

```build.gradle
repositories {
    jcenter()
}
dependencies {
    compile 'com.isseiaoki:simplecropview:1.0.10'
}
```

次に、レイアウトXMLに`com.isseiaoki.simplecropview.CropImageView`を追加します。

>SimpleCropViewでは、Viewの大きさに基づいて画像の大きさが最大になるように計算するため、`WRAP_CONTENT`は無視されます。ご注意ください。

```activity_main.xml
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical">

    <com.isseiaoki.simplecropview.CropImageView
        android:id="@+id/cropImageView"
        xmlns:custom="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="250dp"
        android:padding="16dp"
        custom:cropMode="ratio_1_1"
        />

    <Button
        android:id="@+id/crop_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:layout_margin="16dp"
        android:text="CROP"
        />

    <ImageView
        android:id="@+id/croppedImageView"
        android:layout_margin="16dp"
        android:layout_gravity="center"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        />

</LinearLayout>
```

トリミングに使用したい画像をセットし、フレームに合わせてトリミングした画像を取得します。

```MainActivity.java
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final CropImageView cropImageView = (CropImageView)findViewById(R.id.cropImageView);
        final ImageView croppedImageView = (ImageView)findViewById(R.id.croppedImageView);

        // トリミングしたい画像をセット
        cropImageView.setImageBitmap(BitmapFactory.decodeResource(getResources(), R.mipmap.sample5));
        
        Button cropButton = (Button)findViewById(R.id.crop_button);
        cropButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // フレームに合わせてトリミング
                croppedImageView.setImageBitmap(cropImageView.getCroppedBitmap());
            }
        });
    }

}
```

以上です。


サンプルも一緒に公開しているので、実際に実行して試していただくのがわかりやすいと思います。

##カスタマイズ
SimpleCropViewは、組み込むアプリの要件に合わせていくつかの項目をカスタマイズできます。

* 切り抜き枠の縦横比（円形切り抜きも可能）
* 切り抜き枠の見た目（色、線の太さ、ハンドルの大きさ、ガイド用の線を見せるかどうかの設定など）
* 切り抜き枠のハンドルのタッチ判定
* ・・・

カスタマイズの詳細に関しては長くなるのでこちらでは説明しません。
[GitHubページ](https://github.com/IsseiAoki/SimpleCropView)をご参照ください。

SimpleCropViewは以下の２つのファイルだけで構成されているので、

* CropImageView.java
* attr_crop_image_view.xml

ライブラリで提供している機能で不足な場合は、
２つのファイルをプロジェクトにコピーして編集して頂くことも可能です。

##おわりに
「ユーザーのプロフィール写真を円形にトリミングしたい」みたいなライトな用途から、 「写真アプリの画像トリミング機能を実装したい」みたいなヘビーな用途まで、幅広い用途に使えるように作ったつもりです。

詳しい情報はGitHubページをご参照ください。

>SimpleCropView: A simple image cropping library for Android. 
>https://github.com/IsseiAoki/SimpleCropView


不明点、ご要望などありましたらお気軽にご連絡ください。
可能な限り対応させて頂きます。
Issue、Pull Requestも大歓迎です。

Version1.0.10でfloatの丸め誤差で切り取りが失敗するバグを修正しました。
レアケースですがお使いの方はアップデートをお願いします。

##追記
###2016/04/12
ver.1.1.0 をリリースしました。

主な変更点は、
「ImageViewに読み込みができない2000px以上の大きさの画像の切り取り」を行うために、切り取り用のメソッドにBitmapを渡していたところを`Uri`を渡すように変更し、表示する画像(Viewのサイズに合わせて縮小されたサムネイル画像)と、実際に切り取りに使用する画像(オリジナル画像)を別にした所です。

それに伴い、

* BitmapRegionDecoderを使用するためにsdk versionを9から10に
* 画像の読み込みと切り取りを非同期で行うように
* ついでに切り取り時に画像を指定したUriに保存するように
* ついでに切り取り画像の最大サイズを設定できるように(最大サイズに収まるようにアスペクト比を保ったまま縮小されます)
* ついでに切り取り画像の出力サイズを設定できるように(指定された幅or高さになるようにアスペクト比を保ったまま拡縮されます)

と言った変更が行われています。


今までは

`setImageBitmap(Bitmap bitmap)`で画像を設定し、
`getCroppedBitmap()`で切り取った画像を取得

という流れだったのが


これからは

`startLoad(Uri sourceUri, LoadCallback callback)`で画像を設定し
`startCrop(Uri saveUri, CropCallback cropCallback, SaveCallback saveCallback)`の`CropCallback`の引数から画像を取得(切り取られた画像は自動的に`saveUri`に保存される)

という流れに変わります。

**`setImageBitmap(Bitmap bitmap)`、`getCroppedBitmap()`は以前と変わらず動作しますが、`startLoad()`の引数で切り取りに使用したい画像の`Uri`を渡さないと、`startCrop()`を使用してもサムネイル用の画像が切り取りに使用されるのでご注意ください。**

他にも

* 回転、CropMode変更の際のアニメーションを追加
* attributesのパラメータ名の変更
* 細かいバグの修正

など、いくつか変更点があります。
詳しくは[Githubページ](https://github.com/IsseiAoki/SimpleCropView)をご覧下さい。

