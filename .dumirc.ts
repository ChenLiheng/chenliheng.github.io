/*
 * @Author: 陈立恒  chenliheng@youlai.cn
 * @Date: 2023-01-17 15:31:55
 * @LastEditors: 陈立恒  chenliheng@youlai.cn
 * @LastEditTime: 2023-01-18 17:10:18
 * @Description: 
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: '',
    nav: [{
      title: '代码片段',
      link: '/code'
    }, {
      title: '文章',
      link: './article'
    }, {
      title: '工具',
      link: '/tool'
    }],
    logo: '/logo.png'
  }
});
