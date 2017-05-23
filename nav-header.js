(function (window) {

    const doc = (document._currentScript || document.currentScript).ownerDocument,
          template = doc.querySelector('#nav-header-template');

    customElements.define('nav-header', class NavHeader extends HTMLElement {
        constructor() {
            super();
        }

        // Fires when an instance of the element is created.
        connectedCallback() {

            // Create shadow DOM and insert template and styles
            var shadowRoot = this.attachShadow({mode: 'open'}),
                templateClone = document.importNode(template.content, true);
            this.shadowRoot.appendChild(templateClone);

            // Get elements from the shadow root
            this.$menu = this.shadowRoot.querySelector('#nav-main');
            this.$menuBtn = this.shadowRoot.querySelector('#nav-button');
            this.$watchLiveBtn = this.shadowRoot.querySelector('#nav-mobileTV');

            // Check for global CNN object, if it's not there, set a default edition
            this._CNN = window.CNN || {'edition':'domestic'};

            // Initialize menu and watch live button
            this._updateMenu(JSON.parse(this.getAttribute('nav-data')));
            this._updateWatchLive(JSON.parse(this.getAttribute('watch-live-config')));

            this.$menuBtn.addEventListener('click', function () {
                this.toggle();
            }.bind(this));
        }

        // Monitor attributes for changes.
        static get observedAttributes() { return ['nav-data','watch-live-config']; }

        // When an attribute is updated, check if the value is different
        // If so, call our setter and update function
        attributeChangedCallback(name, oldVal, newVal) {
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
        get navData() {
          let s = this.getAttribute('nav-data');
          return s ? JSON.parse(s) : [];
        }

        set navData(val) {
          this.setAttribute('nav-data', JSON.stringify(val));
        }

        // A getter/setter for the watch-live-config property
        get watchLiveConfig() {
          let s = this.getAttribute('watch-live-config');
          return s ? JSON.parse(s) : [];
        }

        set watchLiveConfig(val) {
          this.setAttribute('watch-live-config', JSON.stringify(val));
        }

        // if the shadow DOM has been created, populate menu
        _updateMenu(navData) {
            if(this.shadowRoot){
                navData = typeof navData === 'object' ? navData : JSON.parse(navData);
                var navList = '';
                for (var i = 0; i < navData.length; i++) {
                    navList += navData[i].image ?
                    `<li><a href="${navData[i].url}"><img src="https:${navData[i].image}" class="nav-menu__img-${navData[i].imageId}" style="width: ${navData[i].imageWidth};"></a></li>` :
                    `<li><a href="${navData[i].url}">${navData[i].label}</a></li>`;
                }
                this.$menu.innerHTML = '<ul>' + navList + '</ul>';
            }
        }

        // if the shadow DOM has been created, configure watch live button
        _updateWatchLive(config) {
            if(this.shadowRoot){
                config = typeof config === 'object' ? config : JSON.parse(config);
                var re = new RegExp('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'),
                    matches = document.cookie.match(re),
                    userCountry = matches ? matches.pop() : null;
                if ((!userCountry && this._CNN.edition === 'domestic') || config.validCountries.indexOf(userCountry) !== -1) {
                    this.$watchLiveBtn.innerHTML = config.copy + ' <i class="nav__live-tv-icon"></i>';
                    this.$watchLiveBtn.setAttribute('href', config.link);
                    this.$watchLiveBtn.classList.add('show');
                }
            }
        }

        toggle() {
            var opened = this.hasAttribute('opened') ? true : false;

            if (opened) {
                this.removeAttribute('opened');
            }else{
                this.setAttribute('opened', '');
            }
        }
    });

})(window);
