---
title: Fragment 小记
date: 2016-7-12
categories:
- Android
tags:
- android
- fragment
---
 
关于**Fragment**的切换问题也是遇到好多次了，今天有时间做一个简单的记录。常见的我们会在底部Tab的切换时用到，当然，这篇文章也只是简单的说明如何去实现，就先不深究其所以然了，因为网上已经有很多关于**Fragment** **add** 和 **replace**区别的文章了，自己没有独到的见解写再多也是显的苍白无力.
<!-- more -->
### Fragment切换的两种方式

#### 1. replace
 <p>FragmentManager fragmentManager = getSupportFragmentManager();  
 fragmentManager.beginTransaction().replace(layoutId,fragment).commit;
 </p>**replace**每次都会把之前的fragment remove掉在**替换**成新的，所以每次切换，fragment都是重新加载，如果有网络请求的话，每次切换就需要发送一次请求，这显然不妥，这样既耗费流量用户体验也不好。
#### 2. add ( show、hide )
 <p>FragmentManager fragmentManager = getSupportFragmentManager();  
 fragmentManager.beginTransaction().add(layoutId,fragment).commit;
 </p>**add**这种方式是将 fragment **添加**到容器中，add之后是一层一层叠加的，故而这种方式也是比较浪费资源的。再次切换的时候，我们便可以用show和hide控制它的显示和隐藏了。  
 
### 实例代码  

```
/**
  * @param currentFragment 当前显示的Fragment  
  * @param toFragment 将要跳转的Fragment
  */
 public void switchContent(Fragment currentFragment, Fragment toFragment) {
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        // 先判断是否被add过
        if (!to.isAdded()) {
            // 隐藏当前的fragment，add下一个到Activity中 
            transaction.hide(from).add(R.id.parent_layout, to).commit(); 
        } else {
            transaction.hide(from).show(to).commit(); // 隐藏当前的fragment，显示下一个
        }
    }
```
这个就是主要用到的方法了，一般我们会在MainActivity或者要显示这些Fragment的宿主类中先初始化add一个默认显示的fragment，将currentFragment设置默认值，然后在点击底部Tab按钮的时候便去调用上面的方法。切换你要显示的fragment并重新赋值currentFragment 。Perfact^_^...  
### Fragment中的坑    
#### 1、Exception：java.lang.IllegalStateException: commit already called  
FragmentTransaction只能回调一次，也就是说只能commit一次。每次都需要重新创建新的FragmentTransaction对象才可以，不要创建一个全局的FragmentTransaction 各处调用。  
#### 2、Exception:Can not perform this action after onSaveInstanceState  
复现条件：  
      使用FragmentTransition的 commit方法添加一个Fragment的时候出现  
解决方案：  
      onSaveInstanceState方法是在该Activity即将被销毁前调用，来保存Activity数据的，如果在保存玩状态后再给它添加Fragment就会出错。解决办法就是把commit（）方法替换成 commitAllowingStateLoss()
