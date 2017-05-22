# Nav Header
The default navigation header for CNN.com

```html
<nav-header opened nav-data="{{CNN.pageModel.nav.subs}}" watch-live-config="{{appConfig.watchLiveButton.link}}"></nav-header>
```

## Install

```bash
TODO: make component installable through bower
```

**NOTE:**

To see the demo:
- clone this repository
- then `bower install --save webcomponents/webcomponentsjs`
- run server `python -m SimpleHTTPServer 8000` (server needed for link import to work)
- point Chrome to http://0.0.0.0:8000/demo.html (need to work on compatibility issues with other browsers)

## Import

```html
<link rel="import" href="/bower_components/nav-header/nav-header.html">
```

## API Reference

### Properties

**nav-data : Object**

nav-data description


**watch-live-config : Object**

watch-live-config description


**opened : Boolean**
opened description


### Methods

**toggle()**

Toggles the navigation menu open and close.
