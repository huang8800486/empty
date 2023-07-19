import type { App } from 'vue';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import Sticky from 'vue3-sticky-directive';
import VueSocialSharing from 'vue-social-sharing';
// import VueVideoPlayer from '@videojs-player/vue';
// import 'video.js/dist/video-js.css';
import VWave from 'v-wave';
export function setupPlugin(app: App<Element>) {
  app.use(Toast, { draggable: false, timeout: 2000, pauseOnHover: false, closeOnClick: false, showCloseButtonOnHover: false });
  app.use(VWave, { color: '#8b785c', initialOpacity: 0.5, easing: 'ease-in' });
  app.use(VueSocialSharing);
  app.use(Sticky);
  // app.use(VueVideoPlayer);
}
