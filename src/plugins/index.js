import WebFontLoaderPlugin from 'phaser3-rex-plugins/plugins/webfontloader-plugin';
import AwaitLoaderPlugin from 'phaser3-rex-plugins/plugins/awaitloader-plugin';

export default {
  global: [
    {
      key: 'rexWebFontLoader',
      plugin: WebFontLoaderPlugin,
      start: true,
    },
    {
      key: 'rexAwaitLoader',
      plugin: AwaitLoaderPlugin,
      start: true,
    },
  ],
};
