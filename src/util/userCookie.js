import Cookies from 'js-cookie';

// 设置cookie
/**
 *
 * @param {object} info
 * @returns
 */
export function setCookie(info) {
  const arr = Object.entries(info);
  arr.forEach((item) => {
    Cookies.set(item[0], item[1]);
  });
  return true;
}

// 获取用户信息

export function getUserCookie() {
  return {
    username: Cookies.get('username'),
    appkey: Cookies.get('appkey'),
    role: Cookies.get('role'),
    email: Cookies.get('email'),
  };
}

// 删除cookie

export function removeUserCookie() {
  Cookies.remove('username');
  Cookies.remove('appkey');
  Cookies.remove('role');
  Cookies.remove('email');
  return true;
}
