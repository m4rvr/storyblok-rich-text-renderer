module.exports = {
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Storyblok Rich-Text Renderer',
      description: 'Fast renderer for your rich-text content. ⚡',
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#09B3AF' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#09B3AF',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#09B3AF' }],
  ],
  theme: '@vuepress/theme-vue',
  themeConfig: {
    repo: 'MarvinRudolph/storyblok-rich-text-renderer',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    lastUpdated: 'Last updated',
    sidebarDepth: 3,
    logo: '/logo-standalone.svg',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last updated',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Introduction',
            link: '/introduction',
          },
          {
            text: 'Vue.js Plugin',
            link: '/vue-plugin/',
          },
        ],
        sidebar: [
          '/introduction',
          {
            title: 'Vue.js Plugin',
            path: '/vue-plugin/',
            collapsable: false,
            children: [
              '/vue-plugin/usage/',
              '/vue-plugin/examples/',
              {
                title: 'Config Reference',
                path: '/vue-plugin/config/',
              },
              '/vue-plugin/resolvers/',
            ],
          },
        ],
      },
    },
  },
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh',
        },
      },
    },
  },
};
