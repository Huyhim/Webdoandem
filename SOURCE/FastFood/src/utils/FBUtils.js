export function initFB(id) {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId: id,
      cookie: true,
      xfbml: true,
      version: 'v3.1'
    });

    // window.FB.getLoginStatus(function(response) {
    //   statusChangeCallback(response);
    // });
  };
  (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}
export function loginFB(callBack) {
  window.FB.login(function(response) {
    if (response.status === 'connected') {
      callBack(response);
    } else {
      allBack('err');
      ////console.log('window.FB.login err');
    }
  });
}
export function shareFB(url) {
  const path = url;

  window.FB.ui(
    {
      method: 'share',
      href: path
    },
    function(response) {}
  );
}
export function shareGoole(url) {
  const path = 'https://plus.google.com/share?url=' + url;

  window.open(path);
}
