---
title: 神奇的String对象
date: 2018-11-20
categories:
- JavaScript
tags:
-
---

### 一、既可以作为基本类型，也可以作为引用类型  
#### 两种不同的构造方法返回不同的类型  

![](string-1.png)  
```javascript
const str = 'Caden';
console.log(typeof str);     // string
const strObj1 = new String(str);
console.log(typeof strObj1); // object
const strObj2 = String(str);
console.log(typeof strObj2); // string
```  
#### str、strObj1、strObj2的存储位置,栈 or 堆？  
```javascript
const a = "Bob";
const b = "Bob";
const c = new String("Bob");
const d = new String("Bob");
console.log(a === b); // true
console.log(b === c); // false
console.log(c === d); // false
```  
所以结论是？    
直接定义的string a & b 是存储在栈中的,所以`a === b` 为`true`。而 new String() 是直接
创建两个对象，c & d为两个不同的地址，但都指向堆内存的中同一个对象，
所以`c === d` 为`false`，`b === c`自然也是`false`了。  
#### 创建时机    
`String a = "a"`在编译阶段就会在内存中创建  
`String a = new String("a");`是在运行时才会在堆中创建对象  
> 未曾深入研究,从网路上了解到的。在此先做一个记录  

### 二、String的原型对象prototype,基本类型和引用类型都可以引用  
```javascript
String.prototype.getCustomVal = function () {
    return "I am " + this.toString();
};
console.log(str.getCustomVal());     // I am Caden
console.log(strObj1.getCustomVal()); // I am Caden
console.log(strObj2.getCustomVal()); // I am Caden
```  
> note:也就是说对于String不管是基本类型还是引用类型都有原型对象,这个比较特殊  

```javascript
const strPrototype = Object.getPrototypeOf(str);
const strObj1Prototype = Object.getPrototypeOf(strObj1);
const strObj2Prototype = Object.getPrototypeOf(strObj1);
console.log(strPrototype === strObj1Prototype);     // true
console.log(strPrototype === strObj2Prototype);     // true
console.log(strObj1Prototype === strObj2Prototype); // true
```  
**他们的原型对象也是同一个引用**
> why? Amazing !!!

### 三、String对象的value值  
1. 获取value值必须通过toString()方法。  
2. String 的值是不可变的。String 类定义的方法也不能改变字符串的内容，每一个方法都会
返回一个新的字符串。  
    eg:  
    ```javascript
    let string = new String("Caden");
    console.log(string.toString(), typeof string); // Caden object
    string = string.toUpperCase();
    console.log(string.toString(), typeof string); // CADEN string
    string = string + " Welcome";
    console.log(string.toString(), typeof string); // Caden Welcome string
    ```  
    看出来只要对原对象做出操作,引用类型（object）就会变成基础类型（string），但是依然可以调用String对象的原型方法，见上。

### 四、String对象方法  
| 方法 | 描述 |
| ---- | ---- |
| charAt() | 返回在指定位置的字符 |
| split() | 把字符串分割为字符串数组|
|...|...|  
更多方法见下:  
[传送门,走你](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)
