const pkg = require("../../package.json");

module.exports = (ctx) => {
  return {
    title: "ak-ui",
    description: pkg.description,
    locales: {
      "/": {
        lang: "zh-CN",
      },
    },
    head: [
      ["link", { rel: "icon", href: "/ak.png" }],
      ["link", { rel: "manifest", href: "/manifest.json" }],
      ["meta", { name: "theme-color", content: "#000000" }],
      ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
      [
        "meta",
        { name: "apple-mobile-web-app-status-bar-style", content: "black" },
      ],
      ["link", { rel: "apple-touch-icon", href: "/ak.png" }],
      ["link", { rel: "mask-icon", href: "/ak.svg", color: "#3eaf7c" }],
      ["meta", { name: "msapplication-TileImage", content: "/ak.png" }],
      ["meta", { name: "msapplication-TileColor", content: "#000000" }],
      [
        "link",
        {
          rel: "stylesheet",
          href: ctx.isProd ? "/css/ak-ui.min.css" : "/css/ak-ui.css",
        },
      ],
      [
        "script",
        {
          async: true,
          src: "//at.alicdn.com/t/font_1623879_fmtmrsxopns.js",
        },
      ],
      // font
      [
        "link",
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css?family=Noto+Sans+SC:400,500,700,900|Noto+Serif+SC:400,500,700,900|Syncopate:700&display=swap",
        },
      ],
    ],
    extraWatchFiles: [
      ".vuepress/public/css/ak-ui.css", // 使用相对路径
    ],
    themeConfig: {
      logo: "/ak.svg",
      nav: [
        { text: "Home", link: "/" },
        { text: "Guide", link: "/guide/" },
        { text: "Components", link: "/components/" },
      ],
      sidebar: {
        "/guide/": ["", "style"],
        "/components/": [
          "",
          "ak-button",
          "ak-button-group",
          "ak-card",
          "ak-counter",
          "ak-divider",
          "ak-fx",
          "ak-form",
          "ak-icon",
          "ak-level",
          "ak-loading",
          "ak-media",
          "ak-object",
          "ak-panel",
          "ak-pagination",
        ],
      },
      lastUpdated: "上次更新",
      repo: "YunYouJun/ak-ui",
      docsDir: "docs",
      editLinks: true,
      editLinkText: "帮助改善此页面！( ￣□￣)/",
      smoothScroll: true,
    },
    plugins: [
      "@vuepress/back-to-top",
      [
        "@vuepress/google-analytics",
        {
          ga: "UA-121354150-11",
        },
      ],
      [
        "@vuepress/pwa",
        {
          serviceWorker: true,
          updatePopup: true,
        },
      ],
      [
        "vuepress-plugin-container",
        {
          type: "demo",
          defaultTitle: "示例",
          before: (info) =>
            `<demo-block><template v-slot:title>${info}</template>`,
          after: "</demo-block>",
        },
      ],
      [
        "vuepress-plugin-container",
        {
          type: "demo-color",
          defaultTitle: "示例（彩色）",
          before: (info) =>
            `<demo-block-color><template v-slot:title>${info}</template>`,
          after: "</demo-block-color>",
        },
      ],
      [
        "vuepress-plugin-container",
        {
          type: "demo-dark",
          defaultTitle: "示例（暗色）",
          before: (info) =>
            `<demo-block-dark><template v-slot:title>${info}</template>`,
          after: "</demo-block-dark>",
        },
      ],
      [
        "vuepress-plugin-container",
        {
          type: "demo-dust",
          defaultTitle: "示例（尘）",
          before: (info) =>
            `<demo-block-dust><template v-slot:title>${info}</template>`,
          after: "</demo-block-dust>",
        },
      ],
    ],
  };
};
