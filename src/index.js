const path = require('path');

module.exports = function (context) {
  const {siteConfig} = context;
  const {themeConfig} = siteConfig;
  const {matomo} = themeConfig || {};

  if (!matomo) {
    throw new Error(`Please specify 'matomo' object in 'themeConfig' with 'matomoUrl' and 'siteId' fields in it to use docusaurus-plugin-matomo`);
  }

  const {matomoUrl, siteId} = matomo;

  if (!matomoUrl) {
    throw new Error('Please specify the `matomoUrl` field in the `themeConfig.matomo`');
  }
  if (!siteId) {
    throw new Error('Please specify the `siteId` field in the `themeConfig.matomo`');
  }
  const phpLoader = matomo.phpLoader || 'matomo.php';
  const jsLoader = matomo.jsLoader || 'matomo.js';
  const tracking = matomo.tracking || [];

  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-plugin-matomo',

    getClientModules() {
      return isProd ? [path.resolve(__dirname, './track')] : [];
    },

    injectHtmlTags() {
      if (!isProd) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: 'link',
            attributes: {
              rel: 'preconnect',
              href: `${matomoUrl}`,
            },
          },
          {
            tagName: 'script',
            innerHTML: `
              var _paq = window._paq = window._paq || [];
              _paq.push(['trackPageView']);
              _paq.push(['enableLinkTracking']);
              ${tracking.map(x => `_paq.push(${JSON.stringify(x)})`).join(';')};
              (function() {
                var u="${matomoUrl}";
                _paq.push(['setTrackerUrl', u+'${phpLoader}']);
                _paq.push(['setSiteId', '${siteId}']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.src=u+'${jsLoader}'; s.parentNode.insertBefore(g,s);
              })();
            `,
          },
        ],
      };
    },
  };
};
