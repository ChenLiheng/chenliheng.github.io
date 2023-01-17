import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig: {
    name: 'dumi',
    nav: [{
      title: '代码片段',
      link: '/code'
    }, {
      title: '文章',
      link: './article'
    }, {
      title: '工具',
      link: '/tool'
    }]
  }
});
