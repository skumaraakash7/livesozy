window.theme = window.theme || {};



/* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
(function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"];var d=0;a.each(c,function(a,c){d=parseFloat(b.css(c))||d});if(d!=0){b.addClass("is-transitioning");b[0].offsetWidth}})}})(jQuery);

/* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a};


// Timber functions
window.timber = window.timber || {};

timber.cacheSelectors = function () {
  timber.cache = {
    // General
    $html                    : $('html'),
    $body                    : $('body')
  };
};

timber.init = function () {
  timber.cacheSelectors();
  timber.drawersInit();
};

timber.drawersInit = function () {
  timber.RightDrawer = new timber.Drawers('CartDrawer', 'right', {
    'onDrawerOpen': ajaxCart.load
  });
};

timber.getHash = function () {
  return window.location.hash;
};


/*============================================================================
  Drawer modules
  - Docs http://shopify.github.io/Timber/#drawers
==============================================================================*/
timber.Drawers = (function () {
  var Drawer = function (id, position, options) {
    var defaults = {
      close: '.js-drawer-close',
      open: '.js-drawer-open-' + position,
      openClass: 'js-drawer-open',
      dirOpenClass: 'js-drawer-open-' + position
    };

    this.$nodes = {
      parent: $('body, html'),
      page: $('#PageContainer'),
      moved: $('.is-moved-by-drawer')
    };

    this.config = $.extend(defaults, options);
    this.position = position;

    this.$drawer = $('#' + id);

    if (!this.$drawer.length) {
      return false;
    }

    this.drawerIsOpen = false;
    this.init();
  };

  Drawer.prototype.init = function () {
    $(this.config.open).on('click', $.proxy(this.open, this));
    this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));
  };

  Drawer.prototype.open = function (evt) {
    // Keep track if drawer was opened from a click, or called by another function
    var externalCall = false;

    // Prevent following href if link is clicked
    if (evt) {
      evt.preventDefault();
    } else {
      externalCall = true;
    }

    // Without this, the drawer opens, the click event bubbles up to $nodes.page
    // which closes the drawer.
    if (evt && evt.stopPropagation) {
      evt.stopPropagation();
      // save the source of the click, we'll focus to this on close
      this.$activeSource = $(evt.currentTarget);
    }

    if (this.drawerIsOpen && !externalCall) {
      return this.close();
    }

    // Add is-transitioning class to moved elements on open so drawer can have
    // transition for close animation
    this.$nodes.moved.addClass('is-transitioning');
    this.$drawer.prepareTransition();

    console.log(this.$nodes.parent, this.config.openClass + ' ' + this.config.dirOpenClass);
    this.$nodes.parent.first().addClass(this.config.openClass + ' ' + this.config.dirOpenClass);
    this.drawerIsOpen = true;

    // Set focus on drawer
    this.trapFocus(this.$drawer, 'drawer_focus');

    // Run function when draw opens if set
    if (this.config.onDrawerOpen && typeof(this.config.onDrawerOpen) == 'function') {
      if (!externalCall) {
        this.config.onDrawerOpen();
      }
    }

    if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
      this.$activeSource.attr('aria-expanded', 'true');
    }

    // Lock scrolling on mobile
    this.$nodes.page.on('touchmove.drawer', function () {
      return false;
    });

    this.$nodes.page.on('click.drawer', $.proxy(function () {
      this.close();
      return false;
    }, this));
    

    //Desktop Header CSS
    $(".scrollheader").css("z-index", '1');
    $(".coverheader").css("z-index", '1');
    
    
    $(".shifter-page").css("z-index", '0');
 

    
  };

  Drawer.prototype.close = function () {
    if (!this.drawerIsOpen) { // don't close a closed drawer
      return;
    }

    // deselect any focused form elements
    $(document.activeElement).trigger('blur');

    // Ensure closing transition is applied to moved elements, like the nav
    this.$nodes.moved.prepareTransition({ disableExisting: true });
    this.$drawer.prepareTransition({ disableExisting: true });

    this.$nodes.parent.removeClass(this.config.dirOpenClass + ' ' + this.config.openClass);

    this.drawerIsOpen = false;

    // Remove focus on drawer
    this.removeTrapFocus(this.$drawer, 'drawer_focus');

    this.$nodes.page.off('.drawer');
    
    //Desktop Header CSS
    $(".scrollheader").css("z-index", '9999');
    $(".coverheader").css("z-index", '9999');
    
    
    $(".shifter-page").css("z-index", '1');
  };

  Drawer.prototype.trapFocus = function ($container, eventNamespace) {
    var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

    $container.attr('tabindex', '-1');

    $container.focus();

    $(document).on(eventName, function (evt) {
      if ($container[0] !== evt.target && !$container.has(evt.target).length) {
        $container.focus();
      }
    });
  };

  Drawer.prototype.removeTrapFocus = function ($container, eventNamespace) {
    var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

    $container.removeAttr('tabindex');
    $(document).off(eventName);
  };

  return Drawer;
})();

// Initialize Timber's JS on docready
$(timber.init);



/*
   *	jQuery OwlCarousel v1.31
   *
   *	Copyright (c) 2013 Bartosz Wojciechowski
   *	http://www.owlgraphic.com/owlcarousel
   *
   *	Licensed under MIT
   *
   */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7(B 3i.3E!=="9"){3i.3E=9(e){9 t(){}t.5v=e;q 5c t}}(9(e,t,n,r){b i={1J:9(t,n){b r=d;r.$k=e(n);r.6=e.3K({},e.3A.2c.6,r.$k.w(),t);r.29=t;r.3U()},3U:9(){b t=d;7(B t.6.2M==="9"){t.6.2M.P(d,[t.$k])}7(B t.6.2I==="2F"){b n=t.6.2I;9 r(e){7(B t.6.3F==="9"){t.6.3F.P(d,[e])}m{b n="";1C(b r 2f e["h"]){n+=e["h"][r]["1K"]}t.$k.2h(n)}t.2Y()}e.5G(n,r)}m{t.2Y()}},2Y:9(e){b t=d;t.$k.w("h-4p",t.$k.2s("2t")).w("h-4K",t.$k.2s("J"));t.$k.A({2z:0});t.2A=t.6.v;t.4L();t.5R=0;t.1M;t.1P()},1P:9(){b e=d;7(e.$k.1S().S===0){q c}e.1O();e.3H();e.$X=e.$k.1S();e.G=e.$X.S;e.4M();e.$I=e.$k.16(".h-1K");e.$L=e.$k.16(".h-1h");e.2H="Y";e.15=0;e.1W=[0];e.p=0;e.4I();e.4G()},4G:9(){b e=d;e.2V();e.31();e.4D();e.35();e.4C();e.4A();e.2x();e.4z();7(e.6.2w!==c){e.4w(e.6.2w)}7(e.6.Q===j){e.6.Q=5i}e.1e();e.$k.16(".h-1h").A("4v","4r");7(!e.$k.2p(":33")){e.34()}m{e.$k.A("2z",1)}e.56=c;e.2o();7(B e.6.39==="9"){e.6.39.P(d,[e.$k])}},2o:9(){b e=d;7(e.6.1I===j){e.1I()}7(e.6.1A===j){e.1A()}e.4n();7(B e.6.3n==="9"){e.6.3n.P(d,[e.$k])}},3o:9(){b e=d;7(B e.6.3p==="9"){e.6.3p.P(d,[e.$k])}e.34();e.2V();e.31();e.4m();e.35();e.2o();7(B e.6.3t==="9"){e.6.3t.P(d,[e.$k])}},4i:9(e){b t=d;19(9(){t.3o()},0)},34:9(){b e=d;7(e.$k.2p(":33")===c){e.$k.A({2z:0});18(e.1r);18(e.1M)}m{q c}e.1M=4g(9(){7(e.$k.2p(":33")){e.4i();e.$k.4f({2z:1},2J);18(e.1M)}},5O)},4M:9(){b e=d;e.$X.5N(\'<M J="h-1h">\').3G(\'<M J="h-1K"></M>\');e.$k.16(".h-1h").3G(\'<M J="h-1h-4d">\');e.1U=e.$k.16(".h-1h-4d");e.$k.A("4v","4r")},1O:9(){b e=d;b t=e.$k.1V(e.6.1O);b n=e.$k.1V(e.6.28);7(!t){e.$k.K(e.6.1O)}7(!n){e.$k.K(e.6.28)}},2V:9(){b t=d;7(t.6.2Z===c){q c}7(t.6.4b===j){t.6.v=t.2A=1;t.6.17=c;t.6.1q=c;t.6.21=c;t.6.24=c;t.6.25=c;t.6.26=c;q c}b n=e(t.6.4a).1m();7(n>(t.6.1q[0]||t.2A)){t.6.v=t.2A}7(B t.6.17!=="3b"&&t.6.17!==c){t.6.17.5x(9(e,t){q e[0]-t[0]});1C(b r 2f t.6.17){7(B t.6.17[r]!=="3b"&&t.6.17[r][0]<=n){t.6.v=t.6.17[r][1]}}}m{7(n<=t.6.1q[0]&&t.6.1q!==c){t.6.v=t.6.1q[1]}7(n<=t.6.21[0]&&t.6.21!==c){t.6.v=t.6.21[1]}7(n<=t.6.24[0]&&t.6.24!==c){t.6.v=t.6.24[1]}7(n<=t.6.25[0]&&t.6.25!==c){t.6.v=t.6.25[1]}7(n<=t.6.26[0]&&t.6.26!==c){t.6.v=t.6.26[1]}}7(t.6.v>t.G&&t.6.49===j){t.6.v=t.G}},4C:9(){b n=d,r;7(n.6.2Z!==j){q c}b i=e(t).1m();n.3f=9(){7(e(t).1m()!==i){7(n.6.Q!==c){18(n.1r)}5o(r);r=19(9(){i=e(t).1m();n.3o()},n.6.48)}};e(t).47(n.3f)},4m:9(){b e=d;e.2j(e.p);7(e.6.Q!==c){e.3l()}},46:9(){b t=d;b n=0;b r=t.G-t.6.v;t.$I.2i(9(i){b s=e(d);s.A({1m:t.N}).w("h-1K",3q(i));7(i%t.6.v===0||i===r){7(!(i>r)){n+=1}}s.w("h-1L",n)})},45:9(){b e=d;b t=0;b t=e.$I.S*e.N;e.$L.A({1m:t*2,V:0});e.46()},31:9(){b e=d;e.44();e.45();e.43();e.3x()},44:9(){b e=d;e.N=1N.5a(e.$k.1m()/e.6.v)},3x:9(){b e=d;b t=(e.G*e.N-e.6.v*e.N)*-1;7(e.6.v>e.G){e.C=0;t=0;e.3D=0}m{e.C=e.G-e.6.v;e.3D=t}q t},42:9(){q 0},43:9(){b t=d;t.H=[0];t.2C=[];b n=0;b r=0;1C(b i=0;i<t.G;i++){r+=t.N;t.H.2D(-r);7(t.6.14===j){b s=e(t.$I[i]);b o=s.w("h-1L");7(o!==n){t.2C[n]=t.H[i];n=o}}}},4D:9(){b t=d;7(t.6.2b===j||t.6.1s===j){t.D=e(\'<M J="h-4R"/>\').4Q("4P",!t.F.13).5E(t.$k)}7(t.6.1s===j){t.3Z()}7(t.6.2b===j){t.3Y()}},3Y:9(){b t=d;b n=e(\'<M J="h-5h"/>\');t.D.1k(n);t.1w=e("<M/>",{"J":"h-1l",2h:t.6.2T[0]||""});t.1y=e("<M/>",{"J":"h-Y",2h:t.6.2T[1]||""});n.1k(t.1w).1k(t.1y);n.z("2W.D 1Z.D",\'M[J^="h"]\',9(e){e.1n()});n.z("2a.D 2n.D",\'M[J^="h"]\',9(n){n.1n();7(e(d).1V("h-Y")){t.Y()}m{t.1l()}})},3Z:9(){b t=d;t.1o=e(\'<M J="h-1s"/>\');t.D.1k(t.1o);t.1o.z("2a.D 2n.D",".h-1p",9(n){n.1n();7(3q(e(d).w("h-1p"))!==t.p){t.1i(3q(e(d).w("h-1p")),j)}})},3T:9(){b t=d;7(t.6.1s===c){q c}t.1o.2h("");b n=0;b r=t.G-t.G%t.6.v;1C(b i=0;i<t.G;i++){7(i%t.6.v===0){n+=1;7(r===i){b s=t.G-t.6.v}b o=e("<M/>",{"J":"h-1p"});b u=e("<3Q></3Q>",{54:t.6.38===j?n:"","J":t.6.38===j?"h-5l":""});o.1k(u);o.w("h-1p",r===i?s:i);o.w("h-1L",n);t.1o.1k(o)}}t.3a()},3a:9(){b t=d;7(t.6.1s===c){q c}t.1o.16(".h-1p").2i(9(n,r){7(e(d).w("h-1L")===e(t.$I[t.p]).w("h-1L")){t.1o.16(".h-1p").Z("2d");e(d).K("2d")}})},3d:9(){b e=d;7(e.6.2b===c){q c}7(e.6.2e===c){7(e.p===0&&e.C===0){e.1w.K("1b");e.1y.K("1b")}m 7(e.p===0&&e.C!==0){e.1w.K("1b");e.1y.Z("1b")}m 7(e.p===e.C){e.1w.Z("1b");e.1y.K("1b")}m 7(e.p!==0&&e.p!==e.C){e.1w.Z("1b");e.1y.Z("1b")}}},35:9(){b e=d;e.3T();e.3d();7(e.D){7(e.6.v>=e.G){e.D.3N()}m{e.D.3L()}}},5g:9(){b e=d;7(e.D){e.D.3j()}},Y:9(e){b t=d;7(t.1G){q c}t.p+=t.6.14===j?t.6.v:1;7(t.p>t.C+(t.6.14==j?t.6.v-1:0)){7(t.6.2e===j){t.p=0;e="2k"}m{t.p=t.C;q c}}t.1i(t.p,e)},1l:9(e){b t=d;7(t.1G){q c}7(t.6.14===j&&t.p>0&&t.p<t.6.v){t.p=0}m{t.p-=t.6.14===j?t.6.v:1}7(t.p<0){7(t.6.2e===j){t.p=t.C;e="2k"}m{t.p=0;q c}}t.1i(t.p,e)},1i:9(e,t,n){b r=d;7(r.1G){q c}7(B r.6.1F==="9"){r.6.1F.P(d,[r.$k])}7(e>=r.C){e=r.C}m 7(e<=0){e=0}r.p=r.h.p=e;7(r.6.2w!==c&&n!=="4e"&&r.6.v===1&&r.F.1u===j){r.1B(0);7(r.F.1u===j){r.1H(r.H[e])}m{r.1x(r.H[e],1)}r.2q();r.4k();q c}b i=r.H[e];7(r.F.1u===j){r.1T=c;7(t===j){r.1B("1D");19(9(){r.1T=j},r.6.1D)}m 7(t==="2k"){r.1B(r.6.2u);19(9(){r.1T=j},r.6.2u)}m{r.1B("1j");19(9(){r.1T=j},r.6.1j)}r.1H(i)}m{7(t===j){r.1x(i,r.6.1D)}m 7(t==="2k"){r.1x(i,r.6.2u)}m{r.1x(i,r.6.1j)}}r.2q()},2j:9(e){b t=d;7(B t.6.1F==="9"){t.6.1F.P(d,[t.$k])}7(e>=t.C||e===-1){e=t.C}m 7(e<=0){e=0}t.1B(0);7(t.F.1u===j){t.1H(t.H[e])}m{t.1x(t.H[e],1)}t.p=t.h.p=e;t.2q()},2q:9(){b e=d;e.1W.2D(e.p);e.15=e.h.15=e.1W[e.1W.S-2];e.1W.55(0);7(e.15!==e.p){e.3a();e.3d();e.2o();7(e.6.Q!==c){e.3l()}}7(B e.6.3z==="9"&&e.15!==e.p){e.6.3z.P(d,[e.$k])}},W:9(){b e=d;e.3k="W";18(e.1r)},3l:9(){b e=d;7(e.3k!=="W"){e.1e()}},1e:9(){b e=d;e.3k="1e";7(e.6.Q===c){q c}18(e.1r);e.1r=4g(9(){e.Y(j)},e.6.Q)},1B:9(e){b t=d;7(e==="1j"){t.$L.A(t.2y(t.6.1j))}m 7(e==="1D"){t.$L.A(t.2y(t.6.1D))}m 7(B e!=="2F"){t.$L.A(t.2y(e))}},2y:9(e){b t=d;q{"-1R-1a":"2B "+e+"1z 2r","-27-1a":"2B "+e+"1z 2r","-o-1a":"2B "+e+"1z 2r",1a:"2B "+e+"1z 2r"}},3I:9(){q{"-1R-1a":"","-27-1a":"","-o-1a":"",1a:""}},3J:9(e){q{"-1R-O":"1g("+e+"T, E, E)","-27-O":"1g("+e+"T, E, E)","-o-O":"1g("+e+"T, E, E)","-1z-O":"1g("+e+"T, E, E)",O:"1g("+e+"T, E,E)"}},1H:9(e){b t=d;t.$L.A(t.3J(e))},3M:9(e){b t=d;t.$L.A({V:e})},1x:9(e,t){b n=d;n.2g=c;n.$L.W(j,j).4f({V:e},{59:t||n.6.1j,3O:9(){n.2g=j}})},4L:9(){b e=d;b r="1g(E, E, E)",i=n.5f("M");i.2t.3P="  -27-O:"+r+"; -1z-O:"+r+"; -o-O:"+r+"; -1R-O:"+r+"; O:"+r;b s=/1g\\(E, E, E\\)/g,o=i.2t.3P.5k(s),u=o!==1d&&o.S===1;b a="5z"2f t||5C.4U;e.F={1u:u,13:a}},4A:9(){b e=d;7(e.6.22!==c||e.6.23!==c){e.3R();e.3S()}},3H:9(){b e=d;b t=["s","e","x"];e.12={};7(e.6.22===j&&e.6.23===j){t=["2W.h 1Z.h","2P.h 3V.h","2a.h 3W.h 2n.h"]}m 7(e.6.22===c&&e.6.23===j){t=["2W.h","2P.h","2a.h 3W.h"]}m 7(e.6.22===j&&e.6.23===c){t=["1Z.h","3V.h","2n.h"]}e.12["3X"]=t[0];e.12["2O"]=t[1];e.12["2N"]=t[2]},3S:9(){b t=d;t.$k.z("5A.h",9(e){e.1n()});t.$k.z("1Z.40",9(t){q e(t.1f).2p("5F, 5H, 5Q, 5S")})},3R:9(){9 o(e){7(e.2L){q{x:e.2L[0].2K,y:e.2L[0].41}}m{7(e.2K!==r){q{x:e.2K,y:e.41}}m{q{x:e.52,y:e.53}}}}9 u(t){7(t==="z"){e(n).z(i.12["2O"],f);e(n).z(i.12["2N"],l)}m 7(t==="R"){e(n).R(i.12["2O"]);e(n).R(i.12["2N"])}}9 a(n){b n=n.3B||n||t.3w;7(n.5d===3){q c}7(i.G<=i.6.v){q}7(i.2g===c&&!i.6.3v){q c}7(i.1T===c&&!i.6.3v){q c}7(i.6.Q!==c){18(i.1r)}7(i.F.13!==j&&!i.$L.1V("3s")){i.$L.K("3s")}i.11=0;i.U=0;e(d).A(i.3I());b r=e(d).2l();s.3g=r.V;s.3e=o(n).x-r.V;s.3c=o(n).y-r.5y;u("z");s.2m=c;s.30=n.1f||n.4c}9 f(r){b r=r.3B||r||t.3w;i.11=o(r).x-s.3e;i.2S=o(r).y-s.3c;i.U=i.11-s.3g;7(B i.6.2R==="9"&&s.2Q!==j&&i.U!==0){s.2Q=j;i.6.2R.P(i,[i.$k])}7(i.U>8||i.U<-8&&i.F.13===j){r.1n?r.1n():r.5M=c;s.2m=j}7((i.2S>10||i.2S<-10)&&s.2m===c){e(n).R("2P.h")}b u=9(){q i.U/5};b a=9(){q i.3D+i.U/5};i.11=1N.3x(1N.42(i.11,u()),a());7(i.F.1u===j){i.1H(i.11)}m{i.3M(i.11)}}9 l(n){b n=n.3B||n||t.3w;n.1f=n.1f||n.4c;s.2Q=c;7(i.F.13!==j){i.$L.Z("3s")}7(i.U<0){i.1t=i.h.1t="V"}m{i.1t=i.h.1t="2G"}7(i.U!==0){b r=i.4h();i.1i(r,c,"4e");7(s.30===n.1f&&i.F.13!==j){e(n.1f).z("3u.4j",9(t){t.4S();t.4T();t.1n();e(n.1f).R("3u.4j")});b o=e.4O(n.1f,"4V")["3u"];b a=o.4W();o.4X(0,0,a)}}u("R")}b i=d;b s={3e:0,3c:0,4Y:0,3g:0,2l:1d,4Z:1d,50:1d,2m:1d,51:1d,30:1d};i.2g=j;i.$k.z(i.12["3X"],".h-1h",a)},4h:9(){b e=d,t;t=e.4l();7(t>e.C){e.p=e.C;t=e.C}m 7(e.11>=0){t=0;e.p=0}q t},4l:9(){b t=d,n=t.6.14===j?t.2C:t.H,r=t.11,i=1d;e.2i(n,9(s,o){7(r-t.N/20>n[s+1]&&r-t.N/20<o&&t.3m()==="V"){i=o;7(t.6.14===j){t.p=e.4o(i,t.H)}m{t.p=s}}m 7(r+t.N/20<o&&r+t.N/20>(n[s+1]||n[s]-t.N)&&t.3m()==="2G"){7(t.6.14===j){i=n[s+1]||n[n.S-1];t.p=e.4o(i,t.H)}m{i=n[s+1];t.p=s+1}}});q t.p},3m:9(){b e=d,t;7(e.U<0){t="2G";e.2H="Y"}m{t="V";e.2H="1l"}q t},4I:9(){b e=d;e.$k.z("h.Y",9(){e.Y()});e.$k.z("h.1l",9(){e.1l()});e.$k.z("h.1e",9(t,n){e.6.Q=n;e.1e();e.36="1e"});e.$k.z("h.W",9(){e.W();e.36="W"});e.$k.z("h.1i",9(t,n){e.1i(n)});e.$k.z("h.2j",9(t,n){e.2j(n)})},2x:9(){b e=d;7(e.6.2x===j&&e.F.13!==j&&e.6.Q!==c){e.$k.z("57",9(){e.W()});e.$k.z("58",9(){7(e.36!=="W"){e.1e()}})}},1I:9(){b t=d;7(t.6.1I===c){q c}1C(b n=0;n<t.G;n++){b i=e(t.$I[n]);7(i.w("h-1c")==="1c"){4q}b s=i.w("h-1K"),o=i.16(".5b"),u;7(B o.w("1X")!=="2F"){i.w("h-1c","1c");4q}7(i.w("h-1c")===r){o.3N();i.K("4s").w("h-1c","5e")}7(t.6.4t===j){u=s>=t.p}m{u=j}7(u&&s<t.p+t.6.v&&o.S){t.4u(i,o)}}},4u:9(e,t){9 s(){r+=1;7(n.2X(t.2U(0))||i===j){o()}m 7(r<=2v){19(s,2v)}m{o()}}9 o(){e.w("h-1c","1c").Z("4s");t.5j("w-1X");n.6.4x==="4y"?t.5m(5n):t.3L();7(B n.6.3r==="9"){n.6.3r.P(d,[n.$k])}}b n=d,r=0;7(t.5p("5q")==="5r"){t.A("5s-5t","5u("+t.w("1X")+")");b i=j}m{t[0].1X=t.w("1X")}s()},1A:9(){9 s(){i+=1;7(t.2X(n.2U(0))){o()}m 7(i<=2v){19(s,2v)}m{t.1U.A("3h","")}}9 o(){b n=e(t.$I[t.p]).3h();t.1U.A("3h",n+"T");7(!t.1U.1V("1A")){19(9(){t.1U.K("1A")},0)}}b t=d;b n=e(t.$I[t.p]).16("5w");7(n.2U(0)!==r){b i=0;s()}m{o()}},2X:9(e){7(!e.3O){q c}7(B e.4B!=="3b"&&e.4B==0){q c}q j},4n:9(){b t=d;7(t.6.37===j){t.$I.Z("2d")}t.1v=[];1C(b n=t.p;n<t.p+t.6.v;n++){t.1v.2D(n);7(t.6.37===j){e(t.$I[n]).K("2d")}}t.h.1v=t.1v},4w:9(e){b t=d;t.4E="h-"+e+"-5B";t.4F="h-"+e+"-2f"},4k:9(){9 u(e,t){q{2l:"5D",V:e+"T"}}b e=d;e.1G=j;b t=e.4E,n=e.4F,r=e.$I.1E(e.p),i=e.$I.1E(e.15),s=1N.4H(e.H[e.p])+e.H[e.15],o=1N.4H(e.H[e.p])+e.N/2;e.$L.K("h-1Y").A({"-1R-O-1Y":o+"T","-27-4J-1Y":o+"T","4J-1Y":o+"T"});b a="5I 5J 5K 5L";i.A(u(s,10)).K(t).z(a,9(){e.3C=j;i.R(a);e.32(i,t)});r.K(n).z(a,9(){e.2E=j;r.R(a);e.32(r,n)})},32:9(e,t){b n=d;e.A({2l:"",V:""}).Z(t);7(n.3C&&n.2E){n.$L.Z("h-1Y");n.3C=c;n.2E=c;n.1G=c}},4z:9(){b e=d;e.h={29:e.29,5P:e.$k,X:e.$X,I:e.$I,p:e.p,15:e.15,1v:e.1v,13:e.F.13,F:e.F,1t:e.1t}},4N:9(){b r=d;r.$k.R(".h h 1Z.40");e(n).R(".h h");e(t).R("47",r.3f)},1Q:9(){b e=d;7(e.$k.1S().S!==0){e.$L.3y();e.$X.3y().3y();7(e.D){e.D.3j()}}e.4N();e.$k.2s("2t",e.$k.w("h-4p")||"").2s("J",e.$k.w("h-4K"))},5T:9(){b e=d;e.W();18(e.1M);e.1Q();e.$k.5U()},5V:9(t){b n=d;b r=e.3K({},n.29,t);n.1Q();n.1J(r,n.$k)},5W:9(e,t){b n=d,i;7(!e){q c}7(n.$k.1S().S===0){n.$k.1k(e);n.1P();q c}n.1Q();7(t===r||t===-1){i=-1}m{i=t}7(i>=n.$X.S||i===-1){n.$X.1E(-1).5X(e)}m{n.$X.1E(i).5Y(e)}n.1P()},5Z:9(e){b t=d,n;7(t.$k.1S().S===0){q c}7(e===r||e===-1){n=-1}m{n=e}t.1Q();t.$X.1E(n).3j();t.1P()}};e.3A.2c=9(t){q d.2i(9(){7(e(d).w("h-1J")===j){q c}e(d).w("h-1J",j);b n=3i.3E(i);n.1J(t,d);e.w(d,"2c",n)})};e.3A.2c.6={v:5,17:c,1q:[60,4],21:[61,3],24:[62,2],25:c,26:[63,1],4b:c,49:c,1j:2J,1D:64,2u:65,Q:c,2x:c,2b:c,2T:["1l","Y"],2e:j,14:c,1s:j,38:c,2Z:j,48:2J,4a:t,1O:"h-66",28:"h-28",1I:c,4t:j,4x:"4y",1A:c,2I:c,3F:c,3v:j,22:j,23:j,37:c,2w:c,3p:c,3t:c,2M:c,39:c,1F:c,3z:c,3n:c,2R:c,3r:c}})(67,68,69)',62,382,'||||||options|if||function||var|false|this||||owl||true|elem||else|||currentItem|return|||||items|data|||on|css|typeof|maximumItem|owlControls|0px|browser|itemsAmount|positionsInArray|owlItems|class|addClass|owlWrapper|div|itemWidth|transform|apply|autoPlay|off|length|px|newRelativeX|left|stop|userItems|next|removeClass||newPosX|ev_types|isTouch|scrollPerPage|prevItem|find|itemsCustom|clearInterval|setTimeout|transition|disabled|loaded|null|play|target|translate3d|wrapper|goTo|slideSpeed|append|prev|width|preventDefault|paginationWrapper|page|itemsDesktop|autoPlayInterval|pagination|dragDirection|support3d|visibleItems|buttonPrev|css2slide|buttonNext|ms|autoHeight|swapSpeed|for|paginationSpeed|eq|beforeMove|isTransition|transition3d|lazyLoad|init|item|roundPages|checkVisible|Math|baseClass|setVars|unWrap|webkit|children|isCss3Finish|wrapperOuter|hasClass|prevArr|src|origin|mousedown||itemsDesktopSmall|mouseDrag|touchDrag|itemsTablet|itemsTabletSmall|itemsMobile|moz|theme|userOptions|touchend|navigation|owlCarousel|active|rewindNav|in|isCssFinish|html|each|jumpTo|rewind|position|sliding|mouseup|eachMoveUpdate|is|afterGo|ease|attr|style|rewindSpeed|100|transitionStyle|stopOnHover|addCssSpeed|opacity|orignalItems|all|pagesInArray|push|endCurrent|string|right|playDirection|jsonPath|200|pageX|touches|beforeInit|end|move|touchmove|dragging|startDragging|newPosY|navigationText|get|updateItems|touchstart|completeImg|logIn|responsive|targetElement|calculateAll|clearTransStyle|visible|watchVisibility|updateControls|hoverStatus|addClassActive|paginationNumbers|afterInit|checkPagination|undefined|offsetY|checkNavigation|offsetX|resizer|relativePos|height|Object|remove|apStatus|checkAp|moveDirection|afterAction|updateVars|beforeUpdate|Number|afterLazyLoad|grabbing|afterUpdate|click|dragBeforeAnimFinish|event|max|unwrap|afterMove|fn|originalEvent|endPrev|maximumPixels|create|jsonSuccess|wrap|eventTypes|removeTransition|doTranslate|extend|show|css2move|hide|complete|cssText|span|gestures|disabledEvents|updatePagination|loadContent|mousemove|touchcancel|start|buildButtons|buildPagination|disableTextSelect|pageY|min|loops|calculateWidth|appendWrapperSizes|appendItemsSizes|resize|responsiveRefreshRate|itemsScaleUp|responsiveBaseWidth|singleItem|srcElement|outer|drag|animate|setInterval|getNewPosition|reload|disable|singleItemTransition|closestItem|updatePosition|onVisibleItems|inArray|originalStyles|continue|block|loading|lazyFollow|lazyPreload|display|transitionTypes|lazyEffect|fade|owlStatus|moveEvents|naturalWidth|response|buildControls|outClass|inClass|onStartup|abs|customEvents|perspective|originalClasses|checkBrowser|wrapItems|clearEvents|_data|clickable|toggleClass|controls|stopImmediatePropagation|stopPropagation|msMaxTouchPoints|events|pop|splice|baseElWidth|minSwipe|maxSwipe|dargging|clientX|clientY|text|shift|onstartup|mouseover|mouseout|duration|round|lazyOwl|new|which|checked|createElement|destroyControls|buttons|5e3|removeAttr|match|numbers|fadeIn|400|clearTimeout|prop|tagName|DIV|background|image|url|prototype|img|sort|top|ontouchstart|dragstart|out|navigator|relative|appendTo|input|getJSON|textarea|webkitAnimationEnd|oAnimationEnd|MSAnimationEnd|animationend|returnValue|wrapAll|500|baseElement|select|wrapperWidth|option|destroy|removeData|reinit|addItem|after|before|removeItem|1199|979|768|479|800|1e3|carousel|jQuery|window|document'.split('|'),0,{}))

       // Utility for creating objects in older browsers
       if ( typeof Object.create !== 'function' ) {
     Object.create = function( obj ) {

  function F() {}
  F.prototype = obj;
  return new F();

};
}



/*!
 * parallax.js v1.4.2 (http://pixelcog.github.io/parallax.js/)
 * @copyright 2016 PixelCog, Inc.
 * @license MIT (https://github.com/pixelcog/parallax.js/blob/master/LICENSE)
 */

;(function ( $, window, document, undefined ) {

  // Polyfill for requestAnimationFrame
  // via: https://gist.github.com/paulirish/1579671

  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
      || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                                   timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };

    if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
  }());


  // Parallax Constructor

  function Parallax(element, options) {
    var self = this;

    if (typeof options == 'object') {
      delete options.refresh;
      delete options.render;
      $.extend(this, options);
    }

    this.$element = $(element);

    if (!this.imageSrc && this.$element.is('img')) {
      this.imageSrc = this.$element.attr('src');
    }

    var positions = (this.position + '').toLowerCase().match(/\S+/g) || [];

    if (positions.length < 1) {
      positions.push('center');
    }
    if (positions.length == 1) {
      positions.push(positions[0]);
    }

    if (positions[0] == 'top' || positions[0] == 'bottom' || positions[1] == 'left' || positions[1] == 'right') {
      positions = [positions[1], positions[0]];
    }

    if (this.positionX != undefined) positions[0] = this.positionX.toLowerCase();
    if (this.positionY != undefined) positions[1] = this.positionY.toLowerCase();

    self.positionX = positions[0];
    self.positionY = positions[1];

    if (this.positionX != 'left' && this.positionX != 'right') {
      if (isNaN(parseInt(this.positionX))) {
        this.positionX = 'center';
      } else {
        this.positionX = parseInt(this.positionX);
      }
    }

    if (this.positionY != 'top' && this.positionY != 'bottom') {
      if (isNaN(parseInt(this.positionY))) {
        this.positionY = 'center';
      } else {
        this.positionY = parseInt(this.positionY);
      }
    }

    this.position =
      this.positionX + (isNaN(this.positionX)? '' : 'px') + ' ' +
      this.positionY + (isNaN(this.positionY)? '' : 'px');

    if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
      if (this.imageSrc && this.iosFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    if (navigator.userAgent.match(/(Android)/)) {
      if (this.imageSrc && this.androidFix && !this.$element.is('img')) {
        this.$element.css({
          backgroundImage: 'url(' + this.imageSrc + ')',
          backgroundSize: 'cover',
          backgroundPosition: this.position
        });
      }
      return this;
    }

    this.$mirror = $('<div />').prependTo('.shifter-page');

    var slider = this.$element.find('>.parallax-slider');
    var sliderExisted = false;

    if (slider.length == 0)
      this.$slider = $('<img />').prependTo(this.$mirror);
    else {
      this.$slider = slider.prependTo(this.$mirror)
      sliderExisted = true;
    }

    this.$mirror.addClass('parallax-mirror').css({
      visibility: 'hidden',
      zIndex: this.zIndex,
      position: 'fixed',
      top: 0,
      left: 0,
      overflow: 'hidden'
    });

    this.$slider.addClass('parallax-slider').one('load', function() {
      if (!self.naturalHeight || !self.naturalWidth) {
        self.naturalHeight = this.naturalHeight || this.height || 1;
        self.naturalWidth  = this.naturalWidth  || this.width  || 1;
      }
      self.aspectRatio = self.naturalWidth / self.naturalHeight;

      Parallax.isSetup || Parallax.setup();
      Parallax.sliders.push(self);
      Parallax.isFresh = false;
      Parallax.requestRender();
    });

    if (!sliderExisted)
      this.$slider[0].src = this.imageSrc;

    if (this.naturalHeight && this.naturalWidth || this.$slider[0].complete || slider.length > 0) {
      this.$slider.trigger('load');
    }

  };


  // Parallax Instance Methods

  $.extend(Parallax.prototype, {
    speed:    0.2,
    bleed:    0,
    zIndex:   0,
    iosFix:   true,
    androidFix: true,
    position: 'center',
    overScrollFix: false,

    refresh: function() {
      this.boxWidth        = this.$element.outerWidth();
      this.boxHeight       = this.$element.outerHeight() + this.bleed * 2;
      this.boxOffsetTop    = this.$element.offset().top - this.bleed;
      this.boxOffsetLeft   = this.$element.offset().left;
      this.boxOffsetBottom = this.boxOffsetTop + this.boxHeight;

      var winHeight = Parallax.winHeight;
      var docHeight = Parallax.docHeight;
      var maxOffset = Math.min(this.boxOffsetTop, docHeight - winHeight);
      var minOffset = Math.max(this.boxOffsetTop + this.boxHeight - winHeight, 0);
      var imageHeightMin = this.boxHeight + (maxOffset - minOffset) * (1 - this.speed) | 0;
      var imageOffsetMin = (this.boxOffsetTop - maxOffset) * (1 - this.speed) | 0;

      if (imageHeightMin * this.aspectRatio >= this.boxWidth) {
        this.imageWidth    = imageHeightMin * this.aspectRatio | 0;
        this.imageHeight   = imageHeightMin;
        this.offsetBaseTop = imageOffsetMin;

        var margin = this.imageWidth - this.boxWidth;

        if (this.positionX == 'left') {
          this.offsetLeft = 0;
        } else if (this.positionX == 'right') {
          this.offsetLeft = - margin;
        } else if (!isNaN(this.positionX)) {
          this.offsetLeft = Math.max(this.positionX, - margin);
        } else {
          this.offsetLeft = - margin / 2 | 0;
        }
      } else {
        this.imageWidth    = this.boxWidth;
        this.imageHeight   = this.boxWidth / this.aspectRatio | 0;
        this.offsetLeft    = 0;

        var margin = this.imageHeight - imageHeightMin;

        if (this.positionY == 'top') {
          this.offsetBaseTop = imageOffsetMin;
        } else if (this.positionY == 'bottom') {
          this.offsetBaseTop = imageOffsetMin - margin;
        } else if (!isNaN(this.positionY)) {
          this.offsetBaseTop = imageOffsetMin + Math.max(this.positionY, - margin);
        } else {
          this.offsetBaseTop = imageOffsetMin - margin / 2 | 0;
        }
      }
    },

    render: function() {
      var scrollTop    = Parallax.scrollTop;
      var scrollLeft   = Parallax.scrollLeft;
      var overScroll   = this.overScrollFix ? Parallax.overScroll : 0;
      var scrollBottom = scrollTop + Parallax.winHeight;

      if (this.boxOffsetBottom > scrollTop && this.boxOffsetTop <= scrollBottom) {
        this.visibility = 'visible';
        this.mirrorTop = this.boxOffsetTop  - scrollTop;
        this.mirrorLeft = this.boxOffsetLeft - scrollLeft;
        this.offsetTop = this.offsetBaseTop - this.mirrorTop * (1 - this.speed);
      } else {
        this.visibility = 'hidden';
      }

      this.$mirror.css({
        transform: 'translate3d(0px, 0px, 0px)',
        visibility: this.visibility,
        top: this.mirrorTop - overScroll,
        left: this.mirrorLeft,
        height: this.boxHeight,
        width: this.boxWidth
      });

      this.$slider.css({
        transform: 'translate3d(0px, 0px, 0px)',
        position: 'absolute',
        top: this.offsetTop,
        left: this.offsetLeft,
        height: this.imageHeight,
        width: this.imageWidth,
        maxWidth: 'none'
      });
    }
  });


  // Parallax Static Methods

  $.extend(Parallax, {
    scrollTop:    0,
    scrollLeft:   0,
    winHeight:    0,
    winWidth:     0,
    docHeight:    1 << 30,
    docWidth:     1 << 30,
    sliders:      [],
    isReady:      false,
    isFresh:      false,
    isBusy:       false,

    setup: function() {
      if (this.isReady) return;

      var $doc = $(document), $win = $(window);

      var loadDimensions = function() {
        Parallax.winHeight = $win.height();
        Parallax.winWidth  = $win.width();
        Parallax.docHeight = $doc.height();
        Parallax.docWidth  = $doc.width();
      };

      var loadScrollPosition = function() {
        var winScrollTop  = $win.scrollTop();
        var scrollTopMax  = Parallax.docHeight - Parallax.winHeight;
        var scrollLeftMax = Parallax.docWidth  - Parallax.winWidth;
        Parallax.scrollTop  = Math.max(0, Math.min(scrollTopMax,  winScrollTop));
        Parallax.scrollLeft = Math.max(0, Math.min(scrollLeftMax, $win.scrollLeft()));
        Parallax.overScroll = Math.max(winScrollTop - scrollTopMax, Math.min(winScrollTop, 0));
      };

      $win.on('resize.px.parallax load.px.parallax', function() {
        loadDimensions();
        Parallax.isFresh = false;
        Parallax.requestRender();
      })
      .on('scroll.px.parallax load.px.parallax', function() {
        loadScrollPosition();
        Parallax.requestRender();
      });

      loadDimensions();
      loadScrollPosition();

      this.isReady = true;
    },

    configure: function(options) {
      if (typeof options == 'object') {
        delete options.refresh;
        delete options.render;
        $.extend(this.prototype, options);
      }
    },

    refresh: function() {
      $.each(this.sliders, function(){ this.refresh() });
      this.isFresh = true;
    },

    render: function() {
      this.isFresh || this.refresh();
      $.each(this.sliders, function(){ this.render() });
    },

    requestRender: function() {
      var self = this;

      if (!this.isBusy) {
        this.isBusy = true;
        window.requestAnimationFrame(function() {
          self.render();
          self.isBusy = false;
        });
      }
    },
    destroy: function(el){
      var i,
          parallaxElement = $(el).data('px.parallax');
      parallaxElement.$mirror.remove();
      for(i=0; i < this.sliders.length; i+=1){
        if(this.sliders[i] == parallaxElement){
          this.sliders.splice(i, 1);
        }
      }
      $(el).data('px.parallax', false);
      if(this.sliders.length === 0){
        $(window).off('scroll.px.parallax resize.px.parallax load.px.parallax');
        this.isReady = false;
        Parallax.isSetup = false;
      }
    }
  });


  // Parallax Plugin Definition

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var options = typeof option == 'object' && option;

      if (this == window || this == document || $this.is('body')) {
        Parallax.configure(options);
      }
      else if (!$this.data('px.parallax')) {
        options = $.extend({}, $this.data(), options);
        $this.data('px.parallax', new Parallax(this, options));
      }
      else if (typeof option == 'object')
      {
        $.extend($this.data('px.parallax'), options);
      }
      if (typeof option == 'string') {
        if(option == 'destroy'){
          Parallax['destroy'](this);
        }else{
          Parallax[option]();
        }
      }
    })
  };

  var old = $.fn.parallax;

  $.fn.parallax             = Plugin;
  $.fn.parallax.Constructor = Parallax;


  // Parallax No Conflict

  $.fn.parallax.noConflict = function () {
    $.fn.parallax = old;
    return this;
  };


  // Parallax Data-API

  $(document).on('ready.px.parallax.data-api', function () {
    $('[data-parallax="scroll"]').parallax();
  });

}(jQuery, window, document));


// cookie
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)}(function(e){function n(e){return u.raw?e:encodeURIComponent(e)}function o(e){return u.raw?e:decodeURIComponent(e)}function i(e){return n(u.json?JSON.stringify(e):String(e))}function r(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(c," ")),u.json?JSON.parse(e):e}catch(n){}}function t(n,o){var i=u.raw?n:r(n);return e.isFunction(o)?o(i):i}var c=/\+/g,u=e.cookie=function(r,c,a){if(void 0!==c&&!e.isFunction(c)){if(a=e.extend({},u.defaults,a),"number"==typeof a.expires){var d=a.expires,f=a.expires=new Date;f.setTime(+f+864e5*d)}return document.cookie=[n(r),"=",i(c),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}for(var s=r?void 0:{},p=document.cookie?document.cookie.split("; "):[],m=0,v=p.length;v>m;m++){var x=p[m].split("="),k=o(x.shift()),l=x.join("=");if(r&&r===k){s=t(l,c);break}r||void 0===(l=t(l))||(s[k]=l)}return s};u.defaults={},e.removeCookie=function(n,o){return void 0===e.cookie(n)?!1:(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}});
// Placeholder
!function(e,a,t){function l(e){var a={},l=/^jQuery\d+$/;return t.each(e.attributes,function(e,t){t.specified&&!l.test(t.name)&&(a[t.name]=t.value)}),a}function r(e,l){var r=this,o=t(r);if(r.value==o.attr("placeholder")&&o.hasClass("placeholder"))if(o.data("placeholder-password")){if(o=o.hide().next().show().attr("id",o.removeAttr("id").data("placeholder-id")),e===!0)return o[0].value=l;o.focus()}else r.value="",o.removeClass("placeholder"),r==a.activeElement&&r.select()}function o(){var e,a=this,o=t(a),d=this.id;if(""==a.value){if("password"==a.type){if(!o.data("placeholder-textinput")){try{e=o.clone().attr({type:"text"})}catch(c){e=t("<input>").attr(t.extend(l(this),{type:"text"}))}e.removeAttr("name").data({"placeholder-password":!0,"placeholder-id":d}).bind("focus.placeholder",r),o.data({"placeholder-textinput":e,"placeholder-id":d}).before(e)}o=o.removeAttr("id").hide().prev().attr("id",d).show()}o.addClass("placeholder"),o[0].value=o.attr("placeholder")}else o.removeClass("placeholder")}var d,c,n="placeholder"in a.createElement("input"),i="placeholder"in a.createElement("textarea"),h=t.fn,u=t.valHooks;n&&i?(c=h.placeholder=function(){return this},c.input=c.textarea=!0):(c=h.placeholder=function(){var e=this;return e.filter((n?"textarea":":input")+"[placeholder]").not(".placeholder").bind({"focus.placeholder":r,"blur.placeholder":o}).data("placeholder-enabled",!0).trigger("blur.placeholder"),e},c.input=n,c.textarea=i,d={get:function(e){var a=t(e);return a.data("placeholder-enabled")&&a.hasClass("placeholder")?"":e.value},set:function(e,l){var d=t(e);return d.data("placeholder-enabled")?(""==l?(e.value=l,e!=a.activeElement&&o.call(e)):d.hasClass("placeholder")?r.call(e,!0,l)||(e.value=l):e.value=l,d):e.value=l}},n||(u.input=d),i||(u.textarea=d),t(function(){t(a).delegate("form","submit.placeholder",function(){var e=t(".placeholder",this).each(r);setTimeout(function(){e.each(o)},10)})}),t(e).bind("beforeunload.placeholder",function(){t(".placeholder").each(function(){this.value=""})}))}(this,document,jQuery);
// Fancybox
!function(e,t,n,i){"use strict";var o=n("html"),a=n(e),r=n(t),s=n.fancybox=function(){s.open.apply(this,arguments)},l=navigator.userAgent.match(/msie/i),c=null,d=t.createTouch!==i,p=function(e){return e&&e.hasOwnProperty&&e instanceof n},h=function(e){return e&&"string"===n.type(e)},f=function(e){return h(e)&&e.indexOf("%")>0},u=function(e){return e&&!(e.style.overflow&&"hidden"===e.style.overflow)&&(e.clientWidth&&e.scrollWidth>e.clientWidth||e.clientHeight&&e.scrollHeight>e.clientHeight)},g=function(e,t){var n=parseInt(e,10)||0;return t&&f(e)&&(n=s.getViewport()[t]/100*n),Math.ceil(n)},m=function(e,t){return g(e,t)+"px"};n.extend(s,{version:"2.1.5",defaults:{padding:20,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:2,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!d,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!1,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(l?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"fade",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"fade",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:n.noop,beforeLoad:n.noop,afterLoad:n.noop,beforeShow:n.noop,afterShow:n.noop,beforeChange:n.noop,beforeClose:n.noop,afterClose:n.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){return e&&(n.isPlainObject(t)||(t={}),!1!==s.close(!0))?(n.isArray(e)||(e=p(e)?n(e).get():[e]),n.each(e,function(o,a){var r,l,c,d,f,u,g,m={};"object"===n.type(a)&&(a.nodeType&&(a=n(a)),p(a)?(m={href:a.data("fancybox-href")||a.attr("href"),title:a.data("fancybox-title")||a.attr("title"),isDom:!0,element:a},n.metadata&&n.extend(!0,m,a.metadata())):m=a),r=t.href||m.href||(h(a)?a:null),l=t.title!==i?t.title:m.title||"",c=t.content||m.content,d=c?"html":t.type||m.type,!d&&m.isDom&&(d=a.data("fancybox-type"),d||(f=a.prop("class").match(/fancybox\.(\w+)/),d=f?f[1]:null)),h(r)&&(d||(s.isImage(r)?d="image":s.isSWF(r)?d="swf":"#"===r.charAt(0)?d="inline":h(a)&&(d="html",c=a)),"ajax"===d&&(u=r.split(/\s+/,2),r=u.shift(),g=u.shift())),c||("inline"===d?r?c=n(h(r)?r.replace(/.*(?=#[^\s]+$)/,""):r):m.isDom&&(c=a):"html"===d?c=r:d||r||!m.isDom||(d="inline",c=a)),n.extend(m,{href:r,type:d,content:c,title:l,selector:g}),e[o]=m}),s.opts=n.extend(!0,{},s.defaults,t),t.keys!==i&&(s.opts.keys=t.keys?n.extend({},s.defaults.keys,t.keys):!1),s.group=e,s._start(s.opts.index)):void 0},cancel:function(){var e=s.coming;e&&!1!==s.trigger("onCancel")&&(s.hideLoading(),s.ajaxLoad&&s.ajaxLoad.abort(),s.ajaxLoad=null,s.imgPreload&&(s.imgPreload.onload=s.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),s.coming=null,s.current||s._afterZoomOut(e))},close:function(e){s.cancel(),!1!==s.trigger("beforeClose")&&(s.unbindEvents(),s.isActive&&(s.isOpen&&e!==!0?(s.isOpen=s.isOpened=!1,s.isClosing=!0,n(".fancybox-item, .fancybox-nav").remove(),s.wrap.stop(!0,!0).removeClass("fancybox-opened"),s.transitions[s.current.closeMethod]()):(n(".fancybox-wrap").stop(!0).trigger("onReset").remove(),s._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(s.player.timer)},n=function(){t(),s.current&&s.player.isActive&&(s.player.timer=setTimeout(s.next,s.current.playSpeed))},i=function(){t(),r.unbind(".player"),s.player.isActive=!1,s.trigger("onPlayEnd")},o=function(){s.current&&(s.current.loop||s.current.index<s.group.length-1)&&(s.player.isActive=!0,r.bind({"onCancel.player beforeClose.player":i,"onUpdate.player":n,"beforeLoad.player":t}),n(),s.trigger("onPlayStart"))};e===!0||!s.player.isActive&&e!==!1?o():i()},next:function(e){var t=s.current;t&&(h(e)||(e=t.direction.next),s.jumpto(t.index+1,e,"next"))},prev:function(e){var t=s.current;t&&(h(e)||(e=t.direction.prev),s.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,n){var o=s.current;o&&(e=g(e),s.direction=t||o.direction[e>=o.index?"next":"prev"],s.router=n||"jumpto",o.loop&&(0>e&&(e=o.group.length+e%o.group.length),e%=o.group.length),o.group[e]!==i&&(s.cancel(),s._start(e)))},reposition:function(e,t){var i,o=s.current,a=o?o.wrap:null;a&&(i=s._getPosition(t),e&&"scroll"===e.type?(delete i.position,a.stop(!0,!0).animate(i,200)):(a.css(i),o.pos=n.extend({},o.dim,i)))},update:function(e){var t=e&&e.type,n=!t||"orientationchange"===t;n&&(clearTimeout(c),c=null),s.isOpen&&!c&&(c=setTimeout(function(){var i=s.current;i&&!s.isClosing&&(s.wrap.removeClass("fancybox-tmp"),(n||"load"===t||"resize"===t&&i.autoResize)&&s._setDimension(),"scroll"===t&&i.canShrink||s.reposition(e),s.trigger("onUpdate"),c=null)},n&&!d?0:300))},toggle:function(e){s.isOpen&&(s.current.fitToView="boolean"===n.type(e)?e:!s.current.fitToView,d&&(s.wrap.removeAttr("style").addClass("fancybox-tmp"),s.trigger("onUpdate")),s.update())},hideLoading:function(){r.unbind(".loading"),n("#fancybox-loading").remove()},showLoading:function(){var e,t;s.hideLoading(),e=n('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"),r.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),s.cancel())}),s.defaults.fixed||(t=s.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x}))},getViewport:function(){var t=s.current&&s.current.locked||!1,n={x:a.scrollLeft(),y:a.scrollTop()};return t?(n.w=t[0].clientWidth,n.h=t[0].clientHeight):(n.w=d&&e.innerWidth?e.innerWidth:a.width(),n.h=d&&e.innerHeight?e.innerHeight:a.height()),n},unbindEvents:function(){s.wrap&&p(s.wrap)&&s.wrap.unbind(".fb"),r.unbind(".fb"),a.unbind(".fb")},bindEvents:function(){var e,t=s.current;t&&(a.bind("orientationchange.fb"+(d?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),s.update),e=t.keys,e&&r.bind("keydown.fb",function(o){var a=o.which||o.keyCode,r=o.target||o.srcElement;return 27===a&&s.coming?!1:void(o.ctrlKey||o.altKey||o.shiftKey||o.metaKey||r&&(r.type||n(r).is("[contenteditable]"))||n.each(e,function(e,r){return t.group.length>1&&r[a]!==i?(s[e](r[a]),o.preventDefault(),!1):n.inArray(a,r)>-1?(s[e](),o.preventDefault(),!1):void 0}))}),n.fn.mousewheel&&t.mouseWheel&&s.wrap.bind("mousewheel.fb",function(e,i,o,a){for(var r=e.target||null,l=n(r),c=!1;l.length&&!(c||l.is(".fancybox-skin")||l.is(".fancybox-wrap"));)c=u(l[0]),l=n(l).parent();0===i||c||s.group.length>1&&!t.canShrink&&(a>0||o>0?s.prev(a>0?"down":"left"):(0>a||0>o)&&s.next(0>a?"up":"right"),e.preventDefault())}))},trigger:function(e,t){var i,o=t||s.coming||s.current;if(o){if(n.isFunction(o[e])&&(i=o[e].apply(o,Array.prototype.slice.call(arguments,1))),i===!1)return!1;o.helpers&&n.each(o.helpers,function(t,i){i&&s.helpers[t]&&n.isFunction(s.helpers[t][e])&&s.helpers[t][e](n.extend(!0,{},s.helpers[t].defaults,i),o)}),r.trigger(e)}},isImage:function(e){return h(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(e){return h(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,i,o,a,r,l={};if(e=g(e),t=s.group[e]||null,!t)return!1;if(l=n.extend(!0,{},s.opts,t),a=l.margin,r=l.padding,"number"===n.type(a)&&(l.margin=[a,a,a,a]),"number"===n.type(r)&&(l.padding=[r,r,r,r]),l.modal&&n.extend(!0,l,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),l.autoSize&&(l.autoWidth=l.autoHeight=!0),"auto"===l.width&&(l.autoWidth=!0),"auto"===l.height&&(l.autoHeight=!0),l.group=s.group,l.index=e,s.coming=l,!1===s.trigger("beforeLoad"))return void(s.coming=null);if(o=l.type,i=l.href,!o)return s.coming=null,s.current&&s.router&&"jumpto"!==s.router?(s.current.index=e,s[s.router](s.direction)):!1;if(s.isActive=!0,("image"===o||"swf"===o)&&(l.autoHeight=l.autoWidth=!1,l.scrolling="visible"),"image"===o&&(l.aspectRatio=!0),"iframe"===o&&d&&(l.scrolling="scroll"),l.wrap=n(l.tpl.wrap).addClass("fancybox-"+(d?"mobile":"desktop")+" fancybox-type-"+o+" fancybox-tmp "+l.wrapCSS).appendTo(l.parent||"body"),n.extend(l,{skin:n(".fancybox-skin",l.wrap),outer:n(".fancybox-outer",l.wrap),inner:n(".fancybox-inner",l.wrap)}),n.each(["Top","Right","Bottom","Left"],function(e,t){l.skin.css("padding"+t,m(l.padding[e]))}),s.trigger("onReady"),"inline"===o||"html"===o){if(!l.content||!l.content.length)return s._error("content")}else if(!i)return s._error("href");"image"===o?s._loadImage():"ajax"===o?s._loadAjax():"iframe"===o?s._loadIframe():s._afterLoad()},_error:function(e){n.extend(s.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:s.coming.tpl.error}),s._afterLoad()},_loadImage:function(){var e=s.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,s.coming.width=this.width/s.opts.pixelRatio,s.coming.height=this.height/s.opts.pixelRatio,s._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,s._error("image")},e.src=s.coming.href,e.complete!==!0&&s.showLoading()},_loadAjax:function(){var e=s.coming;s.showLoading(),s.ajaxLoad=n.ajax(n.extend({},e.ajax,{url:e.href,error:function(e,t){s.coming&&"abort"!==t?s._error("ajax",e):s.hideLoading()},success:function(t,n){"success"===n&&(e.content=t,s._afterLoad())}}))},_loadIframe:function(){var e=s.coming,t=n(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",d?"auto":e.iframe.scrolling).attr("src",e.href);n(e.wrap).bind("onReset",function(){try{n(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(s.showLoading(),t.one("load",function(){n(this).data("ready",1),d||n(this).bind("load.fb",s.update),n(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),s._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||s._afterLoad()},_preloadImages:function(){var e,t,n=s.group,i=s.current,o=n.length,a=i.preload?Math.min(i.preload,o-1):0;for(t=1;a>=t;t+=1)e=n[(i.index+t)%o],"image"===e.type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,i,o,a,r,l=s.coming,c=s.current,d="fancybox-placeholder";if(s.hideLoading(),l&&s.isActive!==!1){if(!1===s.trigger("afterLoad",l,c))return l.wrap.stop(!0).trigger("onReset").remove(),void(s.coming=null);switch(c&&(s.trigger("beforeChange",c),c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),s.unbindEvents(),e=l,t=l.content,i=l.type,o=l.scrolling,n.extend(s,{wrap:e.wrap,skin:e.skin,outer:e.outer,inner:e.inner,current:e,previous:c}),a=e.href,i){case"inline":case"ajax":case"html":e.selector?t=n("<div>").html(t).find(e.selector):p(t)&&(t.data(d)||t.data(d,n('<div class="'+d+'"></div>').insertAfter(t).hide()),t=t.show().detach(),e.wrap.bind("onReset",function(){n(this).find(t).length&&t.hide().replaceAll(t.data(d)).data(d,!1)}));break;case"image":t=e.tpl.image.replace("{href}",a);break;case"swf":t='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+a+'"></param>',r="",n.each(e.swf,function(e,n){t+='<param name="'+e+'" value="'+n+'"></param>',r+=" "+e+'="'+n+'"'}),t+='<embed src="'+a+'" type="application/x-shockwave-flash" width="100%" height="100%"'+r+"></embed></object>"}p(t)&&t.parent().is(e.inner)||e.inner.append(t),s.trigger("beforeShow"),e.inner.css("overflow","yes"===o?"scroll":"no"===o?"hidden":o),s._setDimension(),s.reposition(),s.isOpen=!1,s.coming=null,s.bindEvents(),s.isOpened?c.prevMethod&&s.transitions[c.prevMethod]():n(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(),s.transitions[s.isOpened?e.nextMethod:e.openMethod](),s._preloadImages()}},_setDimension:function(){var e,t,i,o,a,r,l,c,d,p,h,u,y,x,v,w=s.getViewport(),b=0,k=!1,C=!1,O=s.wrap,W=s.skin,_=s.inner,S=s.current,T=S.width,L=S.height,E=S.minWidth,R=S.minHeight,j=S.maxWidth,P=S.maxHeight,H=S.scrolling,M=S.scrollOutside?S.scrollbarWidth:0,A=S.margin,I=g(A[1]+A[3]),D=g(A[0]+A[2]);if(O.add(W).add(_).width("auto").height("auto").removeClass("fancybox-tmp"),e=g(W.outerWidth(!0)-W.width()),t=g(W.outerHeight(!0)-W.height()),i=I+e,o=D+t,a=f(T)?(w.w-i)*g(T)/100:T,r=f(L)?(w.h-o)*g(L)/100:L,"iframe"===S.type){if(x=S.content,S.autoHeight&&1===x.data("ready"))try{x[0].contentWindow.document.location&&(_.width(a).height(9999),v=x.contents().find("body"),M&&v.css("overflow-x","hidden"),r=v.outerHeight(!0))}catch(z){}}else(S.autoWidth||S.autoHeight)&&(_.addClass("fancybox-tmp"),S.autoWidth||_.width(a),S.autoHeight||_.height(r),S.autoWidth&&(a=_.width()),S.autoHeight&&(r=_.height()),_.removeClass("fancybox-tmp"));if(T=g(a),L=g(r),d=a/r,E=g(f(E)?g(E,"w")-i:E),j=g(f(j)?g(j,"w")-i:j),R=g(f(R)?g(R,"h")-o:R),P=g(f(P)?g(P,"h")-o:P),l=j,c=P,S.fitToView&&(j=Math.min(w.w-i,j),P=Math.min(w.h-o,P)),u=w.w-I,y=w.h-D,S.aspectRatio?(T>j&&(T=j,L=g(T/d)),L>P&&(L=P,T=g(L*d)),E>T&&(T=E,L=g(T/d)),R>L&&(L=R,T=g(L*d))):(T=Math.max(E,Math.min(T,j)),S.autoHeight&&"iframe"!==S.type&&(_.width(T),L=_.height()),L=Math.max(R,Math.min(L,P))),S.fitToView)if(_.width(T).height(L),O.width(T+e),p=O.width(),h=O.height(),S.aspectRatio)for(;(p>u||h>y)&&T>E&&L>R&&!(b++>19);)L=Math.max(R,Math.min(P,L-10)),T=g(L*d),E>T&&(T=E,L=g(T/d)),T>j&&(T=j,L=g(T/d)),_.width(T).height(L),O.width(T+e),p=O.width(),h=O.height();else T=Math.max(E,Math.min(T,T-(p-u))),L=Math.max(R,Math.min(L,L-(h-y)));M&&"auto"===H&&r>L&&u>T+e+M&&(T+=M),_.width(T).height(L),O.width(T+e),p=O.width(),h=O.height(),k=(p>u||h>y)&&T>E&&L>R,C=S.aspectRatio?l>T&&c>L&&a>T&&r>L:(l>T||c>L)&&(a>T||r>L),n.extend(S,{dim:{width:m(p),height:m(h)},origWidth:a,origHeight:r,canShrink:k,canExpand:C,wPadding:e,hPadding:t,wrapSpace:h-W.outerHeight(!0),skinSpace:W.height()-L}),!x&&S.autoHeight&&L>R&&P>L&&!C&&_.height("auto")},_getPosition:function(e){var t=s.current,n=s.getViewport(),i=t.margin,o=s.wrap.width()+i[1]+i[3],a=s.wrap.height()+i[0]+i[2],r={position:"absolute",top:i[0],left:i[3]};return t.autoCenter&&t.fixed&&!e&&a<=n.h&&o<=n.w?r.position="fixed":t.locked||(r.top+=n.y,r.left+=n.x),r.top=m(Math.max(r.top,r.top+(n.h-a)*t.topRatio)),r.left=m(Math.max(r.left,r.left+(n.w-o)*t.leftRatio)),r},_afterZoomIn:function(){var e=s.current;e&&(s.isOpen=s.isOpened=!0,s.wrap.css("overflow","visible").addClass("fancybox-opened"),s.update(),(e.closeClick||e.nextClick&&s.group.length>1)&&s.inner.css("cursor","pointer").bind("click.fb",function(t){n(t.target).is("a")||n(t.target).parent().is("a")||(t.preventDefault(),s[e.closeClick?"close":"next"]())}),e.closeBtn&&n(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb",function(e){e.preventDefault(),s.close()}),e.arrows&&s.group.length>1&&((e.loop||e.index>0)&&n(e.tpl.prev).appendTo(s.outer).bind("click.fb",s.prev),(e.loop||e.index<s.group.length-1)&&n(e.tpl.next).appendTo(s.outer).bind("click.fb",s.next)),s.trigger("afterShow"),e.loop||e.index!==e.group.length-1?s.opts.autoPlay&&!s.player.isActive&&(s.opts.autoPlay=!1,s.play()):s.play(!1))},_afterZoomOut:function(e){e=e||s.current,n(".fancybox-wrap").trigger("onReset").remove(),n.extend(s,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),s.trigger("afterClose",e)}}),s.transitions={getOrigPosition:function(){var e=s.current,t=e.element,n=e.orig,i={},o=50,a=50,r=e.hPadding,l=e.wPadding,c=s.getViewport();return!n&&e.isDom&&t.is(":visible")&&(n=t.find("img:first"),n.length||(n=t)),p(n)?(i=n.offset(),n.is("img")&&(o=n.outerWidth(),a=n.outerHeight())):(i.top=c.y+(c.h-a)*e.topRatio,i.left=c.x+(c.w-o)*e.leftRatio),("fixed"===s.wrap.css("position")||e.locked)&&(i.top-=c.y,i.left-=c.x),i={top:m(i.top-r*e.topRatio),left:m(i.left-l*e.leftRatio),width:m(o+l),height:m(a+r)}},step:function(e,t){var n,i,o,a=t.prop,r=s.current,l=r.wrapSpace,c=r.skinSpace;("width"===a||"height"===a)&&(n=t.end===t.start?1:(e-t.start)/(t.end-t.start),s.isClosing&&(n=1-n),i="width"===a?r.wPadding:r.hPadding,o=e-i,s.skin[a](g("width"===a?o:o-l*n)),s.inner[a](g("width"===a?o:o-l*n-c*n)))},zoomIn:function(){var e=s.current,t=e.pos,i=e.openEffect,o="elastic"===i,a=n.extend({opacity:1},t);delete a.position,o?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===i&&(t.opacity=.1),s.wrap.css(t).animate(a,{duration:"none"===i?0:e.openSpeed,easing:e.openEasing,step:o?this.step:null,complete:s._afterZoomIn})},zoomOut:function(){var e=s.current,t=e.closeEffect,n="elastic"===t,i={opacity:.1};n&&(i=this.getOrigPosition(),e.closeOpacity&&(i.opacity=.1)),s.wrap.animate(i,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:n?this.step:null,complete:s._afterZoomOut})},changeIn:function(){var e,t=s.current,n=t.nextEffect,i=t.pos,o={opacity:1},a=s.direction,r=200;i.opacity=.1,"elastic"===n&&(e="down"===a||"up"===a?"top":"left","down"===a||"right"===a?(i[e]=m(g(i[e])-r),o[e]="+="+r+"px"):(i[e]=m(g(i[e])+r),o[e]="-="+r+"px")),"none"===n?s._afterZoomIn():s.wrap.css(i).animate(o,{duration:t.nextSpeed,easing:t.nextEasing,complete:s._afterZoomIn})},changeOut:function(){var e=s.previous,t=e.prevEffect,i={opacity:.1},o=s.direction,a=200;"elastic"===t&&(i["down"===o||"up"===o?"top":"left"]=("up"===o||"left"===o?"-":"+")+"="+a+"px"),e.wrap.animate(i,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){n(this).trigger("onReset").remove()}})}},s.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!d,fixed:!0},overlay:null,fixed:!1,el:n("html"),create:function(e){e=n.extend({},this.defaults,e),this.overlay&&this.close(),this.overlay=n('<div class="fancybox-overlay"></div>').appendTo(s.coming?s.coming.parent:e.parent),this.fixed=!1,e.fixed&&s.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=n.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(a.bind("resize.overlay",n.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){return n(e.target).hasClass("fancybox-overlay")?(s.isActive?s.close():t.close(),!1):void 0}),this.overlay.css(e.css).show()},close:function(){var e,t;a.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&(n(".fancybox-margin").removeClass("fancybox-margin"),e=a.scrollTop(),t=a.scrollLeft(),this.el.removeClass("fancybox-lock"),a.scrollTop(e).scrollLeft(t)),n(".fancybox-overlay").remove().hide(),n.extend(this,{overlay:null,fixed:!1})},update:function(){var e,n="100%";this.overlay.width(n).height("100%"),l?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),r.width()>e&&(n=r.width())):r.width()>a.width()&&(n=r.width()),this.overlay.width(n).height(r.height())},onReady:function(e,t){var i=this.overlay;n(".fancybox-overlay").stop(!0,!0),i||this.create(e),e.locked&&this.fixed&&t.fixed&&(i||(this.margin=r.height()>a.height()?n("html").css("margin-right").replace("px",""):!1),t.locked=this.overlay.append(t.wrap),t.fixed=!1),e.showEarly===!0&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){var i,o;t.locked&&(this.margin!==!1&&(n("*").filter(function(){return"fixed"===n(this).css("position")&&!n(this).hasClass("fancybox-overlay")&&!n(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),i=a.scrollTop(),o=a.scrollLeft(),this.el.addClass("fancybox-lock"),a.scrollTop(i).scrollLeft(o)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!s.coming&&this.overlay.fadeOut(e.speedOut,n.proxy(this.close,this))}},s.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t,i,o=s.current,a=o.title,r=e.type;if(n.isFunction(a)&&(a=a.call(o.element,o)),h(a)&&""!==n.trim(a)){switch(t=n('<div class="fancybox-title fancybox-title-'+r+'-wrap">'+a+"</div>"),r){case"inside":i=s.skin;break;case"outside":i=s.wrap;break;case"over":i=s.inner;break;default:i=s.skin,t.appendTo("body"),l&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),s.current.margin[2]+=Math.abs(g(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](i)}}},n.fn.fancybox=function(e){var t,i=n(this),o=this.selector||"",a=function(a){var r,l,c=n(this).blur(),d=t;a.ctrlKey||a.altKey||a.shiftKey||a.metaKey||c.is(".fancybox-wrap")||(r=e.groupAttr||"data-fancybox-group",l=c.attr(r),l||(r="rel",l=c.get(0)[r]),l&&""!==l&&"nofollow"!==l&&(c=o.length?n(o):i,c=c.filter("["+r+'="'+l+'"]'),d=c.index(this)),e.index=d,s.open(c,e)!==!1&&a.preventDefault())};return e=e||{},t=e.index||0,o&&e.live!==!1?r.undelegate(o,"click.fb-start").delegate(o+":not('.fancybox-item, .fancybox-nav')","click.fb-start",a):i.unbind("click.fb-start").bind("click.fb-start",a),this.filter("[data-fancybox-start=1]").trigger("click"),this},r.ready(function(){var t,a;n.scrollbarWidth===i&&(n.scrollbarWidth=function(){var e=n('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),i=t.innerWidth()-t.height(99).innerWidth();return e.remove(),i}),n.support.fixedPosition===i&&(n.support.fixedPosition=function(){var e=n('<div style="position:fixed;top:20px;"></div>').appendTo("body"),t=20===e[0].offsetTop||15===e[0].offsetTop;return e.remove(),t}()),n.extend(s.defaults,{scrollbarWidth:n.scrollbarWidth(),fixed:n.support.fixedPosition,parent:n("body")}),t=n(e).width(),o.addClass("fancybox-lock-test"),a=n(e).width(),o.removeClass("fancybox-lock-test"),n("<style type='text/css'>.fancybox-margin{margin-right:"+(a-t)+"px;}</style>").appendTo("head")})}(window,document,jQuery);

/*
 * jQuery FlexSlider v2.6.3
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */!function($){var e=!0;$.flexslider=function(t,a){var n=$(t);n.vars=$.extend({},$.flexslider.defaults,a);var i=n.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,r=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&n.vars.touch,o="click touchend MSPointerUp keyup",l="",c,d="vertical"===n.vars.direction,u=n.vars.reverse,v=n.vars.itemWidth>0,p="fade"===n.vars.animation,m=""!==n.vars.asNavFor,f={};$.data(t,"flexslider",n),f={init:function(){n.animating=!1,n.currentSlide=parseInt(n.vars.startAt?n.vars.startAt:0,10),isNaN(n.currentSlide)&&(n.currentSlide=0),n.animatingTo=n.currentSlide,n.atEnd=0===n.currentSlide||n.currentSlide===n.last,n.containerSelector=n.vars.selector.substr(0,n.vars.selector.search(" ")),n.slides=$(n.vars.selector,n),n.container=$(n.containerSelector,n),n.count=n.slides.length,n.syncExists=$(n.vars.sync).length>0,"slide"===n.vars.animation&&(n.vars.animation="swing"),n.prop=d?"top":"marginLeft",n.args={},n.manualPause=!1,n.stopped=!1,n.started=!1,n.startTimeout=null,n.transitions=!n.vars.video&&!p&&n.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var a in t)if(void 0!==e.style[t[a]])return n.pfx=t[a].replace("Perspective","").toLowerCase(),n.prop="-"+n.pfx+"-transform",!0;return!1}(),n.ensureAnimationEnd="",""!==n.vars.controlsContainer&&(n.controlsContainer=$(n.vars.controlsContainer).length>0&&$(n.vars.controlsContainer)),""!==n.vars.manualControls&&(n.manualControls=$(n.vars.manualControls).length>0&&$(n.vars.manualControls)),""!==n.vars.customDirectionNav&&(n.customDirectionNav=2===$(n.vars.customDirectionNav).length&&$(n.vars.customDirectionNav)),n.vars.randomize&&(n.slides.sort(function(){return Math.round(Math.random())-.5}),n.container.empty().append(n.slides)),n.doMath(),n.setup("init"),n.vars.controlNav&&f.controlNav.setup(),n.vars.directionNav&&f.directionNav.setup(),n.vars.keyboard&&(1===$(n.containerSelector).length||n.vars.multipleKeyboard)&&$(document).bind("keyup",function(e){var t=e.keyCode;if(!n.animating&&(39===t||37===t)){var a=39===t?n.getTarget("next"):37===t?n.getTarget("prev"):!1;n.flexAnimate(a,n.vars.pauseOnAction)}}),n.vars.mousewheel&&n.bind("mousewheel",function(e,t,a,i){e.preventDefault();var s=0>t?n.getTarget("next"):n.getTarget("prev");n.flexAnimate(s,n.vars.pauseOnAction)}),n.vars.pausePlay&&f.pausePlay.setup(),n.vars.slideshow&&n.vars.pauseInvisible&&f.pauseInvisible.init(),n.vars.slideshow&&(n.vars.pauseOnHover&&n.hover(function(){n.manualPlay||n.manualPause||n.pause()},function(){n.manualPause||n.manualPlay||n.stopped||n.play()}),n.vars.pauseInvisible&&f.pauseInvisible.isHidden()||(n.vars.initDelay>0?n.startTimeout=setTimeout(n.play,n.vars.initDelay):n.play())),m&&f.asNav.setup(),r&&n.vars.touch&&f.touch(),(!p||p&&n.vars.smoothHeight)&&$(window).bind("resize orientationchange focus",f.resize),n.find("img").attr("draggable","false"),setTimeout(function(){n.vars.start(n)},200)},asNav:{setup:function(){n.asNav=!0,n.animatingTo=Math.floor(n.currentSlide/n.move),n.currentItem=n.currentSlide,n.slides.removeClass(i+"active-slide").eq(n.currentItem).addClass(i+"active-slide"),s?(t._slider=n,n.slides.each(function(){var e=this;e._gesture=new MSGesture,e._gesture.target=e,e.addEventListener("MSPointerDown",function(e){e.preventDefault(),e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1),e.addEventListener("MSGestureTap",function(e){e.preventDefault();var t=$(this),a=t.index();$(n.vars.asNavFor).data("flexslider").animating||t.hasClass("active")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})})):n.slides.on(o,function(e){e.preventDefault();var t=$(this),a=t.index(),s=t.offset().left-$(n).scrollLeft();0>=s&&t.hasClass(i+"active-slide")?n.flexAnimate(n.getTarget("prev"),!0):$(n.vars.asNavFor).data("flexslider").animating||t.hasClass(i+"active-slide")||(n.direction=n.currentItem<a?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction,!1,!0,!0))})}},controlNav:{setup:function(){n.manualControls?f.controlNav.setupManual():f.controlNav.setupPaging()},setupPaging:function(){var e="thumbnails"===n.vars.controlNav?"control-thumbs":"control-paging",t=1,a,s;if(n.controlNavScaffold=$('<ol class="'+i+"control-nav "+i+e+'"></ol>'),n.pagingCount>1)for(var r=0;r<n.pagingCount;r++){s=n.slides.eq(r),void 0===s.attr("data-thumb-alt")&&s.attr("data-thumb-alt","");var c=""!==s.attr("data-thumb-alt")?c=' alt="'+s.attr("data-thumb-alt")+'"':"";if(a="thumbnails"===n.vars.controlNav?'<img src="'+s.attr("data-thumb")+'"'+c+"/>":'<a href="#">'+t+"</a>","thumbnails"===n.vars.controlNav&&!0===n.vars.thumbCaptions){var d=s.attr("data-thumbcaption");""!==d&&void 0!==d&&(a+='<span class="'+i+'caption">'+d+"</span>")}n.controlNavScaffold.append("<li>"+a+"</li>"),t++}n.controlsContainer?$(n.controlsContainer).append(n.controlNavScaffold):n.append(n.controlNavScaffold),f.controlNav.set(),f.controlNav.active(),n.controlNavScaffold.delegate("a, img",o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(n.direction=a>n.currentSlide?"next":"prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},setupManual:function(){n.controlNav=n.manualControls,f.controlNav.active(),n.controlNav.bind(o,function(e){if(e.preventDefault(),""===l||l===e.type){var t=$(this),a=n.controlNav.index(t);t.hasClass(i+"active")||(a>n.currentSlide?n.direction="next":n.direction="prev",n.flexAnimate(a,n.vars.pauseOnAction))}""===l&&(l=e.type),f.setToClearWatchedEvent()})},set:function(){var e="thumbnails"===n.vars.controlNav?"img":"a";n.controlNav=$("."+i+"control-nav li "+e,n.controlsContainer?n.controlsContainer:n)},active:function(){n.controlNav.removeClass(i+"active").eq(n.animatingTo).addClass(i+"active")},update:function(e,t){n.pagingCount>1&&"add"===e?n.controlNavScaffold.append($('<li><a href="#">'+n.count+"</a></li>")):1===n.pagingCount?n.controlNavScaffold.find("li").remove():n.controlNav.eq(t).closest("li").remove(),f.controlNav.set(),n.pagingCount>1&&n.pagingCount!==n.controlNav.length?n.update(t,e):f.controlNav.active()}},directionNav:{setup:function(){var e=$('<ul class="'+i+'direction-nav"><li class="'+i+'nav-prev"><a class="'+i+'prev" href="#">'+n.vars.prevText+'</a></li><li class="'+i+'nav-next"><a class="'+i+'next" href="#">'+n.vars.nextText+"</a></li></ul>");n.customDirectionNav?n.directionNav=n.customDirectionNav:n.controlsContainer?($(n.controlsContainer).append(e),n.directionNav=$("."+i+"direction-nav li a",n.controlsContainer)):(n.append(e),n.directionNav=$("."+i+"direction-nav li a",n)),f.directionNav.update(),n.directionNav.bind(o,function(e){e.preventDefault();var t;""!==l&&l!==e.type||(t=$(this).hasClass(i+"next")?n.getTarget("next"):n.getTarget("prev"),n.flexAnimate(t,n.vars.pauseOnAction)),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";1===n.pagingCount?n.directionNav.addClass(e).attr("tabindex","-1"):n.vars.animationLoop?n.directionNav.removeClass(e).removeAttr("tabindex"):0===n.animatingTo?n.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):n.animatingTo===n.last?n.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):n.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var e=$('<div class="'+i+'pauseplay"><a href="#"></a></div>');n.controlsContainer?(n.controlsContainer.append(e),n.pausePlay=$("."+i+"pauseplay a",n.controlsContainer)):(n.append(e),n.pausePlay=$("."+i+"pauseplay a",n)),f.pausePlay.update(n.vars.slideshow?i+"pause":i+"play"),n.pausePlay.bind(o,function(e){e.preventDefault(),""!==l&&l!==e.type||($(this).hasClass(i+"pause")?(n.manualPause=!0,n.manualPlay=!1,n.pause()):(n.manualPause=!1,n.manualPlay=!0,n.play())),""===l&&(l=e.type),f.setToClearWatchedEvent()})},update:function(e){"play"===e?n.pausePlay.removeClass(i+"pause").addClass(i+"play").html(n.vars.playText):n.pausePlay.removeClass(i+"play").addClass(i+"pause").html(n.vars.pauseText)}},touch:function(){function e(e){e.stopPropagation(),n.animating?e.preventDefault():(n.pause(),t._gesture.addPointer(e.pointerId),T=0,c=d?n.h:n.w,f=Number(new Date),l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c)}function a(e){e.stopPropagation();var a=e.target._slider;if(a){var n=-e.translationX,i=-e.translationY;return T+=d?i:n,m=T,y=d?Math.abs(T)<Math.abs(-n):Math.abs(T)<Math.abs(-i),e.detail===e.MSGESTURE_FLAG_INERTIA?void setImmediate(function(){t._gesture.stop()}):void((!y||Number(new Date)-f>500)&&(e.preventDefault(),!p&&a.transitions&&(a.vars.animationLoop||(m=T/(0===a.currentSlide&&0>T||a.currentSlide===a.last&&T>0?Math.abs(T)/c+2:1)),a.setProps(l+m,"setTouch"))))}}function i(e){e.stopPropagation();var t=e.target._slider;if(t){if(t.animatingTo===t.currentSlide&&!y&&null!==m){var a=u?-m:m,n=a>0?t.getTarget("next"):t.getTarget("prev");t.canAdvance(n)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?t.flexAnimate(n,t.vars.pauseOnAction):p||t.flexAnimate(t.currentSlide,t.vars.pauseOnAction,!0)}r=null,o=null,m=null,l=null,T=0}}var r,o,l,c,m,f,g,h,S,y=!1,x=0,b=0,T=0;s?(t.style.msTouchAction="none",t._gesture=new MSGesture,t._gesture.target=t,t.addEventListener("MSPointerDown",e,!1),t._slider=n,t.addEventListener("MSGestureChange",a,!1),t.addEventListener("MSGestureEnd",i,!1)):(g=function(e){n.animating?e.preventDefault():(window.navigator.msPointerEnabled||1===e.touches.length)&&(n.pause(),c=d?n.h:n.w,f=Number(new Date),x=e.touches[0].pageX,b=e.touches[0].pageY,l=v&&u&&n.animatingTo===n.last?0:v&&u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:v&&n.currentSlide===n.last?n.limit:v?(n.itemW+n.vars.itemMargin)*n.move*n.currentSlide:u?(n.last-n.currentSlide+n.cloneOffset)*c:(n.currentSlide+n.cloneOffset)*c,r=d?b:x,o=d?x:b,t.addEventListener("touchmove",h,!1),t.addEventListener("touchend",S,!1))},h=function(e){x=e.touches[0].pageX,b=e.touches[0].pageY,m=d?r-b:r-x,y=d?Math.abs(m)<Math.abs(x-o):Math.abs(m)<Math.abs(b-o);var t=500;(!y||Number(new Date)-f>t)&&(e.preventDefault(),!p&&n.transitions&&(n.vars.animationLoop||(m/=0===n.currentSlide&&0>m||n.currentSlide===n.last&&m>0?Math.abs(m)/c+2:1),n.setProps(l+m,"setTouch")))},S=function(e){if(t.removeEventListener("touchmove",h,!1),n.animatingTo===n.currentSlide&&!y&&null!==m){var a=u?-m:m,i=a>0?n.getTarget("next"):n.getTarget("prev");n.canAdvance(i)&&(Number(new Date)-f<550&&Math.abs(a)>50||Math.abs(a)>c/2)?n.flexAnimate(i,n.vars.pauseOnAction):p||n.flexAnimate(n.currentSlide,n.vars.pauseOnAction,!0)}t.removeEventListener("touchend",S,!1),r=null,o=null,m=null,l=null},t.addEventListener("touchstart",g,!1))},resize:function(){!n.animating&&n.is(":visible")&&(v||n.doMath(),p?f.smoothHeight():v?(n.slides.width(n.computedW),n.update(n.pagingCount),n.setProps()):d?(n.viewport.height(n.h),n.setProps(n.h,"setTotal")):(n.vars.smoothHeight&&f.smoothHeight(),n.newSlides.width(n.computedW),n.setProps(n.computedW,"setTotal")))},smoothHeight:function(e){if(!d||p){var t=p?n:n.viewport;e?t.animate({height:n.slides.eq(n.animatingTo).innerHeight()},e):t.innerHeight(n.slides.eq(n.animatingTo).innerHeight())}},sync:function(e){var t=$(n.vars.sync).data("flexslider"),a=n.animatingTo;switch(e){case"animate":t.flexAnimate(a,n.vars.pauseOnAction,!1,!0);break;case"play":t.playing||t.asNav||t.play();break;case"pause":t.pause()}},uniqueID:function(e){return e.filter("[id]").add(e.find("[id]")).each(function(){var e=$(this);e.attr("id",e.attr("id")+"_clone")}),e},pauseInvisible:{visProp:null,init:function(){var e=f.pauseInvisible.getHiddenProp();if(e){var t=e.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(t,function(){f.pauseInvisible.isHidden()?n.startTimeout?clearTimeout(n.startTimeout):n.pause():n.started?n.play():n.vars.initDelay>0?setTimeout(n.play,n.vars.initDelay):n.play()})}},isHidden:function(){var e=f.pauseInvisible.getHiddenProp();return e?document[e]:!1},getHiddenProp:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}},setToClearWatchedEvent:function(){clearTimeout(c),c=setTimeout(function(){l=""},3e3)}},n.flexAnimate=function(e,t,a,s,o){if(n.vars.animationLoop||e===n.currentSlide||(n.direction=e>n.currentSlide?"next":"prev"),m&&1===n.pagingCount&&(n.direction=n.currentItem<e?"next":"prev"),!n.animating&&(n.canAdvance(e,o)||a)&&n.is(":visible")){if(m&&s){var l=$(n.vars.asNavFor).data("flexslider");if(n.atEnd=0===e||e===n.count-1,l.flexAnimate(e,!0,!1,!0,o),n.direction=n.currentItem<e?"next":"prev",l.direction=n.direction,Math.ceil((e+1)/n.visible)-1===n.currentSlide||0===e)return n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),!1;n.currentItem=e,n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),e=Math.floor(e/n.visible)}if(n.animating=!0,n.animatingTo=e,t&&n.pause(),n.vars.before(n),n.syncExists&&!o&&f.sync("animate"),n.vars.controlNav&&f.controlNav.active(),v||n.slides.removeClass(i+"active-slide").eq(e).addClass(i+"active-slide"),n.atEnd=0===e||e===n.last,n.vars.directionNav&&f.directionNav.update(),e===n.last&&(n.vars.end(n),n.vars.animationLoop||n.pause()),p)r?(n.slides.eq(n.currentSlide).css({opacity:0,zIndex:1}),n.slides.eq(e).css({opacity:1,zIndex:2}),n.wrapup(c)):(n.slides.eq(n.currentSlide).css({zIndex:1}).animate({opacity:0},n.vars.animationSpeed,n.vars.easing),n.slides.eq(e).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing,n.wrapup));else{var c=d?n.slides.filter(":first").height():n.computedW,g,h,S;v?(g=n.vars.itemMargin,S=(n.itemW+g)*n.move*n.animatingTo,h=S>n.limit&&1!==n.visible?n.limit:S):h=0===n.currentSlide&&e===n.count-1&&n.vars.animationLoop&&"next"!==n.direction?u?(n.count+n.cloneOffset)*c:0:n.currentSlide===n.last&&0===e&&n.vars.animationLoop&&"prev"!==n.direction?u?0:(n.count+1)*c:u?(n.count-1-e+n.cloneOffset)*c:(e+n.cloneOffset)*c,n.setProps(h,"",n.vars.animationSpeed),n.transitions?(n.vars.animationLoop&&n.atEnd||(n.animating=!1,n.currentSlide=n.animatingTo),n.container.unbind("webkitTransitionEnd transitionend"),n.container.bind("webkitTransitionEnd transitionend",function(){clearTimeout(n.ensureAnimationEnd),n.wrapup(c)}),clearTimeout(n.ensureAnimationEnd),n.ensureAnimationEnd=setTimeout(function(){n.wrapup(c)},n.vars.animationSpeed+100)):n.container.animate(n.args,n.vars.animationSpeed,n.vars.easing,function(){n.wrapup(c)})}n.vars.smoothHeight&&f.smoothHeight(n.vars.animationSpeed)}},n.wrapup=function(e){p||v||(0===n.currentSlide&&n.animatingTo===n.last&&n.vars.animationLoop?n.setProps(e,"jumpEnd"):n.currentSlide===n.last&&0===n.animatingTo&&n.vars.animationLoop&&n.setProps(e,"jumpStart")),n.animating=!1,n.currentSlide=n.animatingTo,n.vars.after(n)},n.animateSlides=function(){!n.animating&&e&&n.flexAnimate(n.getTarget("next"))},n.pause=function(){clearInterval(n.animatedSlides),n.animatedSlides=null,n.playing=!1,n.vars.pausePlay&&f.pausePlay.update("play"),n.syncExists&&f.sync("pause")},n.play=function(){n.playing&&clearInterval(n.animatedSlides),n.animatedSlides=n.animatedSlides||setInterval(n.animateSlides,n.vars.slideshowSpeed),n.started=n.playing=!0,n.vars.pausePlay&&f.pausePlay.update("pause"),n.syncExists&&f.sync("play")},n.stop=function(){n.pause(),n.stopped=!0},n.canAdvance=function(e,t){var a=m?n.pagingCount-1:n.last;return t?!0:m&&n.currentItem===n.count-1&&0===e&&"prev"===n.direction?!0:m&&0===n.currentItem&&e===n.pagingCount-1&&"next"!==n.direction?!1:e!==n.currentSlide||m?n.vars.animationLoop?!0:n.atEnd&&0===n.currentSlide&&e===a&&"next"!==n.direction?!1:!n.atEnd||n.currentSlide!==a||0!==e||"next"!==n.direction:!1},n.getTarget=function(e){return n.direction=e,"next"===e?n.currentSlide===n.last?0:n.currentSlide+1:0===n.currentSlide?n.last:n.currentSlide-1},n.setProps=function(e,t,a){var i=function(){var a=e?e:(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo,i=function(){if(v)return"setTouch"===t?e:u&&n.animatingTo===n.last?0:u?n.limit-(n.itemW+n.vars.itemMargin)*n.move*n.animatingTo:n.animatingTo===n.last?n.limit:a;switch(t){case"setTotal":return u?(n.count-1-n.currentSlide+n.cloneOffset)*e:(n.currentSlide+n.cloneOffset)*e;case"setTouch":return u?e:e;case"jumpEnd":return u?e:n.count*e;case"jumpStart":return u?n.count*e:e;default:return e}}();return-1*i+"px"}();n.transitions&&(i=d?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)",a=void 0!==a?a/1e3+"s":"0s",n.container.css("-"+n.pfx+"-transition-duration",a),n.container.css("transition-duration",a)),n.args[n.prop]=i,(n.transitions||void 0===a)&&n.container.css(n.args),n.container.css("transform",i)},n.setup=function(e){if(p)n.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"}),"init"===e&&(r?n.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+n.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(n.currentSlide).css({opacity:1,zIndex:2}):0==n.vars.fadeFirstSlide?n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).css({opacity:1}):n.slides.css({opacity:0,display:"block",zIndex:1}).eq(n.currentSlide).css({zIndex:2}).animate({opacity:1},n.vars.animationSpeed,n.vars.easing)),n.vars.smoothHeight&&f.smoothHeight();else{var t,a;"init"===e&&(n.viewport=$('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(n).append(n.container),n.cloneCount=0,n.cloneOffset=0,u&&(a=$.makeArray(n.slides).reverse(),n.slides=$(a),n.container.empty().append(n.slides))),n.vars.animationLoop&&!v&&(n.cloneCount=2,n.cloneOffset=1,"init"!==e&&n.container.find(".clone").remove(),n.container.append(f.uniqueID(n.slides.first().clone().addClass("clone")).attr("aria-hidden","true")).prepend(f.uniqueID(n.slides.last().clone().addClass("clone")).attr("aria-hidden","true"))),n.newSlides=$(n.vars.selector,n),t=u?n.count-1-n.currentSlide+n.cloneOffset:n.currentSlide+n.cloneOffset,d&&!v?(n.container.height(200*(n.count+n.cloneCount)+"%").css("position","absolute").width("100%"),setTimeout(function(){n.newSlides.css({display:"block"}),n.doMath(),n.viewport.height(n.h),n.setProps(t*n.h,"init")},"init"===e?100:0)):(n.container.width(200*(n.count+n.cloneCount)+"%"),n.setProps(t*n.computedW,"init"),setTimeout(function(){n.doMath(),n.newSlides.css({width:n.computedW,marginRight:n.computedM,"float":"left",display:"block"}),n.vars.smoothHeight&&f.smoothHeight()},"init"===e?100:0))}v||n.slides.removeClass(i+"active-slide").eq(n.currentSlide).addClass(i+"active-slide"),n.vars.init(n)},n.doMath=function(){var e=n.slides.first(),t=n.vars.itemMargin,a=n.vars.minItems,i=n.vars.maxItems;n.w=void 0===n.viewport?n.width():n.viewport.width(),n.h=e.height(),n.boxPadding=e.outerWidth()-e.width(),v?(n.itemT=n.vars.itemWidth+t,n.itemM=t,n.minW=a?a*n.itemT:n.w,n.maxW=i?i*n.itemT-t:n.w,n.itemW=n.minW>n.w?(n.w-t*(a-1))/a:n.maxW<n.w?(n.w-t*(i-1))/i:n.vars.itemWidth>n.w?n.w:n.vars.itemWidth,n.visible=Math.floor(n.w/n.itemW),n.move=n.vars.move>0&&n.vars.move<n.visible?n.vars.move:n.visible,n.pagingCount=Math.ceil((n.count-n.visible)/n.move+1),n.last=n.pagingCount-1,n.limit=1===n.pagingCount?0:n.vars.itemWidth>n.w?n.itemW*(n.count-1)+t*(n.count-1):(n.itemW+t)*n.count-n.w-t):(n.itemW=n.w,n.itemM=t,n.pagingCount=n.count,n.last=n.count-1),n.computedW=n.itemW-n.boxPadding,n.computedM=n.itemM},n.update=function(e,t){n.doMath(),v||(e<n.currentSlide?n.currentSlide+=1:e<=n.currentSlide&&0!==e&&(n.currentSlide-=1),n.animatingTo=n.currentSlide),n.vars.controlNav&&!n.manualControls&&("add"===t&&!v||n.pagingCount>n.controlNav.length?f.controlNav.update("add"):("remove"===t&&!v||n.pagingCount<n.controlNav.length)&&(v&&n.currentSlide>n.last&&(n.currentSlide-=1,n.animatingTo-=1),f.controlNav.update("remove",n.last))),n.vars.directionNav&&f.directionNav.update()},n.addSlide=function(e,t){var a=$(e);n.count+=1,n.last=n.count-1,d&&u?void 0!==t?n.slides.eq(n.count-t).after(a):n.container.prepend(a):void 0!==t?n.slides.eq(t).before(a):n.container.append(a),n.update(t,"add"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.added(n)},n.removeSlide=function(e){var t=isNaN(e)?n.slides.index($(e)):e;n.count-=1,n.last=n.count-1,isNaN(e)?$(e,n.slides).remove():d&&u?n.slides.eq(n.last).remove():n.slides.eq(e).remove(),n.doMath(),n.update(t,"remove"),n.slides=$(n.vars.selector+":not(.clone)",n),n.setup(),n.vars.removed(n)},f.init()},$(window).blur(function(t){e=!1}).focus(function(t){e=!0}),$.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,fadeFirstSlide:!0,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",customDirectionNav:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}},$.fn.flexslider=function(e){if(void 0===e&&(e={}),"object"==typeof e)return this.each(function(){var t=$(this),a=e.selector?e.selector:".slides > li",n=t.find(a);1===n.length&&e.allowOneSlide===!1||0===n.length?(n.fadeIn(400),e.start&&e.start(t)):void 0===t.data("flexslider")&&new $.flexslider(this,e)});var t=$(this).data("flexslider");switch(e){case"play":t.play();break;case"pause":t.pause();break;case"stop":t.stop();break;case"next":t.flexAnimate(t.getTarget("next"),!0);break;case"prev":case"previous":t.flexAnimate(t.getTarget("prev"),!0);break;default:"number"==typeof e&&t.flexAnimate(e,!0)}}}(jQuery);


// Sticky Sidebar
!function(e){e.fn.stickySidebar=function(o){var t=e.extend({headerSelector:"header",navSelector:"nav",contentSelector:"#content",footerSelector:"footer",sidebarTopMargin:20,footerThreshold:100},o),r=function(){var o=e(this),r=e(window).height(),i=(e(window).width(),e(document).height()),n=e(t.headerSelector).outerHeight(),s=e(t.navSelector).outerHeight(),c=o.outerHeight(),h=e(t.contentSelector).outerHeight(),a=e(t.footerSelector).outerHeight(),d=e(window).scrollTop(),l=n+s,f=i-(c+a+t.footerThreshold);if(h>c&&r>c)if(l>d)o.removeClass("sticky");else if(d>=l&&f>d)o.addClass("sticky").css("top",t.sidebarTopMargin);else{var u=f-d;o.addClass("sticky").css("top",u)}};return this.each(function(){e(window).on("scroll",e.proxy(r,this)),e(window).on("resize",e.proxy(r,this)),e.proxy(r,this)()})}}(jQuery);


// Shifter
// !function(e,t){"use strict";function i(i){n||(r=e.extend(r,i||{}),o.$body=e("body"),o.$shifts=e(".shifter-header, .shifter-page"),o.$nav=e(".shifter-navigation"),o.$shifts.length>0&&o.$nav.length>0&&(n=!0,o.$body.addClass("shifter").on("touchstart.shifter click.shifter",".shifter-handle",a),void 0!==t.matchMedia&&(o.mediaQuery=t.matchMedia("(max-width:"+(r.maxWidth===1/0?"100000px":r.maxWidth)+")"),o.mediaQuery.addListener(s),s())))}function s(){o.mediaQuery.matches?f.enable():f.disable()}function a(e){e.preventDefault(),e.stopPropagation(),o.$body.hasClass("shifter-open")?f.close():f.open()}var n=!1,o={},r={maxWidth:"740px"},f={close:function(){n&&(o.$body.removeClass("shifter-open"),o.$shifts.off(".shifter"),o.$nav.find("input").trigger("blur"))},enable:function(){n&&o.$body.addClass("shifter-active")},defaults:function(t){r=e.extend(r,t||{})},destroy:function(){n&&(o.$body.removeClass("shifter shifter-active shifter-open").off("touchstart.shifter click.shifter"),void 0!==t.matchMedia&&o.mediaQuery.removeListener(s),o={})},disable:function(){n&&o.$body.removeClass("shifter-active")},open:function(){n&&(o.$body.addClass("shifter-open"),o.$shifts.one("touchstart.shifter click.shifter",a))}};e.shifter=function(e){return f[e]?f[e].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof e&&e?this:i.apply(this,arguments)}}(jQuery,window);

// Zoom
/*!
	Zoom 1.7.15
	license: MIT
	http://www.jacklmoore.com/zoom
*/
(function($){var defaults={url:false,callback:false,target:false,duration:120,on:"mouseover",touch:true,onZoomIn:false,onZoomOut:false,magnify:1};$.zoom=function(target,source,img,magnify){var targetHeight,targetWidth,sourceHeight,sourceWidth,xRatio,yRatio,offset,$target=$(target),position=$target.css("position"),$source=$(source);$target.css("position",/(absolute|fixed)/.test(position)?position:"relative");$target.css("overflow","hidden");img.style.width=img.style.height="";$(img).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:img.width*magnify,height:img.height*magnify,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(target);return{init:function(){targetWidth=$target.outerWidth();targetHeight=$target.outerHeight();if(source===$target[0]){sourceWidth=targetWidth;sourceHeight=targetHeight}else{sourceWidth=$source.outerWidth();sourceHeight=$source.outerHeight()}xRatio=(img.width-targetWidth)/sourceWidth;yRatio=(img.height-targetHeight)/sourceHeight;offset=$source.offset()},move:function(e){var left=e.pageX-offset.left,top=e.pageY-offset.top;top=Math.max(Math.min(top,sourceHeight),0);left=Math.max(Math.min(left,sourceWidth),0);img.style.left=left*-xRatio+"px";img.style.top=top*-yRatio+"px"}}};$.fn.zoom=function(options){return this.each(function(){var settings=$.extend({},defaults,options||{}),target=settings.target||this,source=this,$source=$(source),$target=$(target),img=document.createElement("img"),$img=$(img),mousemove="mousemove.zoom",clicked=false,touched=false,$urlElement;if(!settings.url){$urlElement=$source.find("img");if($urlElement[0]){settings.url=$urlElement.data("src")||$urlElement.attr("src")}if(!settings.url){return}}(function(){var position=$target.css("position");var overflow=$target.css("overflow");$source.one("zoom.destroy",function(){$source.off(".zoom");$target.css("position",position);$target.css("overflow",overflow);$img.remove()})})();img.onload=function(){var zoom=$.zoom(target,source,img,settings.magnify);function start(e){zoom.init();zoom.move(e);$img.stop().fadeTo($.support.opacity?settings.duration:0,1,$.isFunction(settings.onZoomIn)?settings.onZoomIn.call(img):false)}function stop(){$img.stop().fadeTo(settings.duration,0,$.isFunction(settings.onZoomOut)?settings.onZoomOut.call(img):false)}if(settings.on==="grab"){$source.on("mousedown.zoom",function(e){if(e.which===1){$(document).one("mouseup.zoom",function(){stop();$(document).off(mousemove,zoom.move)});start(e);$(document).on(mousemove,zoom.move);e.preventDefault()}})}else if(settings.on==="click"){$source.on("click.zoom",function(e){if(clicked){return}else{clicked=true;start(e);$(document).on(mousemove,zoom.move);$(document).one("click.zoom",function(){stop();clicked=false;$(document).off(mousemove,zoom.move)});return false}})}else if(settings.on==="toggle"){$source.on("click.zoom",function(e){if(clicked){stop()}else{start(e)}clicked=!clicked})}else if(settings.on==="mouseover"){zoom.init();$source.on("mouseenter.zoom",start).on("mouseleave.zoom",stop).on(mousemove,zoom.move)}if(settings.touch){$source.on("touchstart.zoom",function(e){e.preventDefault();if(touched){touched=false;stop()}else{touched=true;start(e.originalEvent.touches[0]||e.originalEvent.changedTouches[0])}}).on("touchmove.zoom",function(e){e.preventDefault();zoom.move(e.originalEvent.touches[0]||e.originalEvent.changedTouches[0])}).on("touchend.zoom",function(e){e.preventDefault();if(touched){touched=false;stop()}})}if($.isFunction(settings.callback)){settings.callback.call(img)}};img.src=settings.url})};$.fn.zoom.defaults=defaults})(window.jQuery);




// lodash.core.min.js

/**
 * @license
 * lodash 4.5.1 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash core -o ./dist/lodash.core.js`
 */
;(function(){function n(n,t){for(var r=-1,e=t.length,u=n.length;++r<e;)n[u+r]=t[r];return n}function t(n,t,r){for(var e=-1,u=n.length;++e<u;){var o=n[e],i=t(o);if(null!=i&&(c===an?i===i:r(i,c)))var c=i,f=o}return f}function r(n,t,r){var e;return r(n,function(n,r,u){return t(n,r,u)?(e=n,false):void 0}),e}function e(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function u(n,t){return O(t,function(t){return n[t]})}function o(n){return n&&n.Object===Object?n:null}function i(n){return vn[n];
}function c(n){var t=false;if(null!=n&&typeof n.toString!="function")try{t=!!(n+"")}catch(r){}return t}function f(n,t){return n=typeof n=="number"||hn.test(n)?+n:-1,n>-1&&0==n%1&&(null==t?9007199254740991:t)>n}function a(n){if(Y(n)&&!Pn(n)){if(n instanceof l)return n;if(En.call(n,"__wrapped__")){var t=new l(n.__wrapped__,n.__chain__);return t.__actions__=N(n.__actions__),t}}return new l(n)}function l(n,t){this.__wrapped__=n,this.__actions__=[],this.__chain__=!!t}function p(n,t,r,e){var u;return(u=n===an)||(u=xn[r],
u=(n===u||n!==n&&u!==u)&&!En.call(e,r)),u?t:n}function s(n){return X(n)?Fn(n):{}}function h(n,t,r){if(typeof n!="function")throw new TypeError("Expected a function");return setTimeout(function(){n.apply(an,r)},t)}function v(n,t){var r=true;return $n(n,function(n,e,u){return r=!!t(n,e,u)}),r}function y(n,t){var r=[];return $n(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function _(t,r,e,u){u||(u=[]);for(var o=-1,i=t.length;++o<i;){var c=t[o];r>0&&Y(c)&&L(c)&&(e||Pn(c)||K(c))?r>1?_(c,r-1,e,u):n(u,c):e||(u[u.length]=c);
}return u}function g(n,t){return n&&qn(n,t,en)}function b(n,t){return y(t,function(t){return Q(n[t])})}function j(n,t,r,e,u){return n===t?true:null==n||null==t||!X(n)&&!Y(t)?n!==n&&t!==t:m(n,t,j,r,e,u)}function m(n,t,r,e,u,o){var i=Pn(n),f=Pn(t),a="[object Array]",l="[object Array]";i||(a=kn.call(n),"[object Arguments]"==a&&(a="[object Object]")),f||(l=kn.call(t),"[object Arguments]"==l&&(l="[object Object]"));var p="[object Object]"==a&&!c(n),f="[object Object]"==l&&!c(t);return!(l=a==l)||i||p?2&u||(a=p&&En.call(n,"__wrapped__"),
f=f&&En.call(t,"__wrapped__"),!a&&!f)?l?(o||(o=[]),(a=J(o,function(t){return t[0]===n}))&&a[1]?a[1]==t:(o.push([n,t]),t=(i?I:q)(n,t,r,e,u,o),o.pop(),t)):false:r(a?n.value():n,f?t.value():t,e,u,o):$(n,t,a)}function d(n){var t=typeof n;return"function"==t?n:null==n?cn:("object"==t?x:A)(n)}function w(n){n=null==n?n:Object(n);var t,r=[];for(t in n)r.push(t);return r}function O(n,t){var r=-1,e=L(n)?Array(n.length):[];return $n(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function x(n){var t=en(n);return function(r){
  var e=t.length;if(null==r)return!e;for(r=Object(r);e--;){var u=t[e];if(!(u in r&&j(n[u],r[u],an,3)))return false}return true}}function E(n,t){return n=Object(n),P(t,function(t,r){return r in n&&(t[r]=n[r]),t},{})}function A(n){return function(t){return null==t?an:t[n]}}function k(n,t,r){var e=-1,u=n.length;for(0>t&&(t=-t>u?0:u+t),r=r>u?u:r,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,r=Array(u);++e<u;)r[e]=n[e+t];return r}function N(n){return k(n,0,n.length)}function S(n,t){var r;return $n(n,function(n,e,u){return r=t(n,e,u),
    !r}),!!r}function T(t,r){return P(r,function(t,r){return r.func.apply(r.thisArg,n([t],r.args))},t)}function F(n,t,r,e){r||(r={});for(var u=-1,o=t.length;++u<o;){var i=t[u],c=e?e(r[i],n[i],i,r,n):n[i],f=r,a=f[i];En.call(f,i)&&(a===c||a!==a&&c!==c)&&(c!==an||i in f)||(f[i]=c)}return r}function R(n){return V(function(t,r){var e=-1,u=r.length,o=u>1?r[u-1]:an,o=typeof o=="function"?(u--,o):an;for(t=Object(t);++e<u;){var i=r[e];i&&n(t,i,e,o)}return t})}function B(n){return function(){var t=arguments,r=s(n.prototype),t=n.apply(r,t);
return X(t)?t:r}}function D(n,t,r){function e(){for(var o=-1,i=arguments.length,c=-1,f=r.length,a=Array(f+i),l=this&&this!==wn&&this instanceof e?u:n;++c<f;)a[c]=r[c];for(;i--;)a[c++]=arguments[++o];return l.apply(t,a)}if(typeof n!="function")throw new TypeError("Expected a function");var u=B(n);return e}function I(n,t,r,e,u,o){var i=-1,c=1&u,f=n.length,a=t.length;if(f!=a&&!(2&u&&a>f))return false;for(a=true;++i<f;){var l=n[i],p=t[i];if(void 0!==an){a=false;break}if(c){if(!S(t,function(n){return l===n||r(l,n,e,u,o);
})){a=false;break}}else if(l!==p&&!r(l,p,e,u,o)){a=false;break}}return a}function $(n,t,r){switch(r){case"[object Boolean]":case"[object Date]":return+n==+t;case"[object Error]":return n.name==t.name&&n.message==t.message;case"[object Number]":return n!=+n?t!=+t:n==+t;case"[object RegExp]":case"[object String]":return n==t+""}return false}function q(n,t,r,e,u,o){var i=2&u,c=en(n),f=c.length,a=en(t).length;if(f!=a&&!i)return false;for(var l=f;l--;){var p=c[l];if(!(i?p in t:En.call(t,p)))return false}for(a=true;++l<f;){
  var p=c[l],s=n[p],h=t[p];if(void 0!==an||s!==h&&!r(s,h,e,u,o)){a=false;break}i||(i="constructor"==p)}return a&&!i&&(r=n.constructor,e=t.constructor,r!=e&&"constructor"in n&&"constructor"in t&&!(typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)&&(a=false)),a}function z(n){var t=n?n.length:an;if(W(t)&&(Pn(n)||nn(n)||K(n))){n=String;for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);t=e}else t=null;return t}function C(n){var t=n&&n.constructor,t=Q(t)&&t.prototype||xn;return n===t}function G(n){
    return n?n[0]:an}function J(n,t){return r(n,d(t),$n)}function M(n,t){return $n(n,typeof t=="function"?t:cn)}function P(n,t,r){return e(n,d(t),r,3>arguments.length,$n)}function U(n,t){var r;if(typeof t!="function")throw new TypeError("Expected a function");return n=Un(n),function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=an),r}}function V(n){var t;if(typeof n!="function")throw new TypeError("Expected a function");return t=In(t===an?n.length-1:Un(t),0),function(){for(var r=arguments,e=-1,u=In(r.length-t,0),o=Array(u);++e<u;)o[e]=r[t+e];
for(u=Array(t+1),e=-1;++e<t;)u[e]=r[e];return u[t]=o,n.apply(this,u)}}function H(n,t){return n>t}function K(n){return Y(n)&&L(n)&&En.call(n,"callee")&&(!Rn.call(n,"callee")||"[object Arguments]"==kn.call(n))}function L(n){return null!=n&&!(typeof n=="function"&&Q(n))&&W(zn(n))}function Q(n){return n=X(n)?kn.call(n):"","[object Function]"==n||"[object GeneratorFunction]"==n}function W(n){return typeof n=="number"&&n>-1&&0==n%1&&9007199254740991>=n}function X(n){var t=typeof n;return!!n&&("object"==t||"function"==t);
}function Y(n){return!!n&&typeof n=="object"}function Z(n){return typeof n=="number"||Y(n)&&"[object Number]"==kn.call(n)}function nn(n){return typeof n=="string"||!Pn(n)&&Y(n)&&"[object String]"==kn.call(n)}function tn(n,t){return t>n}function rn(n){return typeof n=="string"?n:null==n?"":n+""}function en(n){var t=C(n);if(!t&&!L(n))return Dn(Object(n));var r,e=z(n),u=!!e,e=e||[],o=e.length;for(r in n)!En.call(n,r)||u&&("length"==r||f(r,o))||t&&"constructor"==r||e.push(r);return e}function un(n){for(var t=-1,r=C(n),e=w(n),u=e.length,o=z(n),i=!!o,o=o||[],c=o.length;++t<u;){
  var a=e[t];i&&("length"==a||f(a,c))||"constructor"==a&&(r||!En.call(n,a))||o.push(a)}return o}function on(n){return n?u(n,en(n)):[]}function cn(n){return n}function fn(t,r,e){var u=en(r),o=b(r,u);null!=e||X(r)&&(o.length||!u.length)||(e=r,r=t,t=this,o=b(r,en(r)));var i=X(e)&&"chain"in e?e.chain:true,c=Q(t);return $n(o,function(e){var u=r[e];t[e]=u,c&&(t.prototype[e]=function(){var r=this.__chain__;if(i||r){var e=t(this.__wrapped__);return(e.__actions__=N(this.__actions__)).push({func:u,args:arguments,
thisArg:t}),e.__chain__=r,e}return u.apply(t,n([this.value()],arguments))})}),t}var an,ln=1/0,pn=/[&<>"'`]/g,sn=RegExp(pn.source),hn=/^(?:0|[1-9]\d*)$/,vn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},yn={"function":true,object:true},_n=yn[typeof exports]&&exports&&!exports.nodeType?exports:an,gn=yn[typeof module]&&module&&!module.nodeType?module:an,bn=gn&&gn.exports===_n?_n:an,jn=o(yn[typeof self]&&self),mn=o(yn[typeof window]&&window),dn=o(yn[typeof this]&&this),wn=o(_n&&gn&&typeof global=="object"&&global)||mn!==(dn&&dn.window)&&mn||jn||dn||Function("return this")(),On=Array.prototype,xn=Object.prototype,En=xn.hasOwnProperty,An=0,kn=xn.toString,Nn=wn._,Sn=wn.Reflect,Tn=Sn?Sn.f:an,Fn=Object.create,Rn=xn.propertyIsEnumerable,Bn=wn.isFinite,Dn=Object.keys,In=Math.max,$n=function(n,t){
    return function(r,e){if(null==r)return r;if(!L(r))return n(r,e);for(var u=r.length,o=t?u:-1,i=Object(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}(g),qn=function(n){return function(t,r,e){var u=-1,o=Object(t);e=e(t);for(var i=e.length;i--;){var c=e[n?i:++u];if(false===r(o[c],c,o))break}return t}}();Tn&&!Rn.call({valueOf:1},"valueOf")&&(w=function(n){n=Tn(n);for(var t,r=[];!(t=n.next()).done;)r.push(t.value);return r});var zn=A("length"),Cn=V(function(t,r){return Pn(t)||(t=null==t?[]:[Object(t)]),_(r,1),
    n(N(t),on)}),Gn=V(function(n,t,r){return D(n,t,r)}),Jn=V(function(n,t){return h(n,1,t)}),Mn=V(function(n,t,r){return h(n,Vn(t)||0,r)}),Pn=Array.isArray,Un=Number,Vn=Number,Hn=R(function(n,t){F(t,en(t),n)}),Kn=R(function(n,t){F(t,un(t),n)}),Ln=R(function(n,t,r,e){F(t,un(t),n,e)}),Qn=V(function(n){return n.push(an,p),Ln.apply(an,n)}),Wn=V(function(n,t){return null==n?{}:E(n,_(t,1))}),Xn=d;l.prototype=s(a.prototype),l.prototype.constructor=l,a.assignIn=Kn,a.before=U,a.bind=Gn,a.chain=function(n){return n=a(n),
    n.__chain__=true,n},a.compact=function(n){return y(n,Boolean)},a.concat=Cn,a.create=function(n,t){var r=s(n);return t?Hn(r,t):r},a.defaults=Qn,a.defer=Jn,a.delay=Mn,a.filter=function(n,t){return y(n,d(t))},a.flatten=function(n){return n&&n.length?_(n,1):[]},a.flattenDeep=function(n){return n&&n.length?_(n,ln):[]},a.iteratee=Xn,a.keys=en,a.map=function(n,t){return O(n,d(t))},a.matches=function(n){return x(Hn({},n))},a.mixin=fn,a.negate=function(n){if(typeof n!="function")throw new TypeError("Expected a function");
return function(){return!n.apply(this,arguments)}},a.once=function(n){return U(2,n)},a.pick=Wn,a.slice=function(n,t,r){var e=n?n.length:0;return r=r===an?e:+r,e?k(n,null==t?0:+t,r):[]},a.sortBy=function(n,t){var r=0;return t=d(t),O(O(n,function(n,e,u){return{c:n,b:r++,a:t(n,e,u)}}).sort(function(n,t){var r;n:{r=n.a;var e=t.a;if(r!==e){var u=null===r,o=r===an,i=r===r,c=null===e,f=e===an,a=e===e;if(r>e&&!c||!i||u&&!f&&a||o&&a){r=1;break n}if(e>r&&!u||!a||c&&!o&&i||f&&i){r=-1;break n}}r=0}return r||n.b-t.b;
}),A("c"))},a.tap=function(n,t){return t(n),n},a.thru=function(n,t){return t(n)},a.toArray=function(n){return L(n)?n.length?N(n):[]:on(n)},a.values=on,a.extend=Kn,fn(a,a),a.clone=function(n){return X(n)?Pn(n)?N(n):F(n,en(n)):n},a.escape=function(n){return(n=rn(n))&&sn.test(n)?n.replace(pn,i):n},a.every=function(n,t,r){return t=r?an:t,v(n,d(t))},a.find=J,a.forEach=M,a.has=function(n,t){return null!=n&&En.call(n,t)},a.head=G,a.identity=cn,a.indexOf=function(n,t,r){var e=n?n.length:0;r=typeof r=="number"?0>r?In(e+r,0):r:0,
    r=(r||0)-1;for(var u=t===t;++r<e;){var o=n[r];if(u?o===t:o!==o)return r}return-1},a.isArguments=K,a.isArray=Pn,a.isBoolean=function(n){return true===n||false===n||Y(n)&&"[object Boolean]"==kn.call(n)},a.isDate=function(n){return Y(n)&&"[object Date]"==kn.call(n)},a.isEmpty=function(n){if(L(n)&&(Pn(n)||nn(n)||Q(n.splice)||K(n)))return!n.length;for(var t in n)if(En.call(n,t))return false;return true},a.isEqual=function(n,t){return j(n,t)},a.isFinite=function(n){return typeof n=="number"&&Bn(n)},a.isFunction=Q,a.isNaN=function(n){
    return Z(n)&&n!=+n},a.isNull=function(n){return null===n},a.isNumber=Z,a.isObject=X,a.isRegExp=function(n){return X(n)&&"[object RegExp]"==kn.call(n)},a.isString=nn,a.isUndefined=function(n){return n===an},a.last=function(n){var t=n?n.length:0;return t?n[t-1]:an},a.max=function(n){return n&&n.length?t(n,cn,H):an},a.min=function(n){return n&&n.length?t(n,cn,tn):an},a.noConflict=function(){return wn._===this&&(wn._=Nn),this},a.noop=function(){},a.reduce=P,a.result=function(n,t,r){return t=null==n?an:n[t],
    t===an&&(t=r),Q(t)?t.call(n):t},a.size=function(n){return null==n?0:(n=L(n)?n:en(n),n.length)},a.some=function(n,t,r){return t=r?an:t,S(n,d(t))},a.uniqueId=function(n){var t=++An;return rn(n)+t},a.each=M,a.first=G,fn(a,function(){var n={};return g(a,function(t,r){En.call(a.prototype,r)||(n[r]=t)}),n}(),{chain:false}),a.VERSION="4.5.1",$n("pop join replace reverse split push shift sort splice unshift".split(" "),function(n){var t=(/^(?:replace|split)$/.test(n)?String.prototype:On)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:pop|join|replace|shift)$/.test(n);
a.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),a.prototype.toJSON=a.prototype.valueOf=a.prototype.value=function(){return T(this.__wrapped__,this.__actions__)},(mn||jn||{})._=a,typeof define=="function"&&typeof define.amd=="object"&&define.amd? define(function(){return a}):_n&&gn?(bn&&((gn.exports=a)._=a),_n._=a):wn._=a}).call(this);


window.theme = window.theme || {};

theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
    .on('shopify:section:load', this._onSectionLoad.bind(this))
    .on('shopify:section:unload', this._onSectionUnload.bind(this))
    .on('shopify:section:select', this._onSelect.bind(this))
    .on('shopify:section:deselect', this._onDeselect.bind(this))
    .on('shopify:block:select', this._onBlockSelect.bind(this))
    .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.originalEvent.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.originalEvent.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

/* SV 21.Sep.19 */
(function($) {
  $.fn.shuffle = function() {

    var allElems = this.get(),
        getRandom = function(max) {
          return Math.floor(Math.random() * max);
        },
        shuffled = $.map(allElems, function(){
          var random = getRandom(allElems.length),
              randEl = $(allElems[random]).clone(true)[0];
          allElems.splice(random, 1);
          return randEl;
        });

    this.each(function(i){
      $(this).replaceWith($(shuffled[i]));
    });

    return $(shuffled);
  };
})(jQuery);

$(document).ready(function() {
  (function() {

    /* Ensure that sub nav menus open to the left if any chance of offscreen overflow */
    $("ul.submenu li").on('mouseenter mouseleave', function (e) {
        if ($('ul', this).length) {
            var elm = $('ul:first', this);
            var off = elm.offset();
            var l = off.left;
            var w = elm.width();
            var docH = $("#PageContainer").height();
            var docW = $("#PageContainer").width();

            var isEntirelyVisible = (l + w <= docW);

            if (!isEntirelyVisible) {
                $(this).addClass('edge');
            } else {
                $(this).removeClass('edge');
            }
        }
    });

    $(".has_sub_menu").hover(function(){
      $(this).attr('aria-expanded', function(index, attr){
        return attr == 'false' ? true : 'false';
      });
    });

    $(document).on('shopify:section:load', function(event) {
      jQuery(window).trigger('resize').trigger('scroll');

      var Heightcalculate = $('header').height();
      // Responsive edits
      if( $(window).width() > 980){
        //caches a jQuery object containing the header element
        var header = $(".scrollheader");
        $(window).scroll(function() {
          var scroll = $(window).scrollTop();

          if (scroll >= 1 ) {
            //header.removeClass('scrollheader').addClass("coverheader");
            $('#phantom').show();
            $('#phantom').css('height', Heightcalculate+'px');
          } else {
            // header.removeClass("coverheader").addClass('scrollheader');
            $('#phantom').hide();
          }
        });
      }
      $('.no-fouc').removeClass('no-fouc');
      $('.load-wait').addClass('hide');

      /* Ensure that sub nav menus open to the left if any chance of offscreen overflow */
      $("ul.submenu li").on('mouseenter mouseleave', function (e) {
          if ($('ul', this).length) {
              var elm = $('ul:first', this);
              var off = elm.offset();
              var l = off.left;
              var w = elm.width();
              var docH = $("#PageContainer").height();
              var docW = $("#PageContainer").width();

              var isEntirelyVisible = (l + w <= docW);

              if (!isEntirelyVisible) {
                  $(this).addClass('edge');
              } else {
                  $(this).removeClass('edge');
              }
          }
      });

    });

    
    
    $('.collection-carousel').slick({
      dots: false,
      arrows: true,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: '<div class="arrow-angle left-arrow"> <img src="https://cdn.shopify.com/s/files/1/3012/3948/files/right-arrow-angle.svg?v=1611347028" /> </div>',
      nextArrow:'<div class="arrow-angle right-arrow"> <img src="https://cdn.shopify.com/s/files/1/3012/3948/files/right-arrow-angle.svg?v=1611347028" /> </div>',
      touchThreshold: 15,
      speed: 300,
      responsive:[
        {
          breakpoint: 1000,
          settings:{
            slidesToShow: 3,
            slidesToScroll: 1,
            dots:false,
            arrows: false,
            touchThreshold: 15,
            speed: 300
          }
        },        
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots:false,
            arrows: false,
            touchThreshold: 15,
            speed: 300
          }
        }      
      ]
    });

    $('.collection-row-carousel').slick({
      dots: false,
      arrows: true,
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      prevArrow: '<div class="arrow-angle left-arrow"> <img src="https://cdn.shopify.com/s/files/1/3012/3948/files/right-arrow-angle.svg?v=1611347028" /> </div>',
      nextArrow:'<div class="arrow-angle right-arrow"> <img src="https://cdn.shopify.com/s/files/1/3012/3948/files/right-arrow-angle.svg?v=1611347028" /> </div>',
      touchThreshold: 15,
      speed: 300,
      responsive:[
        {
          breakpoint: 1000,
          settings:{
            slidesToShow: 3,
            slidesToScroll: 1,
            dots:false,
            arrows: false,
            touchThreshold: 15,
            speed: 300
          }
        },        
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots:false,
            arrows: false,
            touchThreshold: 15,
            speed: 300
          }
        }      
      ]
    }) 

  }());
});


theme.Currency = (function() {
  var moneyFormat = '$'; // eslint-disable-line camelcase

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = precision || 2;
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

     return formatString.replace(placeholderRegex, value) ;
  }

  return {
    formatMoney: formatMoney
  }
})();


/* ================ Sections ================ */


theme.Product = (function() {
  function Product(container) {
    var $container = this.$container = $(container);


    selectCallback = function(variant, selector) {
        var $product = $('#product-' + selector.product.id),
            $productForm = $('#AddToCartForm', $product);
        if (variant && variant.featured_image) {
        // Update variant image, if one is set
          var original_image = $("#product-main-image img"), new_image = variant.featured_image;
          Shopify.Image.switchImage(new_image, original_image[0], function (new_image_src, original_image, element) {
            $(element).attr('src', new_image_src);
            $('.thumbnail[data-image-id="' + variant.featured_image.id + '"]').trigger('click');
          });
        }
      
        // BEGIN SWATCHES
        if (variant) {
          var form = jQuery('#' + selector.domIdPrefix).closest('form');
          for (var i=0,length=variant.options.length; i<length; i++) {
            var radioButton = form.find('.swatch[data-option-index="' + i + '"] :radio[value="' + variant.options[i] +'"]');
            if (radioButton.size()) {
              radioButton.get(0).checked = true;
            }
          }
        }
        // END SWATCHES
      
        if (variant) {
            $('.variant-sku').text(variant.sku);
            $(".stickybar .item-title .variant").text(variant.title);
        }
        else {
            $('.variant-sku').empty();
        }
        if (variant && variant.available == true) {
            if(variant.compare_at_price > variant.price){
                $('.was', $product).html(Shopify.formatMoney(variant.compare_at_price, $productForm.data('money-format')))
            } else {
                $('.was', $product).text('')
            }
            $('.product-price', $product).html(Shopify.formatMoney(variant.price, $productForm.data('money-format')));
          /* SV 29.01 */
          if (_product.tags.indexOf('Pre-order') !== -1) {
            $('.add', $product).removeClass('disabled').removeAttr('disabled').val('Pre-Order');
          }
          else {
            $('.add', $product).removeClass('disabled').removeAttr('disabled').val("Add to Cart");
          }
        } else {
            var message = variant ? "Sold Out" : "Sold Out";
            $('.was', $product).text('')
            $('.product-price', $product).text(message);
            $('.add', $product).addClass('disabled').attr('disabled', 'disabled').val(message);
        }
        
    };

    if ($('#AddToCartForm ').hasClass('with_variants')) {
      var prodId = $('.product-page').data("product-id"),
          productSingleObject = JSON.parse(document.getElementById('ProductJson-' + prodId).innerHTML);

      $('#AddToCartForm').each(function() {
        new Shopify.OptionSelectors('product-select-' + prodId, { product: productSingleObject, onVariantSelected:
        selectCallback, enableHistoryState: true });
      });

      $(document).on('shopify:section:unload', '.product-page', function(event){
        delete Shopify.OptionSelectors();
      });
    }


// Product images edit to work with new theme editor
    var initProdpage = function(Imagezoom) {
      if (_productSettings.zoom) {
        $('#product-main-image').zoom();
      }
      $('.clicker-thumb').click(function() {
        var newImage = $(this).attr('href');
        $( '#product-main-image img' ).attr({ src: newImage });
        return false;
      });
    };

    initProdpage($('#product-main-image'));

    $(document).on('shopify:section:unload', function(event) {
      var target = $(event.target);
      if (_productSettings.zoom) {
        target.find('#product-main-image').zoom('destroy');
      }
      $(document).off('#product-main-image');
    });

    $(document).on('shopify:section:load', function(event) {
      initProdpage($(event.target).find('#product-main-image'));
    });


   /* var initThumbSlider = function(prodSlideshow) {
      // BXslider for product vertical thumb carousel
      $('.thumbnail-slider').bxSlider({
        mode: 'vertical',
        minSlides: 4,
        slideMargin: 10,
        infiniteLoop: false,
        pager: false,
        prevText: "",
        nextText: "",
        hideControlOnEnd: true
      });
    };


    initThumbSlider($('.thumbnail-slider'));
    $(document).on('shopify:section:unload', function(event) {
      var target = $(event.target);
      target.find('.thumbnail-slider').bxSlider("destroy");
      $(document).off('.thumbnail-slider');
    });

    $(document).on('shopify:section:load', function(event) {
      initThumbSlider($(event.target).find('.thumbnail-slider'));
    });

  if($(window).width() > 740){
    $('#product-main-image').zoom();
  };*/

  }
  Product.prototype = _.assignIn({}, Product.prototype, {});

  return Product;
})();



$(document).ready(function(){
  jQuery(window).trigger('resize').trigger('scroll');

  $('.no-fouc').removeClass('no-fouc');
  $('.load-wait').addClass('hide');

  var Heightcalculate = $('header').height();

  // Responsive edits
  if( $(window).width() > 980){
    //caches a jQuery object containing the header element
    var header = $(".scrollheader");
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 1 ) {
        //header.removeClass('scrollheader').addClass("coverheader");
        $('#phantom').show();
        $('#phantom').css('height', Heightcalculate+'px');
      } else {
        //header.removeClass("coverheader").addClass('scrollheader');
        $('#phantom').hide();
      }
    });
  }

//   $.shifter({
//     maxWidth: Infinity
//   });

  // Help old browsers with placeholders for inputs
  $('input, textarea').placeholder();

  /*
  $(".collection-carousel").owlCarousel({
    center: true,
    itemsCustom : [
      [0, 2],
      [450, 2],
      [600, 2],
      [700, 3],
      [1000, 3],
      [1200, 4],
      [1400, 4],
      [1600, 5]
    ],
    lazyLoad : true,
    navigation : true,
    navigationText: ["",""],
    pagination: true
  });

  // Custom Navigation Events
  $(".next").click(function(){
    owl.trigger('owl.next');
  })
  $(".prev").click(function(){
    owl.trigger('owl.prev');
  })
  */

  // Call Fancybox globally on all elemnets with class "fancybox"
  $(".fancybox").fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  // Call Fancybox for product modal + stop scroll to top
  $('.product-modal').fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });

  // Call Fancybox for search & mailing list signup + stop scroll to top
  $(".open_popup").fancybox({
    helpers: {
      overlay: {
        locked: false
      }
    }
  });


  // Scroll to top button
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollup').fadeIn();
    } else {
      $('.scrollup').fadeOut();
    }
  });

  $('.scrollup').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });

  // Sidebar Toggle for screens below 980px wide
  var $Sidebar = $("#sidebar");
  $(document).on("click.toggleNav touch.toggleNav", ".show", function(){
    $Sidebar.toggleClass("open");
  });

  jQuery(function() {
    jQuery('ul#main-nav li a').each(function() {
      if (jQuery(this).attr('href')  ===  window.location.pathname) {
        jQuery(this).addClass('current');
      }
    });
  });

  if ( $(this).width() < 740 ) {
    $('ul#blog-articles').insertBefore('#blog-sidebar');
  }

  $('.clicker-thumb').click(function() {
    var newImage = $(this).attr('href');
    $( '#product-main-image img' ).attr({ src: newImage });
    return false;
  });

});



theme.Slideshow = (function() {
  function Slideshow(container) {

    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var speed = $('.flexslider').data('speed');


    $('.flexslider').flexslider({
      animation: 'fade',
      slideshowSpeed: speed,
      animationSpeed: 600,
      directionNav: true,
      controlNav: false,
      pauseOnHover: true,
      pauseOnAction: true,
        prevText: "",
        nextText: ""
    });

  }

  return Slideshow;
})();

theme.Slideshow.prototype = _.assignIn({}, theme.Slideshow.prototype, {

  onBlockSelect: function(event) {

    // Ignore the cloned version
    var Slider = $(event.target).closest('.flexslider').data('flexslider');
    var $slide =  $(event.target);
    var slideIndex = $slide.data('flexslider-index');
    // Go to selected slide, pause autoplay

    console.log(slideIndex);

    Slider.flexslider(slideIndex);
    Slider.flexslider("pause");

  },
  onBlockDeselect: function() {
    var Slider = $(event.target).closest('.flexslider').data('flexslider');
    // Resume autoplay
    Slider.flexslider("play");

  }
});

theme.Instagram = (function() {
  function Instagram(container) {

    var $container = this.$container = $(container);
    var id = $container.attr('data-section-id');
    var instafeedEl = this.instagram = $('#instafeed-' + id);
    var instafeedId = this.instagram = 'instafeed-' + id;
    var template = $("#instagram-template").html();

    var userFeed = new Instafeed({
      get: 'user',
      limit: 6,
      userId: 'self',
      target: instafeedId,
      accessToken: instafeedEl.attr('data-access-token'),
      resolution: 'standard_resolution',
      template: template
    });

    if( !_.isUndefined( userFeed.options.accessToken) ){
      userFeed.run();
    }
  }

  Instagram.prototype = _.assignIn({}, Instagram.prototype, {});

  return Instagram;
})();


theme.Parallax = (function() {
  function Parallax(container) {

    var $container = this.$container = $(container);

    // Parallax scrolling backgrounds  edit to work with new theme editor
    var initParallaximage = function(ParallaxImages) {
      $('.parallax-window').parallax();
    };

    initParallaximage($('.parallax-window'));

    $(document).on('shopify:section:unload', function(event) {
      var target = $(event.target);
      target.find('.parallax-window').parallax('destroy');
      $(document).off('.parallax-window');
    });

    $(document).on('shopify:section:load', function(event) {
      initParallaximage($(event.target).find('.parallax-window'));
    });

  }
  Parallax.prototype = _.assignIn({}, Parallax.prototype, {});

  return Parallax;
})();




theme.mobileNav = (function() {
  function mobileNav(container) {

  $('#accordion').find('.accordion-toggle').click(function(){
    //Expand or collapse this panel
    $(this).next().slideToggle('fast');
    $(this).toggleClass('open');

    $(this).attr('aria-expanded', function(index, attr){
        return attr == 'false' ? true : 'false';
    });

    //Hide the other panels
    $(".accordion-content").not($(this).next()).slideUp('fast');
  });

  $('#accordion').find('.accordion-toggle2').click(function(){
    //Expand or collapse this panel
    $(this).toggleClass('open');
    $(this).next().slideToggle('fast');
    $(this).attr('aria-expanded', function(index, attr){
        return attr == 'false' ? true : 'false';
    });
    //Hide the other panels
    $(".accordion-content2").not($(this).next()).slideUp('fast');
  });

  }
  mobileNav.prototype = _.assignIn({}, mobileNav.prototype, {});

  return mobileNav;
})();

theme.mobileNav.prototype = _.assignIn({}, theme.mobileNav.prototype, {

  onSelect: function() {
    //$( ".shifter-handle" ).trigger( "click" );
  },

  onDeselect: function() {
    //$.shifter("close");
  }

});



theme.Collection = (function() {
  function Collection(container) {

  $('ul.sidebar-accordion').find('li.extend').click(function(){
    //Expand or collapse this panel
    $(this).next().slideToggle('fast');
    //Hide the other panels
    $("ul.extended-submenu").not($(this).next()).slideUp('fast');
  });

  }
  Collection.prototype = _.assignIn({}, Collection.prototype, {});

  return Collection;
})();



$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('instagram', theme.Instagram);
  sections.register('slideshow-section', theme.Slideshow);
  sections.register('product-section', theme.Product);
  sections.register('parallax-section', theme.Parallax);
  sections.register('mobile-navigation', theme.mobileNav);
  sections.register('collection-section', theme.Collection);
});
