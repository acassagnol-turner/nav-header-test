'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _CustomElement() {
    return Reflect.construct(HTMLElement, [], this.__proto__.constructor);
}

;
Object.setPrototypeOf(_CustomElement.prototype, HTMLElement.prototype);
Object.setPrototypeOf(_CustomElement, HTMLElement);
(function (window) {

    var doc = (document._currentScript || document.currentScript).ownerDocument,
        template = doc.querySelector('#nav-header-template');

    customElements.define('nav-header', function (_CustomElement2) {
        _inherits(NavHeader, _CustomElement2);

        function NavHeader() {
            _classCallCheck(this, NavHeader);

            return _possibleConstructorReturn(this, (NavHeader.__proto__ || Object.getPrototypeOf(NavHeader)).call(this));
        }

        // Fires when an instance of the element is created.


        _createClass(NavHeader, [{
            key: 'connectedCallback',
            value: function connectedCallback() {

                // Create shadow DOM and insert template and styles
                var shadowRoot = this.attachShadow({ mode: 'open' }),
                    templateClone = document.importNode(template.content, true);
                this.shadowRoot.appendChild(templateClone);

                // Get elements from the shadow root
                this.$menu = this.shadowRoot.querySelector('#nav-main');
                this.$menuBtn = this.shadowRoot.querySelector('#nav-button');
                this.$watchLiveBtn = this.shadowRoot.querySelector('#nav-mobileTV');

                // Check for global CNN object, if it's not there, set a default edition
                // TODO: Check for global CNN object, if it's not there, get necessary trinity and pal data?
                this._CNN = window.CNN || { 'edition': 'domestic' };

                // Initialize menu and watch live button
                this._updateMenu(this.getAttribute('nav-data'));
                this._updateWatchLive(this.getAttribute('watch-live-config'));

                this.$menuBtn.addEventListener('click', function () {
                    this.toggle();
                }.bind(this));
            }

            // Monitor attributes for changes.

        }, {
            key: 'attributeChangedCallback',


            // When an attribute is updated, check if the value is different
            // If so, call our setter and update function
            value: function attributeChangedCallback(name, oldVal, newVal) {
                if (this[name] !== newVal) {
                    this[name] = newVal;

                    switch (name) {
                        case 'nav-data':
                            this._updateMenu(newVal); // Update menu when new nav data is set.
                            break;
                        case 'watch-live-config':
                            this._updateWatchLive(newVal); // Update watch live button when new button config is set.
                            break;
                    }
                }
            }

            // A getter/setter for the nav-data property.

        }, {
            key: '_updateMenu',


            // if the shadow DOM has been created, populate menu
            value: function _updateMenu(navData) {
                if (this.shadowRoot && navData) {
                    var navList = '';
                    navData = typeof navData === 'string' ? JSON.parse(navData) : navData;
                    for (var i = 0; i < navData.length; i++) {
                        navList += navData[i].image ? '<li><a href="' + navData[i].url + '"><img src="https:' + navData[i].image + '" class="nav-menu__img-' + navData[i].imageId + '" style="width: ' + navData[i].imageWidth + ';"></a></li>' : '<li><a href="' + navData[i].url + '">' + navData[i].label + '</a></li>';
                    }
                    this.$menu.innerHTML = '<ul>' + navList + '</ul>';
                }
            }

            // if the shadow DOM has been created, configure watch live button

        }, {
            key: '_updateWatchLive',
            value: function _updateWatchLive(config) {
                if (this.shadowRoot && config) {
                    config = (typeof config === 'undefined' ? 'undefined' : _typeof(config)) === 'object' ? config : JSON.parse(config);
                    var re = new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'),
                        matches = document.cookie.match(re),
                        userCountry = matches ? matches.pop() : null;
                    if (!userCountry && this._CNN.edition === 'domestic' || config.validCountries.indexOf(userCountry) !== -1) {
                        this.$watchLiveBtn.innerHTML = config.copy + ' <i class="nav__live-tv-icon"></i>';
                        this.$watchLiveBtn.setAttribute('href', config.link);
                        this.$watchLiveBtn.classList.add('show');
                    }
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
        }, {
            key: 'navData',
            get: function get() {
                var s = this.getAttribute('nav-data');
                return s ? JSON.parse(s) : [];
            },
            set: function set(val) {
                this.setAttribute('nav-data', JSON.stringify(val));
            }

            // A getter/setter for the watch-live-config property

        }, {
            key: 'watchLiveConfig',
            get: function get() {
                var s = this.getAttribute('watch-live-config');
                return s ? JSON.parse(s) : [];
            },
            set: function set(val) {
                this.setAttribute('watch-live-config', JSON.stringify(val));
            }
        }], [{
            key: 'observedAttributes',
            get: function get() {
                return ['nav-data', 'watch-live-config'];
            }
        }]);

        return NavHeader;
    }(_CustomElement));
})(window);
