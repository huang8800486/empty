import { genMessage } from '../useMessage';

// const modules: Record<string, any> = import.meta.globEager('./zh-CN/**/*.ts'); // globEager已弃用
const modules: Record<string, any> = import.meta.glob('./ko-KR/**/*.ts', { eager: true });
export default {
  message: {
    ...genMessage(modules, 'ko-KR'),
  },
};
