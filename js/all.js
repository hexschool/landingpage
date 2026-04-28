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
  // abtesting = 'h_test_landing_tab'
  // abtestingRandom = ['t', 'n']  // t 是 tab，n 是 no tab
  // abtestingDay = 3 // 30分鐘

  // // 到期日
  // testingExpiresTime = abtestingDay // 86400000 每日毫秒，補回一日

  // // 測試目標
  // testing_h = $('#landingHasTab')
  // testing_v = $('#landingNoTab')
  // cookieAbtesting = $.cookie(abtesting)

  // // 測試 cookie
  // setCookie = function(name, value) { // 設定 cookie
  //   $.cookie(name, value, { expires: testingExpiresTime, path: '/' })
  // }

  // // 滾動到可視區塊才送出 ABTesting 事件
  // sawEvent = function(test) {
  //   ViewContentScrollTracking = false
  //   if ($('.ABTestingTemplate').length) {
  //     $win = $(window).scroll(function(e) {
  //       windowHieght = $(window).height() / 2
  //       winTop = $($win).scrollTop() + windowHieght
  //       contentTop = $('.ABTestingTemplate').offset().top
  //       if (winTop > contentTop && !ViewContentScrollTracking) {
  //         ViewContentScrollTracking = true
  //         mixpanel.track('ABtesting', {
  //           'TestEvet': abtesting,
  //           'TestRandom': test,
  //           'TestExpiresTime': abtestingDay
  //         })
  //       }
  //     })
  //   }
  // }

  // // 測試事件
  // testingEffect = function(test) {
  //   testingGoal = $('.ABTestingTemplate')
  //   if (testingGoal.length > 0) {
  //     if (test == 't') {
  //       $('#landingHasTab').addClass('d-block')
  //       $('#landingNoTab').addClass('d-none')
  //       $('.mix-tracking-click').on('click', function(e) {
  //         mixpanel.track('Click ABTesting', {
  //           'TestEvet': 'ClickTrainingTab',
  //           'TestRandom': test
  //         })
  //       })
  //     } else {
  //       $('#landingHasTab').addClass('d-none')
  //       $('#landingNoTab').addClass('d-block')
  //     }
  //     sawEvent(test)
  //     $('.mix-tracking').on('click', function(e) {
  //       mixpanel.track('Click ABTesting', {
  //         'TestEvet': 'Click ' + $(this).data('course'),
  //         'TestRandom': test,
  //         'TestClickType': $(this).data('type'),
  //         'TestClickTarget': $(this).data('course')
  //       })
  //     })
  //   }
  // }

  // // 如果沒有 cookie 就寫入
  // if (!cookieAbtesting) {
  //   randTesting = abtestingRandom[Math.floor(Math.random() * abtestingRandom.length)]
  //   setCookie(abtesting, randTesting)
  //   testingEffect(randTesting)
  // } else {
  //   testingNow = $.cookie("h_test_landing_tab")
  //   testingEffect(testingNow)
  // }

  // console.log(cookieAbtesting)
});

$(document).ready(function() {
  var abtesting = 'testClass';
  var abtestingRandom = ['1', '2'];
  var abtestingDay = 3; // 30分鐘

  // 到期日
  var testingExpiresTime = abtestingDay; // 86400000 每日毫秒，補回一日

  // 測試目標
  var testing = $('[data-abtesting-class*="ani"]');
  var cookieAbtesting = $.cookie(abtesting);

  // 測試 cookie
  var setCookie = function(name, value) { // 設定 cookie
    $.cookie(name, value, { expires: testingExpiresTime, path: '/' });
  };

  // 測試事件
  var testingEffect = function(test) {
    switch (test) {
      case '1':
        $.each($(testing), function() {
          $(this).addClass('ani-loop animated pulse');
        });
        break;
    }
  };

  // 如果沒有 cookie 就寫入
  if (!cookieAbtesting) {
    var randTesting = abtestingRandom[Math.floor(Math.random() * abtestingRandom.length)];
    setCookie(abtesting, randTesting);
    mixpanel.track('ABtesting', {
      'TestEvet': abtesting,
      'TestRandom': randTesting,
      'TestExpiresTime': abtestingDay
    });
    // testingEffect(randTesting)
  }
  // else if (cookieAbtesting) {
    // testingEffect(cookieAbtesting)
  // }

  // console.log(cookieAbtesting)
});

$(document).ready(function() {
  $('.course-area-link').on("click", function(event) {
    if (event.target.nodeName !== 'A' && event.target.nodeName !== 'I') {
      var url = $(this).data('url');
      window.open(url);
    }
  });
  $('.course-area-link').on("auxclick", function(event) {
    if (event.target.nodeName !== 'A' && event.target.nodeName !== 'I') {
      var url = $(this).data('url');
      window.open(url);
    }
  });

  $('#select-mobile-combined').on('change', function(e) {
    var target = '#' + e.target.value;
    $('select.combination_select').val(target.replace('#', ''));
    $('#conbined-courses div.tab-pane').each(function(e) {
      $(this).removeClass('show active');
    });
    var targetBtn = '#menu-' + e.target.value;
    var trigger = new bootstrap.Tab($(targetBtn));
    trigger.show();

    window.history.replaceState(null, null, window.location.pathname);
    addQueryParam('category', 'conbined-courses');
    addQueryParam('combind', e.target.value);
  });

  if ($('#pills-conbined-tab').hasClass('active')) {
    $('#courses_special').css('display', 'none');
  }
  $('.courses-nav-category').on('click', function(e) {
    $('html, body').animate({ scrollTop: 0 }, 0);
    if (e.target.id === 'pills-conbined-tab') {
      $('#courses_special').css('display', 'none');
    } else {
      $('#courses_special').css('display', 'block');
    }
  });

  $('.courses-nav-category').on('scroll', function(e) {
    if (($(this).width() + $(this).scrollLeft()) > $('.courses-nav-category')[0].scrollWidth - 5) {
      $('.scroll-hint').css('display', 'none');
    } else {
      $('.scroll-hint').css('display', 'inline-block');
    }
  });

  // 點擊加上參數
  var addQueryParam = function(key, value) {
    var h_url = new URL(window.location.href);
    h_url.searchParams.set(key, value);
    window.history.pushState({}, '', h_url.toString());
  };

  $('.courses-nav-category a').on('click', function(e) {
    var target = $(e.target).attr('href');
    window.history.replaceState(null, null, window.location.pathname);
    addQueryParam('category', target.replace('#', ''));
  });

  $('a.combination_title').on('click', function(e) {
    var target;
    if (e.target.nodeName === 'A') {
      target = $(e.target).attr('href');
    }
    if (e.target.nodeName === 'SPAN') {
      target = $(e.target.parentNode).attr('href');
    }

    $('select.combination_select').val(target.replace('#', ''));
    window.history.replaceState(null, null, window.location.pathname);
    addQueryParam('category', 'conbined-courses');
    addQueryParam('combind', target.replace('#', ''));
  });

  $('select.combination_select').on('change', function(e) {
    var target = e.target.value;
    var tabTarget = '#' + e.target.value;
    $('select.combination_select').val(target);
    $('#conbined-courses div.tab-pane').each(function(e) {
      $(this).removeClass('show active');
    });
    var targetBtn = '#menu-' + e.target.value;
    var trigger = new bootstrap.Tab($(targetBtn));
    trigger.show();

    window.history.replaceState(null, null, window.location.pathname);
    addQueryParam('category', 'conbined-courses');
    addQueryParam('combind', target.replace('#', ''));
  });

  $('.landing-combined.z_js-js_core-react').hide();
  $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').hide();
  $('.landing-combined-select.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').on('change', function(event) {
    var target = event.target.value;
    if (target === 'z_html_jQuery_rwd_bs5_js-plus_js-core_react') {
      $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').fadeIn();
      $('.landing-combined.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').hide();
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
  // 行動版 Line Message 點擊 A/B Testing
  var abtestingContact = 'mobileContact';
  var abtestingContactRandom = ['1', '2'];
  var abtestingContactDay = 3; // 30分鐘

  // 到期日
  var testingContactExpiresTime = abtestingContactDay; // 86400000 每日毫秒，補回一日

  // 測試目標
  var testingContact = $('#footerContact a');
  var cookieAbtestingContact = $.cookie(abtestingContact);

  // 測試 cookie
  var setCookie = function(name, value) { // 設定 cookie
    $.cookie(name, value, { expires: testingContactExpiresTime, path: '/' });
  };

  // 測試事件
  var testingEffect = function(test) {
    switch (test) {
      case '1':
        $.each($(testingContact), function() {
          $(this).removeClass('d-none');
          $(this).addClass('d-flex');
        });
        break;
    }
  };

  var testingContactTrack = function(randTesting) {
    if ($(window).width() < 768) {
      $('.fab-line').one('click', function(e) {
        mixpanel.track('mobileContactClick', {
          'TestRandom': randTesting,
          'TestContact': 'fab-line'
        });
      });
      $('.fab-facebook').one('click', function(e) {
        mixpanel.track('mobileContactClick', {
          'TestRandom': randTesting,
          'TestContact': 'fab-facebook'
        });
      });
      // 下拉選單內的電話和 Line 按鈕
      $('.dropdown-phone').one('click', function(e) {
        mixpanel.track('mobileContactClick', {
          'TestRandom': randTesting,
          'TestContact': 'dropdown-phone'
        });
      });
      $('.dropdown-line').one('click', function(e) {
        mixpanel.track('mobileContactClick', {
          'TestRandom': randTesting,
          'TestContact': 'dropdown-line'
        });
      });
      // 首頁最下方的電話和 Line 結果
      $('.landing-phone').one('click', function(e) {
        mixpanel.track('mobileContactClick', {
          'TestRandom': randTesting,
          'TestContact': 'landing-phone'
        });
      });
      $('.landing-line').one('click', function(e) {
        mixpanel.track('mobileContactClick', {
          'TestRandom': randTesting,
          'TestContact': 'landing-line'
        });
      });
    }
  };

  // 如果沒有 cookie 就寫入
  // if (!cookieAbtestingContact) {
    // randTesting = abtestingContactRandom[Math.floor(Math.random() * abtestingContactRandom.length)]
    // setCookie(abtestingContact, randTesting)
    // mixpanel.track('ABtesting', {
    //   'TestEvet': abtestingContact,
    //   'TestRandom': randTesting,
    //   'TestExpiresTime': abtestingContactDay
    // })
    // testingEffect(randTesting)
    // testingContactTrack(randTesting)
    // testingEffect(cookieAbtestingContact)
    // testingContactTrack(cookieAbtestingContact)
  // }

  // console.log(cookieAbtesting)
});

$(document).ready(function() {
  // Coupon 到期日
  var now = new Date();
  var todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var couponExpires = new Date(helper.getParameterByName('couponExpires'));
  var couponExpiresTime = ((couponExpires - now) + 86400000) / 86400000; // 86400000 每日毫秒，補回一日
  var hourExpiresTime = 1 / 24;
  var expiresTime = 0;
  if (couponExpiresTime && couponExpiresTime < 0) {
    // 如果過期
    // console.log('過期 coupon')
  } else if (couponExpiresTime && couponExpiresTime > 0 && couponExpiresTime < hourExpiresTime) {
    // 如果沒過期，距離到期不到 1 hr
    expiresTime = couponExpiresTime;
    // console.log('沒過期 couponExpiresTime', expiresTime)
  } else if (couponExpiresTime && couponExpiresTime > 0 && couponExpiresTime > hourExpiresTime) {
    // 沒過期，還超過 1 hr
    expiresTime = hourExpiresTime;
    // console.log('沒過期 hourExpiresTime', expiresTime)
  }

  var setCookie = function(name, value) {
    $.cookie(name, value, { expires: expiresTime, path: '/' });
    // console.log($.cookie(name))
  };

  $.each($('.couponCode-link'), function(i, item) {
    var thisCoupon = $(item).attr('data-coupon') || 'couponCode';
    var thisCouponCode = helper.getParameterByName(thisCoupon);
    var cookieCoupon = $.cookie(thisCoupon);
    // console.log(thisCouponCode);
    var thisLink = $(item).attr('data-link');
    if (thisCouponCode) {
      $(item).prop('href', thisLink + '?couponCode=' + thisCouponCode);
      helper.setCookie(thisCoupon, thisCouponCode);
    } else if (cookieCoupon) {
      $(item).prop('href', thisLink + '?couponCode=' + cookieCoupon);
    }
    return;
  });

  return;
});

$(document).ready(function() {
  if ($('.course-template').length > 0) {
    var course_template_url = location.href;
    var course_template_paramArr = ['intro', 'agenda', 'faq'];
    if (course_template_url.indexOf('#') !== -1) {
      var urlTarget = course_template_url.split('#')[1];
      var hasParamInArr = course_template_paramArr.some(function(ele) {
        return ele === urlTarget;
      });
      if (hasParamInArr) {
        var tabPaneItem = document.querySelectorAll('.tab-pane');
        tabPaneItem.forEach(function(ele) {
          $(ele).removeClass('show').removeClass('active');
        });
        var navItem = document.querySelectorAll('.category-bar a');
        navItem.forEach(function(ele) {
          $(ele).removeClass('active');
        });

        $('#' + urlTarget).addClass('active').addClass('show');
        $('.category-bar a[href="#' + urlTarget + '"]').addClass('active');
      }
    }

    var addQueryParam = function(value) {
      var h_url = new URL(window.location.href);
      window.history.pushState({}, '', "#" + value);
    };

    var changeTab = function(event, change) {
      var target = event.href.split('#')[1];
      addQueryParam(target);
      var tabPaneItem = document.querySelectorAll('.tab-pane');
      tabPaneItem.forEach(function(ele) {
        $(ele).removeClass('show').removeClass('active');
      });
      var navItem = document.querySelectorAll('.category-bar a');
      navItem.forEach(function(ele) {
        $(ele).removeClass('active');
      });

      $('#' + target).addClass('active').addClass('show');
      $('.category-bar a[href="#' + target + '"]').addClass('active');
      if (window.innerWidth < 768) {
        $('html, body').animate({ scrollTop: $('.tab-content').offset().top - 70 }, 1000);
      }
      if (change && window.innerWidth > 768) {
        $('html, body').animate({ scrollTop: 0 }, 1000);
      }
    };

    $('.changeTab').click(function(event) {
      if (event.target.nodeName === "IMG") {
        changeTab(event.target.parentNode.parentNode, true);
      } else {
        changeTab(event.target, true);
      }
      return;
    });
    $('.category-bar a').click(function(event) {
      changeTab(event.target, false);
      return;
    });

    $('.scroll-to-top').click(function(event) {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 1000);
    });

    if (window.innerWidth < 768) {
      var recommend = $('.course-template-recommend');
      var categoryBar = $('.category-bar');

      $('.course-template-recommend').css('top', '58px');
      $('.category-bar').css('top', '0px');

      var div2FromTop = $('.category-bar').offset().top;
      $(window).scroll(function() {
        var div1FromTop = recommend.offset().top;

        if (div1FromTop + 30 <= div2FromTop) {
          if (div1FromTop + 70 <= div2FromTop) {
            $('.course-template-recommend').css('top', '58px');
            $('.category-bar').css('top', '0px');
            if (div1FromTop + 65 <= div2FromTop) {
              $('.course-template-recommend').css('z-index', '20');
              $('.header').show();
            }
          }
        } else {
          $('.category-bar').css('top', '54px');
          $('.course-template-recommend').css('z-index', '1032');
          $('.course-template-recommend').css('top', '0px');
          if (div1FromTop + 10 > div2FromTop) {
            $('.header').hide();
          }
        }
      });
    }
  }
});

$(function() {
  if ($('#course-header').length) {
    $(window).scroll(function() {
      var top = $('body').scrollTop();
      if (top > 500) {
        $('#header').addClass('fade-to-top');
        $('#course-header').addClass('show-from-top');
      } else {
        $('#header').removeClass('fade-to-top');
        $('#course-header').removeClass('show-from-top');
      }
    });
    return;
  }
});

$(document).ready(function() {
  if ($('#courses_special').length) {
    $(window).scroll(function(e) {
      if ($(window).scrollTop() > 40) {
        $('.ad-big').css('display', 'none');
        $('.ad-sm').css('display', 'block');
      } else {
        $('.ad-big').css('display', 'block');
        $('.ad-sm').css('display', 'none');
      }
    });
    // .ad-clock-xl / .ad-clock-sm 改由 promotions-runtime.js 初始化與維護（同 footer-clock 原因）

    $('#choeseCourse').on('click', function() {
      var coupon = $(this).data('coupon');
      var url = $(this).data('url');
      var selectedCourses = [];
      var leadCourse = '';
      $('#customCourses .selecedCourse:checked').each(function(i, item) {
        console.log(i, item, $(this).val());
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
        window.open(decodeURIComponent(totalUrl + '#addProducts'));
      }
    });

    var countPrice = function() {
      var total = 0;
      var originTotal = 0;
      var value = '';
      var conditionText = '';
      $('#customCourses .selecedCourse:checked').each(function(i, item) {
        value = item.value;
        var price = parseInt($(this).data('price'));
        var originPrice = parseInt($(this).data('originprice'));
        total = total + price;
        originTotal = originTotal + originPrice;
      });
      $('#selecedTotal').text(total.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
      $('#selecedOriginTotal').text((originTotal - total).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
      if (total > 5799) {
        $('#condition_false').hide();
        $('#condition_true').show();
      } else {
        conditionText = 5880 - total;
        $('#condition').html(conditionText);
        $('#condition_false').show();
        $('#condition_true').hide();
      }
    };

    countPrice();
    // 暫存總價
    $('#customCourses .selecedCourse').on('change', function() {
      countPrice();
    });

    var checkCourse = false;
    var checkGodtohex = false;

    $('#select-all-course').on('click', function(e) {
      e.preventDefault();
      if (!checkCourse) {
        $('#main-course-2019 .selecedCourse').each(function(i, item) {
          item.checked = !checkCourse;
          return;
        });
        checkCourse = !checkCourse;
      } else {
        $('#main-course-2019 .selecedCourse').each(function(i, item) {
          item.checked = !checkCourse;
          return;
        });
        checkCourse = !checkCourse;
      }
      countPrice();
    });

    $('#select-all-godtohex').on('click', function(e) {
      e.preventDefault();
      if (!checkGodtohex) {
        $('#godtohex-2019 .selecedCourse').each(function(i, item) {
          item.checked = !checkGodtohex;
          return;
        });
        checkGodtohex = !checkGodtohex;
      } else {
        $('#godtohex-2019 .selecedCourse').each(function(i, item) {
          item.checked = !checkGodtohex;
          return;
        });
        checkGodtohex = !checkGodtohex;
      }
      countPrice();
    });
  }
  return;
});

var vueApp = function() {
  // firebase.initializeApp(firebase_config)
  // database = firebase.database()

  // database.ref('/udemy-api').on('value', function(snapshot) {
  //   appCourse.course = snapshot.val()
  //   console.log(snapshot.val())
  // })

  $.getJSON('https://shop.hexschool.com/api/udemydata/getCourseData', function(data) {
    courseEvaluation.course = data;
    appCourse.courseData = [];
    $.each(data, function(key, courses) {
      if (courses.review.count) {
        $.each(courses.review.results, function(i, review) {
          appCourse.courseData.push(review);
        });
      }
    });
  });

  $.getJSON('https://shop.hexschool.com/api/udemydata/getCoursesBasicData', function(data) {
    appCourse.course = data;
    courseEvaluation.course = data;

    setTimeout(function() {
      var swiper = new Swiper('.slide-reviews', {
        pagination: '.swiper-pagination',
        paginationType: 'progress', // 側欄選項
        direction: 'vertical', // 垂直
        // mousewheelControl: true, // 可用滑鼠
        spaceBetween: 15, // 間隔
        slidesPerView: 'auto', // 每頁數量
        autoplay: 2000, // 自動播放
        slideClass: 'swiper-slide',
        autoplayDisableOnInteraction: false
      });
    }, 1500);
  });

  var appCourse = new Vue({
    el: '#course',
    data: {
      course: {},
      courseData: [],
      rightCoupon: {}, // 目前的 Coupon 使用
      couponData: {},
      udemyCouponData: {},
      udemyRightCoupon: {}, // Udemy 目前的 Coupon
      trainingDate: {},
      trainingStatus: {
        js: {},
        vue: {},
        typescript: {},
        nuxt3: {},
        react: {},
        web_layout: {},
        ui: {},
        backend: {},
        camping: {},
        frontend_training: {},
        js_react_training_2025: {},
        backend_camp: {},
        ai_year_upgrade: {},
        nodejs_training: {}
      },
      trainingWait: {
        js: {},
        vue: {},
        typescript: {},
        nuxt3: {},
        react: {},
        web_layout: {},
        ui: {},
        backend: {},
        camping: {},
        frontend_training: {},
        js_react_training_2025: {},
        backend_camp: {},
        ai_year_upgrade: {},
        nodejs_training: {}
      }
    },
    methods: {
      checkCouponType: function(id) {
        return this.rightCoupon.course.includes(id);
      }
    }
  });

  var getUseCoupon = function() {
    var priceCoupon = appCourse.couponData.price;
    var originPriceCoupon = appCourse.couponData.origin_price;
    var today = dayjs().format('YYYY-MM-DD');

    $.each(priceCoupon, function(i, data) {
      var dateData = data.date;
      $.each(dateData, function(i, day) {
        if (dayjs(today).isAfter(day.start_at) && dayjs(today).isBefore(day.ended_at)) {
          appCourse.rightCoupon = data;
          return;
        }
      });
    });
    if (Object.keys(appCourse.rightCoupon).length === 0) {
      appCourse.rightCoupon = originPriceCoupon;
    }
  };

  var getUseUdemyCoupon = function() { // Udemy Coupon
    var priceCoupon = appCourse.udemyCouponData.price;
    var today = dayjs().format('YYYY-MM-DD');

    $.each(priceCoupon, function(i, data) {
      var dateData = data.date;
      if (dayjs(today).isAfter(dateData.start_at) && dayjs(today).isBefore(dateData.ended_at)) {
        appCourse.udemyRightCoupon = data;
        return;
      }
    });
    if (Object.keys(appCourse.udemyRightCoupon).length === 0) {
      appCourse.udemyRightCoupon = '';
    }
  };

  var checkTrainingStatus = function() { // 確認直播班當前的開賣狀態
    var today = dayjs().format('YYYY-MM-DD HH:mm:ss');

    $.each(appCourse.trainingDate, function(i, data) {
      var dateData = data.date;
      $.each(dateData, function(i, day) {
        if (dayjs(today).isAfter(day.canbuy_start_at) && dayjs(today).isBefore(day.canbuy_ended_at)) {
          appCourse.trainingStatus[data.id] = data;
          appCourse.trainingStatus[data.id]['day'] = day;
          appCourse.trainingStatus[data.id]['status'] = true;
        }
        return;
      });
      $.each(dateData, function(i, day) {
        if (dayjs(today).isBefore(day.canbuy_start_at)) {
          appCourse.trainingWait[data.id] = data;
          appCourse.trainingWait[data.id]['notOpen_day'] = day;
        }
      });
    });
  };

  // 取得 coupon-data.json
  $.getJSON('../coupon-data.json', function(data) {
    appCourse.couponData = data;
    getUseCoupon();
  });

  // 取得 udemy-coupon-data.json
  $.getJSON('../udemy-coupon-data.json', function(data) {
    appCourse.udemyCouponData = data;
    getUseUdemyCoupon();
  });

  // 取得 training-date.json
  $.getJSON('../training-date.json', function(data) {
    appCourse.trainingDate = data;
    checkTrainingStatus();
    return;
  });

  // 取得 calendar 資料
  var CalendarNotification = new Vue({
    el: '#calendarNotification',
    data: {
      notificationLength: 0
    }
  });

  var CalendarRecent = new Vue({
    el: '#calendarRecent',
    data: {
      calendarArr: []
    }
  });

  var passCalendarData = function(data) {
    CalendarNotification.notificationLength = data.length;
    CalendarRecent.calendarArr = data;
    return;
  };

  var h_calendar = {
    cal_id: document.querySelector('meta[name="calendar-id"]').content,
    api_key: document.querySelector('meta[name="calendar-key"]').content,
    today: new Date()
  };
  var h_calendar_time = {
    fullYear: h_calendar.today.getFullYear(),
    month: h_calendar.today.getMonth(),
    date: h_calendar.today.getDate(),
    hours: h_calendar.today.getHours()
  };
  var h_timeMin = new Date(h_calendar_time.fullYear, h_calendar_time.month, h_calendar_time.date, h_calendar_time.hours - 10).toISOString();
  var h_timeMax = new Date(h_calendar_time.fullYear, h_calendar_time.month, h_calendar_time.date + 2, h_calendar_time.hours).toISOString();

  var calendarAjax = function() {
    $.getJSON('https://content.googleapis.com/calendar/v3/calendars/' + h_calendar.cal_id + '/events?key=' + h_calendar.api_key + '&timeMax=' + h_timeMax + '&timeMin=' + h_timeMin, function(data) {
      var storageData = {
        items: data.items.reverse(),
        timeStamp: new Date().getTime()
      };
      window.localStorage.setItem('U2FsdGVkX1', JSON.stringify(storageData));
      passCalendarData(data.items.reverse());
    });
    return;
  };

  var getCalendarData = function() {
    var now = new Date().getTime();
    var content = window.localStorage.getItem('U2FsdGVkX1');
    if (content) {
      var c_time = JSON.parse(content).timeStamp;
      var data = JSON.parse(content).items;
      console.log(now - c_time);
      if (now - c_time >= 1800000) {
        calendarAjax();
      } else {
        passCalendarData(data);
      }
    } else {
      calendarAjax();
    }
  };

  getCalendarData();

  var courseEvaluation = new Vue({
    el: '#evaluation',
    data: {
      course: {},
      courseData: []
    }
  });

  /* Facebook 登入領獎 */
  var appGetFreeCoupon = new Vue({
    el: '#appGetFreeCoupon',
    data: {
      user: {
        name: '',
        email: ''
      },
      event: {},
      text: {},
      step: '1'
    },
    methods: {
      loginFacebook: function() {
        signInWithPopup();
      }
    }
  });
};

vueApp();

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

$(document).ready(function() {
  $('.course-category').on("click", function(event) {
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active');
    if ($(this).hasClass('active')) {
      $(this).children().find('.category-open')[0].textContent = 'remove';
      $.each($(this).siblings().children().find('.category-open'), function(key, item) {
        item.textContent = 'add';
      });
    } else {
      $(this).children().find('.category-open').textContent = 'add';
      $(this).siblings().children().find('.category-open').textContent = 'add';
    }
    $(this).find('.course-dropdown').toggleClass('show');
    $(this).siblings().find('.course-dropdown').removeClass('show');
  });
  return;
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

  $('#web-course-pre').on('click', function(event) {
    event.preventDefault();
    $('#webCourse').carousel('prev');
  });
  $('#web-course-next').on('click', function(event) {
    event.preventDefault();
    $('#webCourse').carousel('next');
  });

  $('#web-layout-experience-pre').on('click', function(event) {
    event.preventDefault();
    $('#web-layout-experience').carousel('prev');
  });
  $('#web-layout-experience-next').on('click', function(event) {
    event.preventDefault();
    $('#web-layout-experience').carousel('next');
  });

  $('#web-layout-experience-2-pre').on('click', function(event) {
    event.preventDefault();
    $('#web-layout-experience-2').carousel('prev');
  });
  $('#web-layout-experience-2-next').on('click', function(event) {
    event.preventDefault();
    $('#web-layout-experience-2').carousel('next');
  });

  return;
});

var orderModalApp = new Vue({
  el: '#orderModal',
  data: {
    text: {}
  }
});

$(document).ready(function() {
  $('.navbar-toggler').on("click", function(event) {
    $('.mobile-logo').removeClass('d-block');
    $('.search').removeClass('d-block');
    $('.navbar-collapse').siblings().css('display', 'none');
  });

  $('.close').on("click", function(event) {
    $('.mobile-logo').addClass('d-block');
    $('.search').addClass('d-block');
    $('.navbar-collapse').siblings().css('display', 'block');
    $('.navbar-toggler').css('display', 'block');
  });

  // 判斷滑鼠位置
  var ishover = false;

  $('.dropdown-course').mouseover(function() {
    $('.menu-course-category').addClass('show');
    ishover = true;
  });

  $('.dropdown-course').click(function() {
    $('.menu-course-category').addClass('show');
    ishover = true;
  });

  $('.menu-course-category').mouseover(function() {
    $('.menu-course-category').addClass('show');
    ishover = true;
  });

  var getMousePotion = function() {
    if (ishover === false) {
      $('.menu-course-category').removeClass('show');
    }
  };

  $('.dropdown-course').mouseout(function() {
    ishover = false;
    setTimeout(function() {
      getMousePotion();
    }, 500);
  });

  $('.menu-course-category').mouseout(function() {
    ishover = false;
    setTimeout(function() {
      getMousePotion();
    }, 500);
  });
  return;
});

$(document).ready(function() {
  // 判斷滑鼠位置
  var ishoverQA = false;

  $('.dropdown-qa').mouseover(function() {
    $('.dropdown-menu-qa').addClass('show');
    ishoverQA = true;
  });

  $('.dropdown-qa').click(function() {
    $('.dropdown-menu-qa').addClass('show');
    ishoverQA = true;
  });

  $('.dropdown-menu-qa').mouseover(function() {
    $('.dropdown-menu-qa').addClass('show');
    ishoverQA = true;
  });

  var getQAMousePotion = function() {
    if (ishoverQA === false) {
      $('.dropdown-menu-qa').removeClass('show');
    }
  };

  $('.dropdown-qa').mouseout(function() {
    ishoverQA = false;
    setTimeout(function() {
      getQAMousePotion();
    }, 500);
  });

  $('.dropdown-menu-qa').mouseout(function() {
    ishoverQA = false;
    setTimeout(function() {
      getQAMousePotion();
    }, 500);
  });
  return;
});

$(document).ready(function() {
  // 判斷滑鼠位置
  var ishoverQA = false;

  $('.dropdown-case').mouseover(function() {
    $('.dropdown-menu-case').addClass('show');
    ishoverQA = true;
  });

  $('.dropdown-case').click(function() {
    $('.dropdown-menu-case').addClass('show');
    ishoverQA = true;
  });

  $('.dropdown-menu-case').mouseover(function() {
    $('.dropdown-menu-case').addClass('show');
    ishoverQA = true;
  });

  var getQAMousePotion = function() {
    if (ishoverQA === false) {
      $('.dropdown-menu-case').removeClass('show');
    }
  };

  $('.dropdown-case').mouseout(function() {
    ishoverQA = false;
    setTimeout(function() {
      getQAMousePotion();
    }, 500);
  });

  $('.dropdown-menu-case').mouseout(function() {
    ishoverQA = false;
    setTimeout(function() {
      getQAMousePotion();
    }, 500);
  });
  return;
});

$(document).ready(function() {
  $(window).scroll(function() {
    var scrollDistance = $(window).scrollTop();
    $('h2').each(function(i) {
      if (i > 0) {
        if ($(this).position().top + 151 <= scrollDistance) {
          $('.qa-menu a[href*="#"]:not([href="#"]).active').removeClass('active');
          $('.qa-menu a').eq(i - 1).addClass('active');
        }
      }
    });
  });
});

(function() {
  var resumeApp = document.getElementById('resumeApp');
  var resumeAreaID = document.getElementById('resumeArea');
  var scrollTopID = document.getElementById('scroll-top');
  var workID = document.getElementById('hasWork');
  var hasWorkCount = 300;

  var profileUserData = '';

  var getProfile = function() {
    var profileUrl = 'https://raw.githubusercontent.com/hexschool/Resume/master/profile.json';
    var workUrl = 'https://raw.githubusercontent.com/hexschool/Resume/master/findJob.json';
    $.getJSON(profileUrl)
      .done(function(result) {
        profileUserData = result;
        return;
      })
      .then(function(result) {
        $.getJSON(workUrl)
          .done(function(work) {
            updateProfile(profileUserData);
            optionArea(profileUserData);
            getWorkPeple(work);
            return;
          });
      })
      .fail(function(error) {
        console.log(error);
        return;
      });
    return;
  };

  var optionArea = function(data) {
    var newArea = filterArea(data);
    newArea.forEach(function(item) {
      var options = document.createElement('option');
      options.textContent = item;
      if (resumeAreaID) {
        resumeAreaID.appendChild(options);
      }
    });
  };

  var filterArea = function(data) {
    var profile = data;
    var cache = [];
    var newArea = [];

    profile.forEach(function(item) {
      cache = cache.concat(item.location);
    });

    newArea = cache.filter(function(item, index) {
      return cache.indexOf(item) === index;
    });

    return newArea;
  };

  var updateProfile = function(profileData) {
    var profile = profileData;
    var str = '';
    var newArea = filterArea(profile);
    newArea.forEach(function(area) {
      str += hopeArea(area);
      profile.forEach(function(item) {
        var a = item.location.some(function(val) {
          return val === area;
        });
        if (a && item.profileUrl) {
          return str += profileCard(item);
        }
      });
      profile.forEach(function(item) {
        var a = item.location.some(function(val) {
          return val === area;
        });
        if (a && !item.profileUrl) {
          str += profileCard(item);
        }
      });
    });
    if (resumeApp) {
      resumeApp.innerHTML = str;
    }
  };

  var filterProfile = function(profile, area) {
    var str = '';
    str += hopeArea(area);

    profile.forEach(function(profileItem) {
      profileItem.location.forEach(function(item) {
        if (item === area && profileItem.profileUrl) {
          str += profileCard(profileItem);
        }
      });
    });
    profile.forEach(function(profileItem) {
      profileItem.location.forEach(function(item) {
        if (item === area && !profileItem.profileUrl) {
          str += profileCard(profileItem);
        }
      });
    });
    if (resumeApp) {
      resumeApp.innerHTML = str;
    }
  };

  var getWorkPeple = function(data) {
    if (workID) {
      workID.innerHTML = "有 " + (hasWorkCount + data.length) + " 位學員透過六角成功就業囉" + '<i class="fas fa-laugh-wink mx-2"></i>';
    }
  };

  var hopeArea = function(area) {
    return "<div class='col-md-12'>" +
      "<h3>" +
        "<i class='fas fa-map-marker-alt text-dark'></i>" +
        " 他們希望在 <span class='text-dark bg-half-line'>" + area + "</span> 工作" +
      "</h3>" +
      "<hr/>" +
    "</div>";
  };

  var profileCard = function(item) {
    return "<div class='col-md-6 my-2'>" +
      "<div class='card h-100'>" +
        "<div class='card-body'>" +
          "<div class='row flex-row-reverse flex-column justify-content-between h-100'>" +
            "<div class='col-lg-5'>" +
              "<div class='d-flex flex-column align-items-center'>" +
                "<div class='profile-user-img' style='background-image: url(" + item.imgUrl + ")'></div>" +
                "<div class='profile-type text-nowrap smail text-dark'>" +
                  item.type.map(function(itemType) {
                    return "<span>" + itemType + "</span>";
                  }).join(' / ') +
                "</div>" +
                (item.experience !== 0 ? "<div class='text-dark'>工作經歷 " + item.experience + " 年</div>" : '') +
              "</div>" +
            "</div>" +
            "<div class='col-lg-7 d-flex flex-column align-self-stretch'>" +
              "<h5 class='card-title font-weight-bold'>" + item.name + "</h5>" +
              "<div class='profile-location small text-dark'>" +
                "<i class='fas fa-map-marker-alt'></i>" +
                item.location.map(function(itemLocation) {
                  return "<span>" + itemLocation + "</span>";
                }).join(' / ') +
              "</div>" +
              "<div class='text-start font-weight-bold'>" + item.job + "</div>" +
              "<p class='card-text profile-description text-dark'>" + item.description + "</p>" +
              "<div class='profile-tags text-dark mt-auto'>" +
                item.tags.map(function(itemTages) {
                  return "<span class='d-inline-block'>" + itemTages + "</span>";
                }).join(' / ') +
              "</div>" +
              "<div class='profile-connect'>" +
                (item.profileUrl ? "<a href='" + item.profileUrl + "' class='btn btn-primary rounded-0 btn-block mt-2'>網羅人才</a>" : "<a href='#' class='btn btn-primary rounded-0 btn-block mt-2 disabled' tabindex='-1' role='button' aria-disabled='true'><i class='fab fa-angellist'></i> 成功媒合！</a>") +
              "</div>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";
  };

  getProfile();

  if (resumeAreaID) {
    resumeAreaID.addEventListener('change', function(e) {
      if (e.target.value === '全部') {
        updateProfile(profileUserData);
      } else {
        filterProfile(profileUserData, e.target.value);
      }
    });
  }
})();

$(document).ready(function() {
  // student works Swiper
  var swiper = new Swiper('.swiper-student-work', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 10,
        slidesPerView: 'auto',
        centeredSlides: true
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  return;
});

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
  var arr = ['寫程式', '做設計', '找工作', '做履歷'];
  var count = 0;
  setInterval(function() {
    count += 1;
    var animationName = 'typewriter';
    var animationend = 'animationend';
    if ($('#typewrite-animated').hasClass(animationName)) {
      $('#typewrite-animated')[0].classList.remove(animationName);
    } else {
      $('#typewrite-animated').addClass(animationName).one(animationend, function() {
        setTimeout(function() {
          $('#typewrite-text').text('');
          $('#typewrite-animated')[0].classList.remove(animationName);
        }, 800);
      });
    }
    if (count % 3 === 0) {
      $('#typewrite-text').text(arr[0]);
    } else if (count % 3 === 1) {
      $('#typewrite-text').text(arr[1]);
    } else if (count % 3 === 2) {
      $('#typewrite-text').text(arr[2]);
    }
  }, 1700);
});
