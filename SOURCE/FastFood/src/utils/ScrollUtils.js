export function onScrollEnd(window, document, callBack) {
  window.onscroll = function() {
    var d = document.documentElement;
    var offset = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    if (offset === height) {
      callBack();
    }
  };
}
