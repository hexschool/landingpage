/**
 * promotions-runtime.js
 *
 * 將 window.__PROMOTIONS__ 中的活動陣列，依當下時間（UTC 瞬間，台灣時區 +08:00 表示）
 * 挑出第一筆符合區間的活動，填入 data-promotions-* 空殼，並排程到下一個活動邊界時重跑。
 *
 * 必須在 all.js / bs4_all.js（jQuery countdown 初始化）之前載入，以便在 DOMContentLoaded
 * 第一波回呼中先寫好 #footer-clock / #courses-ad-clock 的 value。
 */
(function () {
  'use strict';

  var PROMOTIONS = window.__PROMOTIONS__ || {};
  var rerunTimer = null;

  // ── 工具函式 ──

  /**
   * 將 'YYYY-MM-DD HH:mm[:ss]' 視為台灣時間（UTC+8，台灣自 1979 起無日光節約）解析為 UTC 毫秒
   * @param {string} str
   * @param {boolean} [isEnd] 是否為 end_time：以「所寫欄位的末尾」解析
   *   - 未寫秒：該分鐘末尾（HH:mm:59.999）
   *   - 有寫秒：該秒末尾（HH:mm:ss.999）
   *   搭配 pickActive 使用 `now <= e`，兩檔之間 1ms 內銜接
   */
  function parseTaipei(str, isEnd) {
    if (!str || typeof str !== 'string') return NaN;
    var m = str.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?$/);
    if (!m) return NaN;
    var year = +m[1];
    var month = +m[2];
    var day = +m[3];
    var hour = +m[4];
    var minute = +m[5];
    var hasSeconds = m[6] !== undefined;
    var second = hasSeconds ? +m[6] : 0;
    // Asia/Taipei = UTC+8（固定），故 UTC = local - 8h
    var ts = Date.UTC(year, month - 1, day, hour - 8, minute, second);
    if (isEnd) ts += (hasSeconds ? 1000 : 60000) - 1;
    return ts;
  }

  function pickActive(campaigns, now) {
    if (!Array.isArray(campaigns)) return null;
    for (var i = 0; i < campaigns.length; i++) {
      var c = campaigns[i];
      if (!c) continue;
      var s = parseTaipei(c.start_time);
      var e = parseTaipei(c.end_time, true);
      if (isNaN(s) || isNaN(e)) continue;
      if (now >= s && now <= e) return c;
    }
    return null;
  }

  function collectBoundaries(campaigns, now, out) {
    if (!Array.isArray(campaigns)) return;
    for (var i = 0; i < campaigns.length; i++) {
      var c = campaigns[i];
      if (!c) continue;
      var s = parseTaipei(c.start_time);
      var e = parseTaipei(c.end_time, true);
      if (!isNaN(s) && s > now) out.push(s);
      if (!isNaN(e) && e > now) out.push(e);
    }
  }

  function qsa(selector, root) {
    return (root || document).querySelectorAll(selector);
  }

  function setText(selector, text, root) {
    qsa(selector, root).forEach(function (el) {
      el.textContent = text == null ? '' : String(text);
    });
  }

  // 注意：不用 `hidden` attribute，因為 Bootstrap 的 `d-flex` 等 utility class
  // 帶 `display: xxx !important`，會蓋過 UA 的 `[hidden] { display: none }`，
  // 導致 shell 無法隱藏。改用 inline `style.display: none !important` 強制勝出。
  function show(selector, root) {
    qsa(selector, root).forEach(function (el) {
      el.hidden = false;
      el.style.removeProperty('display');
    });
  }

  function hide(selector, root) {
    qsa(selector, root).forEach(function (el) {
      el.hidden = true;
      el.style.setProperty('display', 'none', 'important');
    });
  }

  function applyDynamicClasses(selector, className) {
    qsa(selector).forEach(function (el) {
      var prev = el.getAttribute('data-promotions-applied-class');
      if (prev) {
        prev.split(' ').forEach(function (c) {
          if (c) el.classList.remove(c);
        });
      }
      var next = (className || '').trim();
      if (next) {
        next.split(' ').forEach(function (c) {
          if (c) el.classList.add(c);
        });
        el.setAttribute('data-promotions-applied-class', next);
      } else {
        el.removeAttribute('data-promotions-applied-class');
      }
    });
  }

  function setLink(selector, href) {
    qsa(selector).forEach(function (el) {
      if (href) {
        el.setAttribute('href', href);
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  }

  function setImg(selector, src) {
    qsa(selector).forEach(function (el) {
      if (src) {
        el.setAttribute('src', src);
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  }

  /**
   * 把台灣時間字串（YYYY-MM-DD HH:mm）轉成 jQuery countdown 能安全解析的 ISO UTC 字串
   * 再寫入 input（同一頁可能有多個 #footer-clock：footer shell + header dropdown fallback）
   * 呼叫端一律傳 end_time，故以 isEnd=true 解析（未指定秒則計入整個分鐘）
   */
  function writeCountdownInput(id, taipeiStr) {
    var ms = parseTaipei(taipeiStr, true);
    var value = isNaN(ms) ? '' : new Date(ms).toISOString();
    qsa('#' + id).forEach(function (el) {
      el.value = value;
    });
  }

  // ── jQuery countdown 重新初始化（切換檔期時使用）──

  function hasJqueryCountdown() {
    return !!(window.jQuery && window.jQuery.fn && window.jQuery.fn.countdown);
  }

  function reinitFooterClockCountdown(taipeiStr) {
    if (!hasJqueryCountdown()) return;
    var ms = parseTaipei(taipeiStr, true);
    if (isNaN(ms)) return;
    var $ = window.jQuery;
    // 必傳 Date 物件，避免 plugin 把字串中的 '-' 換成 '/' 產生 Invalid Date
    $('.clock').countdown(new Date(ms), function (event) {
      $(this).html(event.strftime('%D 天 %H 時 %M 分 %S 秒'));
    });
  }

  function stopCountdown($el) {
    $el.each(function () {
      var inst = window.jQuery.data(this, 'countdown-instance');
      if (inst !== undefined) window.jQuery(this).countdown('remove');
      this.innerHTML = '';
    });
  }

  function stopFooterClockCountdown() {
    if (!hasJqueryCountdown()) return;
    stopCountdown(window.jQuery('.clock'));
  }

  function reinitAdCountdowns(taipeiStr) {
    if (!hasJqueryCountdown()) return;
    var ms = parseTaipei(taipeiStr, true);
    if (isNaN(ms)) return;
    var $ = window.jQuery;
    var target = new Date(ms);
    $('.ad-clock-xl').countdown(target, function (event) {
      $(this).html(event.strftime('<div class="text-md-white font-ad-title font-weight-md-bold"><span class="text-primary">%D</span> 天 <span class="text-primary">%H</span>  時 <span class="text-primary">%M</span>  分 <span class="text-primary">%S</span>  秒</div>'));
    });
    $('.ad-clock-sm').countdown(target, function (event) {
      $(this).html(event.strftime('<div class="text-md-white text-dark font-clock-size font-weight-md-bold"><span class="text-md-primary text-dark">%D</span> 天 <span class="text-md-primary text-dark">%H</span>  時 <span class="text-md-primary text-dark">%M</span>  分 <span class="text-md-primary text-dark">%S</span>  秒</div>'));
    });
  }

  function stopAdCountdowns() {
    if (!hasJqueryCountdown()) return;
    var $ = window.jQuery;
    stopCountdown($('.ad-clock-xl'));
    stopCountdown($('.ad-clock-sm'));
  }

  // ── 區塊套用 ──

  function applyFooterClock(now) {
    var active = pickActive(PROMOTIONS.footer_clock_campaigns, now);
    // 若頁面有 page-footer-clock shell，且該頁有命中活動，由 applyPageFooterClock 接手 .clock
    var pageRoot = document.querySelector('[data-promotions-root="page-footer-clock"]');
    var pageHasActive = false;
    if (pageRoot) {
      var pid = pageRoot.getAttribute('data-page-id');
      pageHasActive = !!pickActive((PROMOTIONS.page_footer_clock_target || {})[pid], now);
    }
    if (!active) {
      hide('[data-promotions-root="footer-clock"]');
      hide('[data-promotions-root="footer-clock-on-courses"]');
      show('[data-promotions-root="on-courses-default"]');
      if (!pageHasActive) {
        writeCountdownInput('footer-clock', '');
        stopFooterClockCountdown();
      }
      return;
    }

    // 主 footer 倒數 nav
    applyDynamicClasses('[data-promotions-classes="footer-clock"]', active.class);
    setText('[data-promotions-slot="footer-clock-words"]', active.words);

    // slogan
    if (active.slogan_display && active.slogan) {
      show('[data-promotions-group="footer-clock-slogan"]');
      setText('[data-promotions-slot="footer-clock-slogan"]', active.slogan);
    } else {
      hide('[data-promotions-group="footer-clock-slogan"]');
    }

    // 倒數顯示
    if (active.time_display) {
      show('[data-promotions-group="footer-clock-time"]');
    } else {
      hide('[data-promotions-group="footer-clock-time"]');
    }

    // 活動連結
    setLink('[data-promotions-slot="footer-clock-event-link"]', active.event_link);
    setText('[data-promotions-slot="footer-clock-event-link-text"]', active.event_link_text);

    // jQuery countdown input
    writeCountdownInput('footer-clock', active.end_time);

    show('[data-promotions-root="footer-clock"]');

    // 課程列表內的倒數 shell（每張課程卡片都會有）
    setText('[data-promotions-slot="footer-clock-on-courses-words"]', active.words);
    show('[data-promotions-root="footer-clock-on-courses"]');
    hide('[data-promotions-root="on-courses-default"]');

    reinitFooterClockCountdown(active.end_time);
  }

  function applyAd(now) {
    var active = pickActive(PROMOTIONS.ad_campaigns, now);
    if (!active) {
      hide('[data-promotions-root="ad"]');
      writeCountdownInput('courses-ad-clock', '');
      stopAdCountdowns();
      return;
    }

    setText('[data-promotions-slot="ad-title"]', active.title);
    setText('[data-promotions-slot="ad-description"]', active.description);
    setText('[data-promotions-slot="ad-btn-slogan"]', active.btn_slogan);
    setLink('[data-promotions-slot="ad-event-link"]', active.event_link);

    // slogan 共用 footer_clock_campaigns 當下活動的 slogan（維持原本 <%- theme.footer_clock_slogan %> 的行為）
    var footerActive = pickActive(PROMOTIONS.footer_clock_campaigns, now);
    if (active.slogan_display && footerActive && footerActive.slogan) {
      show('[data-promotions-group="ad-slogan"]');
      setText('[data-promotions-slot="ad-slogan"]', footerActive.slogan);
    } else {
      hide('[data-promotions-group="ad-slogan"]');
    }

    // 倒數
    if (active.clock) {
      show('[data-promotions-group="ad-clock"]');
      writeCountdownInput('courses-ad-clock', active.end_time);
    } else {
      hide('[data-promotions-group="ad-clock"]');
      writeCountdownInput('courses-ad-clock', '');
    }

    // 自選 modal vs 一般按鈕
    if (active.custom_modal) {
      show('[data-promotions-group="ad-custom-modal-btn"]');
      hide('[data-promotions-group="ad-link-btn"]');
      // 更新 modal 結帳 coupon
      qsa('[data-promotions-slot="ad-custom-modal-coupon"]').forEach(function (el) {
        el.setAttribute('data-coupon', active.custom_modal_coupon || '');
      });
      show('[data-promotions-root="ad-custom-modal"]');
    } else {
      hide('[data-promotions-group="ad-custom-modal-btn"]');
      show('[data-promotions-group="ad-link-btn"]');
      hide('[data-promotions-root="ad-custom-modal"]');
    }

    show('[data-promotions-root="ad"]');

    if (active.clock) reinitAdCountdowns(active.end_time);
  }

  function applyFooterDropdown(now) {
    var active = pickActive(PROMOTIONS.footer_dropdown_campaigns, now);
    if (!active) {
      hide('[data-promotions-root="footer-dropdown"]');
      return;
    }

    var footerActive = pickActive(PROMOTIONS.footer_clock_campaigns, now);
    var img, title, link, slogan, timeDisplay, sloganDisplay;

    if (active.same_as_footer && footerActive) {
      img = footerActive.img;
      title = footerActive.words;
      link = footerActive.event_link;
      slogan = footerActive.slogan;
      timeDisplay = !!footerActive.time_display;
      sloganDisplay = !!footerActive.slogan_display;
    } else {
      img = active.img;
      title = active.title;
      link = active.event_link;
      slogan = active.slogan;
      // 獨立 dropdown 預設：有 footer 倒數活動就秀倒數（對應原模板 `<% if (theme.footer_clock_time) %>`）
      timeDisplay = !!footerActive;
      sloganDisplay = !!active.slogan;
    }

    setImg('[data-promotions-slot="footer-dropdown-img"]', img);
    setText('[data-promotions-slot="footer-dropdown-title"]', title);
    setLink('[data-promotions-slot="footer-dropdown-event-link"]', link);

    if (sloganDisplay && slogan) {
      show('[data-promotions-group="footer-dropdown-slogan"]');
      setText('[data-promotions-slot="footer-dropdown-slogan"]', slogan);
    } else {
      hide('[data-promotions-group="footer-dropdown-slogan"]');
    }

    if (timeDisplay) {
      show('[data-promotions-group="footer-dropdown-time"]');
    } else {
      hide('[data-promotions-group="footer-dropdown-time"]');
    }

    show('[data-promotions-root="footer-dropdown"]');
  }

  function applyPageFooterClock(now) {
    var root = document.querySelector('[data-promotions-root="page-footer-clock"]');
    if (!root) return;
    var pageId = root.getAttribute('data-page-id');
    var campaigns = (PROMOTIONS.page_footer_clock_target || {})[pageId];
    var active = pickActive(campaigns, now);

    if (!active) {
      root.hidden = true;
      // 若 footer_clock_campaigns 也沒 active，就清空 input 並停掉 countdown
      if (!pickActive(PROMOTIONS.footer_clock_campaigns, now)) {
        writeCountdownInput('footer-clock', '');
        stopFooterClockCountdown();
      }
      return;
    }

    applyDynamicClasses('[data-promotions-classes="page-footer-clock"]', active.class);
    setText('[data-promotions-slot="page-footer-clock-words"]', active.words, root);

    if (active.slogan_display && active.slogan) {
      show('[data-promotions-group="page-footer-clock-slogan"]', root);
      setText('[data-promotions-slot="page-footer-clock-slogan"]', active.slogan, root);
    } else {
      hide('[data-promotions-group="page-footer-clock-slogan"]', root);
    }

    if (active.time_display) {
      show('[data-promotions-group="page-footer-clock-time"]', root);
    } else {
      hide('[data-promotions-group="page-footer-clock-time"]', root);
    }

    setLink('[data-promotions-slot="page-footer-clock-event-link"]', active.event_link);
    setText('[data-promotions-slot="page-footer-clock-event-link-text"]', active.event_link_text, root);

    writeCountdownInput('footer-clock', active.end_time);
    root.hidden = false;

    reinitFooterClockCountdown(active.end_time);
  }

  // ── 主流程 ──

  function run() {
    var now = Date.now();

    // 單頁 clock 若存在且命中，會覆寫通用 #footer-clock 的 value；
    // 因此先跑通用 footer，後跑單頁，讓單頁覆蓋成立
    applyFooterClock(now);
    applyPageFooterClock(now);
    applyAd(now);
    applyFooterDropdown(now);

    scheduleNext(now);
  }

  function scheduleNext(now) {
    if (rerunTimer) {
      clearTimeout(rerunTimer);
      rerunTimer = null;
    }
    var boundaries = [];
    collectBoundaries(PROMOTIONS.footer_clock_campaigns, now, boundaries);
    collectBoundaries(PROMOTIONS.ad_campaigns, now, boundaries);
    collectBoundaries(PROMOTIONS.footer_dropdown_campaigns, now, boundaries);
    var pageMap = PROMOTIONS.page_footer_clock_target || {};
    Object.keys(pageMap).forEach(function (key) {
      collectBoundaries(pageMap[key], now, boundaries);
    });

    if (!boundaries.length) return;
    var next = Math.min.apply(null, boundaries);
    // 加 1 秒 buffer，避免 setTimeout 提前喚起
    var delay = next - now + 1000;
    // setTimeout 上限約 24.8 天，保守上限 1 天；超過就等下一次 run 時再重算
    var MAX_DELAY = 24 * 60 * 60 * 1000;
    if (delay > MAX_DELAY) delay = MAX_DELAY;
    if (delay < 1000) delay = 1000;
    rerunTimer = setTimeout(run, delay);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
