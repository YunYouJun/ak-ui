const pkg = require("../../package.json");

module.exports = {
  title: pkg.name,
  description: pkg.description,
  head: [
    ["link", { rel: "icon", href: "/ak.png" }],
    ["link", { rel: "stylesheet", href: "/css/ak-ui.min.css" }]
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
      "/components/": ["", "ak-button"]
    },
    lastUpdated: "Last Updated",
    repo: "YunYouJun/ak-ui",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "帮助我们改善此页面！",
    smoothScroll: true
  },
  plugins: ["@vuepress/back-to-top"]
};
