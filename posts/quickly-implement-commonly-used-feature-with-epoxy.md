---
title: 'EpoxyでRecyclerViewでよく使う機能をサクッと実装する'
date: '20180218'
tags: 'Android Kotlin'
---
[DroidKaigi2018のアプリ](https://github.com/DroidKaigi/conference-app-2018)で[Groupie](https://github.com/lisawray/groupie)が採用されたのを見て、RecyclerViewのライブラリをいくつか試してみたら、[Epoxy](https://github.com/airbnb/epoxy)が最高だったので、ご紹介したいと思います。

今回Epoxyを使ってEmptyView、ヘッダー、フッターを使った簡単なサンプルを作成したので、その実装方法を説明しながら、Epoxyの基本的な使い方を紹介します。

## サンプルコード
今回の内容のサンプルコードはこちらになります。（Kotlinです）
https://github.com/IsseiAoki/epoxy-sample

<blockquote class="twitter-tweet" data-lang="ja"><p lang="ja" dir="ltr">Epoxyのサンプル作った <a href="https://t.co/KP4XoRVsCz">pic.twitter.com/KP4XoRVsCz</a></p>&mdash; Issei Aoki (@issei_greenwood) <a href="https://twitter.com/issei_greenwood/status/965103804923330589?ref_src=twsrc%5Etfw">2018年2月18日</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

機能としてはざっくりと以下の４つです。

* ヘッダーに複数枚の画像を表示して横スワイプで切り替えられる
* アイテムはグリッド
* アイテムが無い時はEmptyViewを表示する
* 一番下までスクロールすると、ProgressBar付きのフッターを表示する

## 実装の基本的な流れ
Epoxyを使った場合の実装の基本的な流れは以下になります。

* build.gradleにEpoxyを追加
* レイアウトXMLを作成
* Epoxy用のModelを作成
* 一度ビルドする（Epoxyが必要なクラスを自動生成するのに必要）
* Epoxy用のControllerを作成
* RecyclerViewののセットアップ（Activity/Fragment）

今までAdapterにコードを書いていた所を、Epoxy用のModelとControllerに書くように変更するだけです。コード量的に増えたわけではないです。むしろ減ります。

## インストール
build.gradleに以下を追加します

```
apply plugin: 'kotlin-kapt'

kapt {
    correctErrorTypes = true
}

dependencies {
    compile 'com.airbnb.android:epoxy:2.9.0'
    kapt 'com.airbnb.android:epoxy-processor:2.9.0'
    compile 'com.airbnb.android:epoxy-databinding:2.9.0'
}

```

## レイアウトXMLの作成

レイアウトXMLの実装方法はEpoxyを使わない時と変わりません。
### Activity
RecyclerView置いてるだけです

```activity_main.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    >

  <android.support.design.widget.CoordinatorLayout
      android:id="@+id/coordinator_layout"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      >

    <android.support.design.widget.AppBarLayout
        android:id="@+id/app_bar_layout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:theme="@style/AppTheme.AppBarOverlay"
        >

      <android.support.v7.widget.Toolbar
          android:id="@+id/toolbar"
          android:layout_width="match_parent"
          android:layout_height="?attr/actionBarSize"
          android:layout_gravity="bottom"
          />

    </android.support.design.widget.AppBarLayout>

    <android.support.v4.widget.SwipeRefreshLayout
        android:id="@+id/refresh_layout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_behavior="@string/appbar_scrolling_view_behavior"
        android:background="@color/colorPrimary"
        >

      <com.airbnb.epoxy.EpoxyRecyclerView
          android:id="@+id/recycler_view"
          android:layout_width="match_parent"
          android:layout_height="match_parent"
          android:paddingStart="@dimen/spacing_small"
          android:paddingEnd="@dimen/spacing_small"
          />

    </android.support.v4.widget.SwipeRefreshLayout>

  </android.support.design.widget.CoordinatorLayout>

</layout>
```
### ヘッダーに表示するカード
横スワイプ出来るヘッダーに表示されるカードのレイアウトです。
CardViewに画像を置いてるだけです。

```item_banner.xml
<?xml version="1.0" encoding="utf-8"?>
<layout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    >

  <android.support.v7.widget.CardView
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:clickable="true"
      android:focusable="true"
      android:foreground="?android:selectableItemBackground"
      app:cardBackgroundColor="@color/cardview_light_background"
      app:cardCornerRadius="@dimen/card_corner_radius"
      app:cardElevation="@dimen/cardview_default_elevation"
      app:cardUseCompatPadding="true"
      >

    <com.isseiaoki.epoxy.component.AspectRatioImageView
        android:id="@+id/banner_image"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:adjustViewBounds="true"
        android:scaleType="fitCenter"
        app:ariv_height_ratio="533"
        app:ariv_width_ratio="800"
        tools:src="@drawable/banner_1"
        />

  </android.support.v7.widget.CardView>

</layout>

```

### グリッドで表示するカード
グリッドで表示するのカードのレイアウトです。
CardViewに画像とテキストを置いてるだけです。 

```item_image.xml
<?xml version="1.0" encoding="utf-8"?>
<layout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    >

  <android.support.v7.widget.CardView
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:clickable="true"
      android:focusable="true"
      android:foreground="?android:selectableItemBackground"
      app:cardBackgroundColor="@color/cardview_light_background"
      app:cardCornerRadius="@dimen/card_corner_radius"
      app:cardElevation="@dimen/cardview_default_elevation"
      app:cardUseCompatPadding="true"
      >

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        >

      <ImageView
          android:id="@+id/item_image"
          android:layout_width="match_parent"
          android:layout_height="wrap_content"
          android:adjustViewBounds="true"
          android:scaleType="fitCenter"
          tools:src="@drawable/cat_1"
          />

      <TextView
          android:id="@+id/item_text_view"
          android:layout_margin="@dimen/spacing"
          android:layout_width="wrap_content"
          android:layout_height="wrap_content"
          />

    </LinearLayout>

  </android.support.v7.widget.CardView>

</layout>

```
### EmptyView
EmptyViewとして表示するレイアウトです。TextViewがあるだけです。

```item_empty_text.xml
<?xml version="1.0" encoding="utf-8"?>
<layout>

  <FrameLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent">

    <TextView
        android:id="@+id/empty_text_view"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        tools:text="no item"
        />

  </FrameLayout>

</layout>
```
### フッター
RecyclerViewを一番下までスクロールした時に読み込み中であることを示すためのフッターのレイアウトです。ProgressBarしかないです。

```item_loading_footer.xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    >

  <android.support.constraint.ConstraintLayout
      android:layout_width="match_parent"
      android:layout_height="wrap_content"
      android:padding="@dimen/spacing"
      >

    <ProgressBar
        android:id="@+id/progress"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:theme="@style/AppTheme.PopupOverlay"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        />
  </android.support.constraint.ConstraintLayout>

</layout>
```

## Modelの作成
ここからEpoxy独自の実装になります。

EpoxyではModelクラスに、今まで `RecyclerView.AdapterのonBindViewHolder` に書いていたコードを書いて、そこから `Model_` クラスを生成して `Controller` から利用します。

Epoxyでは、 `Model_` クラスの生成方法として

* ViewHolder用のModelを実装して、そのクラスから生成
* カスタムビュー用のModelを実装して、そのクラスから生成
* DataBindingを用いてxmlファイルから生成（別途 `package-info.java` を書く必要あり）

の３種類があります。

ButterKnifeを使用しているのであれば、ViewHolderを使う方法、DataBindingを使用しているのであれば、xmlから生成する方法を用いるのが勧められています。自分で使う時にカスタムビューから生成する方法はあまり使わないかもしれません。

今のプロジェクトでは、DataBindingを使用しているのですが、諸事情でCustomBindingAdapterを使わずViewHolder的な使い方をしているので、以下のようなカスタムModelを書く事でViewHolderを使う方法でDataBindingを使っています。

```DataBindingEpoxyHolder.kt
package com.isseiaoki.epoxy.recyclerview

import android.databinding.DataBindingUtil
import android.databinding.ViewDataBinding
import android.support.annotation.CallSuper
import android.view.View
import com.airbnb.epoxy.EpoxyHolder

class DataBindingEpoxyHolder : EpoxyHolder() {

  @CallSuper
  override fun bindView(itemView: View) {
    binding = DataBindingUtil.bind(itemView)
  }

  lateinit var binding: ViewDataBinding

}
```
```DataBindingModel.kt
package com.isseiaoki.epoxy.recyclerview.model

import android.content.Context
import android.databinding.ViewDataBinding
import com.airbnb.epoxy.EpoxyModelWithHolder
import com.isseiaoki.epoxy.recyclerview.DataBindingEpoxyHolder

abstract class DataBindingModel<in T : ViewDataBinding> : EpoxyModelWithHolder<DataBindingEpoxyHolder>() {

  abstract fun bind(binding: T, context: Context)

  abstract fun unbind(binding: T)

  @Suppress("UNCHECKED_CAST")
  override fun bind(holder: DataBindingEpoxyHolder) {
    val binding = holder.binding as? T ?: return
    val context = binding.root.context
    bind(binding, context)
  }

  @Suppress("UNCHECKED_CAST")
  override fun unbind(holder: DataBindingEpoxyHolder) {
    val binding = holder.binding as? T ?: return
    unbind(binding)
  }

}
```
EpoxyのModelは基本的にレイアウトと１対１の対応になっているので、レイアウトファイルの個数分のModelを作成します。今回のサンプルの場合は `item_banner.xml`（ヘッダーの画像用のレイアウト） 、 `item_empty_text.xml`（EmptyView用のレイアウト） 、 `item_image.xml`（アイテムのレイアウト） 、 `item_loading_footer.xml`（追加読み込み用のProgressのフッター用のレイアウト） の４つのレイアウトを作成しているので、Modelも `BannerModel.kt` 、`EmptyTextModel.kt` 、 `ItemModel.kt` 、`LoadingFooterModel.kt` の４種類を作成します。 

### ItemModel

```ItemModel.kt
package com.isseiaoki.epoxy.recyclerview.model

import android.content.Context
import com.airbnb.epoxy.EpoxyAttribute
import com.airbnb.epoxy.EpoxyModelClass
import com.isseiaoki.epoxy.R
import com.isseiaoki.epoxy.databinding.ItemImageBinding
import com.isseiaoki.epoxy.entity.SimpleItem
import com.squareup.picasso.Picasso

/**
 * model for item
 */
@EpoxyModelClass(layout = R.layout.item_image)
abstract class ItemModel : DataBindingModel<ItemImageBinding>() {

  @EpoxyAttribute lateinit var item: SimpleItem
  @EpoxyAttribute(EpoxyAttribute.Option.DoNotHash) lateinit var onItemClicked: (SimpleItem) -> Unit

  override fun bind(binding: ItemImageBinding, context: Context) {
    Picasso.with(context).load(item.imageUrl).into(binding.itemImage)
    binding.itemTextView.text = "cat ${item.id + 1}"
    binding.root.setOnClickListener { onItemClicked(item) }
  }

  override fun unbind(binding: ItemImageBinding) {
    binding.itemImage.setImageDrawable(null)
    binding.root.setOnClickListener(null)
  }

}
```
 `EpoxyModelWithHolder` を継承した `abstract` クラスを実装しましょう。

まず `@EpoxyModelClass(layout = R.layout.item_image)` でレイアウトXMLを指定して、`bind()` の中に `RecyclerView.Adapter` の `onBindViewHolder` に書いていたコードを書きます。

ここでポイントとなるのは、 `@EpoxyAttribute` で `Model` の中で使用したい変数を定義する事です。 `@EpoxyAttribute` を定義する事で、自動生成された `Model_` クラス（この場合 `ItemModel_` クラス）にsetterが生えて、後述する `Controller` 上で変数を渡せるようになります。

 `onItemClicked` にくっついている `EpoxyAttribute.Option.DoNotHash` ですが、Epoxyは `EpoxyAttribute` で渡される変数の状態を自動で比較して差分があった場合のみViewの更新が走るようになっており、 `OnItemClicked` の変更がこのロジックに影響しないようにするため、`EpoxyAttribute.Option.DoNotHash` をつけています。基本的にコールバックには全てつければ良さそうです。詳しい説明は[wiki](https://github.com/airbnb/epoxy/wiki/Diffing)をご覧ください。

 `unbind()` では、 `bind()` の中で重い処理をしている場合にここでキャンセルしたり、 `Bitmap` や `OnClickListener` を解放する事でパフォーマンスが上がります。`bind()` の中でRxJavaの `Disposable` を `subscribe()` している場合はここで`dispose()` してあげるのが良いと思います。

### BannerModel
ItemModelとほぼ同じです。

``` BannerModel.kt
package com.isseiaoki.epoxy.recyclerview.model

import android.content.Context
import com.airbnb.epoxy.EpoxyAttribute
import com.airbnb.epoxy.EpoxyModelClass
import com.isseiaoki.epoxy.R
import com.isseiaoki.epoxy.databinding.ItemBannerBinding
import com.isseiaoki.epoxy.entity.SimpleItem
import com.squareup.picasso.Picasso

/**
 * model for banner
 */
@EpoxyModelClass(layout = R.layout.item_banner)
abstract class BannerModel : DataBindingModel<ItemBannerBinding>() {

  @EpoxyAttribute lateinit var banner: SimpleItem
  @EpoxyAttribute(EpoxyAttribute.Option.DoNotHash) lateinit var onBannerClicked: (SimpleItem) -> Unit

  override fun bind(binding: ItemBannerBinding, context: Context) {
    Picasso.with(context).load(banner.imageUrl).into(binding.bannerImage)
    binding.root.setOnClickListener { onBannerClicked(banner) }
  }

  override fun unbind(binding: ItemBannerBinding) {
    binding.bannerImage.setImageDrawable(null)
    binding.root.setOnClickListener(null)
  }

}
```

### LoadingFooterModel
ProgressBarを表示しているだけなので、何も渡すデータはなく、 `bind()`、`unbind()`でやることもありません。

```LoadingFooterModel.kt
package com.isseiaoki.epoxy.recyclerview.model

import android.content.Context
import com.airbnb.epoxy.EpoxyModelClass
import com.isseiaoki.epoxy.R
import com.isseiaoki.epoxy.databinding.ItemLoadingFooterBinding

/**
 * model for footer
 */
@EpoxyModelClass(layout = R.layout.item_loading_footer)
abstract class LoadingFooterModel : DataBindingModel<ItemLoadingFooterBinding>() {

  override fun bind(binding: ItemLoadingFooterBinding, context: Context) {
    // do nothing
  }

  override fun unbind(binding: ItemLoadingFooterBinding) {
    // do nothing
  }

}
```

### EmptyTextModel
EmptyViewなのでフッターと同じく渡してあげるデータはないのですが、複数のRecyclerViewで使い回せるようにテキストの内容を外から渡せるようにしてあります。

``` EmptyTextModel.kt
package com.isseiaoki.epoxy.recyclerview.model

import android.content.Context
import com.airbnb.epoxy.EpoxyAttribute
import com.airbnb.epoxy.EpoxyModelClass
import com.isseiaoki.epoxy.R
import com.isseiaoki.epoxy.databinding.ItemEmptyTextBinding

/**
 * model for empty view
 */
@EpoxyModelClass(layout = R.layout.item_empty_text)
abstract class EmptyTextModel : DataBindingModel<ItemEmptyTextBinding>() {

  @EpoxyAttribute lateinit var emptyText: String

  override fun bind(binding: ItemEmptyTextBinding, context: Context) {
    if (emptyText.isNotEmpty()) {
      binding.emptyTextView.text = emptyText
    }
  }

  override fun unbind(binding: ItemEmptyTextBinding) {
    // do nothing
  }

}
```
## ビルド
ここで一度ビルドしておきましょう。作成した `Model` クラスから `Model_` クラスが生成されるはずです。

## Controllerの作成
いよいよ `Controller` の作成です。それぞれのセルの表示に関してのコードはModelの中に既に書いてあるので、セルをどのような順番、どのような条件の時に表示するかを書いていきます。

```SimpleController.kt
package com.isseiaoki.epoxy.recyclerview.controller

import android.content.Context
import com.airbnb.epoxy.Carousel
import com.airbnb.epoxy.CarouselModel_
import com.airbnb.epoxy.EpoxyController
import com.isseiaoki.epoxy.ext.dpToPx
import com.isseiaoki.epoxy.entity.SimpleItem
import com.isseiaoki.epoxy.recyclerview.model.BannerModel_
import com.isseiaoki.epoxy.recyclerview.model.EmptyTextModel_
import com.isseiaoki.epoxy.recyclerview.model.ItemModel_
import com.isseiaoki.epoxy.recyclerview.model.LoadingFooterModel_
import timber.log.Timber

class SimpleController(
    var context: Context,
    private var onBannerClicked: (SimpleItem) -> Unit = {},
    private var onItemClicked: (SimpleItem) -> Unit = {},
    filterDuplicates: Boolean = true
) : EpoxyController() {

  init {
    setFilterDuplicates(filterDuplicates)
  }

  private var banners = mutableListOf<SimpleItem>()
  private var items = mutableListOf<SimpleItem>()
  private var showFooter = false

  override fun buildModels() {
    // empty view
    if (banners.isEmpty() || items.isEmpty()) {
      EmptyTextModel_()
          .id("empty")
          .spanSizeOverride { _, _, _ -> 2 }
          .emptyText("no item")
          .addTo(this)
      return
    }
    // carousel header
    if (banners.isNotEmpty()) {
      val spacing = context.dpToPx(8)
      CarouselModel_()
          .padding(Carousel.Padding(spacing, 0, 0, 0, spacing))
          .id("carousel")
          .spanSizeOverride { _, _, _ -> 2 }
          .models(
              banners.map {
                BannerModel_()
                    .id(it.id)
                    .banner(it)
                    .onBannerClicked { onBannerClicked(it) }
              }
          )
          .addTo(this)
    }
    // items
    items.forEach {
      ItemModel_()
          .id(it.id)
          .item(it)
          .onItemClicked(onItemClicked)
          .spanSizeOverride { _, _, _ -> 1 }
          .addTo(this)
    }
    // footer
    LoadingFooterModel_()
        .id("footer")
        .spanSizeOverride { _, _, _ -> 2 }
        .addIf(showFooter, this)
  }

  fun update(banners: List<SimpleItem>, items: List<SimpleItem>) {
    this.banners.clear()
    this.banners.addAll(banners)
    this.items.clear()
    this.items.addAll(items)
    showFooter = false
    requestModelBuild()
  }

  fun addAll(items: List<SimpleItem>) {
    this.items.addAll(items)
    showFooter = false
    requestModelBuild()
  }

  fun showFooter() {
    showFooter = true
    requestModelBuild()
  }

  fun showEmpty() {
    requestModelBuild()
  }
}
```
Controllerでポイントとなるのは `buildModels()` です。

表示を行う際には必ず `buildModels()` が呼ばれるようになっており、表示を変更したい場合には `requestModelBuild()` を呼ぶことで `buildModels()` が実行されます。
ControllerはActivity/Fragmentで保持して、データの更新がある度にControllerのメソッドを呼ぶことになるので、データの更新を行う際に必要なメソッドを用意しましょう。

今回のサンプルでは、

* 初期表示でEmptyViewを表示するための `showEmpty()` 
* 初回にデータ更新を行うための `update()`
* リストが一番下までスクロールされた際にフッターを表示するための `showFooter()`
* 追加読み込みが完了した際にデータを追加するための `addAll()` 

の４つを用意しました。

今度は `buildModels()` に書いてあるコードについて説明していきましょう。

まず大雑把に説明すると、アイテムが何も無い時には、 `EmptyTextModel_` を `addTo(this)` することでEmptyViewを表示し、アイテムが存在する場合には、残りの `BannerModel_` 、 `ItemModel_` 、 `LoadingFooterModel_` を `addTo(this)` しています。
 `LoadingFooterModel_` については、リストが最後尾までスクロールされて、追加読み込みが完了するまでの間だけ表示したいので、`addIf(showFooter, this)` を使って `showFooter` が `true` の場合だけControllerにaddしています。

次に `Model_` のメソッドについて説明します。

 `id()` は、Modelごとの一意なIDを設定します。ここで渡しているIDは、RecyclerView.Adapterの `getItemId(position: Int): Long` で返していた一意なIDと同じものです。
> `RecyclerView` では `setHasStableId(true)` として `getItemId(position: Int)` で一意なIDを返却することでパフォーマンスが向上するのですが、ここでidをセットすることで同じ効果が得られます。

ここで特筆すべきなのは、 Epoxyでは、ヘッダーやフッターなど、一意なIDが無いViewに関しては、文字列を渡すことによって自動的にIDを生成してくれることです。また、`setFilterDuplicates(true)` を設定しておくことで、何らかの原因でリスト内に同じIDのアイテムが混入してしまった場合に、自動的に重複を省いてRecyclerViewのクラッシュを防いでくれます。

何か特別な理由が無い限りは基本的に `id()` を設定しておくことでパフォーマンスが良くなるので設定することをおすすめします。

 `spanSizeOverride()` は、それぞれのアイテムの列数を設定するためのものです。
今回、 `RecyclerView` には `GridLayoutManager(context, 2)` を指定するのですが、
何もしないとヘッダー、フッターもアイテムと同じ２列で表示されてしまいます。
 `spanSizeOverride { _, _, _ -> 2 }` のように書いて、Activity/Fragmentの`RecyclerView` のセットアップ時に
 `GridLayoutManager().spanSizeLookup = controller.spanSizeLookup` と書くことで、**このセルは２列分の幅を使って１列で表示して欲しい**と指定することができます。

 `item()` や　`banner()` 、 `onItemClicked()` などはModel側で `EpoxyAttribute` をつけた変数のsetterになります。

最後に `Carousel` について説明します。
`Carousel` はRecyclerViewのネストをより簡単に実現するためのEpoxy独自のカスタムビューで自動的に親のRecyclerViewとViewPoolをシェアしてくれます。
 `CarouselModel_` に生えている `models()` にModelのリストを渡してやるだけで簡単に `RecyclerView` のネストを作ることができます。ページャーぽく見えていたのは実はRecyclerViewでした。
ちなみに `CarouselModel_` はライブラリの中に含まれているため、自分でModelを作成する必要はありません。
`Carousel` に関する詳しい情報は、[wiki](https://github.com/airbnb/epoxy/wiki/Carousel)をご覧ください。

## RecyclerViewのセットアップ
あとはRecyclerViewに作成したControllerを設定してあげるだけです。

```MainActivity.kt
package com.isseiaoki.epoxy

import android.databinding.DataBindingUtil
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.GridLayoutManager
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.widget.Toast
import com.isseiaoki.epoxy.databinding.ActivityMainBinding
import com.isseiaoki.epoxy.entity.SimpleItem
import com.isseiaoki.epoxy.ext.getUrlFromDrawableResId
import com.isseiaoki.epoxy.recyclerview.OnLoadMoreListener
import com.isseiaoki.epoxy.recyclerview.controller.SimpleController
import io.reactivex.Single
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.disposables.CompositeDisposable
import io.reactivex.functions.BiFunction
import io.reactivex.schedulers.Schedulers
import timber.log.Timber

class MainActivity : AppCompatActivity() {

  private lateinit var binding: ActivityMainBinding
  private var controller: SimpleController? = null
  private var sharedViewPool = RecyclerView.RecycledViewPool()
  private val disposable = CompositeDisposable()
  private var offset = 0

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
    setupRecyclerView()
    loadData()
  }

  private fun setupRecyclerView() {
    val nonnullController = SimpleController(
        context = applicationContext,
        onBannerClicked = {
          Toast.makeText(this, "banner ${it.id} tapped", Toast.LENGTH_SHORT).show()
        },
        onItemClicked = {
          Toast.makeText(this, "item ${it.id} tapped", Toast.LENGTH_SHORT).show()
        }
    )
    controller = nonnullController
    binding.recyclerView.apply {
      clipChildren = false
      setController(nonnullController)
      setHasFixedSize(true)
      recycledViewPool = sharedViewPool
      val lm = GridLayoutManager(context, 2).apply {
        spanSizeLookup = nonnullController.spanSizeLookup
        recycleChildrenOnDetach = true
      }
      layoutManager = lm
      clipToPadding = false
      setItemSpacingDp(6)
      addOnScrollListener(object : OnLoadMoreListener(lm) {
        override fun onLoadMore() {
          loadMore()
        }
      })
    }
    binding.refreshLayout.apply {
      setOnRefreshListener {
        offset = 0
        loadData()
      }
    }
    controller?.showEmpty()
  }
```
いつもの `setAdapter()` としている所を `setController()` に変更するだけです。
データの更新を行いたい時は、Controllerに用意したメソッド達を呼んであげましょう。

## まとめ
RecyclerViewをそのまま使おうとすると、自分で実装しなければいけないことが数多くあり、割とハードです。
Epoxyを導入することでボイラープレートコードを減らして幸せになりましょう！

ここは間違ってるよとか、これはこっちの方が良いよとかありましたら教えてください！

## 注意点
サンプルを作っている時に気づいたのですが、 `Carousel` のアイテムに `onMeasure`でViewのサイズを変更しているカスタムビューを使用すると（今回のサンプルではViewのアスペクト比が一定になるImageViewを使ってます）、 `setNumViewsToShowOnScreen()` がうまく動かなくてハマったのでCarouselの使用は少し注意が必要だと感じました。

## 参考資料
https://github.com/airbnb/epoxy/wiki

