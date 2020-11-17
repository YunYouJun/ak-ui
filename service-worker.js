/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1a9e5aeddec49cb2801c4e4e2f1ec2df"
  },
  {
    "url": "ak.png",
    "revision": "0573b61c5163c80b4dbdbf67ae0c83dc"
  },
  {
    "url": "ak.svg",
    "revision": "96f524a47cc352e1e14ceb1850001ae8"
  },
  {
    "url": "assets/css/0.styles.511d30ca.css",
    "revision": "9526d570a27d0a8c5db39cbbe18c2173"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.2de7da84.js",
    "revision": "78aabeff2722d0c2c18d66c31e921688"
  },
  {
    "url": "assets/js/11.467dde29.js",
    "revision": "0626ff20b6a49b3d0c85a0a8d5132e61"
  },
  {
    "url": "assets/js/12.1d60c24a.js",
    "revision": "5dadd6e633fca70f6814c4d20fb5b50e"
  },
  {
    "url": "assets/js/13.fadc88f3.js",
    "revision": "7a2fd0e82e7604a6826c6cfdc2cb63f2"
  },
  {
    "url": "assets/js/14.b1f05caf.js",
    "revision": "1c7bd1872911933f7bf6c45bd6779987"
  },
  {
    "url": "assets/js/15.1d0c952c.js",
    "revision": "84ab0eceae9166b26449d95c06b287f8"
  },
  {
    "url": "assets/js/16.b17db599.js",
    "revision": "a4fad172122f31c71c4c7bfda1185c89"
  },
  {
    "url": "assets/js/17.e52fff6e.js",
    "revision": "9b6cc597d2edfff04033ecdf5edf4190"
  },
  {
    "url": "assets/js/18.4d3b7af5.js",
    "revision": "b72ecd6c556c6ced6a358ef675bb686f"
  },
  {
    "url": "assets/js/19.e91b818b.js",
    "revision": "4e888a95570f258fc5e8fc9e3f2027c1"
  },
  {
    "url": "assets/js/2.ef88f025.js",
    "revision": "54020cbd4aa61269fe4610588c64424c"
  },
  {
    "url": "assets/js/20.219d2d63.js",
    "revision": "dca4531c9f7227fbfc05fba138c3d4d6"
  },
  {
    "url": "assets/js/21.507e433e.js",
    "revision": "ff846651d78f4c9f9a51fcdf9ab96f15"
  },
  {
    "url": "assets/js/22.9958af51.js",
    "revision": "04621a0be130ebd14d4335cfcb3fb825"
  },
  {
    "url": "assets/js/23.e0ba66b5.js",
    "revision": "4a427dedcdda35dc9bee65aed32cfb60"
  },
  {
    "url": "assets/js/24.cc2c2f1c.js",
    "revision": "c68038cfc65f182f46a106c3e8c4d267"
  },
  {
    "url": "assets/js/25.e2b4b476.js",
    "revision": "7fb0fb2579214cf125be6819c47c8bda"
  },
  {
    "url": "assets/js/26.aab91d7a.js",
    "revision": "ec8bd73ba88159cd30f63ad18734fcff"
  },
  {
    "url": "assets/js/27.f6b13e3e.js",
    "revision": "084476766aa6e3a2c4e4900afa9ac09c"
  },
  {
    "url": "assets/js/28.d2ec4015.js",
    "revision": "410dc86bba756e7aeff05ff68477d6fc"
  },
  {
    "url": "assets/js/29.01eefdfe.js",
    "revision": "06c4e597e3278a9a05d193d24575107f"
  },
  {
    "url": "assets/js/3.a4d259a7.js",
    "revision": "ad9c704c8e6635b0c770ef7ed725c097"
  },
  {
    "url": "assets/js/30.bfe43913.js",
    "revision": "84f7226e32d6b4751368b83c9975d147"
  },
  {
    "url": "assets/js/31.7dd2f52f.js",
    "revision": "9645184208fd61140a651ff2daf0410a"
  },
  {
    "url": "assets/js/32.a2cb691b.js",
    "revision": "755ad257a370731ecf758da872adfdd9"
  },
  {
    "url": "assets/js/33.8fb35837.js",
    "revision": "079d1f3a559b975f642017a5aeed4198"
  },
  {
    "url": "assets/js/34.5331c771.js",
    "revision": "b81aaf308d547d91e9eeefa7f1387450"
  },
  {
    "url": "assets/js/35.72e186bc.js",
    "revision": "4ef1e7af721dd186ddbf4238e3fef44b"
  },
  {
    "url": "assets/js/36.67c0beca.js",
    "revision": "79c5395f289af627bac2f954caf12571"
  },
  {
    "url": "assets/js/37.d16e710b.js",
    "revision": "1c20118d125a5a2ed589093e7718de00"
  },
  {
    "url": "assets/js/38.732e5cfe.js",
    "revision": "1815fa6ade1c1184943f4716fbdd9770"
  },
  {
    "url": "assets/js/39.f8571c83.js",
    "revision": "0f0c9b4b7fdf3302d724f2ac0698e8c2"
  },
  {
    "url": "assets/js/4.83ccec0d.js",
    "revision": "4964828143a2c2a29114f200947746ab"
  },
  {
    "url": "assets/js/40.5b321487.js",
    "revision": "66dc926e0590e5e27e7c8f46555a5ab1"
  },
  {
    "url": "assets/js/41.8a8550b4.js",
    "revision": "361ccbbbe7821e7c990c0f202ae31b16"
  },
  {
    "url": "assets/js/42.9b046b09.js",
    "revision": "b1dc39f24415453de18feb6626aa5a96"
  },
  {
    "url": "assets/js/43.2c6bbb10.js",
    "revision": "dc9961446c5ff23f23b9bc05ed0c3c9e"
  },
  {
    "url": "assets/js/5.ad383849.js",
    "revision": "9cac3763754de25aba8163c5f0780bce"
  },
  {
    "url": "assets/js/6.18523b9c.js",
    "revision": "e750e49ea5f56e253ab29d536502bf7c"
  },
  {
    "url": "assets/js/7.754a2e1a.js",
    "revision": "041052cf603f79cb0f8e0fdab2077282"
  },
  {
    "url": "assets/js/8.f0671571.js",
    "revision": "2e514a0953e792980e4217b0f7d383a2"
  },
  {
    "url": "assets/js/9.47e65aa5.js",
    "revision": "05ca2465188c1570cffbe36ce7150a1d"
  },
  {
    "url": "assets/js/app.2c6d62e4.js",
    "revision": "3827e1382daf9ef094c5e5227777530d"
  },
  {
    "url": "components/ak-button-group.html",
    "revision": "cc7730da25241aee87d2e6d41abfef77"
  },
  {
    "url": "components/ak-button.html",
    "revision": "6ee0f913b32355289e51dd97051ac444"
  },
  {
    "url": "components/ak-card.html",
    "revision": "f2ea611417b3b0cea2168a8e53004c32"
  },
  {
    "url": "components/ak-counter.html",
    "revision": "aab6d3889c06cdf561aaab364cc02352"
  },
  {
    "url": "components/ak-divider.html",
    "revision": "86331dc319496de9c80613e585b25a86"
  },
  {
    "url": "components/ak-form.html",
    "revision": "543397056c9a72db4d553e69d228c85b"
  },
  {
    "url": "components/ak-fx.html",
    "revision": "fd3ea0853ad4c389f2cd02c8ce0ed533"
  },
  {
    "url": "components/ak-helper.html",
    "revision": "3a3851816355ad1da2879a16a6c046ad"
  },
  {
    "url": "components/ak-icon.html",
    "revision": "a3176b45108ae3524ff44035f7bbe86f"
  },
  {
    "url": "components/ak-level.html",
    "revision": "b0366ad3ebbca1d90589f395eacdae45"
  },
  {
    "url": "components/ak-loading.html",
    "revision": "a01106921937f67e0692ea3c78afbf71"
  },
  {
    "url": "components/ak-media.html",
    "revision": "dee40013f6f695efd51ae98ceeadb22b"
  },
  {
    "url": "components/ak-object.html",
    "revision": "9df4d7fe15f1e30e9da2b48b803ea30b"
  },
  {
    "url": "components/ak-pagination.html",
    "revision": "42c8d5522e4606dc218edc692a54e71f"
  },
  {
    "url": "components/ak-panel.html",
    "revision": "35ddb44626fac7e0ebbd37ff08513d25"
  },
  {
    "url": "components/ak-san.html",
    "revision": "3c8d812f23f9b837e9a31e76635c7509"
  },
  {
    "url": "components/index.html",
    "revision": "b9061ef2f1c54fcf57aa8a810b2afc05"
  },
  {
    "url": "css/ak-ui.css",
    "revision": "7b23129362559fdc532874f784edcacb"
  },
  {
    "url": "css/ak-ui.min.css",
    "revision": "fced9be77cf64bcc141ea6e499e1f646"
  },
  {
    "url": "guide/index.html",
    "revision": "ad3ad5d216f3360b0dae962094a14757"
  },
  {
    "url": "guide/style.html",
    "revision": "f3408cde89b0e339bc3a5dbdf3d4d46c"
  },
  {
    "url": "img/bg/chen.jpg",
    "revision": "f4f62794cb2901e49c5433bd121e84e3"
  },
  {
    "url": "img/bg/dark.jpg",
    "revision": "82b6e5ff1bd6ed32718fdd42e6ae2102"
  },
  {
    "url": "img/bg/dust.jpg",
    "revision": "451afbf40ff02f31884fd7ccc8d63628"
  },
  {
    "url": "img/bk.jpg",
    "revision": "ab47807dd05655b69b8fe2434ea37a2f"
  },
  {
    "url": "img/character/chen.jpg",
    "revision": "bd562cef25f5e177a6a4a99006695bad"
  },
  {
    "url": "img/mrfz-logo.png",
    "revision": "196f38db7560b0f36fc26cbe7abf3b7e"
  },
  {
    "url": "index.html",
    "revision": "8ff1ae2645b344d4b551b8b67e385ee0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
