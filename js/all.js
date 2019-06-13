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
    mixpanel.track('ABtesting', {
      'TestEvet': abtesting,
      'TestRandom': randTesting,
      'TestExpiresTime': abtestingDay
    });
    return testingEffect(randTesting);
  } else if (cookieAbtesting) {
    return testingEffect(cookieAbtesting);
  }
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

vueApp = function() {
  var appCourse, appGetFreeCoupon, courseEvaluation;
  $.getJSON('https://hexschool-api.herokuapp.com/api/udemydata/getCourseData', function(data) {
    appCourse.course = data;
    courseEvaluation.course = data;
    appCourse.courseData = [];
    $.each(data, function(key, courses) {
      if (courses.review.count) {
        return $.each(courses.review.results, function(i, review) {
          return appCourse.courseData.push(review);
        });
      }
    });
    return setTimeout(function() {
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
  });
  appCourse = new Vue({
    el: '#course',
    data: {
      course: {},
      courseData: []
    }
  });
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
  if ($('#footer-clock').length) {
    timer = $('#footer-clock').val();
    $('.clock').countdown(timer, function(event) {
      return $(this).html(event.strftime('%D天 %H時 %M分 %S秒'));
    });
  }
  if ($('[data-countdown-course]').length) {
    $('[data-countdown-course]').each(function(i, item) {
      var course;
      course = $(item).data('countdown-course');
      timer = $(item).val();
      return $('[data-course-countdown=' + course + ']').countdown(timer, function(event) {
        return $(this).html(event.strftime('%D天 %H時 %M分 %S秒'));
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
      paylink: button.data('paylink')
    };
    return orderModalApp.text = data;
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
  var $win, ViewContentScrollTracking, adsource, dimensionValue, generate_callback, getUTM, mixpanelPageView, pageTitle, setCookie;
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
  $('.tracking-link').on('click', function(e) {
    var dimensionValue, link, title;
    link = $(this).attr('href');
    title = $(this).attr('title') || '';
    dimensionValue = {
      'message': 'addToCart',
      'link': link,
      'title': title
    };
    fbq('track', 'AddToCart', dimensionValue);
    mixpanel.track('AddToCart', dimensionValue);
    return gtag('event', 'add_to_cart');
  });
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
  ViewContentScrollTracking = false;
  if ($('.tracking-ViewContent').length) {
    $win = $(window).scroll(function(e) {
      var contentTop, winTop, windowHieght;
      windowHieght = $(window).height() / 2;
      winTop = $($win).scrollTop() + windowHieght;
      contentTop = $('.tracking-ViewContent').offset().top;
      if (winTop > contentTop && !ViewContentScrollTracking) {
        ViewContentScrollTracking = true;
        mixpanel.track('ViewContent', {
          'adsource': adsource || '',
          'pageTitle': pageTitle
        });
        fbq('track', 'ViewContent');
        return gtag('event', 'view_item');
      }
    });
  }
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
