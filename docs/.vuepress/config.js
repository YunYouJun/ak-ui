const pkg = require("../../package.json");

module.exports = ctx => {
  return {
    title: "ak-ui",
    description: pkg.description,
    head: [
      ["link", { rel: "icon", href: "/ak.png" }],
      ["link", { rel: "manifest", href: "/manifest.json" }],
      ["meta", { name: "theme-color", content: "#000000" }],
      ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
      [
        "meta",
        { name: "apple-mobile-web-app-status-bar-style", content: "black" }
      ],
      ["link", { rel: "apple-touch-icon", href: "/ak.png" }],
      ["link", { rel: "mask-icon", href: "/ak.svg", color: "#3eaf7c" }],
      ["meta", { name: "msapplication-TileImage", content: "/ak.png" }],
      ["meta", { name: "msapplication-TileColor", content: "#000000" }],
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
      logo: "/ak.svg",
      nav: [
        { text: "Home", link: "/" },
        { text: "Guide", link: "/guide/" },
        { text: "Components", link: "/components/" }
      ],
      sidebar: {
        "/components/": [
          "",
          "ak-button",
          "ak-card",
          "ak-fx",
          "ak-loading",
          "ak-media"
        ]
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
        "@vuepress/pwa",
        {
          serviceWorker: true,
          updatePopup: true
        }
      ],
      [
        "vuepress-plugin-container",
        {
          type: "demo",
          defaultTitle: "示例",
          before: info =>
            `<demo-block><template v-slot:title>${info}</template>`,
          after: "</demo-block>"
        }
      ]
    ]
  };
};
