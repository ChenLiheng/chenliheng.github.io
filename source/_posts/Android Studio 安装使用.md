---
title: Android Studio 安装与配置
date: 2016-7-12
categories:
- Android
tags:
- android studio
---

Android Studio 已经成为Android开发的主流了，目前已经更新到了2.0预览版了，我是已经越来越喜欢Studio，但是出于种种原因，它的安装与配置总会让人头疼，闲来没事，把自己安装配置的过程记录一下^_^。  
<!-- more -->  
### Android studio下载地址
官网地址：[传送门](https://dl.google.com/dl/android/studio%20%E2%80%9C%E5%AE%98%E7%BD%91%E4%B8%8B%E8%BD%BD%E5%9C%B0%E5%9D%80%E2%80%9D)  由于我们天朝的高墙，去官网下载的机会总是...，(对此行为不多做解释)不过对于开发人员来说，其实也不是什么大问题，现附上一良心网站：[http://www.androiddevtools.cn/](http://www.androiddevtools.cn/ "http://www.androiddevtools.cn/")
###  安装配置
#### 1、首先就是傻瓜式安装，next…安装完成后打开的界面，三个选项，前边是导入之前的配置,一般是字体，样式等的设置，可以把你之前studio或 IDEA中的配置导进来(当然，前提是你安装并配置过)如果是第一次安装的话，选最后一个自己重新设置。
![这里写图片描述](http://img.blog.csdn.net/20160311105643520)    

#### 2、点了ok后，会一直卡在这个界面（感谢祖国），不要紧，我们有一个诀窍，就是强制关掉它。   
 
<img src="http://img.blog.csdn.net/20160311105938634" width=300 height=200></img>           <img src="http://img.blog.csdn.net/20160311110341692" width=300 height=200></img>  

#### 3、找到你的studio的安装目录。找到idea.properties 这个文件，末尾添加，第一次打开不运行 disable.android.first.run=true
  
  <img src="http://img.blog.csdn.net/20160311110611818" width=500 height=300></img>
  ![这里写图片描述](http://img.blog.csdn.net/20160311110932726)

#### 4、第三部改完之后重启就可以直接进去了，接下来就是最开心的配置环节了，不知道设置在哪？？？？？，看图，不多说  
![这里写图片描述](http://img.blog.csdn.net/20160311111403977)  
![这里写图片描述](http://img.blog.csdn.net/20160311111522389) 
![这里写图片描述](http://img.blog.csdn.net/20160311111609541)
#### 5、当你新建一个项目后，你可能会遇到这么一个问题，android studio 引进项目时，自动查找本机是否有项目设置的SDK版本，若发现没有，我们会在project structure修改成自己的SDK。然而，修改后，AS会自动在项目下的build.gradle里添加上以下代码：
![这里写图片描述](http://img.blog.csdn.net/20160311111702494)   
解决方法是  
![这里写图片描述](http://img.blog.csdn.net/20160311111730838)
#### 6、好了，这样一个studio项目就配置好了，如果需要配置整个project 在这里配置  
![这里写图片描述](http://img.blog.csdn.net/20160311112026917)  
![这里写图片描述](http://img.blog.csdn.net/20160311112038902)
 
 附：
 整个studio配置完成以后，我们可以保存自己的设置，下次安装的时候直接导入之前的配置即可。  
 File -->> Export Setting 导出一个jar文件  
 File -->> Import Setting 导入之前导出的jar文件  
 再附上我的 [setting.jar](http://download.csdn.net/detail/insertcsdn/9458590)
