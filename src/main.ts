import 'virtual:svg-icons-register';
import './polyfills';
import { app } from './mount';
import 'animate.css';
import '@/assets/styles/index.styl';
import { setupRouter } from '/@/router';
import { setupStore } from '/@/store';
import { setupI18n } from '/@/locales/setupI18n';
import { setupPlugin } from '/@/utils/plugin';

async function bootstrap() {
  // 手机rem
  // setupRem();

  // 注册路由
  setupRouter(app);

  // 配置 store
  setupStore(app);

  // 注册第三方插件
  setupPlugin(app);

  // 国际化
  await setupI18n(app);

  app.mount('#app');
}
bootstrap();
