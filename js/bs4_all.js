var VueApp, helper, orderModalApp, tracker;

helper = {
  getParameterByName: function(name, url) {
    var regex, results;
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
    results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
};

$(document).ready(function() {
  var counter, isTimeToUpdate, mouse, moveImg, moveImgS, onMouseEnterHandler, onMouseLeaveHandler, onMouseMoveHandler, perspectiveWall, update, updateRate, updateTransformStyle;
  perspectiveWall = document.getElementById('perspectiveWall');
  moveImg = document.getElementById('moveImg');
  moveImgS = document.getElementById('moveImgS');
  if (perspectiveWall) {
    mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function(event) {
        var e;
        e = event || window.event;
        this.x = e.clientX - this._x;
        return this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        return this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function() {
        return "(" + this.x + ", " + this.y + ")";
      }
    };
    mouse.setOrigin(perspectiveWall);
    counter = 0;
    updateRate = 10;
    isTimeToUpdate = function() {
      return counter++ % updateRate === 0;
    };
    onMouseEnterHandler = function(event) {
      return update(event);
    };
    onMouseLeaveHandler = function() {
      moveImg.style = "";
      return moveImgS.style = "";
    };
    onMouseMoveHandler = function(event) {
      if (isTimeToUpdate()) {
        return update(event);
      }
    };
    update = function(event) {
      mouse.updatePosition(event);
      return updateTransformStyle((mouse.y / moveImg.offsetHeight / 2).toFixed(2), (mouse.x / moveImg.offsetWidth / 2).toFixed(2));
    };
    updateTransformStyle = function(x, y) {
      var style, styleS;
      style = "translateX(" + (-37 * Number(x) * Number(y)) + "px) rotate(" + Number(x) * Number(y) + "deg)";
      styleS = "translateX(" + (37 * Number(x) * Number(y)) + "px) rotate(" + -Number(x) * Number(y) + "deg)";
      moveImg.style.transform = style;
      moveImg.style.webkitTransform = style;
      moveImg.style.mozTransform = style;
      moveImg.style.msTransform = style;
      moveImg.style.oTransform = style;
      moveImgS.style.transform = styleS;
      moveImgS.style.webkitTransform = styleS;
      moveImgS.style.mozTransform = styleS;
      moveImgS.style.msTransform = styleS;
      return moveImgS.style.oTransform = styleS;
    };
    perspectiveWall.onmouseenter = onMouseEnterHandler;
    perspectiveWall.onmouseleave = onMouseLeaveHandler;
    return perspectiveWall.onmousemove = onMouseMoveHandler;
  }
});

$(document).ready(function() {
  var changeActice, nowPage;
  changeActice = function(target) {
    $('.bookmark').removeClass('active');
    return $(target).addClass('active');
  };
  nowPage = 1;
  $('#firstLabel').on('click', function(event) {
    changeActice('#firstLabel');
    $('#third').css('visibility', 'visible');
    if (nowPage === 2) {
      $('#second').css('msTransform', 'rotateY(0deg)');
      $('#second').css('webkitTransform', 'rotateY(0deg)');
      $('#second').css('transform', 'rotateY(0deg)');
    } else if (nowPage === 3) {
      $('#second').css('msTransform', 'rotateY(0deg)');
      $('#second').css('webkitTransform', 'rotateY(0deg)');
      $('#second').css('transform', 'rotateY(0deg)');
      $('#fourth').css('msTransform', 'rotateY(0deg)');
      $('#fourth').css('webkitTransform', 'rotateY(0deg)');
      $('#fourth').css('transform', 'rotateY(0deg)');
    } else {
      $('#second').css('msTransform', 'rotateY(0deg)');
      $('#second').css('webkitTransform', 'rotateY(0deg)');
      $('#second').css('transform', 'rotateY(0deg)');
      $('#fourth').css('msTransform', 'rotateY(0deg)');
      $('#fourth').css('webkitTransform', 'rotateY(0deg)');
      $('#fourth').css('transform', 'rotateY(0deg)');
      $('#six').css('msTransform', 'rotateY(0deg)');
      $('#six').css('webkitTransform', 'rotateY(0deg)');
      $('#six').css('transform', 'rotateY(0deg)');
    }
    return nowPage = 1;
  });
  $('#secondLabel').on('click', function(event) {
    changeActice('#secondLabel');
    if (nowPage === 1) {
      $('#third').css('visibility', 'visible');
      $('#second').css('msTransform', 'rotateY(-180deg)');
      $('#second').css('webkitTransform', 'rotateY(-180deg)');
      $('#second').css('transform', 'rotateY(-180deg)');
    } else if (nowPage === 3) {
      $('#third').css('visibility', 'hidden');
      $('#fifth').css('visibility', 'visible');
      $('#fourth').css('msTransform', 'rotateY(0deg)');
      $('#fourth').css('webkitTransform', 'rotateY(0deg)');
      $('#fourth').css('transform', 'rotateY(0deg)');
    } else if (nowPage === 4) {
      $('#third').css('visibility', 'hidden');
      $('#fifth').css('visibility', 'visible');
      $('#eight').css('visibility', 'hidden');
      $('#fourth').css('msTransform', 'rotateY(0deg)');
      $('#fourth').css('webkitTransform', 'rotateY(0deg)');
      $('#fourth').css('transform', 'rotateY(0deg)');
      $('#sixth').css('msTransform', 'rotateY(0deg)');
      $('#sixth').css('webkitTransform', 'rotateY(0deg)');
      $('#sixth').css('transform', 'rotateY(0deg)');
    }
    return nowPage = 2;
  });
  $('#thirdLabel').on('click', function(event) {
    changeActice('#thirdLabel');
    $('#third').css('visibility', 'hidden');
    $('#fifth').css('visibility', 'visible');
    if (nowPage === 2) {
      $('#third').css('visibility', 'hidden');
      $('#fifth').css('visibility', 'visible');
      $('#fourth').css('msTransform', 'rotateY(-180deg)');
      $('#fourth').css('webkitTransform', 'rotateY(-180deg)');
      $('#fourth').css('transform', 'rotateY(-180deg)');
      $('#sixth').css('msTransform', 'rotateY(0)');
      $('#sixth').css('webkitTransform', 'rotateY(0)');
      $('#sixth').css('transform', 'rotateY(0)');
    } else if (nowPage === 4) {
      $('#third').css('visibility', 'hidden');
      $('#fifth').css('visibility', 'hidden');
      $('#eight').css('visibility', 'visible');
      $('#sixth').css('msTransform', 'rotateY(0)');
      $('#sixth').css('webkitTransform', 'rotateY(0)');
      $('#sixth').css('transform', 'rotateY(0)');
    } else {
      $('#second').css('msTransform', 'rotateY(-180deg)');
      $('#second').css('webkitTransform', 'rotateY(-180deg)');
      $('#second').css('transform', 'rotateY(-180deg)');
      $('#fourth').css('msTransform', 'rotateY(-180deg)');
      $('#fourth').css('webkitTransform', 'rotateY(-180deg)');
      $('#fourth').css('transform', 'rotateY(-180deg)');
      $('#sixth').css('msTransform', 'rotateY(0)');
      $('#sixth').css('webkitTransform', 'rotateY(0)');
      $('#sixth').css('transform', 'rotateY(0)');
    }
    return nowPage = 3;
  });
  $('#fourthLabel').on('click', function(event) {
    changeActice('#fourthLabel');
    if (nowPage === 3) {
      $('#third').css('visibility', 'hidden');
      $('#fifth').css('visibility', 'hidden');
      $('#eight').css('visibility', 'visible');
      $('#sixth').css('msTransform', 'rotateY(-180deg)');
      $('#sixth').css('webkitTransform', 'rotateY(-180deg)');
      $('#sixth').css('transform', 'rotateY(-180deg)');
    } else {
      $('#second').css('msTransform', 'rotateY(-180deg)');
      $('#second').css('webkitTransform', 'rotateY(-180deg)');
      $('#second').css('transform', 'rotateY(-180deg)');
      $('#fourth').css('msTransform', 'rotateY(-180deg)');
      $('#fourth').css('webkitTransform', 'rotateY(-180deg)');
      $('#fourth').css('transform', 'rotateY(-180deg)');
      $('#sixth').css('msTransform', 'rotateY(-180deg)');
      $('#sixth').css('webkitTransform', 'rotateY(-180deg)');
      $('#sixth').css('transform', 'rotateY(-180deg)');
    }
    return nowPage = 4;
  });
  $('.landing-combined.z_js-js_core-react').hide();
  $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').hide();
  $('.landing-combined-select.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').on('change', function(event) {
    var target;
    target = event.target.value;
    if (target === 'z_html_jQuery_rwd_bs5_js-plus_js-core_react') {
      $('.landing-combined.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').hide();
      return $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').fadeIn();
    } else if (target === 'z_html_jQuery_rwd_bs4_js-plus_js-core_vue3') {
      $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').hide();
      return $('.landing-combined.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').fadeIn();
    }
  });
  $('.landing-combined-select.z_js-plus_js-core_vue3').on('change', function(event) {
    var target;
    target = event.target.value;
    if (target === 'z_js-js_core-react') {
      $('.landing-combined.z_js-plus_js-core_vue3').hide();
      return $('.landing-combined.z_js-js_core-react').fadeIn();
    } else if (target === 'z_js-plus_js-core_vue3') {
      $('.landing-combined.z_js-js_core-react').hide();
      return $('.landing-combined.z_js-plus_js-core_vue3').fadeIn();
    }
  });
});

$(document).ready(function() {
  var counter, isTimeToUpdate, mouse, moveImg, moveImg2, moveImgS, onMouseEnterHandler, onMouseLeaveHandler, onMouseMoveHandler, perspectiveWall, update, updateRate, updateTransformStyle;
  perspectiveWall = document.getElementById('perspectiveWallgit');
  moveImg = document.getElementById('moveImggit');
  moveImg2 = document.getElementById('moveImggit2');
  moveImgS = document.getElementById('moveImgSgit');
  if (perspectiveWall) {
    mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function(event) {
        var e;
        e = event || window.event;
        this.x = e.clientX - this._x;
        return this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        return this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function() {
        return "(" + this.x + ", " + this.y + ")";
      }
    };
    mouse.setOrigin(perspectiveWall);
    counter = 0;
    updateRate = 10;
    isTimeToUpdate = function() {
      return counter++ % updateRate === 0;
    };
    onMouseEnterHandler = function(event) {
      return update(event);
    };
    onMouseLeaveHandler = function() {
      moveImg.style.transform = "";
      moveImg2.style.transform = "";
      return moveImgS.style.transform = "translateY(25px)";
    };
    onMouseMoveHandler = function(event) {
      if (isTimeToUpdate()) {
        return update(event);
      }
    };
    update = function(event) {
      mouse.updatePosition(event);
      return updateTransformStyle((mouse.y / moveImg.offsetHeight / 2).toFixed(2), (mouse.x / moveImg.offsetWidth / 2).toFixed(2));
    };
    updateTransformStyle = function(x, y) {
      var style, style2, styleS;
      style = "translateX(" + (-100 * Number(x) * Number(y)) + "px)";
      styleS = "translateX(" + (500 * Number(x) * Number(y)) + "px) translateY(25px)";
      style2 = "translateX(" + (300 * Number(x) * Number(y)) + "px) rotate(" + (30 * Number(x) * Number(y)) + "deg) translateY( " + 50 * Number(y) + "px)";
      moveImg.style.transform = style;
      moveImg.style.webkitTransform = style;
      moveImg.style.mozTransform = style;
      moveImg.style.msTransform = style;
      moveImg.style.oTransform = style;
      moveImg2.style.transform = style2;
      moveImg2.style.webkitTransform = style2;
      moveImg2.style.mozTransform = style2;
      moveImg2.style.msTransform = style2;
      moveImg2.style.oTransform = style2;
      moveImgS.style.transform = styleS;
      moveImgS.style.webkitTransform = styleS;
      moveImgS.style.mozTransform = styleS;
      moveImgS.style.msTransform = styleS;
      return moveImgS.style.oTransform = styleS;
    };
    perspectiveWall.onmouseenter = onMouseEnterHandler;
    perspectiveWall.onmouseleave = onMouseLeaveHandler;
    return perspectiveWall.onmousemove = onMouseMoveHandler;
  }
});

$(document).ready(function() {
  var arr, intervalId, mediaQuery, sassSwiper, swiper, swiperUI;
  $('#orderModal').on('show.bs.modal', function(event) {
    var button, data;
    button = $(event.relatedTarget);
    $('#myModal').removeData('bs.modal');
    data = {
      promotionsTerms: button.data('promotions'),
      price: button.data('price'),
      title: button.data('title'),
      paylink: button.data('paylink'),
      coupon: button.data('coupon')
    };
    return orderModalApp.text = data;
  });
  swiper = new Swiper('.carousel-comic', {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    effect: 'fade'
  });
  swiperUI = new Swiper('.carousel-ui', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    slidesPerView: 3,
    spaceBetween: 30,
    allowSlideNext: false,
    allowSlidePrev: false,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
        allowSlideNext: true,
        allowSlidePrev: true
      }
    }
  });
  arr = ['6F', '5F', '4F', '3F', '2F', '1F', 'B1'];
  sassSwiper = new Swiper('.sass-floor', {
    direction: 'vertical',
    initialSlide: 7,
    autoplay: {
      loop: true,
      delay: 3000,
      reverseDirection: true
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
      renderBullet: function(index, className) {
        return '<span class="' + className + '">' + arr[index] + '</span>';
      }
    },
    on: {
      transitionEnd: function() {
        if (this.currentBreakpoint === '768') {
          if (this.activeIndex === 6 || this.activeIndex === 0) {
            return sassSwiper.allowTouchMove = false;
          }
        }
      }
    },
    breakpoints: {
      768: {
        autoplay: false,
        touchEventsTarget: 'wrapper',
        setWrapperSize: true,
        initialSlide: 0,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
          renderBullet: function(index, className) {
            return '<span class="' + className + '">' + arr[arr.length - index - 1] + '</span>';
          }
        },
        mousewheelControl: false
      }
    }
  });
  mediaQuery = window.matchMedia("(min-width: 767px)");
  intervalId = '';
  $('.sass-slide').mouseover(function() {
    if (mediaQuery.matches) {
      return sassSwiper.autoplay.stop();
    }
  });
  $('.sass-slide').mouseout(function() {
    if (mediaQuery.matches) {
      return sassSwiper.autoplay.start();
    }
  });
  $(window).scroll(function() {
    return $('.sass-floor').each(function() {
      var scrollPos, target, targetHeight, targetPos;
      scrollPos = $(window).scrollTop();
      target = $(this);
      targetPos = $(target).offset().top;
      targetHeight = $(target).outerHeight();
      if (targetPos - 1 <= scrollPos && (targetPos + targetHeight) > scrollPos) {
        return sassSwiper.allowTouchMove = true;
      }
    });
  });
});

orderModalApp = new Vue({
  el: '#orderModal',
  data: {
    text: {}
  }
});

$(document).ready(function() {
  return $(window).scroll(function() {
    var navTarget, navtargetPos, scrollPos, windowHeight;
    scrollPos = $(window).scrollTop();
    windowHeight = $(window).height();
    navTarget = $('#thanks-2019-salary');
    if (navTarget.length > 0) {
      navtargetPos = $(navTarget).offset().top;
      if (navtargetPos - 200 <= scrollPos) {
        return $('.progress-bar').addClass('animate');
      }
    }
  });
});

$(document).ready(function() {
  var swiper, vue_review_swiper;
  swiper = new Swiper('.swiper-training', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  vue_review_swiper = new Swiper('.swiper-vue-training-review', {
    direction: 'vertical',
    mousewheelControl: true,
    slidesPerView: 4,
    spaceBetween: 15,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    }
  });
  swiper = new Swiper('.swiper-js-training-1st-student-works', {
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination'
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });
  swiper = new Swiper('.ui-training-works', {
    effect: 'coverflow',
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 100,
      depth: 200,
      modifier: 1,
      slideShadows: true
    },
    slidesPerView: 1.5,
    spaceBetween: 30,
    navigation: {
      nextEl: '.ui-training-works-next',
      prevEl: '.ui-training-works-prev'
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });
  swiper = new Swiper('.ui-training-comment', {
    freeMode: true,
    loop: true,
    slidesPerView: 4.2,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination'
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    breakpoints: {
      476: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      968: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 20
      }
    }
  });
  $('#trainingHW').on('click', function(event) {
    var checkValue;
    checkValue = $(this)[0].checked;
    if (checkValue) {
      return $('#trainingBuyBtn').removeClass('disabled');
    } else {
      return $('#trainingBuyBtn').addClass('disabled');
    }
  });
  $('.training-checked').on('click', function(event) {
    var checkValue;
    checkValue = $(this)[0].checked;
    if (checkValue) {
      return $(this).parent().next().removeClass('disabled');
    } else {
      return $(this).parent().next().addClass('disabled');
    }
  });
});

Vue.component('slide-reviews', {
  template: "<div>\n  <div style=\"height: 250px; overflow: hidden;\" class=\"swiper-container slide-reviews\">\n    <div style=\"font-size: 1.5em;\" class=\"centered text-xs-center\"><span class=\"loading loading-primary\"></span></div>\n    <div class=\"swiper-pagination\"></div>\n    <div class=\"swiper-wrapper\">\n      <div v-for=\"(item, index) in vue3Data\" style=\"width: 98%;\" class=\"swiper-slide b-3\" v-if=\"vue3\">\n        <div class=\"text-xs-left\">\n          <blockquote class=\"m-0\">\n            <div><strong>{{ item.user.display_name }}</strong><span class=\"text-warning ml-2\"><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i></span></div>\n            <div>{{ item.content }}</div>\n          </blockquote>\n        </div>\n      </div>\n      <div v-for=\"(item, index) in courseData\" style=\"width: 98%;\" class=\"swiper-slide b-3\">\n        <div class=\"text-xs-left\">\n          <blockquote class=\"m-0\">\n            <div><strong>{{ item.user.display_name }}</strong><span class=\"text-warning ml-2\"><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i><i class=\"fa fa-star\"></i></span></div>\n            <div>{{ item.content }}</div>\n          </blockquote>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>",
  props: ['vue3'],
  data: function() {
    return {
      data: {},
      courseData: {},
      vue3Data: [
        {
          user: {
            display_name: '陳清誠'
          },
          content: '老師上課簡單易懂，課程架構清楚且邏輯清晰，相當推薦！（建議語速可以調至1.25/1.5）'
        }, {
          user: {
            display_name: '張志銘'
          },
          content: '老師和助教講解非常詳細'
        }, {
          user: {
            display_name: 'Daisord Isord'
          },
          content: '整個學習中漸進的熟悉 Vue 的使用，且作業題目安排適切，更加深對 Vue 的使用'
        }, {
          user: {
            display_name: '奕濡 藍'
          },
          content: '完整的解說 Vue 強大之處以及應用，非常推薦'
        }, {
          user: {
            display_name: 'yihao chang'
          },
          content: '課程講解的很詳盡，課程問題也很盡心盡力為學員回覆，很有耐心~受益良多'
        }, {
          user: {
            display_name: 'Lynn Huang'
          },
          content: '教材準備很充足，老師講解清晰，不會拖泥帶水。'
        }, {
          user: {
            display_name: '蔡名彥'
          },
          content: '內容多樣，從淺至深，老師非常用心，很適合想學 Vue 的人來上'
        }, {
          user: {
            display_name: 'Su 蘇'
          },
          content: '老師的講解都非常到位，很迅速就能掌握基本的重點，而且課程中能大量串接 api 設計屬於自己的作品，不過 JavaScript 還是要熟悉一些會比較好上手，學完之後真的受益良多。'
        }, {
          user: {
            display_name: 'Jia-Wei Liang'
          },
          content: '非常充實，即使目前是邊做邊學的狀態，也能及時補上很多書本及網路教學沒補充到的知識'
        }, {
          user: {
            display_name: '宇軒 蔡'
          },
          content: '本課程不太適合初心者，但如果你是具備一些 JavaScript 觀念的人，這門課程很適合你，這門課程具備了相當程度的實作課程，相當划算！'
        }, {
          user: {
            display_name: '黃英鳴 Huang'
          },
          content: '老師手把手的由淺入深講講解每個重要的觀念， 在學習完每個章節後都可以透過範例跟著練習， 有出一些作業幫助學習者檢視是不是真的知道如何把學到的觀念運用在實作上， 除了能了解與後端在串接資料上的細節與驗證權限外， 還提供客製化的 API 讓每個人都能做出專屬於自己的作品， 可以看出一定花了非常多的心思與時間在準備這堂課程！'
        }, {
          user: {
            display_name: 'Anna Huang'
          },
          content: '第一次上志誠老師的課，想不到課堂解說“超級清楚”，非常有條理！之前曾經零零碎碎地學了一些Vue的課程，但這堂課是最清楚也最完整的！這堂課跟之前的”JavaScript入門“一樣精彩，六角學院的教學真的很厲害，總是能將複雜的概念解說地讓人容易理解。很開心買到這堂課，推薦給還在猶豫的同學！'
        }
      ]
    };
  },
  methods: {
    getCourseData: function() {
      var vm;
      vm = this;
      vm.courseData = [];
      $.each(vm.data, function(key, courses) {
        if (courses.review.count) {
          return $.each(courses.review.results, function(i, review) {
            return vm.courseData.push(review);
          });
        }
      });
      return vm.renderReviewSwiper();
    },
    renderReviewSwiper: function() {
      return setTimeout(function() {
        var swiper;
        return swiper = new Swiper('.slide-reviews', {
          pagination: '.swiper-pagination',
          paginationType: 'progress',
          direction: 'vertical',
          mousewheelControl: true,
          spaceBetween: 15,
          slidesPerView: 'auto',
          slideClass: 'swiper-slide',
          autoplayDisableOnInteraction: false,
          autoplay: {
            delay: 2000
          }
        });
      }, 1500);
    }
  },
  mounted: function() {
    var vm;
    vm = this;
    return vm.$parent.$on('slideReviewsData', function(data) {
      vm.data = data;
      return vm.getCourseData();
    });
  }
});

VueApp = new Vue({
  el: '#app',
  data: function() {
    return {
      rightCoupon: {
        course: {},
        coupon_code: ''
      },
      udemyRightCoupon: {},
      udemyCouponData: {},
      couponData: {},
      courseData: {
        'bootstrap': {
          detail: {
            num_subscribers: 0
          }
        }
      },
      course: {}
    };
  },
  methods: {
    getUseCoupon: function() {
      var originPriceCoupon, priceCoupon, today, vm;
      vm = this;
      priceCoupon = vm.couponData.price;
      originPriceCoupon = vm.couponData.origin_price;
      today = moment().format('YYYY-MM-DD');
      $.each(priceCoupon, function(i, data) {
        var dateData;
        dateData = data.date;
        return $.each(dateData, function(i, day) {
          if (moment(today).isAfter(day.start_at) && moment(today).isBefore(day.ended_at)) {
            vm.rightCoupon = data;
          }
        });
      });
      if (Object.keys(vm.rightCoupon).length === 0) {
        return vm.rightCoupon = originPriceCoupon;
      }
    },
    getUseUdemyCoupon: function() {
      var priceCoupon, today, vm;
      vm = this;
      priceCoupon = vm.udemyCouponData.price;
      today = moment().format('YYYY-MM-DD');
      $.each(priceCoupon, function(i, data) {
        var dateData;
        dateData = data.date;
        if (moment(today).isAfter(dateData.start_at) && moment(today).isBefore(dateData.ended_at)) {
          vm.udemyRightCoupon = data;
        }
      });
      if (Object.keys(vm.udemyRightCoupon).length === 0) {
        return vm.udemyRightCoupon = '';
      }
    },
    fetchData: function() {
      var vm;
      vm = this;
      $.getJSON('https://shop.hexschool.com/api/udemydata/getCourseData', function(data) {
        vm.courseData = data;
        return vm.$emit('slideReviewsData', vm.courseData);
      }, function(response) {
        return console.log('error', response);
      });
      $.getJSON('https://shop.hexschool.com/api/udemydata/getCoursesBasicData', function(data) {
        return vm.course = data;
      }, function(response) {
        return console.log('error', response);
      });
      $.getJSON('../coupon-data.json', function(data) {
        vm.couponData = data;
        return vm.getUseCoupon();
      }, function(response) {
        return console.log('error', response);
      });
      return $.getJSON('../udemy-coupon-data.json', function(data) {
        vm.udemyCouponData = data;
        vm.getUseUdemyCoupon();
      });
    }
  },
  mounted: function() {
    return this.fetchData();
  }
});

tracker = {
  addDistinct_id: function(distinct_id) {
    if (distinct_id) {
      return $('[href*="herokuapp.com/order"]').each(function() {
        var newHref, thisHref;
        thisHref = $(this).attr('href');
        newHref = thisHref + "&distinct_id=" + distinct_id;
        $(this).attr('href', newHref);
        return $(this).attr('data-paylink', newHref);
      });
    }
  },
  addUTM: function() {
    var utm_campaignLink, utm_mediumLink, utm_sourceLink;
    utm_sourceLink = '';
    utm_mediumLink = '';
    utm_campaignLink = '';
    if ($.cookie('utm_source')) {
      utm_sourceLink = "&utm_source=" + ($.cookie('utm_source'));
    }
    if ($.cookie('utm_medium')) {
      utm_mediumLink = "&utm_medium=" + ($.cookie('utm_medium'));
    }
    if ($.cookie('utm_campaign')) {
      utm_campaignLink = "&utm_campaign=" + ($.cookie('utm_campaign'));
      return $('[href*="herokuapp.com/order"]').each(function() {
        var newHref, thisHref;
        thisHref = $(this).attr('href');
        newHref = "" + thisHref + utm_sourceLink + utm_mediumLink + utm_campaignLink;
        $(this).attr('href', newHref);
        return $(this).attr('data-paylink', newHref);
      });
    }
  }
};

$(document).ready(function() {
  var $win, ViewContentScrollTracking, adsource, dimensionValue, generateData, generateKey, generate_callback, getCookieByName, getUTM, landingViewContentScroll, mixpanelPageView, pageTitle, parseCookie, postConversionAPI, setCookie;
  setCookie = function(name, value) {
    return $.cookie(name, value, {
      expires: 1 / 24,
      path: '/'
    });
  };
  adsource = helper.getParameterByName('adsource');
  pageTitle = $('title').text();
  if (adsource && !$.cookie('adsource')) {
    setCookie('adsource', adsource);
  } else if ($.cookie('adsource') && !adsource) {
    adsource = $.cookie('adsource');
  }
  getUTM = function() {
    var utm_campaign, utm_medium, utm_source;
    utm_source = helper.getParameterByName('utm_source');
    utm_medium = helper.getParameterByName('utm_medium');
    utm_campaign = helper.getParameterByName('utm_campaign');
    if (utm_source) {
      setCookie('utm_source', utm_source);
    }
    if (utm_medium) {
      setCookie('utm_medium', utm_medium);
    }
    if (utm_campaign) {
      setCookie('utm_campaign', utm_campaign);
    }
    return tracker.addUTM();
  };
  getUTM();
  mixpanelPageView = function() {
    return mixpanel.track('PageView', {
      'adsource': adsource || '',
      'pageTitle': pageTitle
    });
  };
  mixpanelPageView();
  $('a.mp-click').click(function(event) {
    var link, title;
    link = $(this).attr('href');
    title = $(this).attr('title');
    return mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'adsource': adsource || '',
      'pageTitle': pageTitle
    });
  });
  $('.dropdown-course').one('mouseenter', function(e) {
    return mixpanel.track('openDropdown');
  });
  $('a.drop-click').click(function(event) {
    var link, title;
    link = $(this).attr('href');
    title = $(this).attr('title');
    return mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'target': 'dropdownLink'
    });
  });
  $('a.dropdown-clock-banner').click(function(event) {
    var link, title;
    link = $(this).attr('href');
    title = $(this).attr('title');
    return mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'target': 'dropdown-clock-banner'
    });
  });
  generate_callback = function(a) {
    return function() {
      window.location = a.attr('href');
    };
  };
  if ($('#orderSuccess').length) {
    dimensionValue = {
      'message': '支付 ' + helper.getParameterByName('msg') || '',
      'amount': helper.getParameterByName('amt') || '',
      'amountPaid': helper.getParameterByName('amountPaid') || '',
      'name': helper.getParameterByName('name') || '',
      'mail': helper.getParameterByName('mail') || '',
      'adsource': adsource || ''
    };
    fbq('track', 'Purchase', {
      content_type: 'product',
      value: helper.getParameterByName('amt') || 880,
      currency: 'TWD'
    });
    mixpanel.track('orderSuccess', dimensionValue);
    ga('set', 'dimension2', dimensionValue);
    $('#orderMsg').text(dimensionValue.message);
  }
  if ($('#orderFail').length) {
    dimensionValue = {
      'message': '支付失敗 ' + helper.getParameterByName('msg') || '',
      'amount': helper.getParameterByName('amt') || '',
      'name': helper.getParameterByName('name') || '',
      'mail': helper.getParameterByName('mail') || '',
      'adsource': adsource || ''
    };
    mixpanel.track('orderFail', dimensionValue);
    $('#orderMsg').text(dimensionValue.message);
  }
  generateKey = function() {
    var characters, charactersLength, j, key, x;
    key = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    for (x = j = 1; j <= 10; x = ++j) {
      key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return key;
  };
  parseCookie = function() {
    var cookie, cookieAry, cookieObj, i, l;
    cookieObj = {};
    cookieAry = document.cookie.split(';');
    cookie = void 0;
    i = 0;
    l = cookieAry.length;
    while (i < l) {
      cookie = cookieAry[i].trim();
      cookie = cookie.split('=');
      cookieObj[cookie[0]] = cookie[1];
      ++i;
    }
    return cookieObj;
  };
  getCookieByName = function(name) {
    var value;
    value = parseCookie()[name];
    if (value) {
      value = decodeURIComponent(value);
    }
    return value;
  };
  postConversionAPI = function(data) {
    $.ajax('https://shop.hexschool.com/api/tracker', {
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data)
    });
  };
  generateData = function(eventTime, eventId, productID) {
    var obj;
    obj = {
      type: 'facebook',
      data: {
        event_name: 'ViewContent',
        event_time: eventTime,
        event_id: eventId,
        action_source: 'website',
        event_source_url: location.href,
        user_data: {
          fbc: getCookieByName('_fbc'),
          fbp: getCookieByName('_fbp'),
          client_user_agent: navigator.userAgent,
          client_ip_address: window.hexUseIP
        },
        custom_data: {
          content_ids: productID
        }
      }
    };
    return obj;
  };
  landingViewContentScroll = false;
  if ($('.landing-track-start').length) {
    $win = $(window).scroll(function(e) {
      var contentTop, eventTime, event_id, landingViewContentData, winTop, windowHieght;
      windowHieght = $(window).height() / 2;
      winTop = $($win).scrollTop() + windowHieght;
      contentTop = $('.landing-track-start').offset().top;
      if (winTop > contentTop && !landingViewContentScroll) {
        landingViewContentScroll = true;
        event_id = generateKey(10);
        eventTime = Math.floor(new Date() / 1000);
        fbq('track', 'ViewContent', {}, {
          event_id: event_id
        });
        gtag('event', 'view_item');
        landingViewContentData = generateData(eventTime, event_id, 'landingCourse');
        postConversionAPI(landingViewContentData);
        return mixpanel.track('ViewContent', {
          'target': 'landingCourse'
        });
      }
    });
  }
  ViewContentScrollTracking = false;
  if ($('.course-tracking-ViewContent').length) {
    $win = $(window).scroll(function(e) {
      var contentTop, eventTime, event_id, viewContentData, winTop, windowHieght;
      windowHieght = $(window).height() / 2;
      winTop = $($win).scrollTop() + windowHieght;
      contentTop = $('.course-tracking-ViewContent').offset().top;
      if (winTop > contentTop && !ViewContentScrollTracking) {
        ViewContentScrollTracking = true;
        event_id = generateKey(10);
        eventTime = Math.floor(new Date() / 1000);
        viewContentData = {
          type: 'facebook',
          data: {
            event_name: 'ViewContent',
            event_time: eventTime,
            event_id: event_id,
            action_source: 'website',
            event_source_url: location.href,
            user_data: {
              fbc: getCookieByName('_fbc'),
              fbp: getCookieByName('_fbp'),
              client_user_agent: navigator.userAgent,
              client_ip_address: window.hexUseIP
            },
            custom_data: {
              currency: 'TWD',
              value: $('.course-tracking-ViewContent').data('price'),
              contents: [
                {
                  id: $('.course-tracking-ViewContent').data('id'),
                  quantity: 1,
                  item_price: $('.course-tracking-ViewContent').data('price')
                }
              ],
              content_type: 'product'
            }
          }
        };
        fbq('track', 'ViewContent', {
          content_name: $('.course-tracking-ViewContent').data('name'),
          value: $('.course-tracking-ViewContent').data('price'),
          currency: 'TWD'
        }, {
          eventID: event_id
        });
        postConversionAPI(viewContentData);
      }
    });
  }
  $('.tracking-link').on('click', function(e) {
    var addToCartData, eventTime, event_id, fbqValue, link, productID, productName, productPrice, productType, title;
    link = $(this).attr('href');
    title = $(this).attr('title') || '';
    dimensionValue = {
      'message': 'addToCart',
      'link': link,
      'title': title
    };
    event_id = generateKey(10);
    eventTime = Math.floor(new Date() / 1000);
    productID = $(this).data('id') || '';
    productName = $(this).data('title');
    productType = $(this).data('type') || '';
    productPrice = $(this).data('price') || '';
    fbqValue = {
      content_type: productType,
      contents: [
        {
          id: productID,
          quantity: 1,
          item_price: productPrice
        }
      ],
      content_ids: productID
    };
    addToCartData = {
      type: 'facebook',
      data: {
        event_name: 'AddToCart',
        event_time: eventTime,
        event_id: event_id,
        action_source: 'website',
        event_source_url: location.href,
        user_data: {
          fbc: getCookieByName('_fbc'),
          fbp: getCookieByName('_fbp'),
          client_user_agent: navigator.userAgent,
          client_ip_address: window.hexUseIP
        },
        custom_data: {
          currency: 'TWD',
          value: productPrice,
          content_ids: productID,
          content_type: productType,
          contents: [
            {
              id: productID,
              quantity: 1,
              item_price: productPrice
            }
          ]
        }
      }
    };
    mixpanel.track('AddToCart', dimensionValue);
    gtag('event', 'add_to_cart');
    fbq('track', 'AddToCart', fbqValue, {
      event_id: event_id
    });
    postConversionAPI(addToCartData);
  });
  $('.addToWishlist').on('click', function(e) {
    var eventName;
    eventName = $(this).data('wishlist');
    return fbq('track', 'AddToWishlist');
  });
  $('.lead-click').on('click', function(e) {
    return fbq('track', 'Lead');
  });
  $('.line-track').on('click', function(e) {
    return gtag('event', 'conversion', {
      'send_to': 'AW-926147017/7dFMCNel4OwYEMnDz7kD'
    });
  });
  $('.fb-track').on('click', function(e) {
    return gtag('event', 'conversion', {
      'send_to': 'AW-926147017/b-sZCLqm1u0YEMnDz7kD'
    });
  });
});

$(document).ready(function() {
  var timer;
  if ($('[data-toggle="tooltip"]').length) {
    $('[data-toggle="tooltip"]').tooltip();
  }
  if ($('#footer-clock').length) {
    timer = $('#footer-clock').val();
    $('.clock').countdown(timer, function(event) {
      return $(this).html(event.strftime('%D 天 %H 時 %M 分 %S 秒'));
    });
  }
  if ($('[data-countdown-course]').length) {
    $('[data-countdown-course]').each(function(i, item) {
      var course;
      course = $(item).data('countdown-course');
      timer = $(item).val();
      return $('[data-course-countdown=' + course + ']').countdown(timer, function(event) {
        return $(this).html(event.strftime('%D 天 %H 時 %M 分 %S 秒'));
      });
    });
  }
});

$(document).ready(function() {
  var checkCourse, checkGodtohex, countPrice;
  $('#choeseCourse').on('click', function() {
    var coupon, leadCourse, param, selectedCourses, totalUrl, url;
    coupon = $(this).data('coupon');
    url = $(this).data('url');
    selectedCourses = [];
    leadCourse = '';
    $('#customCourses .selecedCourse:checked').each(function(i, item) {
      return selectedCourses.push($(this).val());
    });
    leadCourse = selectedCourses[0];
    selectedCourses.splice(0, 1);
    param = $.param({
      order: leadCourse,
      coupon_code: coupon,
      selectedCourses: selectedCourses
    });
    totalUrl = url + '?' + param;
    if (leadCourse) {
      return location.href = decodeURIComponent(totalUrl + '#addProducts');
    }
  });
  countPrice = function() {
    var conditionText, originTotal, total, value;
    total = 0;
    originTotal = 0;
    value = '';
    conditionText = '';
    $('#customCourses .selecedCourse:checked').each(function(i, item) {
      var originPrice, price;
      value = item.value;
      price = parseInt($(this).data('price'));
      originPrice = parseInt($(this).data('originprice'));
      total = total + price;
      return originTotal = originTotal + originPrice;
    });
    $('#selecedTotal').text(total);
    $('#selecedOriginTotal').text(originTotal - total);
    if (value === 'god2020year' || total > 5999) {
      $('#condition_false').hide();
      return $('#condition_true').show();
    } else {
      if (value !== 'god2020year') {
        $('#condition_false').hide();
        $('#condition_true').show();
      }
      if (total < 6000) {
        conditionText = 6000 - total;
      }
      $('#condition').html(conditionText);
      $('#condition_false').show();
      return $('#condition_true').hide();
    }
  };
  countPrice();
  $('#customCourses .selecedCourse').on('change', function() {
    return countPrice();
  });
  checkCourse = false;
  checkGodtohex = false;
  $('#select-all-course').on('click', function(e) {
    e.preventDefault();
    if (!checkCourse) {
      $('#main-course-2019 .selecedCourse').each(function(i, item) {
        item.checked = !checkCourse;
      });
      checkCourse = !checkCourse;
    } else {
      $('#main-course-2019 .selecedCourse').each(function(i, item) {
        item.checked = !checkCourse;
      });
      checkCourse = !checkCourse;
    }
    return countPrice();
  });
  return $('#select-all-godtohex').on('click', function(e) {
    e.preventDefault();
    if (!checkGodtohex) {
      $('#godtohex-2019 .selecedCourse').each(function(i, item) {
        item.checked = !checkGodtohex;
      });
      checkGodtohex = !checkGodtohex;
    } else {
      $('#godtohex-2019 .selecedCourse').each(function(i, item) {
        item.checked = !checkGodtohex;
      });
      checkGodtohex = !checkGodtohex;
    }
    return countPrice();
  });
});
