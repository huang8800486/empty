import { genMessage } from '../useMessage';

// const modules: Record<string, any> = import.meta.globEager('./en-US/**/*.ts'); // globEager已弃用
const modules: Record<string, any> = import.meta.glob('./en-US/**/*.ts', { eager: true });
export default {
  message: {
    ...genMessage(modules, 'en-US'),
  },
};
