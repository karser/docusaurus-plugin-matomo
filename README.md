#  Matomo plugin for Docusaurus.

npm install --save docusaurus-plugin-matomo

## Configuration

docusaurus.config.js
```
module.exports = {
  plugins: [
    'docusaurus-plugin-matomo',
  ],
  themeConfig: {
    matomo: {
      matomoUrl: 'https://your.matomo.instance/',
      siteId: 'ID',
      phpLoader: 'matomo.php',
      jsLoader: 'matomo.js',
      // optional matomo methods
      tracking: [
        ['enableHeartBeatTimer'],
        ['setRequestMethod', 'POST']
      ]
    },
  },
};
```
