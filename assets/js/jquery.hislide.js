/*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */

! function(e, t, n) { "function" == typeof define && define.amd ? define(["jquery"], function(o) { return n(o, e, t), o.mobile }) : n(e.jQuery, e, t) }(this, document, function(e, t, n, o) {
    ! function(e, t, n, o) {
        function i(e) { for (; e && void 0 !== e.originalEvent;) e = e.originalEvent; return e }

        function s(t, n) {
            var s, a, r, c, u, l, p, h, v, d = t.type;
            if (t = e.Event(t), t.type = n, s = t.originalEvent, a = e.event.props, d.search(/^(mouse|click)/) > -1 && (a = I), s)
                for (p = a.length, c; p;) c = a[--p], t[c] = s[c];
            if (d.search(/mouse(down|up)|click/) > -1 && !t.which && (t.which = 1), -1 !== d.search(/^touch/) && (r = i(s), d = r.touches, u = r.changedTouches, l = d && d.length ? d[0] : u && u.length ? u[0] : o))
                for (h = 0, v = k.length; h < v; h++) c = k[h], t[c] = l[c];
            return t
        }

        function a(t) {
            for (var n, o, i = {}; t;) {
                n = e.data(t, P);
                for (o in n) n[o] && (i[o] = i.hasVirtualBinding = !0);
                t = t.parentNode
            }
            return i
        }

        function r(t, n) {
            for (var o; t;) {
                if ((o = e.data(t, P)) && (!n || o[n])) return t;
                t = t.parentNode
            }
            return null
        }

        function c() { z = !1 }

        function u() { z = !0 }

        function l() { q = 0, N.length = 0, j = !1, u() }

        function p() { c() }

        function h() { v(), S = setTimeout(function() { S = 0, l() }, e.vmouse.resetTimerDuration) }

        function v() { S && (clearTimeout(S), S = 0) }

        function d(t, n, o) { var i; return (o && o[t] || !o && r(n.target, t)) && (i = s(n, t), e(n.target).trigger(i)), i }

        function f(t) {
            var n, o = e.data(t.target, X);
            j || q && q === o || (n = d("v" + t.type, t)) && (n.isDefaultPrevented() && t.preventDefault(), n.isPropagationStopped() && t.stopPropagation(), n.isImmediatePropagationStopped() && t.stopImmediatePropagation())
        }

        function m(t) {
            var n, o, s, r = i(t).touches;
            r && 1 === r.length && (n = t.target, o = a(n), o.hasVirtualBinding && (q = V++, e.data(n, X, q), v(), p(), B = !1, s = i(t).touches[0], L = s.pageX, O = s.pageY, d("vmouseover", t, o), d("vmousedown", t, o)))
        }

        function g(e) { z || (B || d("vmousecancel", e, a(e.target)), B = !0, h()) }

        function w(t) {
            if (!z) {
                var n = i(t).touches[0],
                    o = B,
                    s = e.vmouse.moveDistanceThreshold,
                    r = a(t.target);
                B = B || Math.abs(n.pageX - L) > s || Math.abs(n.pageY - O) > s, B && !o && d("vmousecancel", t, r), d("vmousemove", t, r), h()
            }
        }

        function b(e) {
            if (!z) {
                u();
                var t, n, o = a(e.target);
                d("vmouseup", e, o), B || (t = d("vclick", e, o)) && t.isDefaultPrevented() && (n = i(e).changedTouches[0], N.push({ touchID: q, x: n.clientX, y: n.clientY }), j = !0), d("vmouseout", e, o), B = !1, h()
            }
        }

        function T(t) {
            var n, o = e.data(t, P);
            if (o)
                for (n in o)
                    if (o[n]) return !0;
            return !1
        }

        function D() {}
        var y, E, P = "virtualMouseBindings",
            X = "virtualTouchID",
            Y = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            k = "clientX clientY pageX pageY screenX screenY".split(" "),
            M = e.event.mouseHooks ? e.event.mouseHooks.props : [],
            I = e.event.props.concat(M),
            x = {},
            S = 0,
            L = 0,
            O = 0,
            B = !1,
            N = [],
            j = !1,
            z = !1,
            F = "addEventListener" in n,
            H = e(n),
            V = 1,
            q = 0;
        for (e.vmouse = { moveDistanceThreshold: 10, clickDistanceThreshold: 10, resetTimerDuration: 1500 }, E = 0; E < Y.length; E++) e.event.special[Y[E]] = function(t) {
            var n = t.substr(1);
            return {
                setup: function() { T(this) || e.data(this, P, {}), e.data(this, P)[t] = !0, x[t] = (x[t] || 0) + 1, 1 === x[t] && H.bind(n, f), e(this).bind(n, D), F && (x.touchstart = (x.touchstart || 0) + 1, 1 === x.touchstart && H.bind("touchstart", m).bind("touchend", b).bind("touchmove", w).bind("scroll", g)) },
                teardown: function() {
                    --x[t], x[t] || H.unbind(n, f), F && (--x.touchstart || H.unbind("touchstart", m).unbind("touchmove", w).unbind("touchend", b).unbind("scroll", g));
                    var o = e(this),
                        i = e.data(this, P);
                    i && (i[t] = !1), o.unbind(n, D), T(this) || o.removeData(P)
                }
            }
        }(Y[E]);
        F && n.addEventListener("click", function(t) {
            var n, o, i, s, a, r = N.length,
                c = t.target;
            if (r)
                for (n = t.clientX, o = t.clientY, y = e.vmouse.clickDistanceThreshold, i = c; i;) {
                    for (s = 0; s < r; s++)
                        if (a = N[s], 0, i === c && Math.abs(a.x - n) < y && Math.abs(a.y - o) < y || e.data(i, X) === a.touchID) return t.preventDefault(), void t.stopPropagation();
                    i = i.parentNode
                }
        }, !0)
    }(e, 0, n),
    function(e) { e.mobile = {} }(e),
    function(e, t) {
        var o = { touch: "ontouchend" in n };
        e.mobile.support = e.mobile.support || {}, e.extend(e.support, o), e.extend(e.mobile.support, o)
    }(e),
    function(e, t, o) {
        function i(t, n, i, s) {
            var a = i.type;
            i.type = n, s ? e.event.trigger(i, o, t) : e.event.dispatch.call(t, i), i.type = a
        }
        var s = e(n),
            a = e.mobile.support.touch,
            r = a ? "touchstart" : "mousedown",
            c = a ? "touchend" : "mouseup",
            u = a ? "touchmove" : "mousemove";
        e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function(t, n) { e.fn[n] = function(e) { return e ? this.bind(n, e) : this.trigger(n) }, e.attrFn && (e.attrFn[n] = !0) }), e.event.special.scrollstart = {
            enabled: !0,
            setup: function() {
                function t(e, t) { n = t, i(s, n ? "scrollstart" : "scrollstop", e) }
                var n, o, s = this,
                    a = e(s);
                a.bind("touchmove scroll", function(i) { e.event.special.scrollstart.enabled && (n || t(i, !0), clearTimeout(o), o = setTimeout(function() { t(i, !1) }, 50)) })
            },
            teardown: function() { e(this).unbind("touchmove scroll") }
        }, e.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function() {
                var t = this,
                    n = e(t),
                    o = !1;
                n.bind("vmousedown", function(a) {
                    function r() { clearTimeout(l) }

                    function c() { r(), n.unbind("vclick", u).unbind("vmouseup", r), s.unbind("vmousecancel", c) }

                    function u(e) { c(), o || p !== e.target ? o && e.preventDefault() : i(t, "tap", e) }
                    if (o = !1, a.which && 1 !== a.which) return !1;
                    var l, p = a.target;
                    n.bind("vmouseup", r).bind("vclick", u), s.bind("vmousecancel", c), l = setTimeout(function() { e.event.special.tap.emitTapOnTaphold || (o = !0), i(t, "taphold", e.Event("taphold", { target: p })) }, e.event.special.tap.tapholdThreshold)
                })
            },
            teardown: function() { e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), s.unbind("vmousecancel") }
        }, e.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function(e) {
                var n = t.pageXOffset,
                    o = t.pageYOffset,
                    i = e.clientX,
                    s = e.clientY;
                return 0 === e.pageY && Math.floor(s) > Math.floor(e.pageY) || 0 === e.pageX && Math.floor(i) > Math.floor(e.pageX) ? (i -= n, s -= o) : (s < e.pageY - o || i < e.pageX - n) && (i = e.pageX - n, s = e.pageY - o), { x: i, y: s }
            },
            start: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                    o = e.event.special.swipe.getLocation(n);
                return { time: (new Date).getTime(), coords: [o.x, o.y], origin: e(t.target) }
            },
            stop: function(t) {
                var n = t.originalEvent.touches ? t.originalEvent.touches[0] : t,
                    o = e.event.special.swipe.getLocation(n);
                return { time: (new Date).getTime(), coords: [o.x, o.y] }
            },
            handleSwipe: function(t, n, o, s) { if (n.time - t.time < e.event.special.swipe.durationThreshold && Math.abs(t.coords[0] - n.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(t.coords[1] - n.coords[1]) < e.event.special.swipe.verticalDistanceThreshold) { var a = t.coords[0] > n.coords[0] ? "swipeleft" : "swiperight"; return i(o, "swipe", e.Event("swipe", { target: s, swipestart: t, swipestop: n }), !0), i(o, a, e.Event(a, { target: s, swipestart: t, swipestop: n }), !0), !0 } return !1 },
            eventInProgress: !1,
            setup: function() {
                var t, n = this,
                    o = e(n),
                    i = {};
                t = e.data(this, "mobile-events"), t || (t = { length: 0 }, e.data(this, "mobile-events", t)), t.length++, t.swipe = i, i.start = function(t) {
                    if (!e.event.special.swipe.eventInProgress) {
                        e.event.special.swipe.eventInProgress = !0;
                        var o, a = e.event.special.swipe.start(t),
                            r = t.target,
                            l = !1;
                        i.move = function(t) { a && !t.isDefaultPrevented() && (o = e.event.special.swipe.stop(t), l || (l = e.event.special.swipe.handleSwipe(a, o, n, r)) && (e.event.special.swipe.eventInProgress = !1), Math.abs(a.coords[0] - o.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault()) }, i.stop = function() { l = !0, e.event.special.swipe.eventInProgress = !1, s.off(u, i.move), i.move = null }, s.on(u, i.move).one(c, i.stop)
                    }
                }, o.on(r, i.start)
            },
            teardown: function() {
                var t, n;
                t = e.data(this, "mobile-events"), t && (n = t.swipe, delete t.swipe, 0 === --t.length && e.removeData(this, "mobile-events")), n && (n.start && e(this).off(r, n.start), n.move && s.off(u, n.move), n.stop && s.off(c, n.stop))
            }
        }, e.each({ scrollstop: "scrollstart", taphold: "tap", swipeleft: "swipe.left", swiperight: "swipe.right" }, function(t, n) { e.event.special[t] = { setup: function() { e(this).bind(n, e.noop) }, teardown: function() { e(this).unbind(n) } } })
    }(e, this)
});
//
//
//
//
//
//
(function($) {
    var slide = function(ele, options) {
        var $ele = $(ele);
        var states = [
            { zIndex: 0, width: 19.8, height: 12, top: 60.5, left: 6, transform: 0, overflow: "visible", opacity: 0, filter: "0" },
            { zIndex: 1, width: 19.8, height: 12, top: 60.5, left: 6, transform: 0, overflow: "visible", opacity: 0, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 2, width: 19.8, height: 12, top: 60.5, left: 6, transform: 0, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 3, width: 21.45, height: 13, top: 67, left: 6, transform: 5, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 4, width: 24.75, height: 15, top: 75, left: 4, transform: 10, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 5, width: 33, height: 20, top: 50, left: 50, transform: 0, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 4, width: 24.75, height: 15, top: 38, left: 93, transform: 10, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 3, width: 21.45, height: 13, top: 41.2, left: 92.7, transform: 5, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 2, width: 19.8, height: 12, top: 44, left: 93.9, transform: 0, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 1, width: 19.8, height: 12, top: 44, left: 93.9, transform: 0, overflow: "visible", opacity: 0, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 0, width: 19.8, height: 12, top: 44, left: 93.9, transform: 0, overflow: "visible", opacity: 0, filter: "0" }
        ];
        var statesmobile = [
            { zIndex: 0, width: 19.8, height: 12, top: 60.5, left: 6, transform: 0, overflow: "visible", opacity: 0, filter: "0" },
            { zIndex: 1, width: 19.8, height: 12, top: 60.5, left: 6, transform: 0, overflow: "visible", opacity: 0, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 2, width: 19.8, height: 12, top: 60.5, left: 6, transform: 0, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 3, width: 21.45, height: 13, top: 67, left: 6, transform: 5, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 4, width: 24.75, height: 15, top: 75, left: 4, transform: 10, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 5, width: 74.25, height: 45, top: 50, left: 50, transform: 0, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 4, width: 24.75, height: 15, top: 38, left: 93, transform: 10, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 3, width: 21.45, height: 13, top: 41.2, left: 92.7, transform: 5, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 2, width: 19.8, height: 12, top: 44, left: 93.9, transform: 0, overflow: "visible", opacity: 1, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 1, width: 19.8, height: 12, top: 44, left: 93.9, transform: 0, overflow: "visible", opacity: 0, filter: "drop-shadow(15px 15px 1rem 1px rgb(65, 65, 65)" },
            { zIndex: 0, width: 19.8, height: 12, top: 44, left: 93.9, transform: 0, overflow: "visible", opacity: 0, filter: "0" }
        ];
        var isAnimating = false;
        var $lis = $ele.find('li');
        $ele.find('.hi-next').on('click', function() {
            if (isAnimating) {
                return;
            }
            isAnimating = true;
            setTimeout(function() {
                isAnimating = false;
            }, 2000);
            states.push(states.shift());
            move();
        });
        $ele.find('.hi-prev').on('click', function() {
            if (isAnimating) {
                return;
            }
            isAnimating = true;
            setTimeout(function() {
                isAnimating = false;
            }, 2000);
            states.unshift(states.pop());
            move();
        });

        $ele.find('.sliderbox').on('swipeleft', function() {
            if (isAnimating) {
                return;
            }
            isAnimating = true;
            setTimeout(function() {
                isAnimating = false;
            }, 2000);
            statesmobile.unshift(statesmobile.pop());
            movemobile();
        });
        $ele.find('.sliderbox').on('swiperight', function() {
            if (isAnimating) {
                return;
            }
            isAnimating = true;
            setTimeout(function() {
                isAnimating = false;
            }, 2000);
            statesmobile.push(statesmobile.shift());
            movemobile();
        });



        $(window).on('resize', function() {
            if ($(window).width() < 1023) {
                movemobile();
            } else {
                move();
            }
        });

        move();


        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element)
                    .css('opacity', state.opacity)
                    .css({ height: "" + state.height + "vw", width: "" + state.width + "vw" })
                    .css('top', " " + state.top + "%")
                    .css('left', " " + state.left + "%")
                    .css({ transform: "rotate(" + state.transform + "deg) translate(-50%, -50%) ", overflow: "visible" })
                    .css('zIndex', state.zIndex)
                    .css('transition', "2s ease")
                    .find('img')
                    .css('filter', state.filter);
            });
        }

        function movemobile() {
            $lis.each(function(index, element) {
                var state = statesmobile[index];
                $(element)
                    .css('opacity', state.opacity)
                    .css({ height: "" + state.height + "vw", width: "" + state.width + "vw" })
                    .css('top', " " + state.top + "%")
                    .css('left', " " + state.left + "%")
                    .css({ transform: "rotate(" + state.transform + "deg) translate(-50%, -50%) ", overflow: "visible" })
                    .css('zIndex', state.zIndex)
                    .css('transition', "2s ease")
                    .css('filter', state.filter);
            });
        }
    }
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele, options);
        });
        return this;
    }
})(jQuery);