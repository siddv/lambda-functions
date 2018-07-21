# Hello

Welcome to Sidd's Lambda Functions. This is a collection of cloud functions that anyone can use.

```js{6-31}
module.exports = {
  title: 'Hello, World.',
  description: '📦 🎨 A api-friendly theme for VuePress.',
  theme: 'api',
  base: '/vuepress-theme-api/',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Hello, World.',
      text: 'english',
      description: '📦 🎨 A api-friendly theme for VuePress.',
    },
    '/zh/': {
      lang: 'zh-hans',
      title: 'Hello, World.',
      text: '中文',
      description: '📦 🎨 一个面向 RESTful API 设计的开箱即用主题。',
    },
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'Languages',
        label: 'English',
      },
      '/zh/': {
        selectText: '选择语言',
        label: '简体中文',
      }
    }
  }
}

```