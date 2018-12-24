---
title: Drawable Xml笔记
date: 2016-7-19
categories: 
- Android
tags: 
- drawable 
- xml 
---
最近没什么事，把自己经常用的一些drawable整理一下，人的脑子，指不定哪天就忘了，为了避免以后忘了在翻百度，自己在这做个笔记，下次好查阅，嘎嘎  
<!-- more -->
#### 常见标签
##### 1、stroke 描边  
##### 2、corners 圆角  
##### 3、padding 内间距  
##### 4、solid 填充色
#### 实例  
##### 1、普通边框  
<img src="http://7xwejc.com1.z0.glb.clouddn.com/drawable_normal_border.png" width=100%></img>
``` 
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <stroke
        android:width="1dp"
        android:color="#ff36abe6"
        android:dashWidth="2dp" />
    <padding
        android:bottom="5dp"
        android:left="5dp"
        android:right="5dp"
        android:top="5dp"></padding>
</shape>
```
##### 2、圆角边框  
<img src="http://7xwejc.com1.z0.glb.clouddn.com/drawable_corner_border.png" width=100%></img>
```
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <stroke
        android:width="1dp"
        android:color="#ff36abe6"
        android:dashWidth="3dp" />
    <padding
        android:bottom="5dp"
        android:left="5dp"
        android:right="5dp"
        android:top="5dp"></padding>
    <corners android:radius="5dp" />
</shape>
```
##### 3、部分边框
<img src="http://7xwejc.com1.z0.glb.clouddn.com/drawable_half_border.png" width=100%></img>
```
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- 连框颜色值 -->
    <item>
        <shape>
            <solid android:color="#ff36abe6" />
            <corners
                android:topLeftRadius="5dp"
                android:topRightRadius="5dp"
                android:bottomLeftRadius="0dp"
                android:bottomRightRadius="0dp"/>
        </shape>
    </item>
    <!-- 主体背景颜色值 -->
    <item
        android:left="1dp"
        android:right="1dp"
        android:top="1dp">
        <!--边框里面背景颜色 白色-->
        <shape>
            <solid android:color="#ffffffff" />
            <corners
                android:topLeftRadius="5dp"
                android:topRightRadius="5dp"
                android:bottomLeftRadius="0dp"
                android:bottomRightRadius="0dp"/>
        </shape>
    </item>
</layer-list>
```
##### 4、圆角实体 
<img src="http://7xwejc.com1.z0.glb.clouddn.com/drawable_corner_solid.png" width=100%></img> 
```<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <stroke
        android:width="1dp"
        android:color="#ff36abe6"
        android:dashWidth="3dp" />
    <padding
        android:bottom="5dp"
        android:left="5dp"
        android:right="5dp"
        android:top="5dp"></padding>
    <corners android:radius="5dp" />
    <solid android:color="#ff36abe6" />
</shape>```
##### 5、圆形实体
<img src="http://7xwejc.com1.z0.glb.clouddn.com/drawable_circle.png" width=100%></img>
```<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android">
    <stroke
        android:width="1dp"
        android:color="#ff36abe6"
        android:dashWidth="3dp" />
    <padding
        android:bottom="5dp"
        android:left="5dp"
        android:right="5dp"
        android:top="5dp"></padding>
    <corners android:radius="180dp" />
    <solid android:color="#ff36abe6" />
</shape>```
##### 6、svg pathdata
<img src="http://7xwejc.com1.z0.glb.clouddn.com/svg1.png" height="150" width=50%></img><img src="http://7xwejc.com1.z0.glb.clouddn.com/svg2.png" height="150" width=50%></img>
```<vector xmlns:android="http://schemas.android.com/apk/res/android"
        android:width="24dp"
        android:height="24dp"
        android:viewportWidth="24.0"
        android:viewportHeight="24.0">
    <path
        android:fillColor="#FF515151"
        android:pathData="M12,4.5C7,4.5 2.73,7.61 1,12c1.73,4.39 6,7.5 11,7.5s9.27,-3.11 11,-7.5c-1.73,-4.39 -6,-7.5 -11,-7.5zM12,17c-2.76,0 -5,-2.24 -5,-5s2.24,-5 5,-5 5,2.24 5,5 -2.24,5 -5,5zm0,-8c-1.66,0 -3,1.34 -3,3s1.34,3 3,3 3,-1.34 3,-3 -1.34,-3 -3,-3z"/>
</vector>```
```<vector xmlns:android="http://schemas.android.com/apk/res/android"
        android:width="24dp"
        android:height="24dp"
        android:viewportWidth="24.0"
        android:viewportHeight="24.0">
    <path
        android:fillColor="#FF515151"
        android:pathData="M12,7c2.76,0 5,2.24 5,5 0,0.65 -0.13,1.26 -0.36,1.83l2.92,2.92c1.51,-1.26 2.7,-2.89 3.43,-4.75 -1.73,-4.39 -6,-7.5 -11,-7.5 -1.4,0 -2.74,0.25 -3.98,0.7l2.16,2.16C10.74,7.13 11.35,7 12,7zM2,4.27l2.28,2.28 0.46,0.46C3.08,8.3 1.78,10.02 1,12c1.73,4.39 6,7.5 11,7.5 1.55,0 3.03,-0.3 4.38,-0.84l0.42,0.42L19.73,22 21,20.73 3.27,3 2,4.27zM7.53,9.8l1.55,1.55c-0.05,0.21 -0.08,0.43 -0.08,0.65 0,1.66 1.34,3 3,3 0.22,0 0.44,-0.03 0.65,-0.08l1.55,1.55c-0.67,0.33 -1.41,0.53 -2.2,0.53 -2.76,0 -5,-2.24 -5,-5 0,-0.79 0.2,-1.53 0.53,-2.2zm4.31,-0.78l3.15,3.15 0.02,-0.16c0,-1.66 -1.34,-3 -3,-3l-0.17,0.01z"/>
</vector>```
 