---
title: GridView实现单选效果
date: 2016-7-1
---

前两天在做项目的时候遇到这么一个问题，就是动态的添加两列若干按钮（View、Button、TextView...），并且实现单选。当时第一就想到了RadioGroup，但在实现的时候发现RadioGroup不能分行分列显示，然后就钻进了死胡同，到网上找一些关于这个问题的解决办法，有重写RadioGroup的，有用FlowRadioGroup（GitHub上开源项目）的。但都比较麻烦（对于我这种小白来说还是很复杂的说），而且也不好实现需求上要的那种效果。后来也问了好多同事，朋友，还是没有一个简单高效的解决办法。后来的后来，忽然看到用一个Vector和GridView的组合，那么OK，我们就是用这个实现  
<!-- more -->

1、布局文件  
2、动态添加控件  
3、实现单选控制

好了，先来张效果预览图
![这里写图片描述](http://img.blog.csdn.net/20150817144116621)

####** 1、首先实现自想要的布局，样式**
主要就是一个GridView ，然后Item是一个TextView，这个不用多说了，布局对你们来说应该是soeasy
####** 2、数据从网络获取，或者是动态加载**
将数据（对象）添加到一个List集合中，根据你的需求可以灵活控制显示的内容
####** 3、实现单选控制**
好了，这是重头戏了，原理就是定义一个Vector作为这些按钮的状态容器

```java
private Vector<Boolean> vector = new Vector<Boolean>();
```
然后我们会有一个lastPosition去记录上一次选中的id，贴上Adapter的源码

```java
public class MyAdapter extends ListAdapter {

	private Activity activity;
	private List<DemoModel> demodels;
	private LayoutInflater inflater;
	private int pos;
	private int lastPosition = -1;   //lastPosition 记录上一次选中的图片位置，-1表示未选中                             
	private Vector<Boolean> vector = new Vector<Boolean>();// 定义一个向量作为选中与否容器           
	public MyAdapter(Activity activity , List<DemoModel> demodels){
		super(activity);
		this.activity = activity;
		this.demodels = demodels;
		inflater = LayoutInflater.from(activity);

		for (int i = 0; i < demodels.size(); i++) {
			vector.add(false);
		}
	}

	@Override
	public int getCount() {
		// TODO Auto-generated method stub
		return demodels.size();
	}

	@Override
	protected ViewHolder createViewHolder(View root) {
		// TODO Auto-generated method stub
		demodelHolder hold = new demodelHolder();
		hold.tv_demodel = (TextView) root.findViewById(R.id.tv_demodel);
		return hold;
	}

	@Override
	protected void fillView(View root, Object item, ViewHolder holder,
			int position) {
		// TODO Auto-generated method stub
		final demodelHolder hold = (demodelHolder)holder;
		hold.demodel = demodels.get(position);
		if(!"".equals(demodels.get(position).getContent())){
			hold.tv_demodel.setText(demodels.get(position).getContent());
		}
		if(vector.elementAt(position) == true){
			hold.tv_demodel.setBackgroundDrawable(activity.getResources().getDrawable(R.drawable.bg_selected));
		}else{
			hold.tv_demodel.setBackgroundDrawable(activity.getResources().getDrawable(R.drawable.bg_default));
		}
	}

	@Override
	protected int getItemViewId() {
		// TODO Auto-generated method stub
		return R.layout.item;
	}

	private class demodelHolder extends ViewHolder{
		private TextView tv_demodel;
		private DemoModel demodel;
	}
	/**
	 * 修改选中时的状态
	 * @param position
	 */
	public void changeState(int position){    
		if(lastPosition != -1)    
			vector.setElementAt(false, lastPosition);                   //取消上一次的选中状态    
		vector.setElementAt(!vector.elementAt(position), position);     //直接取反即可    
		lastPosition = position;                                        //记录本次选中的位置    
		notifyDataSetChanged();                                         //通知适配器进行更新    
	}    
}
```
adapter写完了，我们只需要在Activity中的OnItemClick点击事件中条用changeState（）方法即可。


----------
写这个demo的时候遇到了一个问题，纠结了好长时间没有解决，后来我又重新写了一遍，又没有那个问题了，我不知道刚开始的时候哪里写错了，我把log贴出来，希望有高人可以指点迷津
![这里写图片描述](http://img.blog.csdn.net/20150817140742905)
百度。谷歌都说是布局嵌套太多，但我的布局只有两层，而且第二次重新写也用的是第一次的布局，why？求解...


----------

### 源码下载地址：http://download.csdn.net/detail/insertcsdn/8990283
----------


转载请注明出处。

