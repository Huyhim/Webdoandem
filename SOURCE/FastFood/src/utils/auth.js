import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';

const getQueryParams = () => {
  const params = {};
  window.location.href.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    params[$1] = $3;
  });
  return params;
};

export const extractInfoFromHash = () => {
  if (!process.browser) {
    return undefined;
  }
  const { id_token, state } = getQueryParams();
  return { token: id_token, secret: state };
};

export const setToken = token => {
  if (!process.browser) {
    return;
  }
  Cookie.set('user-web', jwtDecode(token));
  Cookie.set('jwt-web', token);
};

export const unsetToken = () => {
  if (!process.browser) {
    return;
  }
  Cookie.remove('jwt-web');
  Cookie.remove('user-web');
  Cookie.remove('secret-web');

  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now());
};

export const getUserFromServerCookie = req => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt-web='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwtDecode(jwt);
};

export const getUserFromLocalCookie = () => {
  return Cookie.getJSON('user-web');
};

export const getTokenFromServerCookie = req => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt-web='));
  if (!jwtCookie) {
    return undefined;
  }
  const jwt = jwtCookie.split('=')[1];
  return jwt;
};

export const getTokenFromLocalCookie = () => {
  return Cookie.get('user-web');
};

export const setSecret = secret => Cookie.set('secret-web', secret);

export const checkSecret = secret => Cookie.get('secret-web') === secret;
