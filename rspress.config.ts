import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Laravel Api Document Tool',
  lang: 'zh',
  icon: '/logo2.png',
  logo: {
    light: '/logo.png',
    dark: '/logo.png',
  },
  locales: [
    {
      lang: 'en',
      label: 'English',
      title: 'Laravel Api Document Tool',
      description: 'Laravel Api Document Tool',
    },
    {
      lang: 'zh',
      label: '简体中文',
      title: 'Laravel Api接口文档工具',
      description: 'Laravel Api接口文档工具',
    },
  ],
  themeConfig: {
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/larafly/apidoc',
      }
    ],
    locales: [
      {
        lang: 'zh',
        label: '简体中文',
        editLink: {
          docRepoBaseUrl:
              'https://github.com/larafly/apidoc-document/tree/main/docs',
          text: '📝 在 GitHub 上编辑此页',
        },
        overview: {
          filterNameText: '过滤',
          filterPlaceholderText: '输入关键词',
          filterNoResultText: '未找到匹配的 API',
        },
        searchPlaceholderText: '搜索文档',
        searchNoResultsText: '无法找到相关结果',
        searchSuggestedQueryText: '请输入其他关键词进行搜索',
      },
      {
        lang: 'en',
        label: 'English',
        editLink: {
          docRepoBaseUrl:
              'https://github.com/larafly/apidoc-document/tree/main/docs',
          text: '📝 Edit this page on GitHub',
        },
        searchPlaceholderText: 'Search Docs',
        searchNoResultsText: 'No results for',
        searchSuggestedQueryText: 'Please try again with a different keyword',
      },
    ],
  },
});
