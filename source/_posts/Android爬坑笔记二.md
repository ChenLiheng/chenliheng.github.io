---
title: Android爬坑笔记二
date: 2017-3-8
categories:
- Android
tags:
- android
- 知识点汇总
---
边边角角的东西还是挺多的，自己开发的时候遇到的问题，整理一下，做个笔记
<!-- more --> 
### 1、单个子控件占父控件的一般并居中显示  
效果图：  
![](http://7xwejc.com1.z0.glb.clouddn.com/%E7%88%AC%E5%9D%91%E7%AC%94%E8%AE%B0%E4%BA%8C1.1.png)
实现方式有两种，一种是通过计算父布局的宽高来动态计算；一种是直接设置xml属性便可以实现；既然布局就可以实现，那就直接用布局啊  
```xml 
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center_horizontal"
    android:orientation="horizontal"
    android:layout_marginTop="50dp"
    android:background="@android:color/darker_gray"
    android:weightSum="2">

    <Button
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_weight="1"
        android:background="#fff"
        android:text="这是一个子控件" />

</LinearLayout>
```
我们需要给父布局设置一个<code>android:weightSum="2"</code>,然后自布局设置对应的<code>android:layout_weight="1"</code>便可以了。  
### 2、Android Webview: “Uncaught TypeError: Cannot read property 'getItem' of null”  
在使用WebView的时候报了一个错误，以前没有遇到过，后来查资料发现需要添加一个设置项：  
```java
WebSettings settings = webView.getSettings();  
settings.setDomStorageEnabled(true);
```
### 3、获取当前手机cpu支持的ABI指令集  
最近做sdk热更的时候需要在插件中自己加载第三方的so库文件，所以就引出了这个问题。我们要使用<code>System.load("绝对路径");</code>的方式加载，就需要知道当前手机cpu支持的指令集。  
```java
public String[] getAbis() {
	String[] abis;
	if(Build.VERSION.SDK_INT>=Build.VERSION_CODES.LOLLIPOP) {
	    abis = Build.SUPPORTED_ABIS;
	} else {
	    abis = new String[]{Build.CPU_ABI,Build.CPU_ABI2};
	}
	StringBuilder abiStr = new StringBuilder();
	for(String abi:abis) {
	    abiStr.append(abi);
	    abiStr.append(',');
	}
	Log.i("debug","支持的Abi："+abiStr.toString());
	return abis;
}
```
### 4、如果要在xml中写点击事件，<code>android:onClick="click"</code>实现的方法一定要用public修饰 