import { set } from 'lodash-es';

/**
 * 合并目录多个文件夹, 并与文件名做为key的值, 如 common.ts 调用$t('common.??')
 * @param langs // 文件
 * @param prefix // 某个目录下, 如en目录下
 * @returns
 */
export function genMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {};
  // 循环langs文件集, 如: zh-CN目录, en目录
  Object.keys(langs).forEach((key) => {
    // 如: key值为/en/common.ts | ./en/wallet.ts
    const langFileModule = langs[key].default;
    // fileName 为 common.ts | wallet.ts处理后变成 common | wallet
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    // ojbKey未知, 不知道怎么用
    const keyList = fileName.split('/');
    const moduleName = keyList.shift();
    const objKey = keyList.join('.');

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {});
        set(obj[moduleName], objKey, langFileModule);
      } else {
        set(obj, moduleName, langFileModule || {});
      }
    }
  });
  // {common: {…}, wallet: {…}}
  return obj;
}
