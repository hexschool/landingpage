var helper = {
  getParameterByName: function(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i');
    var results = regex.exec(url);
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
  var perspectiveWall = document.getElementById('perspectiveWall');
  var moveImg = document.getElementById('moveImg');
  var moveImgS = document.getElementById('moveImgS');

  if (perspectiveWall) {
    var mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function(event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function() {
        return "(" + this.x + ", " + this.y + ")";
      }
    };

    mouse.setOrigin(perspectiveWall);

    var counter = 0;
    var updateRate = 10;
    var isTimeToUpdate = function() {
      return counter++ % updateRate === 0;
    };

    var onMouseEnterHandler = function(event) {
      update(event);
    };

    var onMouseLeaveHandler = function() {
      moveImg.style = "";
      moveImgS.style = "";
    };

    var onMouseMoveHandler = function(event) {
      if (isTimeToUpdate()) {
        update(event);
      }
    };

    var update = function(event) {
      mouse.updatePosition(event);
      updateTransformStyle(
        (mouse.y / moveImg.offsetHeight / 2).toFixed(2),
        (mouse.x / moveImg.offsetWidth / 2).toFixed(2)
      );
    };

    var updateTransformStyle = function(x, y) {
      var style = "translateX(" + (-37 * Number(x) * Number(y)) + "px) rotate(" + Number(x) * Number(y) + "deg)";
      var styleS = "translateX(" + (37 * Number(x) * Number(y)) + "px) rotate(" + -Number(x) * Number(y) + "deg)";

      moveImg.style.transform = style;
      moveImg.style.webkitTransform = style;
      moveImg.style.mozTransform = style;
      moveImg.style.msTransform = style;
      moveImg.style.oTransform = style;

      moveImgS.style.transform = styleS;
      moveImgS.style.webkitTransform = styleS;
      moveImgS.style.mozTransform = styleS;
      moveImgS.style.msTransform = styleS;
      moveImgS.style.oTransform = styleS;
    };

    perspectiveWall.onmouseenter = onMouseEnterHandler;
    perspectiveWall.onmouseleave = onMouseLeaveHandler;
    perspectiveWall.onmousemove = onMouseMoveHandler;
  }
});

$(document).ready(function() {
  var changeActice = function(target) {
    $('.bookmark').removeClass('active');
    $(target).addClass('active');
  };
  var nowPage = 1;

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
    nowPage = 1;
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
    nowPage = 2;
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
    nowPage = 3;
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
    nowPage = 4;
  });

  $('.landing-combined.z_js-js_core-react').hide();
  $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').hide();
  $('.landing-combined-select.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').on('change', function(event) {
    var target = event.target.value;
    if (target === 'z_html_jQuery_rwd_bs5_js-plus_js-core_react') {
      $('.landing-combined.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').hide();
      $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').fadeIn();
    } else if (target === 'z_html_jQuery_rwd_bs4_js-plus_js-core_vue3') {
      $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').hide();
      $('.landing-combined.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').fadeIn();
    }
  });
  $('.landing-combined-select.z_js-plus_js-core_vue3').on('change', function(event) {
    var target = event.target.value;
    if (target === 'z_js-js_core-react') {
      $('.landing-combined.z_js-plus_js-core_vue3').hide();
      $('.landing-combined.z_js-js_core-react').fadeIn();
    } else if (target === 'z_js-plus_js-core_vue3') {
      $('.landing-combined.z_js-js_core-react').hide();
      $('.landing-combined.z_js-plus_js-core_vue3').fadeIn();
    }
  });
  return;
});

$(document).ready(function() {
  var perspectiveWall = document.getElementById('perspectiveWallgit');
  var moveImg = document.getElementById('moveImggit');
  var moveImg2 = document.getElementById('moveImggit2');
  var moveImgS = document.getElementById('moveImgSgit');

  if (perspectiveWall) {
    var mouse = {
      _x: 0,
      _y: 0,
      x: 0,
      y: 0,
      updatePosition: function(event) {
        var e = event || window.event;
        this.x = e.clientX - this._x;
        this.y = (e.clientY - this._y) * -1;
      },
      setOrigin: function(e) {
        this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
        this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
      },
      show: function() {
        return "(" + this.x + ", " + this.y + ")";
      }
    };

    mouse.setOrigin(perspectiveWall);

    var counter = 0;
    var updateRate = 10;
    var isTimeToUpdate = function() {
      return counter++ % updateRate === 0;
    };

    var onMouseEnterHandler = function(event) {
      update(event);
    };

    var onMouseLeaveHandler = function() {
      moveImg.style.transform = "";
      moveImg2.style.transform = "";
      moveImgS.style.transform = "translateY(25px)";
    };

    var onMouseMoveHandler = function(event) {
      if (isTimeToUpdate()) {
        update(event);
      }
    };

    var update = function(event) {
      mouse.updatePosition(event);
      updateTransformStyle(
        (mouse.y / moveImg.offsetHeight / 2).toFixed(2),
        (mouse.x / moveImg.offsetWidth / 2).toFixed(2)
      );
    };

    var updateTransformStyle = function(x, y) {
      var style = "translateX(" + (-100 * Number(x) * Number(y)) + "px)";
      var styleS = "translateX(" + (500 * Number(x) * Number(y)) + "px) translateY(25px)";
      var style2 = "translateX(" + (300 * Number(x) * Number(y)) + "px) rotate(" + (30 * Number(x) * Number(y)) + "deg) translateY(" + 50 * Number(y) + "px)";

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
      moveImgS.style.oTransform = styleS;
    };

    perspectiveWall.onmouseenter = onMouseEnterHandler;
    perspectiveWall.onmouseleave = onMouseLeaveHandler;
    perspectiveWall.onmousemove = onMouseMoveHandler;
  }
});

$(document).ready(function() {
  $('#orderModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    $('#myModal').removeData('bs.modal');
    var data = {
      promotionsTerms: button.data('promotions'),
      price: button.data('price'),
      title: button.data('title'),
      paylink: button.data('paylink'),
      coupon: button.data('coupon'),
      forward: button.data('forward')
    };
    orderModalApp.text = data;
  });

  // 1000Days Swiper
  var swiper = new Swiper('.carousel-comic', {
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
  // UI Swiper
  var swiperUI = new Swiper('.carousel-ui', {
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

  // Sass Course
  var arr = ['6F', '5F', '4F', '3F', '2F', '1F', 'B1'];
  var sassSwiper = new Swiper('.sass-floor', {
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
            sassSwiper.allowTouchMove = false;
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
  var mediaQuery = window.matchMedia("(min-width: 767px)");
  var intervalId = '';
  $('.sass-slide').mouseover(function() {
    if (mediaQuery.matches) {
      sassSwiper.autoplay.stop();
    }
  });
  $('.sass-slide').mouseout(function() {
    if (mediaQuery.matches) {
      sassSwiper.autoplay.start();
    }
  });
  $(window).scroll(function() {
    $('.sass-floor').each(function() {
      var scrollPos = $(window).scrollTop();
      var target = $(this);
      var targetPos = $(target).offset().top;
      var targetHeight = $(target).outerHeight();
      if (targetPos - 1 <= scrollPos && (targetPos + targetHeight) > scrollPos) {
        sassSwiper.allowTouchMove = true;
      }
    });
  });
  return;
});

var orderModalApp = new Vue({
  el: '#orderModal',
  data: {
    text: {}
  }
});

// 導覽列
$(document).ready(function() {
  $(window).scroll(function() {
    var scrollPos = $(window).scrollTop();
    var windowHeight = $(window).height();
    var navTarget = $('#thanks-2019-salary');
    if (navTarget.length > 0) {
      var navtargetPos = $(navTarget).offset().top;
      if (navtargetPos - 200 <= scrollPos) {
        $('.progress-bar').addClass('animate');
      }
    }
  });
});

$(document).ready(function() {
  // student works Swiper
  var swiper = new Swiper('.swiper-training', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  // Vue 直播班學長姐心得
  var vue_review_swiper = new Swiper('.swiper-vue-training-review', {
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
  var swiper = new Swiper('.swiper-js-training-1st-student-works', {
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
  var swiper = new Swiper('.ui-training-works', {
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
  var swiper = new Swiper('.ui-training-comment', {
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
    var checkValue = $(this)[0].checked;
    if (checkValue) {
      $('#trainingBuyBtn').removeClass('disabled');
    } else {
      $('#trainingBuyBtn').addClass('disabled');
    }
  });

  $('.training-checked').on('click', function(event) {
    var checkValue = $(this)[0].checked;
    if (checkValue) {
      $(this).parent().next().removeClass('disabled');
    } else {
      $(this).parent().next().addClass('disabled');
    }
  });

  return;
});

Vue.component('slide-reviews', {
  template: '<div>' +
    '<div style="height: 250px; overflow: hidden;" class="swiper-container slide-reviews">' +
      '<div style="font-size: 1.5em;" class="centered text-xs-center"><span class="loading loading-primary"></span></div>' +
      '<div class="swiper-pagination"></div>' +
      '<div class="swiper-wrapper">' +
        '<div v-for="(item, index) in vue3Data" style="width: 98%;" class="swiper-slide b-3" v-if="vue3">' +
          '<div class="text-xs-left">' +
            '<blockquote class="m-0">' +
              '<div><strong>{{ item.user.display_name }}</strong><span class="text-warning ms-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span></div>' +
              '<div>{{ item.content }}</div>' +
            '</blockquote>' +
          '</div>' +
        '</div>' +
        '<div v-for="(item, index) in courseData" style="width: 98%;" class="swiper-slide b-3">' +
          '<div class="text-xs-left">' +
            '<blockquote class="m-0">' +
              '<div><strong>{{ item.user.display_name }}</strong><span class="text-warning ms-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></span></div>' +
              '<div>{{ item.content }}</div>' +
            '</blockquote>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>',
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
        },
        {
          user: {
            display_name: '張志銘'
          },
          content: '老師和助教講解非常詳細'
        },
        {
          user: {
            display_name: 'Daisord Isord'
          },
          content: '整個學習中漸進的熟悉 Vue 的使用，且作業題目安排適切，更加深對 Vue 的使用'
        },
        {
          user: {
            display_name: '奕濡 藍'
          },
          content: '完整的解說 Vue 強大之處以及應用，非常推薦'
        },
        {
          user: {
            display_name: 'yihao chang'
          },
          content: '課程講解的很詳盡，課程問題也很盡心盡力為學員回覆，很有耐心~受益良多'
        },
        {
          user: {
            display_name: 'Lynn Huang'
          },
          content: '教材準備很充足，老師講解清晰，不會拖泥帶水。'
        },
        {
          user: {
            display_name: '蔡名彥'
          },
          content: '內容多樣，從淺至深，老師非常用心，很適合想學 Vue 的人來上'
        },
        {
          user: {
            display_name: 'Su 蘇'
          },
          content: '老師的講解都非常到位，很迅速就能掌握基本的重點，而且課程中能大量串接 api 設計屬於自己的作品，不過 JavaScript 還是要熟悉一些會比較好上手，學完之後真的受益良多。'
        },
        {
          user: {
            display_name: 'Jia-Wei Liang'
          },
          content: '非常充實，即使目前是邊做邊學的狀態，也能及時補上很多書本及網路教學沒補充到的知識'
        },
        {
          user: {
            display_name: '宇軒 蔡'
          },
          content: '本課程不太適合初心者，但如果你是具備一些 JavaScript 觀念的人，這門課程很適合你，這門課程具備了相當程度的實作課程，相當划算！'
        },
        {
          user: {
            display_name: '黃英鳴 Huang'
          },
          content: '老師手把手的由淺入深講講解每個重要的觀念， 在學習完每個章節後都可以透過範例跟著練習， 有出一些作業幫助學習者檢視是不是真的知道如何把學到的觀念運用在實作上， 除了能了解與後端在串接資料上的細節與驗證權限外， 還提供客製化的 API 讓每個人都能做出專屬於自己的作品， 可以看出一定花了非常多的心思與時間在準備這堂課程！'
        },
        {
          user: {
            display_name: 'Anna Huang'
          },
          content: '第一次上志誠老師的課，想不到課堂解說"超級清楚"，非常有條理！之前曾經零零碎碎地學了一些Vue的課程，但這堂課是最清楚也最完整的！這堂課跟之前的"JavaScript入門"一樣精彩，六角學院的教學真的很厲害，總是能將複雜的概念解說地讓人容易理解。很開心買到這堂課，推薦給還在猶豫的同學！'
        }
      ]
    };
  },
  methods: {
    getCourseData: function() {
      var vm = this;
      vm.courseData = [];
      $.each(vm.data, function(key, courses) {
        if (courses.review.count) {
          $.each(courses.review.results, function(i, review) {
            vm.courseData.push(review);
          });
        }
      });
      vm.renderReviewSwiper();
    },
    renderReviewSwiper: function() {
      setTimeout(function() {
        var swiper = new Swiper('.slide-reviews', {
          pagination: '.swiper-pagination',
          paginationType: 'progress', // 側欄選項
          direction: 'vertical', // 垂直
          mousewheelControl: true, // 可用滑鼠
          spaceBetween: 15, // 間隔
          slidesPerView: 'auto', // 每頁數量
          // autoplay: 2000, // 自動播放
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
    // this.fetchData()
    var vm = this;
    vm.$parent.$on('slideReviewsData', function(data) {
      vm.data = data;
      vm.getCourseData();
    });
  }
});

var VueApp = new Vue({
  el: '#app',
  data: function() {
    return {
      rightCoupon: {
        course: {},
        coupon_code: ''
      }, // 目前的 Coupon 使用
      udemyRightCoupon: {}, // Udemy 目前的 Coupon
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
      var vm = this;
      var priceCoupon = vm.couponData.price;
      var originPriceCoupon = vm.couponData.origin_price;
      var today = dayjs().format('YYYY-MM-DD');

      $.each(priceCoupon, function(i, data) {
        var dateData = data.date;
        $.each(dateData, function(i, day) {
          if (dayjs(today).isAfter(day.start_at) && dayjs(today).isBefore(day.ended_at)) {
            vm.rightCoupon = data;
            return;
          }
        });
      });
      if (Object.keys(vm.rightCoupon).length === 0) {
        vm.rightCoupon = originPriceCoupon;
      }
    },
    getUseUdemyCoupon: function() { // Udemy Coupon
      var vm = this;
      var priceCoupon = vm.udemyCouponData.price;
      var today = dayjs().format('YYYY-MM-DD');

      $.each(priceCoupon, function(i, data) {
        var dateData = data.date;
        if (dayjs(today).isAfter(dateData.start_at) && dayjs(today).isBefore(dateData.ended_at)) {
          vm.udemyRightCoupon = data;
          return;
        }
      });
      if (Object.keys(vm.udemyRightCoupon).length === 0) {
        vm.udemyRightCoupon = '';
      }
    },
    fetchData: function() { // 載入資料
      var vm = this;
      // 評論／課程資料來自 build time 注入的 window.__UDEMY_SNAPSHOT__
      // （原本是打 shop.hexschool.com/api/udemydata/{getCourseData,getCoursesBasicData}，已停用）
      var snapshot = window.__UDEMY_SNAPSHOT__ || { courseData: {}, basicData: {} };
      vm.courseData = snapshot.courseData;
      vm.$emit('slideReviewsData', vm.courseData);
      vm.course = snapshot.basicData;
      $.getJSON('../coupon-data.json', function(data) {
        vm.couponData = data;
        vm.getUseCoupon();
      }, function(response) {
        console.log('error', response);
      });
      $.getJSON('../udemy-coupon-data.json', function(data) {
        vm.udemyCouponData = data;
        vm.getUseUdemyCoupon();
        return;
      });
    }
  },
  mounted: function() {
    this.fetchData();
  }
});

// 追蹤
var tracker = {
  addDistinct_id: function(distinct_id) {
    // 如果有 mixpanel 統一加上對 herokuapp 交易的追蹤碼
    if (distinct_id) {
      $('[href*="herokuapp.com/order"]').each(function() {
        var thisHref = $(this).attr('href');
        var newHref = thisHref + "&distinct_id=" + distinct_id;
        $(this).attr('href', newHref);
        $(this).attr('data-paylink', newHref);
      });
    }
  },
  addUTM: function() {
    var utm_sourceLink = '';
    var utm_mediumLink = '';
    var utm_campaignLink = '';
    if ($.cookie('utm_source')) {
      utm_sourceLink = "&utm_source=" + $.cookie('utm_source');
    }
    if ($.cookie('utm_medium')) {
      utm_mediumLink = "&utm_medium=" + $.cookie('utm_medium');
    }
    if ($.cookie('utm_campaign')) {
      utm_campaignLink = "&utm_campaign=" + $.cookie('utm_campaign');
      $('[href*="herokuapp.com/order"]').each(function() {
        var thisHref = $(this).attr('href');
        var newHref = thisHref + utm_sourceLink + utm_mediumLink + utm_campaignLink;
        $(this).attr('href', newHref);
        $(this).attr('data-paylink', newHref);
      });
    }
  }
};

$(document).ready(function() {
  var setCookie = function(name, value) {
    $.cookie(name, value, { expires: 1 / 24, path: '/' });
  };

  // mixpanel
  // Page View
  var adsource = helper.getParameterByName('adsource');
  var pageTitle = $('title').text();
  if (adsource && !$.cookie('adsource')) {
    setCookie('adsource', adsource);
  } else if ($.cookie('adsource') && !adsource) {
    adsource = $.cookie('adsource');
  }

  var getUTM = function() {
    var utm_source = helper.getParameterByName('utm_source');
    var utm_medium = helper.getParameterByName('utm_medium');
    var utm_campaign = helper.getParameterByName('utm_campaign');
    if (utm_source) {
      setCookie('utm_source', utm_source);
    }
    if (utm_medium) {
      setCookie('utm_medium', utm_medium);
    }
    if (utm_campaign) {
      setCookie('utm_campaign', utm_campaign);
    }
    tracker.addUTM();
  };
  getUTM();

  var mixpanelPageView = function() {
    mixpanel.track('PageView', {
      'adsource': adsource || '',
      'pageTitle': pageTitle
    });
  };
  mixpanelPageView();

  // 點擊
  $('a.mp-click').click(function(event) {
    var link = $(this).attr('href');
    var title = $(this).attr('title');
    mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'adsource': adsource || '',
      'pageTitle': pageTitle
    });
  });

  $('.dropdown-course').one('mouseenter', function(e) {
    mixpanel.track('openDropdown');
  });

  // 點擊下拉式選單的項目
  $('a.drop-click').click(function(event) {
    var link = $(this).attr('href');
    var title = $(this).attr('title');
    mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'target': 'dropdownLink'
    });
  });

  // 點擊下拉式選單的倒數廣告
  $('a.dropdown-clock-banner').click(function(event) {
    var link = $(this).attr('href');
    var title = $(this).attr('title');
    mixpanel.track('Click a link', {
      'link': link,
      'title': title,
      'target': 'dropdown-clock-banner'
    });
  });

  // Facebook Tracking
  var generate_callback = function(a) {
    return function() {
      window.location = a.attr('href');
      return;
    };
  };

  // 訂單成功
  if ($('#orderSuccess').length) {
    var dimensionValue = {
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

    mixpanel.track('orderSuccess', dimensionValue); // Mixpanel

    ga('set', 'dimension2', dimensionValue); // Google analytics
    $('#orderMsg').text(dimensionValue.message); // 付款訊息
  }

  if ($('#orderFail').length) {
    var dimensionValue = {
      'message': '支付失敗 ' + helper.getParameterByName('msg') || '',
      'amount': helper.getParameterByName('amt') || '',
      'name': helper.getParameterByName('name') || '',
      'mail': helper.getParameterByName('mail') || '',
      'adsource': adsource || ''
    };

    mixpanel.track('orderFail', dimensionValue); // Mixpanel
    $('#orderMsg').text(dimensionValue.message); // 付款訊息
  }

  var generateKey = function() {
    var key = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var x = 1; x <= 10; x++) {
      key += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return key;
  };

  // 取得 cookie 中的 _fbp 和 _fbc
  var parseCookie = function() {
    var cookieObj = {};
    var cookieAry = document.cookie.split(';');
    var cookie;
    var i = 0;
    var l = cookieAry.length;
    while (i < l) {
      cookie = cookieAry[i].trim();
      cookie = cookie.split('=');
      cookieObj[cookie[0]] = cookie[1];
      ++i;
    }
    return cookieObj;
  };

  var getCookieByName = function(name) {
    var value = parseCookie()[name];
    if (value) {
      value = decodeURIComponent(value);
    }
    return value;
  };

  // 送出 conversion
  var postConversionAPI = function(data) {
    // https://shop.hexschool.com/api/tracker
    $.ajax('https://shop.hexschool.com/api/tracker', {
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data)
    });
    return;
  };

  var generateData = function(eventTime, eventId, productID) {
    var obj = {
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

  // landingPage 組合
  var landingViewContentScroll = false;
  if ($('.landing-track-start').length) {
    var $win = $(window).scroll(function(e) {
      var windowHieght = $(window).height() / 2;
      var winTop = $($win).scrollTop() + windowHieght;
      var contentTop = $('.landing-track-start').offset().top;
      if (winTop > contentTop && !landingViewContentScroll) {
        landingViewContentScroll = true;
        var event_id = generateKey(10);
        var eventTime = Math.floor(new Date() / 1000);
        fbq('track', 'ViewContent', {}, {event_id: event_id});
        gtag('event', 'view_item');
        var landingViewContentData = generateData(eventTime, event_id, 'landingCourse');
        postConversionAPI(landingViewContentData);
        mixpanel.track('ViewContent', {
          'target': 'landingCourse'
        });
      }
    });
  }

  // viewContent 看完主要內容在可購買區塊出現後，則發送 viewContent 事件
  // viewContent 需要 price, id
  var ViewContentScrollTracking = false;
  if ($('.course-tracking-ViewContent').length) {
    var $win = $(window).scroll(function(e) {
      var windowHieght = $(window).height() / 2;
      var winTop = $($win).scrollTop() + windowHieght;
      var contentTop = $('.course-tracking-ViewContent').offset().top;
      if (winTop > contentTop && !ViewContentScrollTracking) {
        ViewContentScrollTracking = true;
        var event_id = generateKey(10);
        var eventTime = Math.floor(new Date() / 1000);
        var viewContentData = {
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

        return;
      }
    });
  }

  // 事件：AddToCart
  $('.tracking-link').on('click', function(e) {
    var link = $(this).attr('href');
    var title = $(this).attr('title') || '';
    var dimensionValue = {
      'message': 'addToCart',
      'link': link,
      'title': title
    };

    // 追蹤需要的資料
    var event_id = generateKey(10);
    var eventTime = Math.floor(new Date() / 1000);

    // 產品資料
    var productID = $(this).data('id') || '';
    var productName = $(this).data('title');
    var productType = $(this).data('type') || '';
    var productPrice = $(this).data('price') || '';

    // pixel
    var fbqValue = {
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

    // facebook conversion
    var addToCartData = {
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

    // ga('set', 'dimension1', dimensionValue) // Google analytics
    mixpanel.track('AddToCart', dimensionValue); // Mixpanel
    gtag('event', 'add_to_cart'); // GA, Gtag
    fbq('track', 'AddToCart', fbqValue, { event_id: event_id }); // Facebook
    postConversionAPI(addToCartData);
    return;
  });

  // AddToWishlist - 點擊後就可以觸發 "加到願望清單" 的事件
  // 使用方法：class 加上 addToWishlist，同個元素加上 data-wishlist="要傳送的事件名稱"
  $('.addToWishlist').on('click', function(e) {
    var eventName = $(this).data('wishlist');
    fbq('track', 'AddToWishlist');
  });

  // Lead - 淺在客戶事件
  $('.lead-click').on('click', function(e) {
    fbq('track', 'Lead');
  });

  // SubmitApplication - 提交申請事件
  $('.submitApp-click').on('click', function(e) {
    fbq('track', 'SubmitApplication');
  });

  $('.line-track').on('click', function(e) {
    gtag('event', 'conversion', {'send_to': 'AW-926147017/7dFMCNel4OwYEMnDz7kD'});
  });

  $('.fb-track').on('click', function(e) {
    gtag('event', 'conversion', {'send_to': 'AW-926147017/b-sZCLqm1u0YEMnDz7kD'});
  });

  $('.webLayout-training-gtag-track').on('click', function(e) {
    gtag('event', 'conversion', {'send_to': 'AW-926147017/0c-OCOH54I0ZEMnDz7kD'});
  });

  $('.react-training-gtag-track').on('click', function(e) {
    gtag('event', 'conversion', {'send_to': 'AW-926147017/w2BSCJX6irAZEMnDz7kD'});
  });

  $('.node-gtag-track').on('click', function(e) {
    gtag('event', 'conversion', {'send_to': 'AW-926147017/kdSaCMvbio0ZEMnDz7kD'});
  });

  $('.event-2024-gtag-track').on('click', function(e) {
    gtag('event', 'conversion', {'send_to': 'AW-926147017/cN2DCKi81p0ZEMnDz7kD'});
  });

  $('.one-on-one-gtag-track').on('click', function(e) {
    gtag('event', 'conversion', {'send_to': 'AW-926147017/7PsYCJj9i6cZEMnDz7kD'});
  });

  return;
});

$(document).ready(function() {
  if ($('[data-bs-toggle="tooltip"]').length) {
    $('[data-bs-toggle="tooltip"]').tooltip();
  }

  // .clock countdown 改由 promotions-runtime.js 初始化與維護，避免 plugin 拿到字串時
  // 把 ISO UTC 中的 '-' 換成 '/' 產生 Invalid Date，導致顯示 "NaN 天 NaN 時"。

  if ($('[data-countdown-course]').length) {
    $('[data-countdown-course]').each(function(i, item) {
      var course = $(item).data('countdown-course');
      var timer = $(item).val();
      $('[data-course-countdown=' + course + ']').countdown(timer, function(event) {
        $(this).html(event.strftime('%D 天 %H 時 %M 分 %S 秒'));
      });
    });
  }
  return;
});

// 活動
$(document).ready(function () {
  $('#choeseCourse').on('click', function () {
    var coupon = $(this).data('coupon');
    var url = $(this).data('url');
    var selectedCourses = [];
    var leadCourse = '';
    $('#customCourses .selecedCourse:checked').each(function (i, item) {
      selectedCourses.push($(this).val());
    });

    leadCourse = selectedCourses[0];
    selectedCourses.splice(0, 1);

    var param = $.param({
      order: leadCourse,
      coupon_code: coupon,
      selectedCourses: selectedCourses
    });
    var totalUrl = url + '?' + param;
    // console.log(totalUrl, decodeURIComponent(totalUrl))
    if (leadCourse) {
      location.href = decodeURIComponent(totalUrl + '#addProducts');
    }
  });

  var countPrice = function () {
    var total = 0;
    var originTotal = 0;
    var conditionText = '';
    $('#customCourses .selecedCourse:checked').each(function (i, item) {
      var price = parseInt($(this).data('price'));
      var originPrice = parseInt($(this).data('originprice'));
      total = total + price;
      originTotal = originTotal + originPrice;
    });
    $('#selecedTotal').text(total);
    $('#selecedOriginTotal').text(originTotal - total);
    if (total > 5999) {
      $('#condition_false').hide();
      $('#condition_true').show();
    } else {
      if (total < 6000) {
        conditionText = 6000 - total;
      }
      $('#condition').html(conditionText);
      $('#condition_false').show();
      $('#condition_true').hide();
    }
  };

  countPrice();
  // 暫存總價
  $('#customCourses .selecedCourse').on('change', function () {
    countPrice();
  });

  var checkCourse = false;

  $('#select-all-course').on('click', function (e) {
    e.preventDefault();
    if (!checkCourse) {
      $('#main-course-2019 .selecedCourse').each(function (i, item) {
        item.checked = !checkCourse;
        return;
      });
      checkCourse = !checkCourse;
    } else {
      $('#main-course-2019 .selecedCourse').each(function (i, item) {
        item.checked = !checkCourse;
        return;
      });
      checkCourse = !checkCourse;
    }
    countPrice();
  });
});
