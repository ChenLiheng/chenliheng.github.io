---
title: 关于Assets的那些事
date: 2017-3-2 12:39:04
categories: 
- Android
tags: 
- assets  
---

好久没有作总结了，一个是太忙，当然最主要的原因还是自己太懒，最近有点空闲时间，来总结一下Android中的Assets。  
我们都知道res和raw文件都会被映射到R.java文件下，访问的时候可以直接通过R.id.xxx访问，但是Assets就没有那么方便了，他不会将文件映射到R.java中，但是系统提供了一个AssertManager，所以主要就用它了。

<!-- more -->
#### 获取assert目录下的文件 
首先获取AssertManager:  
```java
AssetManager am = getResources().getAssets();
```
通过list()方法获取assets下所有文件的文件名:  
```java
String[] files = am.list("");
```
通过open()方法获取InputStream:  
```java
InputStream inStream = am.open(fileName);
```
通过FileOutputStream写入到目标文件  
```java
FileOutputStream fs = new FileOutputStream("目标文件路径");
byte[] buffer = new byte[1024];
int byteread = 0;
while ( (byteread = inStream.read(buffer)) != -1) {
    fs.write(buffer, 0, byteread);
}
fs.flush();
fs.close();
inStream.close();
```
#### 获取assert子目录下的文件 
获取子目录下的所有文件名:  
```java
String[] files = am.list("xxx"+File.separator+"xxx"+...);
```
获取InputStream
```java
InputStream inStream = am.open("xxx"+File.separator+"xxx"+...+fileName);
```
#### 获取一个apk文件中的assert目录下的文件  
做sdk的时候，需要在宿主程序中调用插件apk中assets中的资源文件，但是遇到的问题是这个插件apk和宿主程序不在同一个代码空间，没办法直接获取AssetManager的。查看源码后发现有一个addAssetPath方法，是通过apkPath的方式加载，所以就可以通过反射获取到AssetManager对象
```java
private static AssetManager createAssetManager(Context context) {
    String apkPath = "absolutePath";
    try {
        AssetManager assetManager = AssetManager.class.newInstance();
        AssetManager.class.getDeclaredMethod("addAssetPath", String.class).invoke(
                assetManager, apkPath);
        return assetManager;
    } catch (Throwable th) {
        th.printStackTrace();
    }
    return null;
}
```
能获取到它的AssetManager对象，我们也就能读取它的目录下的文件了。  
#### 加载assets下的html文件
assets下的文件可以直接使用下面的方式直接加载，但是据我目前所知，只有html可以通过这种方式加载 
```java
WebView.loadUrl(“file:///android_asset/xxx.html”); 
```
#### 加载assets下的图片资源文件  
```java
InputStream inStream = am.open(fileName);
Bitmap bitmap = BitmapFactory.decodeStream(inStream); 
```
