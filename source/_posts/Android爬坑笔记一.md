---
title: Android爬坑笔记一
date: 2016-7-25
categories:
- Android
tags:
- android
- 知识点汇总
---
在做Android开发的过程中总是会遇到一些“冷门”知识点带来的坑，久而久之，遇到的细细小小的知识点还是挺多的，闲来没事，自己汇总一下，方便以后忘了的时候方便查阅
<!-- more --> 
#### 1、ListView子条目上有按钮优先级问题 
可以在子布局根目录，也就是Item布局的根目录添加以下属性 
<code>android:descendantFocusability="blocksDescendants"</code>  
#### 2、ScrollView中套用ListView时直接跳转到ListView记录第一条位置 
可以在父布局元素下添加以下属性 
` android:focusable="true"
android:focusableInTouchMode="true" `
#### 3、在String.xml中添加空格时用以下方式 
`&#160；(后面的分号要带) `
#### 4、弹出软键盘修改右下角按钮 
imeOptions一共有4个属性值： 
1. actionUnspecified 未指定,对应常量EditorInfo.IME_ACTION_UNSPECIFIED. 
1. actionNone 没有动作,对应常量EditorInfo.IME_ACTION_NONE 
1. actionGo 去往,对应常量EditorInfo.IME_ACTION_GO 
1. actionSearch 搜索,对应常量EditorInfo.IME_ACTION_SEARCH
1. actionSend 发送,对应常量EditorInfo.IME_ACTION_SEND
1. actionNext 下一个,对应常量EditorInfo.IME_ACTION_NEXT
1. actionDone 完成,对应常量EditorInfo.IME_ACTION_DONE 

`android:imeOptions="actionSearch"  
android:singleLine="true"` 
然后添加点击事件
```java 
        view.setOnEditorActionListener(new OnEditorActionListener() {
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                    // 点击搜索后隐藏键盘`
                    ((InputMethodManager) title_searck.getContext()
                            .getSystemService(Context.INPUT_METHOD_SERVICE))
                            .hideSoftInputFromWindow(getCurrentFocus()
                                    .getWindowToken(), InputMethodManager.HIDE_NOT_ALWAYS);
                    return true;
                }
                return false;
            }
        });```
 
#### 5、页面背景变成黑色 
尝试修改主题为  
<code>android:theme="@android:style/Theme.Light.NoTitleBar"</code> 
#### 6、AppIcon切图尺寸 
drawable-xhdpi----96 * 96 
drawable-mdpi-----48 * 48 
drawable-ldpi-----36 * 36   
drawable-hdpi-----72 * 72  
#### 7、横竖屏切换想要不重新执行生命周期需配置 
<code>android:configChanges="orientation|keyboardHidden|screenSize"</code> 
配置后只会执行onConfigurationChanged方法。