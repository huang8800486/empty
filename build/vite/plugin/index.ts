import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'; // JSX写法
import windiCSS from 'vite-plugin-windicss'; // windiCss
import legacy from '@vitejs/plugin-legacy'; // IE11兼容
import AutoImport from 'unplugin-auto-import/vite'; // 自动导入vue全局api
import Components from 'unplugin-vue-components/vite'; // 自动导入组件
import ViteImages from 'vite-plugin-vue-images'; // 引入图片
import { VantResolver } from 'unplugin-vue-components/resolvers'; // 引入vant
import { configSvgIconsPlugin } from './svgSprite';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    vueJsx(),
    visualizer({ open: true }),
    viteCompression({
      threshold: 1024000, // 对大于 1mb 的文件进行压缩
    }),
  ];
  // vite-plugin-windicss
  vitePlugins.push(windiCSS());
  vitePlugins.push(
    ViteImages({
      dirs: ['src/assets/images'], // 指明图片存放目录
      customSearchRegex: '([a-zA-Z0-9_]+)',
    })
  );
  vitePlugins.push(
    AutoImport({
      dts: 'types/auto-imports.d.ts', // 可以自定义文件生成的位置，默认是根目录下
      imports: ['vue', 'vue-router'],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
      ],
      // eslint报错解决
      eslintrc: {
        enabled: false, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    })
  );
  vitePlugins.push(
    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // ui库解析器
      // resolvers: [ElementPlusResolver()],
      resolvers: [VantResolver()],
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'types/components.d.ts',
      // 搜索子目录
      deep: true,
      // 允许子目录作为组件的命名空间前缀。, 目录+名字
      directoryAsNamespace: false,
    })
  );

  if (isBuild) {
    VITE_LEGACY && vitePlugins.push(legacy());
  }
  if (!isBuild) {
    vitePlugins.push(
      nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
      })
    );
  }

  vitePlugins.push(configSvgIconsPlugin(isBuild));

  return vitePlugins;
}
