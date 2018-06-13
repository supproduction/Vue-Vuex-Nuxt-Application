'use strict';
/**
 * getHeight - for elements with display:none
 */
let slideDown;
let slideUp;
export function downSlide(el, animTime) {
    let style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
    if(style.display === 'none' && el.offsetHeight === 0) {
      let el_height  = 0;
      let el_marginTop = 0;
      let starttime = performance.now();

      el.style.position = 'fixed';
      el.style.visibility = 'hidden';
      el.style.display = 'block';

      el_height = el.offsetHeight;
      el_marginTop = parseInt(style.marginTop);

      el.style.display = '';
      el.style.position = '';
      el.style.visibility = '';
      el.style.marginTop = '0';
      el.style.height = '0';

      function animate(duration) {
        // let timestamp = timestamp || new Date().getTime();
        slideDown = requestAnimationFrame(function animate(timestamp) {
          let runtime = timestamp - starttime;
          let progress = runtime / duration;
          if (progress < 1) {
            el.style.display = 'block';
            el.style.overflowY = 'hidden';
            el.style.marginTop = el_marginTop * progress + 'px';
            el.style.height = el_height * progress + 'px';
            requestAnimationFrame(animate);
          } else {
            el.style.overflowY = '';
            el.style.marginTop = '';
            el.style.height = '';
          }
        });
      }
      animate(animTime);
    }
};

export function upSlide(el, animTime) {
  let style = window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle;
  if(style.display !== 'none' && el.offsetHeight !== 0) {
    let height, el_height  = el.offsetHeight;
    let margin, el_marginTop = parseInt(style.marginTop);
    let starttime = performance.now();

    function animate(duration) {
      // let timestamp = timestamp || new Date().getTime();
      slideUp = requestAnimationFrame(function animate(timestamp) {
        let runtime = timestamp - starttime;
        let progress = runtime / duration;
        if (progress < 1) {
          let currentMargin = el_marginTop - (el_marginTop * progress);
          let currentHeight = el_height - (el_height * progress);
          margin = currentMargin <= el_marginTop ? currentMargin : el_marginTop;
          height = currentHeight <= el_height ? currentHeight : el_height;

          el.style.overflowY = 'hidden';
          el.style.marginTop = margin + 'px';
          el.style.height    = height + 'px';
          requestAnimationFrame(animate);
        } else {
          el.style.display = 'none';
          el.style.overflowY = '';
          el.style.marginTop = '';
          el.style.height    = '';
        }
      });
    }

    animate(animTime);
  }
};

export function toggleSlide(el, animTime) {
  upSlide(el, animTime);
  downSlide(el, animTime);
};
