var helper, orderModalApp, tracker, vueApp;

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

$(document).ready(function() {});

$(document).ready(function() {
  var abtesting, abtestingDay, abtestingRandom, cookieAbtesting, randTesting, setCookie, testing, testingEffect, testingExpiresTime;
  abtesting = 'testClass';
  abtestingRandom = ['1', '2'];
  abtestingDay = 3;
  testingExpiresTime = abtestingDay;
  testing = $('[data-abtesting-class*="ani"]');
  cookieAbtesting = $.cookie(abtesting);
  setCookie = function(name, value) {
    return $.cookie(name, value, {
      expires: testingExpiresTime,
      path: '/'
    });
  };
  testingEffect = function(test) {
    switch (test) {
      case '1':
        return $.each($(testing), function() {
          return $(this).addClass('ani-loop animated pulse');
        });
    }
  };
  if (!cookieAbtesting) {
    randTesting = abtestingRandom[Math.floor(Math.random() * abtestingRandom.length)];
    setCookie(abtesting, randTesting);
    return mixpanel.track('ABtesting', {
      'TestEvet': abtesting,
      'TestRandom': randTesting,
      'TestExpiresTime': abtestingDay
    });
  }
});

$(document).ready(function() {
  var addQueryParam;
  $('.course-area-link').on("click", function(event) {
    var url;
    if (event.target.nodeName !== 'A' && event.target.nodeName !== 'I') {
      url = $(this).data('url');
      return window.open(url);
    }
  });
  $('.course-area-link').on("auxclick", function(event) {
    var url;
    if (event.target.nodeName !== 'A' && event.target.nodeName !== 'I') {
      url = $(this).data('url');
      return window.open(url);
    }
  });
  $('#select-mobile-combined').on('change', function(e) {
    var target, targetBtn, trigger;
    target = '#' + e.target.value;
    $('select.combination_select').val(target.replace('#', ''));
    $('#conbined-courses div.tab-pane').each(function(e) {
      return $(this).removeClass('show active');
    });
    targetBtn = '#menu-' + e.target.value;
    trigger = new bootstrap.Tab($(targetBtn));
    trigger.show();
    window.history.replaceState(null, null, window.location.pathname);
    addQueryParam('category', 'conbined-courses');
    return addQueryParam('combind', e.target.value);
  });
  if ($('#pills-conbined-tab').hasClass('active')) {
    $('#courses_special').css('display', 'none');
  }
  $('.courses-nav-category').on('click', function(e) {
    $('html, body').animate({
      scrollTop: 0
    }, 0);
    if (e.target.id === 'pills-conbined-tab') {
      return $('#courses_special').css('display', 'none');
    } else {
      return $('#courses_special').css('display', 'block');
    }
  });
  $('.courses-nav-category').on('scroll', function(e) {
    if (($(this).width() + $(this).scrollLeft()) > $('.courses-nav-category')[0].scrollWidth - 5) {
      return $('.scroll-hint').css('display', 'none');
    } else {
      return $('.scroll-hint').css('display', 'inline-block');
    }
  });
  addQueryParam = (function(_this) {
    return function(key, value) {
      var h_url;
      h_url = new URL(window.location.href);
      h_url.searchParams.set(key, value);
      return window.history.pushState({}, '', h_url.toString());
    };
  })(this);
  $('.courses-nav-category a').on('click', function(e) {
    var target;
    target = $(e.target).attr('href');
    window.history.replaceState(null, null, window.location.pathname);
    return addQueryParam('category', target.replace('#', ''));
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
    return addQueryParam('combind', target.replace('#', ''));
  });
  $('select.combination_select').on('change', function(e) {
    var tabTarget, target, targetBtn, trigger;
    target = e.target.value;
    tabTarget = '#' + e.target.value;
    $('select.combination_select').val(target);
    $('#conbined-courses div.tab-pane').each(function(e) {
      return $(this).removeClass('show active');
    });
    targetBtn = '#menu-' + e.target.value;
    trigger = new bootstrap.Tab($(targetBtn));
    trigger.show();
    window.history.replaceState(null, null, window.location.pathname);
    addQueryParam('category', 'conbined-courses');
    return addQueryParam('combind', target.replace('#', ''));
  });
  $('.landing-combined.z_js-js_core-react').hide();
  $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').hide();
  $('.landing-combined-select.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').on('change', function(event) {
    var target;
    target = event.target.value;
    if (target === 'z_html_jQuery_rwd_bs5_js-plus_js-core_react') {
      $('.landing-combined.z_html_jQuery_rwd_bs5_js-plus_js-core_react').fadeIn();
      return $('.landing-combined.z_html_jQuery_rwd_bs4_js-plus_js-core_vue3').hide();
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
  var abtestingContact, abtestingContactDay, abtestingContactRandom, cookieAbtestingContact, setCookie, testingContact, testingContactExpiresTime, testingContactTrack, testingEffect;
  abtestingContact = 'mobileContact';
  abtestingContactRandom = ['1', '2'];
  abtestingContactDay = 3;
  testingContactExpiresTime = abtestingContactDay;
  testingContact = $('#footerContact a');
  cookieAbtestingContact = $.cookie(abtestingContact);
  setCookie = function(name, value) {
    return $.cookie(name, value, {
      expires: testingContactExpiresTime,
      path: '/'
    });
  };
  testingEffect = function(test) {
    switch (test) {
      case '1':
        return $.each($(testingContact), function() {
          $(this).removeClass('d-none');
          return $(this).addClass('d-flex');
        });
    }
  };
  return testingContactTrack = (function(_this) {
    return function(randTesting) {
      if ($(window).width() < 768) {
        $('.fab-line').one('click', function(e) {
          return mixpanel.track('mobileContactClick', {
            'TestRandom': randTesting,
            'TestContact': 'fab-line'
          });
        });
        $('.fab-facebook').one('click', function(e) {
          return mixpanel.track('mobileContactClick', {
            'TestRandom': randTesting,
            'TestContact': 'fab-facebook'
          });
        });
        $('.dropdown-phone').one('click', function(e) {
          return mixpanel.track('mobileContactClick', {
            'TestRandom': randTesting,
            'TestContact': 'dropdown-phone'
          });
        });
        $('.dropdown-line').one('click', function(e) {
          return mixpanel.track('mobileContactClick', {
            'TestRandom': randTesting,
            'TestContact': 'dropdown-line'
          });
        });
        $('.landing-phone').one('click', function(e) {
          return mixpanel.track('mobileContactClick', {
            'TestRandom': randTesting,
            'TestContact': 'landing-phone'
          });
        });
        return $('.landing-line').one('click', function(e) {
          return mixpanel.track('mobileContactClick', {
            'TestRandom': randTesting,
            'TestContact': 'landing-line'
          });
        });
      }
    };
  })(this);
});

$(document).ready(function() {
  var couponExpires, couponExpiresTime, expiresTime, hourExpiresTime, now, setCookie, todayAtMidn;
  now = new Date();
  todayAtMidn = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  couponExpires = new Date(helper.getParameterByName('couponExpires'));
  couponExpiresTime = ((couponExpires - now) + 86400000) / 86400000;
  hourExpiresTime = 1 / 24;
  expiresTime = 0;
  if (couponExpiresTime && couponExpiresTime < 0) {

  } else if (couponExpiresTime && couponExpiresTime > 0 && couponExpiresTime < hourExpiresTime) {
    expiresTime = couponExpiresTime;
  } else if (couponExpiresTime && couponExpiresTime > 0 && couponExpiresTime > hourExpiresTime) {
    expiresTime = hourExpiresTime;
  }
  setCookie = function(name, value) {
    return $.cookie(name, value, {
      expires: expiresTime,
      path: '/'
    });
  };
  $.each($('.couponCode-link'), function(i, item) {
    var cookieCoupon, thisCoupon, thisCouponCode, thisLink;
    thisCoupon = $(item).attr('data-coupon') || 'couponCode';
    thisCouponCode = helper.getParameterByName(thisCoupon);
    cookieCoupon = $.cookie(thisCoupon);
    thisLink = $(item).attr('data-link');
    if (thisCouponCode) {
      $(item).prop('href', thisLink + '?couponCode=' + thisCouponCode);
      helper.setCookie(thisCoupon, thisCouponCode);
    } else if (cookieCoupon) {
      $(item).prop('href', thisLink + '?couponCode=' + cookieCoupon);
    }
  });
});

$(document).ready(function() {
  var addQueryParam, categoryBar, changeTab, course_template_paramArr, course_template_url, div2FromTop, hasParamInArr, navItem, recommend, tabPaneItem, urlTarget;
  if ($('.course-template').length > 0) {
    course_template_url = location.href;
    course_template_paramArr = ['intro', 'agenda', 'faq'];
    if (course_template_url.indexOf('#') !== -1) {
      urlTarget = course_template_url.split('#')[1];
      hasParamInArr = course_template_paramArr.some(function(ele) {
        return ele === urlTarget;
      });
      if (hasParamInArr) {
        tabPaneItem = document.querySelectorAll('.tab-pane');
        tabPaneItem.forEach(function(ele) {
          return $(ele).removeClass('show').removeClass('active');
        });
        navItem = document.querySelectorAll('.category-bar a');
        navItem.forEach(function(ele) {
          return $(ele).removeClass('active');
        });
        $('#' + urlTarget).addClass('active').addClass('show');
        $('.category-bar a[href="#' + urlTarget + '"]').addClass('active');
      }
    }
    addQueryParam = (function(_this) {
      return function(value) {
        var h_url;
        h_url = new URL(window.location.href);
        return window.history.pushState({}, '', "#" + value);
      };
    })(this);
    changeTab = function(event, change) {
      var target;
      target = event.href.split('#')[1];
      addQueryParam(target);
      tabPaneItem = document.querySelectorAll('.tab-pane');
      tabPaneItem.forEach(function(ele) {
        return $(ele).removeClass('show').removeClass('active');
      });
      navItem = document.querySelectorAll('.category-bar a');
      navItem.forEach(function(ele) {
        return $(ele).removeClass('active');
      });
      $('#' + target).addClass('active').addClass('show');
      $('.category-bar a[href="#' + target + '"]').addClass('active');
      if (window.innerWidth < 768) {
        $('html, body').animate({
          scrollTop: $('.tab-content').offset().top - 70
        }, 1000);
      }
      if (change && window.innerWidth > 768) {
        return $('html, body').animate({
          scrollTop: 0
        }, 1000);
      }
    };
    $('.changeTab').click(function(event) {
      if (event.target.nodeName === "IMG") {
        changeTab(event.target.parentNode.parentNode, true);
      } else {
        changeTab(event.target, true);
      }
    });
    $('.category-bar a').click(function(event) {
      changeTab(event.target, false);
    });
    $('.scroll-to-top').click(function(event) {
      event.preventDefault();
      return $('html, body').animate({
        scrollTop: 0
      }, 1000);
    });
    if (window.innerWidth < 768) {
      recommend = $('.course-template-recommend');
      categoryBar = $('.category-bar');
      $('.course-template-recommend').css('top', '58px');
      $('.category-bar').css('top', '0px');
      div2FromTop = $('.category-bar').offset().top;
      return $(window).scroll(function() {
        var div1FromTop;
        div1FromTop = recommend.offset().top;
        if (div1FromTop + 30 <= div2FromTop) {
          if (div1FromTop + 70 <= div2FromTop) {
            $('.course-template-recommend').css('top', '58px');
            $('.category-bar').css('top', '0px');
            if (div1FromTop + 65 <= div2FromTop) {
              $('.course-template-recommend').css('z-index', '20');
              return $('.header').show();
            }
          }
        } else {
          $('.category-bar').css('top', '54px');
          $('.course-template-recommend').css('z-index', '1032');
          $('.course-template-recommend').css('top', '0px');
          if (div1FromTop + 10 > div2FromTop) {
            return $('.header').hide();
          }
        }
      });
    }
  }
});

$(function() {
  if ($('#course-header').length) {
    $(window).scroll(function() {
      var top;
      top = $('body').scrollTop();
      if (top > 500) {
        $('#header').addClass('fade-to-top');
        return $('#course-header').addClass('show-from-top');
      } else {
        $('#header').removeClass('fade-to-top');
        return $('#course-header').removeClass('show-from-top');
      }
    });
  }
});

$(document).ready(function() {
  var adtimer, checkCourse, checkGodtohex, countPrice;
  if ($('#courses_special').length) {
    $(window).scroll(function(e) {
      if ($(window).scrollTop() > 40) {
        $('.ad-big').css('display', 'none');
        return $('.ad-sm').css('display', 'block');
      } else {
        $('.ad-big').css('display', 'block');
        return $('.ad-sm').css('display', 'none');
      }
    });
    adtimer = $('#courses-ad-clock').val();
    $('.ad-clock-xl').countdown(adtimer, function(event) {
      return $(this).html(event.strftime('<div class="text-md-white font-ad-title font-weight-md-bold"><span class="text-primary">%D</span> 天 <span class="text-primary">%H</span>  時 <span class="text-primary">%M</span>  分 <span class="text-primary">%S</span>  秒</div>'));
    });
    $('.ad-clock-sm').countdown(adtimer, function(event) {
      return $(this).html(event.strftime('<div class="text-md-white text-dark font-clock-size font-weight-md-bold"><span class="text-md-primary text-dark">%D</span> 天 <span class="text-md-primary text-dark">%H</span>  時 <span class="text-md-primary text-dark">%M</span>  分 <span class="text-md-primary text-dark">%S</span>  秒</div>'));
    });
  }
  $('#choeseCourse').on('click', function() {
    var coupon, leadCourse, param, selectedCourses, totalUrl, url;
    coupon = $(this).data('coupon');
    url = $(this).data('url');
    selectedCourses = [];
    leadCourse = '';
    $('#customCourses .selecedCourse:checked').each(function(i, item) {
      console.log(i, item, $(this).val());
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
      return window.open(decodeURIComponent(totalUrl + '#addProducts'));
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
    $('#selecedTotal').text(total.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
    $('#selecedOriginTotal').text((originTotal - total).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'));
    if (total > 5799) {
      $('#condition_false').hide();
      return $('#condition_true').show();
    } else {
      conditionText = 5880 - total;
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
  $('#select-all-godtohex').on('click', function(e) {
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

vueApp = function() {
  var CalendarNotification, CalendarRecent, appCourse, appGetFreeCoupon, calendarAjax, checkTrainingStatus, courseEvaluation, getCalendarData, getUseCoupon, getUseUdemyCoupon, h_calendar, h_calendar_time, h_timeMax, h_timeMin, passCalendarData;
  $.getJSON('https://shop.hexschool.com/api/udemydata/getCourseData', function(data) {
    courseEvaluation.course = data;
    appCourse.courseData = [];
    return $.each(data, function(key, courses) {
      if (courses.review.count) {
        return $.each(courses.review.results, function(i, review) {
          return appCourse.courseData.push(review);
        });
      }
    });
  });
  $.getJSON('https://shop.hexschool.com/api/udemydata/getCoursesBasicData', function(data) {
    appCourse.course = data;
    return courseEvaluation.course = data;
  });
  setTimeout(function() {
    var swiper;
    return swiper = new Swiper('.slide-reviews', {
      pagination: '.swiper-pagination',
      paginationType: 'progress',
      direction: 'vertical',
      spaceBetween: 15,
      slidesPerView: 'auto',
      autoplay: 2000,
      slideClass: 'swiper-slide',
      autoplayDisableOnInteraction: false
    });
  }, 1500);
  appCourse = new Vue({
    el: '#course',
    data: {
      course: {},
      courseData: [],
      rightCoupon: {},
      couponData: {},
      udemyCouponData: {},
      udemyRightCoupon: {},
      trainingDate: {},
      trainingStatus: {
        js: {},
        vue: {},
        typescript: {},
        js_react: {},
        web_layout: {},
        ui: {},
        node: {}
      },
      trainingWait: {
        js: {},
        vue: {},
        typescript: {},
        js_react: {},
        web_layout: {},
        ui: {},
        node: {}
      }
    },
    methods: {
      checkCouponType: function(id) {
        return this.rightCoupon.course.includes(id);
      }
    }
  });
  getUseCoupon = (function(_this) {
    return function() {
      var originPriceCoupon, priceCoupon, today;
      priceCoupon = appCourse.couponData.price;
      originPriceCoupon = appCourse.couponData.origin_price;
      today = moment().format('YYYY-MM-DD');
      $.each(priceCoupon, function(i, data) {
        var dateData;
        dateData = data.date;
        return $.each(dateData, function(i, day) {
          if (moment(today).isAfter(day.start_at) && moment(today).isBefore(day.ended_at)) {
            appCourse.rightCoupon = data;
          }
        });
      });
      if (Object.keys(appCourse.rightCoupon).length === 0) {
        return appCourse.rightCoupon = originPriceCoupon;
      }
    };
  })(this);
  getUseUdemyCoupon = (function(_this) {
    return function() {
      var priceCoupon, today;
      priceCoupon = appCourse.udemyCouponData.price;
      today = moment().format('YYYY-MM-DD');
      $.each(priceCoupon, function(i, data) {
        var dateData;
        dateData = data.date;
        if (moment(today).isAfter(dateData.start_at) && moment(today).isBefore(dateData.ended_at)) {
          appCourse.udemyRightCoupon = data;
        }
      });
      if (Object.keys(appCourse.udemyRightCoupon).length === 0) {
        return appCourse.udemyRightCoupon = '';
      }
    };
  })(this);
  checkTrainingStatus = (function(_this) {
    return function() {
      var today;
      today = moment().format('YYYY-MM-DD');
      return $.each(appCourse.trainingDate, function(i, data) {
        var dateData;
        dateData = data.date;
        $.each(dateData, function(i, day) {
          if (moment(today).isAfter(day.canbuy_start_at) && moment(today).isBefore(day.canbuy_ended_at)) {
            appCourse.trainingStatus[data.id] = data;
            appCourse.trainingStatus[data.id]['day'] = day;
            appCourse.trainingStatus[data.id]['status'] = true;
          }
        });
        return $.each(dateData, function(i, day) {
          if (moment(today).isBefore(day.canbuy_start_at)) {
            appCourse.trainingWait[data.id] = data;
            return appCourse.trainingWait[data.id]['notOpen_day'] = day;
          }
        });
      });
    };
  })(this);
  $.getJSON('../coupon-data.json', function(data) {
    appCourse.couponData = data;
    return getUseCoupon();
  });
  $.getJSON('../udemy-coupon-data.json', function(data) {
    appCourse.udemyCouponData = data;
    return getUseUdemyCoupon();
  });
  $.getJSON('../training-date.json', function(data) {
    appCourse.trainingDate = data;
    checkTrainingStatus();
  });
  CalendarNotification = new Vue({
    el: '#calendarNotification',
    data: {
      notificationLength: 0
    }
  });
  CalendarRecent = new Vue({
    el: '#calendarRecent',
    data: {
      calendarArr: []
    }
  });
  passCalendarData = (function(_this) {
    return function(data) {
      CalendarNotification.notificationLength = data.length;
      CalendarRecent.calendarArr = data;
    };
  })(this);
  h_calendar = {
    cal_id: document.querySelector('meta[name="calendar-id"]').content,
    api_key: document.querySelector('meta[name="calendar-key"]').content,
    today: new Date()
  };
  h_calendar_time = {
    fullYear: h_calendar.today.getFullYear(),
    month: h_calendar.today.getMonth(),
    date: h_calendar.today.getDate(),
    hours: h_calendar.today.getHours()
  };
  h_timeMin = new Date(h_calendar_time.fullYear, h_calendar_time.month, h_calendar_time.date, h_calendar_time.hours - 10).toISOString();
  h_timeMax = new Date(h_calendar_time.fullYear, h_calendar_time.month, h_calendar_time.date + 2, h_calendar_time.hours).toISOString();
  calendarAjax = (function(_this) {
    return function() {
      $.getJSON('https://content.googleapis.com/calendar/v3/calendars/' + h_calendar.cal_id + '/events?key=' + h_calendar.api_key + '&timeMax=' + h_timeMax + '&timeMin=' + h_timeMin, function(data) {
        var storageData;
        storageData = {
          items: data.items.reverse(),
          timeStamp: new Date().getTime()
        };
        window.localStorage.setItem('U2FsdGVkX1', JSON.stringify(storageData));
        return passCalendarData(data.items.reverse());
      });
    };
  })(this);
  getCalendarData = (function(_this) {
    return function() {
      var c_time, content, data, now;
      now = new Date().getTime();
      content = window.localStorage.getItem('U2FsdGVkX1');
      if (content) {
        c_time = JSON.parse(content).timeStamp;
        data = JSON.parse(content).items;
        console.log(now - c_time);
        if (now - c_time >= 1800000) {
          return calendarAjax();
        } else {
          return passCalendarData(data);
        }
      } else {
        return calendarAjax();
      }
    };
  })(this);
  getCalendarData();
  courseEvaluation = new Vue({
    el: '#evaluation',
    data: {
      course: {},
      courseData: []
    }
  });
  return appGetFreeCoupon = new Vue({
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
        return signInWithPopup();
      }
    }
  });
};

vueApp();

$(document).ready(function() {
  var timer;
  if ($('[data-bs-toggle="tooltip"]').length) {
    $('[data-bs-toggle="tooltip"]').tooltip();
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
  $('.course-category').on("click", function(event) {
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active');
    if ($(this).hasClass('active')) {
      $(this).children().find('.category-open')[0].textContent = 'remove';
      $.each($(this).siblings().children().find('.category-open'), function(key, item) {
        return item.textContent = 'add';
      });
    } else {
      $(this).children().find('.category-open').textContent = 'add';
      $(this).siblings().children().find('.category-open').textContent = 'add';
    }
    $(this).find('.course-dropdown').toggleClass('show');
    return $(this).siblings().find('.course-dropdown').removeClass('show');
  });
});

$(document).ready(function() {
  $('#orderModal').on('show.bs.modal', function(event) {
    var button, data;
    button = $(event.relatedTarget);
    $('#myModal').removeData('bs.modal');
    data = {
      promotionsTerms: button.data('promotions'),
      price: button.data('price'),
      title: button.data('title'),
      paylink: button.data('paylink'),
      coupon: button.data('coupon'),
      forward: button.data('forward')
    };
    return orderModalApp.text = data;
  });
  $('#web-course-pre').on('click', function(event) {
    event.preventDefault();
    return $('#webCourse').carousel('prev');
  });
  $('#web-course-next').on('click', function(event) {
    event.preventDefault();
    return $('#webCourse').carousel('next');
  });
  $('#web-layout-experience-pre').on('click', function(event) {
    event.preventDefault();
    return $('#web-layout-experience').carousel('prev');
  });
  $('#web-layout-experience-next').on('click', function(event) {
    event.preventDefault();
    return $('#web-layout-experience').carousel('next');
  });
  $('#web-layout-experience-2-pre').on('click', function(event) {
    event.preventDefault();
    return $('#web-layout-experience-2').carousel('prev');
  });
  $('#web-layout-experience-2-next').on('click', function(event) {
    event.preventDefault();
    return $('#web-layout-experience-2').carousel('next');
  });
});

orderModalApp = new Vue({
  el: '#orderModal',
  data: {
    text: {}
  }
});

$(document).ready(function() {
  var getMousePotion, ishover;
  $('.navbar-toggler').on("click", function(event) {
    $('.mobile-logo').removeClass('d-block');
    $('.search').removeClass('d-block');
    return $('.navbar-collapse').siblings().css('display', 'none');
  });
  $('.close').on("click", function(event) {
    $('.mobile-logo').addClass('d-block');
    $('.search').addClass('d-block');
    $('.navbar-collapse').siblings().css('display', 'block');
    return $('.navbar-toggler').css('display', 'block');
  });
  ishover = false;
  $('.dropdown-course').mouseover(function() {
    $('.menu-course-category').addClass('show');
    return ishover = true;
  });
  $('.dropdown-course').click(function() {
    $('.menu-course-category').addClass('show');
    return ishover = true;
  });
  $('.menu-course-category').mouseover(function() {
    $('.menu-course-category').addClass('show');
    return ishover = true;
  });
  getMousePotion = function() {
    if (ishover === false) {
      return $('.menu-course-category').removeClass('show');
    }
  };
  $('.dropdown-course').mouseout(function() {
    ishover = false;
    return setTimeout(function() {
      return getMousePotion();
    }, 500);
  });
  $('.menu-course-category').mouseout(function() {
    ishover = false;
    return setTimeout(function() {
      return getMousePotion();
    }, 500);
  });
});

$(document).ready(function() {
  var getQAMousePotion, ishoverQA;
  ishoverQA = false;
  $('.dropdown-qa').mouseover(function() {
    $('.dropdown-menu-qa').addClass('show');
    return ishoverQA = true;
  });
  $('.dropdown-qa').click(function() {
    $('.dropdown-menu-qa').addClass('show');
    return ishoverQA = true;
  });
  $('.dropdown-menu-qa').mouseover(function() {
    $('.dropdown-menu-qa').addClass('show');
    return ishoverQA = true;
  });
  getQAMousePotion = function() {
    if (ishoverQA === false) {
      return $('.dropdown-menu-qa').removeClass('show');
    }
  };
  $('.dropdown-qa').mouseout(function() {
    ishoverQA = false;
    return setTimeout(function() {
      return getQAMousePotion();
    }, 500);
  });
  $('.dropdown-menu-qa').mouseout(function() {
    ishoverQA = false;
    return setTimeout(function() {
      return getQAMousePotion();
    }, 500);
  });
});

$(document).ready(function() {
  var getQAMousePotion, ishoverQA;
  ishoverQA = false;
  $('.dropdown-case').mouseover(function() {
    $('.dropdown-menu-case').addClass('show');
    return ishoverQA = true;
  });
  $('.dropdown-case').click(function() {
    $('.dropdown-menu-case').addClass('show');
    return ishoverQA = true;
  });
  $('.dropdown-menu-case').mouseover(function() {
    $('.dropdown-menu-case').addClass('show');
    return ishoverQA = true;
  });
  getQAMousePotion = function() {
    if (ishoverQA === false) {
      return $('.dropdown-menu-case').removeClass('show');
    }
  };
  $('.dropdown-case').mouseout(function() {
    ishoverQA = false;
    return setTimeout(function() {
      return getQAMousePotion();
    }, 500);
  });
  $('.dropdown-menu-case').mouseout(function() {
    ishoverQA = false;
    return setTimeout(function() {
      return getQAMousePotion();
    }, 500);
  });
});

$(document).ready(function() {
  return $(window).scroll(function() {
    var scrollDistance;
    scrollDistance = $(window).scrollTop();
    return $('h2').each(function(i) {
      if (i > 0) {
        if ($(this).position().top + 151 <= scrollDistance) {
          $('.qa-menu a[href*="#"]:not([href="#"]).active').removeClass('active');
          return $('.qa-menu a').eq(i - 1).addClass('active');
        }
      }
    });
  });
});

(function() {
  var filterArea, filterProfile, getProfile, getWorkPeple, hasWorkCount, hopeArea, optionArea, profileCard, profileUserData, resumeApp, resumeAreaID, scrollTopID, updateProfile, workID;
  resumeApp = document.getElementById('resumeApp');
  resumeAreaID = document.getElementById('resumeArea');
  scrollTopID = document.getElementById('scroll-top');
  workID = document.getElementById('hasWork');
  hasWorkCount = 300;
  profileUserData = '';
  getProfile = function() {
    var profileUrl, workUrl;
    profileUrl = 'https://raw.githubusercontent.com/hexschool/Resume/master/profile.json';
    workUrl = 'https://raw.githubusercontent.com/hexschool/Resume/master/findJob.json';
    $.getJSON(profileUrl).done(function(result) {
      profileUserData = result;
    }).then(function(result) {
      return $.getJSON(workUrl).done(function(work) {
        updateProfile(profileUserData);
        optionArea(profileUserData);
        getWorkPeple(work);
      });
    }).fail(function(error) {
      console.log(error);
    });
  };
  optionArea = function(data) {
    var newArea;
    newArea = filterArea(data);
    return newArea.forEach(function(item) {
      var options;
      options = document.createElement('option');
      options.textContent = item;
      if (resumeAreaID) {
        return resumeAreaID.appendChild(options);
      }
    });
  };
  filterArea = function(data) {
    var cache, newArea, profile;
    profile = data;
    cache = [];
    newArea = [];
    profile.forEach(function(item) {
      return cache = cache.concat(item.location);
    });
    newArea = cache.filter(function(item, index) {
      return cache.indexOf(item) === index;
    });
    return newArea;
  };
  updateProfile = function(profileData) {
    var newArea, profile, str;
    profile = profileData;
    str = '';
    newArea = filterArea(profile);
    newArea.forEach(function(area) {
      str += hopeArea(area);
      profile.forEach(function(item) {
        var a;
        a = item.location.some(function(val) {
          return val === area;
        });
        if (a && item.profileUrl) {
          return str += profileCard(item);
        }
      });
      return profile.forEach(function(item) {
        var a;
        a = item.location.some(function(val) {
          return val === area;
        });
        if (a && !item.profileUrl) {
          return str += profileCard(item);
        }
      });
    });
    if (resumeApp) {
      return resumeApp.innerHTML = str;
    }
  };
  filterProfile = function(profile, area) {
    var str;
    str = '';
    str += hopeArea(area);
    profile.forEach(function(profileItem) {
      return profileItem.location.forEach(function(item) {
        if (item === area && profileItem.profileUrl) {
          return str += profileCard(profileItem);
        }
      });
    });
    profile.forEach(function(profileItem) {
      return profileItem.location.forEach(function(item) {
        if (item === area && !profileItem.profileUrl) {
          return str += profileCard(profileItem);
        }
      });
    });
    if (resumeApp) {
      return resumeApp.innerHTML = str;
    }
  };
  getWorkPeple = function(data) {
    if (workID) {
      return workID.innerHTML = ("有 " + (hasWorkCount + data.length) + " 位學員透過六角成功就業囉") + '<i class="fas fa-laugh-wink mx-2"></i>';
    }
  };
  hopeArea = function(area) {
    return "<div class='col-md-12'> <h3> <i class='fas fa-map-marker-alt text-dark'></i> 他們希望在 <span class='text-dark bg-half-line'>" + area + "</span> 工作 </h3> <hr/> </div>";
  };
  profileCard = function(item) {
    return "<div class='col-md-6 my-2'> <div class='card h-100'> <div class='card-body'> <div class='row flex-row-reverse flex-column justify-content-between h-100'> <div class='col-lg-5'> <div class='d-flex flex-column align-items-center'> <div class='profile-user-img' style='background-image: url(" + item.imgUrl + ")'></div> <div class='profile-type text-nowrap smail text-dark'> " + (item.type.map(function(itemType) {
      return "<span>" + itemType + "</span>";
    }).join(' / ')) + " </div> " + (item.experience !== 0 ? "<div class='text-dark'>工作經歷 " + item.experience + " 年</div>" : '') + " </div> </div> <div class='col-lg-7 d-flex flex-column align-self-stretch'> <h5 class='card-title font-weight-bold'>" + item.name + "</h5> <div class='profile-location small text-dark'> <i class='fas fa-map-marker-alt'></i> " + (item.location.map(function(itemLocation) {
      return "<span>" + itemLocation + "</span>";
    }).join(' / ')) + " </div> <div class='text-start font-weight-bold'>" + item.job + "</div> <p class='card-text profile-description text-dark'>" + item.description + "</p> <div class='profile-tags text-dark mt-auto'> " + (item.tags.map(function(itemTages) {
      return "<span class='d-inline-block'>" + itemTages + "</span>";
    }).join(' / ')) + " </div> <div class='profile-connect'> " + (item.profileUrl ? "<a href='" + item.profileUrl + "' class='btn btn-primary rounded-0 btn-block mt-2'>網羅人才</a>" : "<a href='#' class='btn btn-primary rounded-0 btn-block mt-2 disabled' tabindex='-1' role='button' aria-disabled='true'><i class='fab fa-angellist'></i> 成功媒合！</a>") + " </div> </div> </div> </div> </div> </div>";
  };
  getProfile();
  if (resumeAreaID) {
    return resumeAreaID.addEventListener('change', function(e) {
      if (e.target.value === '全部') {
        return updateProfile(profileUserData);
      } else {
        return filterProfile(profileUserData, e.target.value);
      }
    });
  }
})();

$(document).ready(function() {
  var swiper;
  swiper = new Swiper('.swiper-student-work', {
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
  $('.submitApp-click').on('click', function(e) {
    return fbq('track', 'SubmitApplication');
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
  $('.webLayout-training-gtag-track').on('click', function(e) {
    return gtag('event', 'conversion', {
      'send_to': 'AW-926147017/0c-OCOH54I0ZEMnDz7kD'
    });
  });
  $('.react-training-gtag-track').on('click', function(e) {
    return gtag('event', 'conversion', {
      'send_to': 'AW-926147017/w2BSCJX6irAZEMnDz7kD'
    });
  });
  $('.node-gtag-track').on('click', function(e) {
    return gtag('event', 'conversion', {
      'send_to': 'AW-926147017/kdSaCMvbio0ZEMnDz7kD'
    });
  });
  $('.event-2024-gtag-track').on('click', function(e) {
    return gtag('event', 'conversion', {
      'send_to': 'AW-926147017/cN2DCKi81p0ZEMnDz7kD'
    });
  });
  $('.one-on-one-gtag-track').on('click', function(e) {
    return gtag('event', 'conversion', {
      'send_to': 'AW-926147017/7PsYCJj9i6cZEMnDz7kD'
    });
  });
});

$(document).ready(function() {
  var arr, count;
  arr = ['寫程式', '做設計', '找工作', '做履歷'];
  count = 0;
  return setInterval(function() {
    var animationName, animationend;
    count += 1;
    animationName = 'typewriter';
    animationend = 'animationend';
    if ($('#typewrite-animated').hasClass(animationName)) {
      $('#typewrite-animated')[0].classList.remove(animationName);
    } else {
      $('#typewrite-animated').addClass(animationName).one(animationend, function() {
        return setTimeout(function() {
          $('#typewrite-text').text('');
          return $('#typewrite-animated')[0].classList.remove(animationName);
        }, 800);
      });
    }
    if (count % 3 === 0) {
      return $('#typewrite-text').text(arr[0]);
    } else if (count % 3 === 1) {
      return $('#typewrite-text').text(arr[1]);
    } else if (count % 3 === 2) {
      return $('#typewrite-text').text(arr[2]);
    }
  }, 1700);
});
