'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function (window) {
    var template = '\n      <style>\n              :host {\n                  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n              }\n              a {\n                  text-decoration: none;\n              }\n          #nav-fixed {\n              position: fixed;\n              z-index: 99;\n              top: 0px;\n              width: 100%;\n              left: 0px;\n              overflow-x: hidden;\n              overflow-y: scroll;\n          }\n\n          :host([opened]) #nav-fixed {\n              height: 100%;\n          }\n\n          .nav {\n              background-color: #1a1a1a;\n              position: relative;\n              height: 50px;\n          }\n\n          .nav-logo {\n              background-image: url(\'http://ssl.cdn.turner.com/cnn/2016/images/01/28/logo_cnn_badge_2up.png\');\n              background-position: 2px 0px;\n              background-repeat: no-repeat;\n              background-size: 50px;\n              background-color: #c00;\n              height: 50px;\n              width: 55px;\n              display: block;\n          }\n\n          .nav-button {\n              cursor: pointer;\n              display: inline-block;\n              height: 50px;\n              position: absolute;\n              right: 0;\n              top: 0;\n              transition: color .2s;\n              width: 50px;\n          }\n          .nav-button__hamburger {\n              left: 50%;\n              margin: -1.5px 0 0 -10px;\n              position: absolute;\n              top: 50%;\n              transition: background .3s, color .2s;\n          }\n\n          .nav-button__hamburger,\n          .nav-button__hamburger:before,\n          .nav-button__hamburger:after {\n              background: #a6a6a6;\n              height: 2px;\n              width: 20px;\n          }\n\n          .nav-button__hamburger:before,\n          .nav-button__hamburger:after {\n              content: \'\';\n              transform-origin: center center;\n              transition: transform .3s, background .3s;\n          }\n\n          .nav-button__hamburger:before {\n              left: 0;\n              position: absolute;\n              top: -6px;\n          }\n\n          .nav-button__hamburger:after {\n              bottom: -6px;\n              left: 0;\n              position: absolute;\n          }\n\n          .nav-button:hover .nav-button__hamburger, .nav-button:hover .nav-button__hamburger:before, .nav-button:hover .nav-button__hamburger:after {\n              background: #fff;\n          }\n\n          :host([opened]) .nav-button__hamburger {\n              background: transparent;\n          }\n\n          :host([opened]) .nav-button__hamburger:before, :host([opened]) .nav-button__hamburger:after{\n              background: #c00;\n          }\n\n          :host([opened]) .nav-button__hamburger:before{\n              transform: translate(0, 6px) rotate(-45deg);\n          }\n\n          :host([opened]) .nav-button__hamburger:after{\n              transform: translate(0, -6px) rotate(45deg);\n          }\n\n          :host([opened]) .nav-button:hover .nav-button__hamburger {\n              background: transparent;\n          }\n\n          :host([opened]) .nav-button:hover .nav-button__hamburger:before, :host([opened]) .nav-button:hover .nav-button__hamburger:after{\n              background: #c00;\n          }\n\n          .nav__live-tv {\n              border: 1px solid #bfbfbf;\n              color: #bfbfbf;\n              display: none;\n              font-size: .9em;\n              font-weight: 300;\n              letter-spacing: .05em;\n              line-height: 23px;\n              padding: 0 10px;\n              position: absolute;\n              right: 50px;\n              top: 13px;\n              transition: color .2s, border-color .2s;\n          }\n\n          .nav__live-tv:hover {\n              border-color: #fff;\n          }\n\n          .nav .nav__live-tv:hover {\n              color: #fff;\n          }\n\n          .nav__live-tv.show {\n              display: inline;\n          }\n\n          .nav__live-tv-icon {\n              background: #c00;\n              border-radius: 10px;\n              display: inline-block;\n              height: 7px;\n              margin: 0 0 2px 5px;\n              vertical-align: middle;\n              width: 7px;\n          }\n\n          .nav-menu {\n              background-color: #262626;\n              color: #fff;\n              font-size: 18px;\n              line-height: 21px;\n              padding: 15px 10px 1px 10px;\n              display: none;\n            }\n\n          :host([opened]) .nav-menu {\n              display: block;\n              overflow: auto;\n              height: calc(100% - 50px);\n            }\n\n            .nav-menu a{\n              color: #fff;\n              }\n\n            .nav-menu a:hover{\n              color: $gray-4;\n              }\n\n        .nav-menu ul{\n          margin: 0px;\n          padding: 0px;\n          list-style: none;\n          }\n\n          .nav-menu ul li{\n            margin: 0px;\n            padding: 0 0 14px 0;\n            }\n      </style>\n      <div id="nav-fixed">\n          <nav class="nav">\n              <div id="nav-button" class="nav-button">\n                <div class="nav-button__hamburger"></div>\n              </div>\n               <a href="/" id="logo" class="nav-logo"></a>\n               <a href="" data-header="live" class="nav__live-tv show" id="nav-mobileTV"></a>\n          </nav>\n\n          <nav class="nav-menu state-initial" id="nav-main">\n          </nav>\n      </div>\n      ';

    var NavHeader = function (_HTMLElement) {
        _inherits(NavHeader, _HTMLElement);

        function NavHeader() {
            _classCallCheck(this, NavHeader);

            var _this = _possibleConstructorReturn(this, (NavHeader.__proto__ || Object.getPrototypeOf(NavHeader)).call(this));

            _this.attachShadow({ mode: 'open' });
            return _this;
        }

        // Fires when an instance of the element is created.


        _createClass(NavHeader, [{
            key: 'connectedCallback',
            value: function connectedCallback() {
                this.shadowRoot.innerHTML = template;

                //Get elements from the shadow root
                this.$menu = this.shadowRoot.querySelector('#nav-main');
                this.$menuBtn = this.shadowRoot.querySelector('#nav-button');
                this.$watchLiveBtn = this.shadowRoot.querySelector('#nav-mobileTV');

                this._CNN = window.CNN || { 'edition': 'domestic' };

                this._initMenu(JSON.parse(this.getAttribute('nav-data')));
                this._initWatchLive(JSON.parse(this.getAttribute('watch-live-config')));
            }

            // Monitor attributes for changes.

        }, {
            key: '_initMenu',
            value: function _initMenu(navData) {
                var navList = '';
                for (var i = 0; i < navData.length; i++) {
                    navList += navData[i].image ? '<li><a href="' + navData[i].url + '"><img src="https:' + navData[i].image + '" class="nav-menu__img-' + navData[i].imageId + '" style="width: ' + navData[i].imageWidth + ';"></a></li>' : '<li><a href="' + navData[i].url + '">' + navData[i].label + '</a></li>';
                }
                this.$menu.innerHTML = '<ul>' + navList + '</ul>';

                this.$menuBtn.addEventListener('click', function () {
                    this.toggle();
                }.bind(this));
            }
        }, {
            key: '_initWatchLive',
            value: function _initWatchLive(config) {
                var re = new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'),
                    matches = document.cookie.match(re),
                    userCountry = matches ? matches.pop() : null;
                if (!userCountry && this._CNN.edition === 'domestic' || config.validCountries.indexOf(userCountry) !== -1) {
                    this.$watchLiveBtn.innerHTML = config.copy + ' <i class="nav__live-tv-icon"></i>';
                    this.$watchLiveBtn.setAttribute('href', config.link);
                    this.$watchLiveBtn.classList.add('show');
                }
            }
        }, {
            key: 'toggle',
            value: function toggle() {
                var opened = this.hasAttribute('opened') ? true : false;

                if (opened) {
                    this.removeAttribute('opened');
                } else {
                    this.setAttribute('opened', '');
                }
            }
        }], [{
            key: 'observedAttributes',
            get: function get() {
                return ['opened'];
            }
        }]);

        return NavHeader;
    }(HTMLElement);

    window.customElements.define('nav-header', NavHeader);
})(window);