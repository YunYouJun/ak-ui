const pkg = require("../../package.json");
const md = require("markdown-it")();

module.exports = ctx => {
  return {
    title: "ak-ui",
    description: pkg.description,
    head: [
      ["link", { rel: "icon", href: "/ak.png" }],
      [
        "link",
        {
          rel: "stylesheet",
          href: ctx.isProd ? "/css/ak-ui.min.css" : "/css/ak-ui.css"
        }
      ]
    ],
    extraWatchFiles: [
      ".vuepress/public/css/ak-ui.min.css" // 使用相对路径
    ],
    themeConfig: {
      logo: "/gun.svg",
      nav: [
        { text: "Home", link: "/" },
        { text: "Guide", link: "/guide/" },
        { text: "Components", link: "/components/" }
      ],
      sidebar: {
        "/components/": ["", "ak-button", "ak-card", "ak-fx", "ak-loading"]
      },
      lastUpdated: "Last Updated",
      repo: "YunYouJun/ak-ui",
      docsDir: "docs",
      editLinks: true,
      editLinkText: "帮助改善此页面！( ￣□￣)/",
      smoothScroll: true
    },
    plugins: [
      "@vuepress/back-to-top",
      "@vuepress/medium-zoom",
      [
        "@vuepress/google-analytics",
        {
          ga: "UA-121354150-11"
        }
      ],
      [
        "vuepress-plugin-container",
        {
          type: "demo",
          defaultTitle: "示例",
          before: info => `<demo-block><template v-slot:title>${info}</template>`,
          after: "</demo-block>"
        }
      ]
    ]
  };
};
