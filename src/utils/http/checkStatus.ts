import type { ErrorMessageMode } from './axiosType';
import { useI18n } from '/@/hooks/web/useI18n';
/**
 * 检查状态返回
 * @param {number} status // 错误返回的状态码
 * @param {string} msg // 错误返回的状态码message
 * @param {string}  errorMessageMode // 提示类型 none | message | modal
 * 401: '用户没有权限（令牌、用户名、密码错误）!',
 * 403: '用户得到授权，但是访问是被禁止的。!',
 * 404: '网络请求错误,未找到该资源!',
 * 405: '网络请求错误,请求方法未允许!',
 * 408: '网络请求超时!',
 * 500: '服务器错误,请联系管理员!',
 * 501: '网络未实现!',
 * 502: '网络错误!',
 * 503: '服务不可用，服务器暂时过载或维护!',
 * 504: '网络超时!',
 * 505: 'http版本不支持该请求!',
 */
export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message'): void {
  const { t } = useI18n();
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    // 401: Not logged in
    // Jump to the login page if not logged in, and carry the path of the current page
    // Return to the current page after successful login. This step needs to be operated on the login page.
    case 401:
      errMessage = '用户没有权限（令牌、用户名、密码错误）!';
      break;
    case 403:
      errMessage = '用户得到授权，但是访问是被禁止的。!';
      break;
    // 404请求不存在
    case 404:
      errMessage = '网络请求错误,未找到该资源!';
      break;
    case 405:
      errMessage = '网络请求错误,请求方法未允许!';
      break;
    case 408:
      errMessage = '网络请求超时!';
      break;
    case 500:
      errMessage = '服务器错误,请联系管理员!';
      break;
    case 501:
      errMessage = '网络未实现!';
      break;
    case 502:
      errMessage = '网络错误!';
      break;
    case 503:
      errMessage = '服务不可用，服务器暂时过载或维护!';
      break;
    case 504:
      errMessage = '网络超时!';
      break;
    case 505:
      errMessage = 'http版本不支持该请求!';
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      console.log('modal', errMessage, `global_error_message_status_${status}`);
    } else if (errorMessageMode === 'message') {
      console.log('modal', errMessage, `global_error_message_status_${status}`);
    }
  }
}
