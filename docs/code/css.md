---
title: CSS
---
## 单行文本溢出显示省略号

```css
overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

## 多行文本溢出显示省略号

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

## 隔行设置样式

```css
div:nth-of-type(even){background:rgba(0,0,0,1.2)}
```

## 垂直居中

```css
position: relative;
top: 50%;
transform: translateY(-50%);
```
