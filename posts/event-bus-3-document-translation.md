---
title: 'EventBus 3のドキュメントを読んでみた'
date: '20160224'
tags: 'Android'
---
EventBusのバージョンが3になりました。

公式のドキュメントを読んでみたので、自分が分かった範囲で翻訳してまとめました。

## インストール方法

```
 compile 'org.greenrobot:eventbus:3.0.0'
```

## イベントの定義
従来通りイベント用のクラスを定義します。

```
public class MessageEvent {
    public final String message;

    public MessageEvent(String message) {
        this.message = message;
    }
}
```

## Subscriber(イベントハンドラ)の準備
`@Subscribe`アノテーションを利用するようになりました。
これによって従来の`onEvent()`、`onEventMainThread()`ではなく自分の好きなメソッド名を定義することができるようになりました。すばらしい。

```
// This method will be called when a MessageEvent is posted
@Subscribe
public void onMessageEvent(MessageEvent event){
    Toast.makeText(getActivity(), event.message, Toast.LENGTH_SHORT).show();
}

// This method will be called when a SomeOtherEvent is posted
@Subscribe
public void handleSomethingElse(SomeOtherEvent event){
    doSomethingWith(event);
}
```

```
@Override
public void onStart() {
    super.onStart();
    EventBus.getDefault().register(this);
}

@Override
public void onStop() {
   EventBus.getDefault().unregister(this);
    super.onStop();
```

## イベントのpost
ここも従来通りで大丈夫です。

```
EventBus.getDefault().post(new MessageEvent("Hello everyone!"));
```

## ThreadModeについて
EventBus 2.4.xではイベントを受け取るスレッドをメソッド名で振り分けていましたが、EventBus 3からはアノテーションに`threadMode`を指定することで、実行するスレッドを切り替えることができます。

```
@Subscribe(threadMode = ThreadMode.POSTING) // ThreadMode is optional here
public void onMessage(MessageEvent event) {
    log(event.message);
}
```

ThreadModeの種類についてですが、POSTING、MAIN、BACKGROUND、ASYNCの4種類があります。以下に詳しい説明を記載します。

### ThreadMode: POSTING
SubscriberはデフォルトではこのThreadMoadを使用します。イベントをpostしたスレッドと同じスレッドで呼ばれます。イベントの配送は同期的に行われ、全てのSubscriberはpostが終了した時点で呼ばれます。このThreadModeはスレッドの切り替えをしないため、オーバーヘッドが最小です。そのためこのモードは、UIスレッドを必要とせず、とても短時間で終了することがわかっている単純な処理に対して推奨されます。このThreadModeを使うイベントハンドラーは、イベントをpostしたスレッド（多くの場合メインスレッド）をブロックしないよう、迅速に処理を終えるべきです。

```
@Subscribe(threadMode = ThreadMode.POSTING) // ThreadMode is optional here
public void onMessage(MessageEvent event) {
    log(event.message);
}
```

### ThreadMode: MAIN
Subscriberがメインスレッドで呼ばれます。イベントをpostしたスレッドがメインスレッドの場合、ThreadMode: POSTINGと同じになり、同期的に処理されます。このThreadModeを使用したイベントハンドラはメインスレッドをブロックしないよう、あまり重い処理をさせてはいけません。

```
// Called in Android UI's main thread
@Subscribe(threadMode = ThreadMode.MAIN)
public void onMessage(MessageEvent event) {
    textField.setText(event.message);
}
```

### ThreadMode: BACKGROUND
Subscriberがバックグラウンドスレッドで呼ばれます。イベントをpostしたスレッドがメインスレッドでない場合、イベントハンドラのメソッドはスレッドを切り替えず、イベントをpostしたスレッドでそのまま処理を行います。イベントをpostしたスレッドがメインスレッドなら、単一のバックグランドスレッドを用いてすべてのイベントを連続的に処理します。このThreadModeを使用するイベントハンドラは、バックグランドスレッドをブロックしないように迅速に処理を終えるようにすべきです。

```
// Called in the background thread
@Subscribe(threadMode = ThreadMode.BackgroundThread)
public void onMessage(MessageEvent event){
    saveToDisk(event.message);
}
```

### ThreadMode: ASYNC
Subscriberがイベントがpostされたスレッドとは別のスレッドで呼ばれます。このThreadModeでのイベントの配送は必ず非同期で行われます。ネットワーク処理など、イベントハンドラのメソッドの実行に時間がかかる場合はこのThreadModeを使うべきです。時間のかかる処理を持つ大量のイベントハンドラを同時にトリガーするとconcurrent threadsの数の制限にひっかかるので避けてください。EventBusは効率的にスレッドの再利用を行うためにスレッドプールを利用しています。

```
// Called in a separate thread
@Subscribe(threadMode = ThreadMode.Async)
public void onMessage(MessageEvent event){
    backend.send(event.message);
}
```

基本的にはMAINとASYNCを覚えておけば事足りそうな印象です。BACKGROUNDの効果的な使い道が思い浮かばなかったので、良い使い道があれば教えてください。

## Configuration

EventBusBuilderを使うことでEventBusの詳細な設定を行うことができます。

設定の例をいくつか挙げます。

* イベントがpostされた際にSubscriberがいなくてもログにエラーメッセージを出さない

```
EventBus eventBus = EventBus.builder().logNoSubscriberMessages(false)
    .sendNoSubscriberEvent(false).build();
```

* Subscriberのメソッド内でExceptionが発生した場合にSubscriberExceptionEventをpostする。(デフォルトでtrue)

```
EventBus eventBus = EventBus.builder().throwSubscriberException(true).build();
```

* デバッグビルドの時だけSubscriberExceptionEventをpostする設定を、EventBus.getDefault()で取得できるインスタンスに適用する

```
EventBus.builder().throwSubscriberException(BuildConfig.DEBUG).installDefaultEventBus();
```

`installDefaultEventBus()`が設定できるのは１回のみで、アプリの中で最初にEventBus.getDefault()でインスタンスが取得される前に行う必要があります。繰り返し呼び出したり、EventBus.getDefault()の後で呼んでも意味がないのでApplicationクラスの`onCreate()`で呼ぶのが良いでしょう。


デバッグビルドの時のみSubscriberExceptionを発生させる設定はよく使いそうですね。

## Sticky Events
>**StickyEventと通常のEventの違い**
イベントがpostされたときにSubscriberがいない場合、通常のEventの場合は破棄されますが、StickyEventの場合は破棄されず、次にSubscriberが`register()`されたタイミングで届きます。注意しなければならないのは、StickyEventがpostされてSubscriberが`register()`されるまでに別のStickyEventがpostされた場合は、そのStickyEventで上書きされます。常に最後にpostされたStickyEventが届きます。

StickyEventの場合は`post()`の代わりに`postSticky()`を使い
`@Subscribe`アノテーションの中に`sticky = true`を設定します。

```
EventBus.getDefault().postSticky(new MessageEvent("Hello everyone!"));
```

```
@Subscribe(sticky = true, threadMode = ThreadMode.MAIN)
    public void onEvent(MessageEvent event) {
        // UI updates must run on MainThread
        textField.setText(event.message);
    }
```

StickyEventを手動で破棄する場合は以下のように書けば大丈夫なようです。

```
MessageEvent stickyEvent = EventBus.getDefault().removeStickyEvent(MessageEvent.class);
// Better check that an event was actually posted before
if(stickyEvent != null) {
    // Now do something with it
}
```

## 優先度の設定
アノテーションに`priority`を指定することで優先度を変更することができます。

EventBusを使用する中で優先度とイベントのキャンセルについて気にすることはほとんどありませんが、指定できると便利なケースがあるようです。原文ではアプリがforegroundにある場合はUIを更新したいが、backgroundにある場合は別の処理をしたいといった場合、と書かれていました。

```
@Subscribe(priority = 1);
public void onEvent(MessageEvent event) {

}
```

デフォルトの`priority`は`0`です。同じ`ThreadMode`で`priority`の値が異なる複数のSubscriberがあった場合、より`priority`の数値が大きいSubscriberから処理されます。ThreadModeの異なるSubscriber間では`priority`が処理の順番に影響することはありません。

## イベントのキャンセル

イベントをキャンセルすると後続のSubscriberはイベントを受け取らなくなります。

```
// Called in the same thread (default)
@Subscribe
public void onEvent(MessageEvent event){
// Process the event

EventBus.getDefault().cancelEventDelivery(event) ;
}
```

## Subscriber Index
EventBus 3で導入された新機能で、初回のSubscriber登録の際のスピードをあげるためのオプションの最適化を行うことができます。Subscriber Indexはビルド時にAnnotation Processorを使って作成されます。必須の機能ではないもののAndroid上で最高のパフォーマンスを求めるならおすすめ、と書かれていました。

### Indexを使用する際の前提条件
イベントクラスがpublicであること。Javaのアノテーション自体の技術的制約により、匿名クラス内の`@Subscribe`アノテーションは認識されません。
EventBusがIndexを利用できなかった場合、自動的に実行時にリフレクションを用いて実行されますが、Indexを利用できる場合よりも速度が落ちます。

### Indexを利用するには

インストール

```app/build.gradle
buildscript {
    dependencies {
        classpath 'com.neenbedankt.gradle.plugins:android-apt:1.8'
    }
}
apply plugin: 'com.neenbedankt.android-apt'
dependencies {
    compile 'org.greenrobot:eventbus:3.0.0'
    apt 'org.greenrobot:eventbus-annotation-processor:3.0.1'
}
apt {
    arguments {
        eventBusIndex "com.example.myapp.MyEventBusIndex"
    }
}
```

これでビルド時にエラーが出なければ、eventBusIndexが生成されますので、EventBusの初期化時に`addIndex()`に渡しましょう

```
EventBus.builder().addIndex(new MyEventBusIndex()).installDefaultEventBus();
```

## ProGuard
ProGuardはメソッドの名前を難読化したり、使用されていないメソッドを削除することでアプリ容量を削減する仕組みですが、EventBusのSubscriberメソッドはアプリ内で直接呼ばれるわけではないので、ProGuardはそのプロジェクトがSubscriberメソッドを使用していないと勘違いしてメソッドを削除してしまいます。

そのため、もしあなたがEventBusを使用していてProGuardの`minifyEnabled`の設定を`true`にしている場合は、ProGuardにSubscriberメソッドを保持して欲しいことを伝える必要がある。以下のスニペットを使用すれば、ProGuardがSubscriberメソッドを削除することを防ぐことができます。(この設定はIndexを使用しているかどうかに関係なく必要です。)

```
-keepattributes *Annotation*
-keepclassmembers class ** {
    @org.greenrobot.eventbus.Subscribe <methods>;
}
-keep enum org.greenrobot.eventbus.ThreadMode { *; }

# Only required if you use AsyncExecutor
-keepclassmembers class * extends org.greenrobot.eventbus.util.ThrowableFailureEvent {
    <init>(java.lang.Throwable);
}
```

## Async Executor
AsyncExecutorはEventBusのコアクラスではありませんが、バックグラウンド処理のエラーハンドリングを助けてくれます。AsyncExecutorは処理の実行に失敗した場合、発生したExceptionをイベントでラップして自動的にpostしてくれます。

使い方としては、AsyncExecutor.create()でインスタンスを作成し、それをApplicationスコープで保持します。そして次にRunnableExインターフェースをimplementしたクラスを作成し、それをAsyncExecutorに渡します。
RunnableExがRunnableと異なる点はExceptionを投げる可能性があることです。(RunnableExの実装クラスがExceptionを投げた場合、その例外は自動的にcatchされ、ThrowableFailureEventとしてラップされた状態でpostされます。)

実行例

```
AsyncExecutor.create().execute(
  new RunnableEx {
    public void run throws LoginException {
      // No need to catch any Exception (here: LoginException)
      remote.login();
      EventBus.getDefault().postSticky(new LoggedInEvent());
    }
  }
}
```

イベントを受け取る例

```
public void onEventMainThread(LoggedInEvent event) {
  // Change some UI
}

public void onEventMainThread(ThrowableFailureEvent event) {
  // Show error in UI
}
```

AsyncExecutorのインスタンスををカスタマイズしたい場合は、AsyncExecutor.builder()が利用できます。

## 雑感
2.4.xの時は公式のドキュメントをあまりちゃんと読んでいなかったのですが、良い機会だと思って読んでみました。EventBusはもともと非常に便利なライブラリですが、アノテーションを使うようになってますます便利になったのでぜひ使ってみてください。あまり英語が得意な方ではないので、間違い、補足等ありましたらコメントからご指摘いただけると嬉しいです。

## 参考リンク
http://greenrobot.org/eventbus/documentation/
http://qiita.com/kgmyshin/items/5958611fb66c5edb225c

