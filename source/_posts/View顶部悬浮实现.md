---
title: View顶部悬浮和顶部title栏滑动变色
date: 2016-8-1
categories:
- Android
tags:
- android
- 特效
- 动画
---
#### 写在前面
经常看到一些App在滑动的时候会有各种动画，逼格满满，而且用户体验也是提升不少，作为一个Android开发者让人看着着实眼馋啊。在做项目的时候也尝试着去实现，那么今天就来和大家一起解锁这个新姿势。 
现在有很多带这种效果的App，比如知乎，QZone，WPS等。当然我不可能写的和他们的一模一样，代码也是有一点乱，但是怎么说，不要在意这些细节，先记录一下，以后慢慢优化^_^
<!-- more -->
#### 效果图
先来一波效果图
<table><tr><td><img src=http://7xwejc.com1.z0.glb.clouddn.com/topfloat_listview.gif border=0></td><td><img src=http://7xwejc.com1.z0.glb.clouddn.com/topfloat_scrollview.gif border=0></td></tr></table> 
#### 功能实现 
demo中一共写了两种实现方式。ListView和ScrollView，他们有一个共同的特性，就是都能滚动，都有滚动监听事件(这不是废话码，mdzz)。 
View的**悬浮**是通过addView和removeView实现的，在布局的头部和中间分别放一个相同大小的parentlayout，然后通过滚动监听判断floatView被添加在哪一个parentlayout中。 
<code>mLayoutTopFloat.removeView(mFloatView); 
mLayoutBottomFloat.addView(mFloatView);</code>
Title 的**变色**也是通过监听滚动事件，然后改变其透明度或者色值实现.
```float f = (float) (getScrollY(view) + headLayoutHeight) / (float) floatLayoutTopHeight; 
        if ((int) (f * 255) > 50) {
            mLayoutTitle.setVisibility(View.VISIBLE);
        } else {
            mLayoutTitle.setVisibility(View.GONE);
        }
        int alpha = (int) (f * 255);
        if (alpha <= 255)
            mLayoutTitle.getBackground().setAlpha((int) (f * 255));
        else
            mLayoutTitle.getBackground().setAlpha(255); ```
注：getScrollY(View v),这个方法是用来计算ListView滚动的高度，因为ListView的滚动不提供此参数，所以需要我们自己计算，其原理是假设每个item的高度是一定的，那么只要知道当前在第几个item，就可以计算出总的高度，因为第一个可见item的一部分可能已经移出了边界，所以再通过mListView.getChildAt(0)获得第一个子view，使用getTop()方法计算出这个偏差。综合起来就可以计算出当前ListView的滚动高度。所以说只是适用于listView 的每个子项高度一定的情况,子项高度不一样的还有待研究。 
	/**
     * 获取ListView滚动的高度
     * @param listView
     * @return
     */
    public int getScrollY(AbsListView listView) {
        View c = listView.getChildAt(1);
        if (c == null) {
            return 0;
        }
        int firstVisiblePosition = listView.getFirstVisiblePosition();
        int top = c.getTop();
        return -top + firstVisiblePosition * c.getHeight();
    }
##### 1、ListView实现 
	mLv.setOnScrollListener(new AbsListView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(AbsListView view, int scrollState) {

            }

            @Override
            public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {

                float f = (float) (getScrollY(view) + headLayoutHeight) / (float) floatLayoutTopHeight;
                if ((int) (f * 255) > 50) {
                    mLayoutTitle.setVisibility(View.VISIBLE);
                } else {
                    mLayoutTitle.setVisibility(View.GONE);
                }
                int alpha = (int) (f * 255);
                if (alpha <= 255)
                    mLayoutTitle.getBackground().setAlpha((int) (f * 255));
                else
                    mLayoutTitle.getBackground().setAlpha(255);
                if (getScrollY(view) != 0) {
                    mHeadlayout.scrollTo(0, getScrollY(view) + DeviceUtil.dip2px(ListviewTopFloat.this, HEAD_HEIGHT));
                    if ((getScrollY(view) + headLayoutHeight) >= floatLayoutTopHeight) {
                        if (mFloatView.getParent() != mLayoutTopFloat) {
                            mLayoutBottomFloat.removeView(mFloatView);
                            mLayoutTopFloat.addView(mFloatView);
                            mLayoutTitle.setVisibility(View.VISIBLE);
                            mLayoutTitle.getBackground().setAlpha(255);
                        }

                    } else {
                        if (mFloatView.getParent() != mLayoutBottomFloat) {
                            mLayoutTopFloat.removeView(mFloatView);
                            mLayoutBottomFloat.addView(mFloatView);
                            //mLayoutTitle.setVisibility(View.GONE);
                        }
                    }
                }
            }
        });

##### 2、ScrollView实现 
	ViewTreeObserver observer = mImgHead.getViewTreeObserver();
        observer.addOnGlobalLayoutListener(new ViewTreeObserver.OnGlobalLayoutListener() {
            public void onGlobalLayout() {
                headLayoutHeight = mLayoutHead.getBottom();
                floatLayoutTopHeight = mLayoutHead.getBottom() - mFloatView.getHeight() - mLayoutTitle.getHeight();
            }
        });
        mLv.setScrollViewListener(new ObservableScrollViewListener() {
            @Override
            public void onScrollChanged(ObservableScrollView scrollView, int x, int y, int oldx, int oldy) {
                float f = (float) y / HEAD_HEIGHT;
                if ((int) (f * 255) > 50) {
                    mLayoutTitle.setVisibility(View.VISIBLE);
                } else {
                    mLayoutTitle.setVisibility(View.GONE);
                }
                int alpha = (int) (f * 255);
                if (alpha <= 255)
                    mLayoutTitle.getBackground().setAlpha((int) (f * 255));
                else
                    mLayoutTitle.getBackground().setAlpha(255);

                if (y != 0) {
                    if (y  >= DeviceUtil.dip2px(ScrollviewTopFloat.this, HEAD_HEIGHT)){
                        if (mFloatView.getParent() != mLayoutTopFloat) {
                            mLayoutBottomFloat.removeView(mFloatView);
                            mLayoutTopFloat.addView(mFloatView);
                            mLayoutTitle.setVisibility(View.VISIBLE);
                            mLayoutTitle.getBackground().setAlpha(255);
                        }

                    } else {
                        if (mFloatView.getParent() != mLayoutBottomFloat) {
                            mLayoutTopFloat.removeView(mFloatView);
                            mLayoutBottomFloat.addView(mFloatView);
                        }
                    }
                }
            }

        });  
其实在书写布局的时候也是有一定的讲究的，在这里就不贴布局的代码了，完了将demo源码上传，自行下载查看。。。 
gayHub传送门：[ViewTopFloat](https://github.com/ChenLiheng/ViewTopFloat "ViewTopFloat") 
****  
demo毕竟是demo，写的不是很好，欢迎大家建议指正。

