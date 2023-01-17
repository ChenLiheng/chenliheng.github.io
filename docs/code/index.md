---
title: JavaScript
---
## 手机号脱敏
```javascript
export const hideMobile = (mobile) => {
  return mobile.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
}
```
## 解析URL参数
```javascript
export const getSearchParams = () => {
  const searchPar = new URLSearchParams(window.location.search)
  const paramsObj = {}
  for (const [key, value] of searchPar.entries()) {
    paramsObj[key] = value
  }
  return paramsObj
}
```

## 生成uuid
```javascript
export const uuid = () => {
  const temp_url = URL.createObjectURL(new Blob())
  const uuid = temp_url.toString()
  URL.revokeObjectURL(temp_url) //释放这个url
  return uuid.substring(uuid.lastIndexOf('/') + 1)
}
```

## 单文件下载
```javascript
export const downFileBy = (url: string) => {
  if (!url || url.length === 0) {
    message.error('url 不存在');
    return;
  }
  const a = document.createElement('a');
  a.setAttribute('href', url);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
```
## 多文件下载
```javascript
export const downMultipleFile = (urls: string[]) => {
  if (!urls || urls.length === 0) {
    message.error('url 不存在');
    return;
  }
  for (let i = 0; i < urls.length; i++) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none'; // 防止影响页面
    iframe.style.height = 0; // 防止影响页面
    iframe.src = urls[i];
    document.body.appendChild(iframe);
    // 5分钟之后删除
    setTimeout(() => {
      iframe.remove();
    }, 5 * 60 * 1000);
  }
};
```

## 复制到剪切板
```javascript
const copyToClipboard = (text) =>
  navigator.clipboard?.writeText && navigator.clipboard.writeText(text)
```
:::warning
根据caniuse，该方法对93.08%的全球用户有效。所以必须检查用户的浏览器是否支持该API。为了支持所有用户，你可以使用一个输入并复制其内容。
:::

## 生成随机颜色
```javascript
const generateRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff) .toString(16)}`;
```

## 数组乱序
```typescript
const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)
```



