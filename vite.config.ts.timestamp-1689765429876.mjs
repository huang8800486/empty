// vite.config.ts
import { loadEnv } from "file:///I:/worker/web-wt/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// build/utils.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'));
      } catch (error) {
        realName = "";
      }
    }
    ret[envName] = realName;
    if (typeof realName === "string") {
      process.env[envName] = realName;
    } else if (typeof realName === "object") {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
}

// build/vite/plugin/index.ts
import vue from "file:///I:/worker/web-wt/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///I:/worker/web-wt/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import windiCSS from "file:///I:/worker/web-wt/node_modules/vite-plugin-windicss/dist/index.mjs";
import legacy from "file:///I:/worker/web-wt/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import AutoImport from "file:///I:/worker/web-wt/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///I:/worker/web-wt/node_modules/unplugin-vue-components/dist/vite.mjs";
import ViteImages from "file:///I:/worker/web-wt/node_modules/vite-plugin-vue-images/dist/index.cjs";
import { VantResolver } from "file:///I:/worker/web-wt/node_modules/unplugin-vue-components/dist/resolvers.mjs";

// build/vite/plugin/svgSprite.ts
import { createSvgIconsPlugin } from "file:///I:/worker/web-wt/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { resolve } from "path";
function configSvgIconsPlugin(isBuild) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), "src/assets/images/svg")],
    svgoOptions: isBuild,
    symbolId: "icon-[dir]-[name]"
  });
  return svgIconsPlugin;
}

// build/vite/plugin/index.ts
import nodePolyfills from "file:///I:/worker/web-wt/node_modules/rollup-plugin-polyfill-node/dist/index.js";
import { visualizer } from "file:///I:/worker/web-wt/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import viteCompression from "file:///I:/worker/web-wt/node_modules/vite-plugin-compression/dist/index.mjs";
function createVitePlugins(viteEnv, isBuild) {
  const { VITE_LEGACY } = viteEnv;
  const vitePlugins = [
    vue(),
    vueJsx(),
    visualizer({ open: true }),
    viteCompression({
      threshold: 1024e3
    })
  ];
  vitePlugins.push(windiCSS());
  vitePlugins.push(
    ViteImages({
      dirs: ["src/assets/images"],
      customSearchRegex: "([a-zA-Z0-9_]+)"
    })
  );
  vitePlugins.push(
    AutoImport({
      dts: "types/auto-imports.d.ts",
      imports: ["vue", "vue-router"],
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/
      ],
      eslintrc: {
        enabled: false,
        filepath: "./.eslintrc-auto-import.json",
        globalsPropValue: true
      }
    })
  );
  vitePlugins.push(
    Components({
      dirs: ["src/components"],
      resolvers: [VantResolver()],
      extensions: ["vue"],
      dts: "types/components.d.ts",
      deep: true,
      directoryAsNamespace: false
    })
  );
  if (isBuild) {
    VITE_LEGACY && vitePlugins.push(legacy());
  }
  if (!isBuild) {
    vitePlugins.push(
      nodePolyfills({
        include: ["node_modules/**/*.js", new RegExp("node_modules/.vite/.*js")]
      })
    );
  }
  vitePlugins.push(configSvgIconsPlugin(isBuild));
  return vitePlugins;
}

// build/vite/proxy.ts
var httpsRE = /^https:\/\//;
function createProxy(list = []) {
  const ret = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);
    ret[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path2) => path2.replace(new RegExp(`^${prefix}`), ""),
      ...isHttps ? { secure: false } : {}
    };
  }
  return ret;
}

// tokenConfig.ts
import * as fs from "fs/promises";
import path from "path";
var __vite_injected_original_dirname = "I:\\worker\\web-wt";
var setToken = function() {
  const development = "dev";
  const production = "pro";
  const hostUrl = path.resolve(__vite_injected_original_dirname, "./src/config/index.ts");
  const configArgv = process.env.npm_config_argv;
  const params = process.argv.splice(2);
  const runType = configArgv ? JSON.parse(configArgv).cooked[1] : "";
  let type = runType ? runType === development ? development : production : params[0];
  if (type === "dev") {
    type = "test";
  } else {
    if (params[2] === "test") {
      type = "test";
    } else if (params[2] === "prepro") {
      type = "prepro";
    } else {
      type = "main";
    }
  }
  const routerContent = `import { ${type} } from './token';
export default ${type};
`;
  fs.writeFile(hostUrl, routerContent);
};

// vite.config.ts
import nodePolyfills2 from "file:///I:/worker/web-wt/node_modules/rollup-plugin-polyfill-node/dist/index.js";
import inject from "file:///I:/worker/web-wt/node_modules/@rollup/plugin-inject/dist/es/index.js";
function pathResolve(dir) {
  return resolve2(process.cwd(), ".", dir);
}
var vite_config_default = ({ command, mode }) => {
  setToken();
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH } = viteEnv;
  const isBuild = command === "build";
  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      host: true,
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY)
    },
    resolve: {
      alias: [
        {
          find: "web3",
          replacement: "web3/dist/web3.min.js"
        },
        {
          find: /@\//,
          replacement: pathResolve("src") + "/"
        },
        {
          find: /#\//,
          replacement: pathResolve("types") + "/"
        }
      ]
    },
    build: {
      minify: "terser",
      target: "es2015",
      outDir: "./dist",
      emptyOutDir: true,
      assetsDir: "static",
      cssCodeSplit: true,
      sourcemap: false,
      chunkSizeWarningLimit: 2e3,
      terserOptions: {
        compress: {
          drop_console: isBuild,
          drop_debugger: true
        }
      },
      rollupOptions: {
        plugins: [inject({ Buffer: ["buffer", "Buffer"] }), nodePolyfills2()],
        output: {
          manualChunks(id, { getModuleInfo, getModuleIds }) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
          entryFileNames: "static/js/[name].[hash].js",
          chunkFileNames: "static/js/[name].[hash].js",
          assetFileNames: (chunkInfo) => {
            var _a;
            const subDir = ((_a = chunkInfo.name) == null ? void 0 : _a.endsWith(".css")) ? "css" : "images";
            return `static/${subDir}/[name].[hash].[ext]`;
          }
        }
      },
      commonjsOptions: {
        transformMixedEsModules: true
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvdXRpbHMudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHMiLCAiYnVpbGQvdml0ZS9wbHVnaW4vc3ZnU3ByaXRlLnRzIiwgImJ1aWxkL3ZpdGUvcHJveHkudHMiLCAidG9rZW5Db25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJJOlxcXFx3b3JrZXJcXFxcd2ViLXd0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJJOlxcXFx3b3JrZXJcXFxcd2ViLXd0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9JOi93b3JrZXIvd2ViLXd0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHR5cGUgeyBVc2VyQ29uZmlnLCBDb25maWdFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJzsgLy8gXHU4REVGXHU1Rjg0XG5pbXBvcnQgeyB3cmFwcGVyRW52IH0gZnJvbSAnLi9idWlsZC91dGlscyc7XG5pbXBvcnQgeyBjcmVhdGVWaXRlUGx1Z2lucyB9IGZyb20gJy4vYnVpbGQvdml0ZS9wbHVnaW4nO1xuaW1wb3J0IHsgY3JlYXRlUHJveHkgfSBmcm9tICcuL2J1aWxkL3ZpdGUvcHJveHknO1xuaW1wb3J0IHsgc2V0VG9rZW4gfSBmcm9tICcuL3Rva2VuQ29uZmlnJztcbmltcG9ydCBub2RlUG9seWZpbGxzIGZyb20gJ3JvbGx1cC1wbHVnaW4tcG9seWZpbGwtbm9kZSc7XG5pbXBvcnQgaW5qZWN0IGZyb20gJ0Byb2xsdXAvcGx1Z2luLWluamVjdCc7XG5cbmZ1bmN0aW9uIHBhdGhSZXNvbHZlKGRpcjogc3RyaW5nKSB7XG4gIHJldHVybiByZXNvbHZlKHByb2Nlc3MuY3dkKCksICcuJywgZGlyKTtcbn1cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCAoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICBzZXRUb2tlbigpO1xuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKTtcblxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHJvb3QpO1xuXG4gIC8vIFRoZSBib29sZWFuIHR5cGUgcmVhZCBieSBsb2FkRW52IGlzIGEgc3RyaW5nLiBUaGlzIGZ1bmN0aW9uIGNhbiBiZSBjb252ZXJ0ZWQgdG8gYm9vbGVhbiB0eXBlXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudik7XG5cbiAgY29uc3QgeyBWSVRFX1BPUlQsIFZJVEVfUFJPWFksIFZJVEVfUFVCTElDX1BBVEggfSA9IHZpdGVFbnY7XG5cbiAgY29uc3QgaXNCdWlsZCA9IGNvbW1hbmQgPT09ICdidWlsZCc7XG4gIHJldHVybiB7XG4gICAgYmFzZTogVklURV9QVUJMSUNfUEFUSCxcbiAgICByb290LFxuICAgIHBsdWdpbnM6IGNyZWF0ZVZpdGVQbHVnaW5zKHZpdGVFbnYsIGlzQnVpbGQpLFxuICAgIHNlcnZlcjoge1xuICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIHBvcnQ6IFZJVEVfUE9SVCxcbiAgICAgIC8vIExvYWQgcHJveHkgY29uZmlndXJhdGlvbiBmcm9tIC5lbnZcbiAgICAgIHByb3h5OiBjcmVhdGVQcm94eShWSVRFX1BST1hZKSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBmaW5kOiAnd2ViMycsXG4gICAgICAgICAgcmVwbGFjZW1lbnQ6ICd3ZWIzL2Rpc3Qvd2ViMy5taW4uanMnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogL0BcXC8vLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgnc3JjJykgKyAnLycsXG4gICAgICAgIH0sXG4gICAgICAgIC8vIC8jL3h4eHggPT4gdHlwZXMveHh4eFxuICAgICAgICB7XG4gICAgICAgICAgZmluZDogLyNcXC8vLFxuICAgICAgICAgIHJlcGxhY2VtZW50OiBwYXRoUmVzb2x2ZSgndHlwZXMnKSArICcvJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgbWluaWZ5OiAndGVyc2VyJywgLy8gdml0ZTIuNi54XHU5NzAwXHU4OTgxXHU5MTREXHU3RjZFIFx1MjAxQ2J1aWxkLm1pbmlmeVx1MjAxRCBcdTRFM0EgXHUyMDFDdGVyc2VyXHUyMDFEXG4gICAgICB0YXJnZXQ6ICdlczIwMTUnLCAvLyBcdTZENEZcdTg5QzhcdTU2NjhcdTUxN0NcdTVCQjlcbiAgICAgIG91dERpcjogJy4vZGlzdCcsIC8vIFx1NjMwN1x1NUI5QVx1OEY5M1x1NTFGQVx1OERFRlx1NUY4NFxuICAgICAgZW1wdHlPdXREaXI6IHRydWUsIC8vIFx1NEUwRFx1NTcyOFx1OTg3OVx1NzZFRVx1NjgzOVx1NzZFRVx1NUY1NVx1NEUyRCwgXHU2RTA1XHU3QTdBXHU3NkVFXHU1RjU1XG4gICAgICBhc3NldHNEaXI6ICdzdGF0aWMnLCAvLyBcdTU0MDhcdTVFNzZcdTYyNDBcdTY3MDlcdTY1ODdcdTRFRjZcdTUzRUFcdTU3MjhzdGF0aWNcbiAgICAgIGNzc0NvZGVTcGxpdDogdHJ1ZSwgLy9jc3NcdTRFRTNcdTc4MDFcdTYyQzZcdTUyMDYsXHU3OTgxXHU3NTI4XHU1MjE5XHU2MjQwXHU2NzA5XHU2ODM3XHU1RjBGXHU0RkREXHU1QjU4XHU1NzI4XHU0RTAwXHU0RTJBY3NzXHU5MUNDXHU5NzYyXG4gICAgICBzb3VyY2VtYXA6IGZhbHNlLCAvL1x1NjYyRlx1NTQyNlx1Njc4NFx1NUVGQXNvdXJjZSBtYXAgXHU2NTg3XHU0RUY2XG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsIC8vIGNodW5rIFx1NTkyN1x1NUMwRlx1OEI2Nlx1NTQ0QVx1NzY4NFx1OTY1MFx1NTIzNlxuICAgICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgICAvLyBcdTUyMjBcdTk2NjRjb25zb2xlLCBkZWJ1Z2dlclxuICAgICAgICBjb21wcmVzczoge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjYW1lbGNhc2VcbiAgICAgICAgICBkcm9wX2NvbnNvbGU6IGlzQnVpbGQsXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHBsdWdpbnM6IFtpbmplY3QoeyBCdWZmZXI6IFsnYnVmZmVyJywgJ0J1ZmZlciddIH0pLCBub2RlUG9seWZpbGxzKCldLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAvKipcbiAgICAgICAgICAgKiAyLlx1NEVFNVx1NTFGRFx1NjU3MFx1NzY4NFx1NUY2Mlx1NUYwRlx1NEY3Rlx1NzUyOFxuICAgICAgICAgICAqIFx1NUMwNlx1N0IyQ1x1NEUwOVx1NjVCOVx1NTMwNVx1NTE2OFx1OTBFOFx1NjI1M1x1NTMwNVx1NTcyOFx1NEUwMFx1NEUyQWNodW5rXHU0RTJEXHVGRjBDXHU1NDBEXHU3OUYwXHU1M0VCIHZlbmRvclxuICAgICAgICAgICAqL1xuICAgICAgICAgIG1hbnVhbENodW5rcyhpZCwgeyBnZXRNb2R1bGVJbmZvLCBnZXRNb2R1bGVJZHMgfSkge1xuICAgICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ3ZlbmRvcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAvLyBcdTc1MjhcdTRFOEVcdTRFQ0VcdTUxNjVcdTUzRTNcdTcwQjlcdTUyMUJcdTVFRkFcdTc2ODRcdTU3NTdcdTc2ODRcdTYyNTNcdTUzMDVcdThGOTNcdTUxRkFcdTY4M0NcdTVGMEZbbmFtZV1cdTg4NjhcdTc5M0FcdTY1ODdcdTRFRjZcdTU0MEQsW2hhc2hdXHU4ODY4XHU3OTNBXHU4QkU1XHU2NTg3XHU0RUY2XHU1MTg1XHU1QkI5aGFzaFx1NTAzQ1xuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnc3RhdGljL2pzL1tuYW1lXS5baGFzaF0uanMnLCAvLyBcdTc1MjhcdTRFOEVcdTU0N0RcdTU0MERcdTRFRTNcdTc4MDFcdTYyQzZcdTUyMDZcdTY1RjZcdTUyMUJcdTVFRkFcdTc2ODRcdTUxNzFcdTRFQUJcdTU3NTdcdTc2ODRcdThGOTNcdTUxRkFcdTU0N0RcdTU0MERcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0uW2hhc2hdLmpzJywgLy8gXHU3NTI4XHU0RThFXHU4RjkzXHU1MUZBXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU3Njg0XHU1NDdEXHU1NDBEXHVGRjBDW2V4dF1cdTg4NjhcdTc5M0FcdTY1ODdcdTRFRjZcdTYyNjlcdTVDNTVcdTU0MERcbiAgICAgICAgICAvLyBhc3NldEZpbGVOYW1lczogJ3N0YXRpYy9bZXh0XS9uYW1lLVtoYXNoXS5bZXh0XScsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6IChjaHVua0luZm8pID0+IHtcbiAgICAgICAgICAgIC8vIFx1NzUyOFx1NTQwRVx1N0YwMFx1NTQwRFx1NzlGMFx1OEZEQlx1ODg0Q1x1NTMzQVx1NTIyQlx1NTkwNFx1NzQwNlxuICAgICAgICAgICAgY29uc3Qgc3ViRGlyID0gY2h1bmtJbmZvLm5hbWU/LmVuZHNXaXRoKCcuY3NzJykgPyAnY3NzJyA6ICdpbWFnZXMnO1xuICAgICAgICAgICAgcmV0dXJuIGBzdGF0aWMvJHtzdWJEaXJ9L1tuYW1lXS5baGFzaF0uW2V4dF1gO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgY29tbW9uanNPcHRpb25zOiB7XG4gICAgICAgIHRyYW5zZm9ybU1peGVkRXNNb2R1bGVzOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiSTpcXFxcd29ya2VyXFxcXHdlYi13dFxcXFxidWlsZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSTpcXFxcd29ya2VyXFxcXHdlYi13dFxcXFxidWlsZFxcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vSTovd29ya2VyL3dlYi13dC9idWlsZC91dGlscy50c1wiOy8vIFx1OEJGQlx1NTNENlx1NjI0MFx1NjcwOVx1NzNBRlx1NTg4M1x1NTNEOFx1OTFDRlx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NTIzMHByb2Nlc3MuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcclxuICBjb25zdCByZXQ6IGFueSA9IHt9O1xyXG5cclxuICBmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcclxuICAgIGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgJ1xcbicpO1xyXG4gICAgcmVhbE5hbWUgPSByZWFsTmFtZSA9PT0gJ3RydWUnID8gdHJ1ZSA6IHJlYWxOYW1lID09PSAnZmFsc2UnID8gZmFsc2UgOiByZWFsTmFtZTtcclxuXHJcbiAgICBpZiAoZW52TmFtZSA9PT0gJ1ZJVEVfUFJPWFknICYmIHJlYWxOYW1lKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgcmVhbE5hbWUgPSBKU09OLnBhcnNlKHJlYWxOYW1lLnJlcGxhY2UoLycvZywgJ1wiJykpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIHJlYWxOYW1lID0gJyc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lO1xyXG4gICAgaWYgKHR5cGVvZiByZWFsTmFtZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlYWxOYW1lID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBwcm9jZXNzLmVudltlbnZOYW1lXSA9IEpTT04uc3RyaW5naWZ5KHJlYWxOYW1lKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHJldDtcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkk6XFxcXHdvcmtlclxcXFx3ZWItd3RcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkk6XFxcXHdvcmtlclxcXFx3ZWItd3RcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cXFxcaW5kZXgudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0k6L3dvcmtlci93ZWItd3QvYnVpbGQvdml0ZS9wbHVnaW4vaW5kZXgudHNcIjtpbXBvcnQgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZS1qc3gnOyAvLyBKU1hcdTUxOTlcdTZDRDVcclxuaW1wb3J0IHdpbmRpQ1NTIGZyb20gJ3ZpdGUtcGx1Z2luLXdpbmRpY3NzJzsgLy8gd2luZGlDc3NcclxuaW1wb3J0IGxlZ2FjeSBmcm9tICdAdml0ZWpzL3BsdWdpbi1sZWdhY3knOyAvLyBJRTExXHU1MTdDXHU1QkI5XHJcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnOyAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjV2dWVcdTUxNjhcdTVDNDBhcGlcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7IC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1N0VDNFx1NEVGNlxyXG5pbXBvcnQgVml0ZUltYWdlcyBmcm9tICd2aXRlLXBsdWdpbi12dWUtaW1hZ2VzJzsgLy8gXHU1RjE1XHU1MTY1XHU1NkZFXHU3MjQ3XHJcbmltcG9ydCB7IFZhbnRSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7IC8vIFx1NUYxNVx1NTE2NXZhbnRcclxuaW1wb3J0IHsgY29uZmlnU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICcuL3N2Z1Nwcml0ZSc7XHJcbmltcG9ydCBub2RlUG9seWZpbGxzIGZyb20gJ3JvbGx1cC1wbHVnaW4tcG9seWZpbGwtbm9kZSc7XHJcbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xyXG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVWaXRlUGx1Z2lucyh2aXRlRW52OiBWaXRlRW52LCBpc0J1aWxkOiBib29sZWFuKSB7XHJcbiAgY29uc3QgeyBWSVRFX0xFR0FDWSB9ID0gdml0ZUVudjtcclxuXHJcbiAgY29uc3Qgdml0ZVBsdWdpbnM6IChQbHVnaW5PcHRpb24gfCBQbHVnaW5PcHRpb25bXSlbXSA9IFtcclxuICAgIC8vIGhhdmUgdG9cclxuICAgIHZ1ZSgpLFxyXG4gICAgdnVlSnN4KCksXHJcbiAgICB2aXN1YWxpemVyKHsgb3BlbjogdHJ1ZSB9KSxcclxuICAgIHZpdGVDb21wcmVzc2lvbih7XHJcbiAgICAgIHRocmVzaG9sZDogMTAyNDAwMCwgLy8gXHU1QkY5XHU1OTI3XHU0RThFIDFtYiBcdTc2ODRcdTY1ODdcdTRFRjZcdThGREJcdTg4NENcdTUzOEJcdTdGMjlcclxuICAgIH0pLFxyXG4gIF07XHJcbiAgLy8gdml0ZS1wbHVnaW4td2luZGljc3NcclxuICB2aXRlUGx1Z2lucy5wdXNoKHdpbmRpQ1NTKCkpO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goXHJcbiAgICBWaXRlSW1hZ2VzKHtcclxuICAgICAgZGlyczogWydzcmMvYXNzZXRzL2ltYWdlcyddLCAvLyBcdTYzMDdcdTY2MEVcdTU2RkVcdTcyNDdcdTVCNThcdTY1M0VcdTc2RUVcdTVGNTVcclxuICAgICAgY3VzdG9tU2VhcmNoUmVnZXg6ICcoW2EtekEtWjAtOV9dKyknLFxyXG4gICAgfSlcclxuICApO1xyXG4gIHZpdGVQbHVnaW5zLnB1c2goXHJcbiAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgZHRzOiAndHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLCAvLyBcdTUzRUZcdTRFRTVcdTgxRUFcdTVCOUFcdTRFNDlcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdTc2ODRcdTRGNERcdTdGNkVcdUZGMENcdTlFRDhcdThCQTRcdTY2MkZcdTY4MzlcdTc2RUVcdTVGNTVcdTRFMEJcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlciddLFxyXG4gICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgL1xcLlt0al1zeD8kLywgLy8gLnRzLCAudHN4LCAuanMsIC5qc3hcclxuICAgICAgICAvXFwudnVlJC8sXHJcbiAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcclxuICAgICAgXSxcclxuICAgICAgLy8gZXNsaW50XHU2MkE1XHU5NTE5XHU4OUUzXHU1MUIzXHJcbiAgICAgIGVzbGludHJjOiB7XHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsIC8vIERlZmF1bHQgYGZhbHNlYFxyXG4gICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsIC8vIERlZmF1bHQgYC4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25gXHJcbiAgICAgICAgZ2xvYmFsc1Byb3BWYWx1ZTogdHJ1ZSwgLy8gRGVmYXVsdCBgdHJ1ZWAsICh0cnVlIHwgZmFsc2UgfCAncmVhZG9ubHknIHwgJ3JlYWRhYmxlJyB8ICd3cml0YWJsZScgfCAnd3JpdGVhYmxlJylcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgKTtcclxuICB2aXRlUGx1Z2lucy5wdXNoKFxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIC8vIFx1NjMwN1x1NUI5QVx1N0VDNFx1NEVGNlx1NEY0RFx1N0Y2RVx1RkYwQ1x1OUVEOFx1OEJBNFx1NjYyRnNyYy9jb21wb25lbnRzXHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSxcclxuICAgICAgLy8gdWlcdTVFOTNcdTg5RTNcdTY3OTBcdTU2NjhcclxuICAgICAgLy8gcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgICAgcmVzb2x2ZXJzOiBbVmFudFJlc29sdmVyKCldLFxyXG4gICAgICBleHRlbnNpb25zOiBbJ3Z1ZSddLFxyXG4gICAgICAvLyBcdTkxNERcdTdGNkVcdTY1ODdcdTRFRjZcdTc1MUZcdTYyMTBcdTRGNERcdTdGNkVcclxuICAgICAgZHRzOiAndHlwZXMvY29tcG9uZW50cy5kLnRzJyxcclxuICAgICAgLy8gXHU2NDFDXHU3RDIyXHU1QjUwXHU3NkVFXHU1RjU1XHJcbiAgICAgIGRlZXA6IHRydWUsXHJcbiAgICAgIC8vIFx1NTE0MVx1OEJCOFx1NUI1MFx1NzZFRVx1NUY1NVx1NEY1Q1x1NEUzQVx1N0VDNFx1NEVGNlx1NzY4NFx1NTQ3RFx1NTQwRFx1N0E3QVx1OTVGNFx1NTI0RFx1N0YwMFx1MzAwMiwgXHU3NkVFXHU1RjU1K1x1NTQwRFx1NUI1N1xyXG4gICAgICBkaXJlY3RvcnlBc05hbWVzcGFjZTogZmFsc2UsXHJcbiAgICB9KVxyXG4gICk7XHJcblxyXG4gIGlmIChpc0J1aWxkKSB7XHJcbiAgICBWSVRFX0xFR0FDWSAmJiB2aXRlUGx1Z2lucy5wdXNoKGxlZ2FjeSgpKTtcclxuICB9XHJcbiAgaWYgKCFpc0J1aWxkKSB7XHJcbiAgICB2aXRlUGx1Z2lucy5wdXNoKFxyXG4gICAgICBub2RlUG9seWZpbGxzKHtcclxuICAgICAgICBpbmNsdWRlOiBbJ25vZGVfbW9kdWxlcy8qKi8qLmpzJywgbmV3IFJlZ0V4cCgnbm9kZV9tb2R1bGVzLy52aXRlLy4qanMnKV0sXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjb25maWdTdmdJY29uc1BsdWdpbihpc0J1aWxkKSk7XHJcblxyXG4gIHJldHVybiB2aXRlUGx1Z2lucztcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkk6XFxcXHdvcmtlclxcXFx3ZWItd3RcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkk6XFxcXHdvcmtlclxcXFx3ZWItd3RcXFxcYnVpbGRcXFxcdml0ZVxcXFxwbHVnaW5cXFxcc3ZnU3ByaXRlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9JOi93b3JrZXIvd2ViLXd0L2J1aWxkL3ZpdGUvcGx1Z2luL3N2Z1Nwcml0ZS50c1wiOy8qKlxyXG4gKiAgVml0ZSBQbHVnaW4gZm9yIGZhc3QgY3JlYXRpbmcgU1ZHIHNwcml0ZXMuXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hbm5jd2Ivdml0ZS1wbHVnaW4tc3ZnLWljb25zXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY29uZmlnU3ZnSWNvbnNQbHVnaW4oaXNCdWlsZDogYm9vbGVhbikge1xyXG4gIGNvbnN0IHN2Z0ljb25zUGx1Z2luID0gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgaWNvbkRpcnM6IFtyZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ltYWdlcy9zdmcnKV0sIC8vIFx1NzUxRlx1NjIxMFx1N0NCRVx1NzA3NVx1NTZGRVx1NTBDRlx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxyXG4gICAgc3Znb09wdGlvbnM6IGlzQnVpbGQsIC8vIFx1NUYwMFx1NTQyRnN2Z1x1NTM4Qlx1N0YyOVx1OTE0RFx1N0Y2RVxyXG4gICAgLy8gZGVmYXVsdFxyXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgfSk7XHJcbiAgcmV0dXJuIHN2Z0ljb25zUGx1Z2luO1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiSTpcXFxcd29ya2VyXFxcXHdlYi13dFxcXFxidWlsZFxcXFx2aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJJOlxcXFx3b3JrZXJcXFxcd2ViLXd0XFxcXGJ1aWxkXFxcXHZpdGVcXFxccHJveHkudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0k6L3dvcmtlci93ZWItd3QvYnVpbGQvdml0ZS9wcm94eS50c1wiOy8qKlxyXG4gKiBVc2VkIHRvIHBhcnNlIHRoZSAuZW52LmRldmVsb3BtZW50IHByb3h5IGNvbmZpZ3VyYXRpb25cclxuICovXHJcbmltcG9ydCB0eXBlIHsgUHJveHlPcHRpb25zIH0gZnJvbSAndml0ZSc7XHJcblxyXG50eXBlIFByb3h5SXRlbSA9IFtzdHJpbmcsIHN0cmluZ107XHJcblxyXG50eXBlIFByb3h5TGlzdCA9IFByb3h5SXRlbVtdO1xyXG5cclxudHlwZSBQcm94eVRhcmdldExpc3QgPSBSZWNvcmQ8c3RyaW5nLCBQcm94eU9wdGlvbnM+O1xyXG5cclxuY29uc3QgaHR0cHNSRSA9IC9eaHR0cHM6XFwvXFwvLztcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZSBwcm94eVxyXG4gKiBAcGFyYW0gbGlzdFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVByb3h5KGxpc3Q6IFByb3h5TGlzdCA9IFtdKSB7XHJcbiAgY29uc3QgcmV0OiBQcm94eVRhcmdldExpc3QgPSB7fTtcclxuICBmb3IgKGNvbnN0IFtwcmVmaXgsIHRhcmdldF0gb2YgbGlzdCkge1xyXG4gICAgY29uc3QgaXNIdHRwcyA9IGh0dHBzUkUudGVzdCh0YXJnZXQpO1xyXG5cclxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9odHRwLXBhcnR5L25vZGUtaHR0cC1wcm94eSNvcHRpb25zXHJcbiAgICByZXRbcHJlZml4XSA9IHtcclxuICAgICAgdGFyZ2V0OiB0YXJnZXQsXHJcbiAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgd3M6IHRydWUsXHJcbiAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UobmV3IFJlZ0V4cChgXiR7cHJlZml4fWApLCAnJyksXHJcbiAgICAgIC8vIGh0dHBzIGlzIHJlcXVpcmUgc2VjdXJlPWZhbHNlXHJcbiAgICAgIC4uLihpc0h0dHBzID8geyBzZWN1cmU6IGZhbHNlIH0gOiB7fSksXHJcbiAgICB9O1xyXG4gIH1cclxuICByZXR1cm4gcmV0O1xyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiSTpcXFxcd29ya2VyXFxcXHdlYi13dFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSTpcXFxcd29ya2VyXFxcXHdlYi13dFxcXFx0b2tlbkNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vSTovd29ya2VyL3dlYi13dC90b2tlbkNvbmZpZy50c1wiOy8qKlxyXG4gKiBwcm9jZXNzLmVudi5ucG1fY29uZmlnX2FyZ3YgPT4gXHU4RkQ0XHU1NkRFIHtcInJlbWFpblwiOltdLFwiY29va2VkXCI6W1wicnVuXCIsXCJkZXZcIl0sXCJvcmlnaW5hbFwiOltcInJ1blwiLFwiZGV2XCJdfSB8IHtcInJlbWFpblwiOltdLFwiY29va2VkXCI6W1wicnVuXCIsXCJidWlsZFwiXSxcIm9yaWdpbmFsXCI6W1wicnVuXCIsXCJidWlsZFwiXX1cclxuICogcnVuVHlwZSA9PiBcdTYyNjdcdTg4NENcdTU0RUFcdTRFMkFcdTczQUZcdTU4ODNcclxuICovXHJcbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzL3Byb21pc2VzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmV4cG9ydCBjb25zdCBzZXRUb2tlbiA9IGZ1bmN0aW9uICgpOiB2b2lkIHtcclxuICBjb25zdCBkZXZlbG9wbWVudCA9ICdkZXYnO1xyXG4gIGNvbnN0IHByb2R1Y3Rpb24gPSAncHJvJztcclxuICBjb25zdCBob3N0VXJsID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2NvbmZpZy9pbmRleC50cycpO1xyXG4gIGNvbnN0IGNvbmZpZ0FyZ3YgPSBwcm9jZXNzLmVudi5ucG1fY29uZmlnX2FyZ3Y7XHJcbiAgY29uc3QgcGFyYW1zID0gcHJvY2Vzcy5hcmd2LnNwbGljZSgyKTtcclxuICBjb25zdCBydW5UeXBlID0gY29uZmlnQXJndiA/IEpTT04ucGFyc2UoY29uZmlnQXJndikuY29va2VkWzFdIDogJyc7XHJcbiAgLy8gXHU1OTgyXHU2NzlDXHU2NjJGXHU1NDJGXHU1MkE4ID0+IG5wbSBydW4gZGV2LCBcdTU5ODJcdTY3OUNcdTRGMjBcdTUzQzJcdTY2MkZkZXYgPT4gbm9kZSBzZXRUb2tlbi5qcyBkZXZcclxuICBsZXQgdHlwZSA9IHJ1blR5cGUgPyAocnVuVHlwZSA9PT0gZGV2ZWxvcG1lbnQgPyBkZXZlbG9wbWVudCA6IHByb2R1Y3Rpb24pIDogcGFyYW1zWzBdO1xyXG4gIGlmICh0eXBlID09PSAnZGV2Jykge1xyXG4gICAgdHlwZSA9ICd0ZXN0JztcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHBhcmFtc1syXSA9PT0gJ3Rlc3QnKSB7XHJcbiAgICAgIHR5cGUgPSAndGVzdCc7XHJcbiAgICB9IGVsc2UgaWYgKHBhcmFtc1syXSA9PT0gJ3ByZXBybycpIHtcclxuICAgICAgdHlwZSA9ICdwcmVwcm8nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gY29uc29sZS5lcnJvcignRVJSTDogXHU2MjY3XHU4ODRDXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHVGRjFBbm9kZSBzZXRUb2tlbi5qcyBzZXJ2ZScpO1xyXG4gICAgICB0eXBlID0gJ21haW4nO1xyXG4gICAgfVxyXG4gIH1cclxuICBjb25zdCByb3V0ZXJDb250ZW50ID0gYGltcG9ydCB7ICR7dHlwZX0gfSBmcm9tICcuL3Rva2VuJztcXG5leHBvcnQgZGVmYXVsdCAke3R5cGV9O1xcbmA7XHJcbiAgZnMud3JpdGVGaWxlKGhvc3RVcmwsIHJvdXRlckNvbnRlbnQpO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsU0FBUyxlQUFlO0FBQ3hCLFNBQVMsV0FBQUEsZ0JBQWU7OztBQ0RqQixTQUFTLFdBQVcsU0FBOEI7QUFDdkQsUUFBTSxNQUFXLENBQUM7QUFFbEIsYUFBVyxXQUFXLE9BQU8sS0FBSyxPQUFPLEdBQUc7QUFDMUMsUUFBSSxXQUFXLFFBQVEsU0FBUyxRQUFRLFFBQVEsSUFBSTtBQUNwRCxlQUFXLGFBQWEsU0FBUyxPQUFPLGFBQWEsVUFBVSxRQUFRO0FBRXZFLFFBQUksWUFBWSxnQkFBZ0IsVUFBVTtBQUN4QyxVQUFJO0FBQ0YsbUJBQVcsS0FBSyxNQUFNLFNBQVMsUUFBUSxNQUFNLEdBQUcsQ0FBQztBQUFBLE1B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TSxFQUFFLFdBQVcsWUFBWSxpQkFBaUIsSUFBSTtBQUVwRCxRQUFNLFVBQVUsWUFBWTtBQUM1QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTjtBQUFBLElBQ0EsU0FBUyxrQkFBa0IsU0FBUyxPQUFPO0FBQUEsSUFDM0MsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BRU4sT0FBTyxZQUFZLFVBQVU7QUFBQSxJQUMvQjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxZQUFZLEtBQUssSUFBSTtBQUFBLFFBQ3BDO0FBQUEsUUFFQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sYUFBYSxZQUFZLE9BQU8sSUFBSTtBQUFBLFFBQ3RDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLFdBQVc7QUFBQSxNQUNYLHVCQUF1QjtBQUFBLE1BQ3ZCLGVBQWU7QUFBQSxRQUViLFVBQVU7QUFBQSxVQUVSLGNBQWM7QUFBQSxVQUVkLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUViLFNBQVMsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLFVBQVUsUUFBUSxFQUFFLENBQUMsR0FBR0MsZUFBYyxDQUFDO0FBQUEsUUFDbkUsUUFBUTtBQUFBLFVBS04sYUFBYSxJQUFJLEVBQUUsZUFBZSxhQUFhLEdBQUc7QUFDaEQsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTztBQUFBLFlBQ1Q7QUFBQSxVQUNGO0FBQUEsVUFFQSxnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQSxVQUVoQixnQkFBZ0IsQ0FBQyxjQUFjO0FBeEZ6QztBQTBGWSxrQkFBTSxXQUFTLGVBQVUsU0FBVixtQkFBZ0IsU0FBUyxXQUFVLFFBQVE7QUFDMUQsbUJBQU8sVUFBVTtBQUFBLFVBQ25CO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLFFBQ2YseUJBQXlCO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJyZXNvbHZlIiwgInBhdGgiLCAibm9kZVBvbHlmaWxscyIsICJyZXNvbHZlIiwgIm5vZGVQb2x5ZmlsbHMiXQp9Cg==
