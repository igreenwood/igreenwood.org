---
title: 'Introducing Loupe: 10 minutes to implement Twitter-like image viewer'
date: '20200305'
tags: 'Android Kotlin'
---
3 months ago, my boss requested me to implement a Twitter-like image viewer in our app. It supports pinch-to-zoom and swipe-to-dismiss gesture.
Let’s see how the twitter’s image viewer works.

## Twitter’s image viewer

![Twitter's image viewer(Android)](https://cdn-images-1.medium.com/max/800/1*zOf7LARpXPavlWO-2nCm0A.gif)

**Android’s specification**

* supports scrolling when zoomed in
* supports over scaling
* supports swipe-to-dismiss gesture with shared elements transition when zoomed out
* supports horizontal paging

![Twitter's image viewer(iOS)](https://cdn-images-1.medium.com/max/800/1*q8mVT_jgvKp5MFfV-2uo_A.gif)

**iOS’s specification**

* supports scrolling & flinging when zoomed in
* supports over scrolling & scaling
* supports swipe-to-dismiss gesture with vertical translate animation when zoomed out
* supports horizontal paging

Super cool…How can I implement this? 🤔

## Any libraries?

There are many libraries for image zooming.

* [https://github.com/chrisbanes/PhotoView](https://github.com/chrisbanes/PhotoView)
*[https://github.com/sephiroth74/ImageViewZoom](https://github.com/sephiroth74/ImageViewZoom)
*  [https://github.com/MikeOrtiz/TouchImageView](https://github.com/MikeOrtiz/TouchImageView)

Although these great libraries provide pinch-to-zoom gesture, does not provide swipe-to-dismiss gesture(for now) 😫

## How about using Behavior with existing libraries?

First, I have tried to use **CoordinatorLayout.Behavior(**[https://developer.android.com/reference/android/support/design/widget/CoordinatorLayout.Behavior](https://developer.android.com/reference/android/support/design/widget/CoordinatorLayout.Behavior)**)** with existing libraries.

I wrote the below code.

[VerticalSwipeDismissBehavior.kt](https://gist.github.com/igreenwood/401b3789554c324d013fc66da96bdd2d#file-verticalswipedismissbehavior-kt)

It seems to work with normal ImageView.

![work with normal ImageView](https://cdn-images-1.medium.com/max/800/1*Z0ugyH7HYjCsKC0T4NKItQ.gif)

But, in the case of PhotoView, behavior does not work 😿

![does not work with PhotoView](https://cdn-images-1.medium.com/max/800/1*2wJFGb4thHGDjn6FO4mGfg.gif)

Looks like Behavior’s touch event handling is conflicting with PhotoView’s 🤔

[https://github.com/chrisbanes/PhotoView/blob/master/photoview/src/main/java/com/github/chrisbanes/photoview/PhotoViewAttacher.java#L127](https://github.com/chrisbanes/PhotoView/blob/master/photoview/src/main/java/com/github/chrisbanes/photoview/PhotoViewAttacher.java#L100)

This method block was suspicious, but I didn’t realize how to fix this issue .
And I tried the other libraries, but the results were similar 😵
I thought I need to handle the whole TouchEvent of the ImageView by myself.

After two months of work in my private time…finally, I released a new library!

## Loupe

[**igreenwood/loupe**  
Loupe is an ImageView Helper for Android that supports zooming and swipe-to-dismiss action. Loupe provides modern image…_github.com](https://github.com/igreenwood/loupe "https://github.com/igreenwood/loupe")[](https://github.com/igreenwood/loupe)

* supports scrolling & flinging when zoomed in
* supports over scrolling & scaling
* supports two type swipe-to-dismiss gesture(shared elements transition & vertical translate animation)
* supports horizontal paging
* written in Kotlin
* just a helper class of ImageView. So you can attach it to any ImageView you want. And working perfect with any image loader libraries.

![loupe-1](https://cdn-images-1.medium.com/max/400/1*g-K7kTdHKHIAsNs-mJR_KQ.gif)
![loupe-2](https://cdn-images-1.medium.com/max/400/1*JnAXN1y0W3OEywZ0Qwm-2A.gif)
![loupe-3](https://cdn-images-1.medium.com/max/400/1*0kbyEUEKXgeIeITW-rt7pA.gif)

### How to use?

Create `Loupe` instance with your ImageView and implement the `onViewTranslateListener`. Code sample in Activity is something like this. (Loupe also works in Fragments)

```kotlin
val loupe = Loupe(imageView, container).apply { // imageView is your full screen ImageView and container is the direct parent of the ImageView

  onViewTranslateListener = object : Loupe.OnViewTranslateListener {

    override fun onStart(view: ImageView) {  
        
    }

    override fun onViewTranslate(view: ImageView, amount: Float) {  
        
    }

    override fun onRestore(view: ImageView) {  
        
    }

    override fun onDismiss(view: ImageView) {  
      finish()  
    }  
  }  
}
```

That’s all. See? It’s easy 😆

For more details, check the repository out 👀

[https://github.com/igreenwood/loupe](https://github.com/igreenwood/loupe)