---
title: Android 4.4 以上分分钟实现状态栏伪沉浸(状态栏透明)
date: 2016-7-1
categories:
- Android
tags:
- android
- java
- 状态栏透明
---
我们都知道，ios上的状态栏是可以沉浸的，保持了标题栏一样的颜色，这样就让人感觉很高大上，整个屏幕的利用率和风格得到了充分的利用和展现。而在Android中状态栏默认是黑色的(真心不好看)，且不会随着App标题栏的颜色改变，使得整个app 的风格看起来不是那么协调.  
Android4.4以后，api里边提供了设置状态栏透明的属性，so.我们就可以做一些文章了...  
二话不说了，先上几个效果图：  
![这里写图片描述](http://img.blog.csdn.net/20151118101825955)  
<!-- more -->
![这里写图片描述](http://img.blog.csdn.net/20151118102946159)  
![这里写图片描述](http://img.blog.csdn.net/20151118103005023)    

ok！切入正题  
#### xml布局  
title.xml
``` <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:orientation="vertical"
              android:layout_width="match_parent"
              android:layout_height="wrap_content"
              android:background="#43CD80">
    <TextView
            android:id="@+id/tv_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:paddingTop="10dp"
            android:paddingBottom="10dp"
            android:text="透明状态栏测试"
            android:textSize="16sp"
            android:textColor="@android:color/white"/>
</LinearLayout>
```
在根布局中加入者两个属性，适应系统窗口，防止应用UI跑进状态栏中
```
android:clipToPadding="true"
android:fitsSystemWindows="true"
```

注意：如果要设置状态栏透明，padding属性最好不要设在根布局中。
#### java代码  
 

```
private void setImmerseStatue(View view) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            //透明导航栏                
            getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);
            int statusBarHeight = getStatusBarHeight(this.getBaseContext());  
            view.setPadding(0, statusBarHeight, 0, 0);
        }
    }  
    /**
     * 用于获取状态栏的高度。 使用Resource对象获取（推荐这种方式）
     *
     * @return 返回状态栏高度的像素值。
     */
    public static int getStatusBarHeight(Context context) {
        int result = 0;
        int resourceId = context.getResources().getIdentifier("status_bar_height", "dimen",
                "android");
        if (resourceId > 0) {
            result = context.getResources().getDimensionPixelSize(resourceId);
        }
        return result;
    }
```  
调用的时候在setContetnt( )后把你的Title的布局作为参数穿进去就ok了.好了，看效果吧。  
************************
