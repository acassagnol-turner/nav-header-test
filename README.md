# Nav Header
The default navigation header for CNN.com

```html
<nav-header opened nav-data="{{CNN.pageModel.nav.subs}}" watch-live-config="{{appConfig.watchLiveButton.link}}"></nav-header>
```

## Install

```bash
TODO: make component installable through bower
```

Include an import link in the parent document:

```html
<link rel="import" href="/bower_components/nav-header/nav-header.html">
```

## API Reference

### Properties

**nav-data : Object**

A JSON object containing the list of links for the navigation. This is pulled in from [Pal's nav.subs object](http://cnn-pal.prod.56m.dmtio.net/section/domestic/v1/index.html/?context=content%2Fby-uri&workspace=false)


**watch-live-config : Object**

A JSON object containing the configuration for the Watch Live button. This is pulled in from [Trinity](https://bitbucket.org/vgtf/cnn-trinity/src/bc9ae4aeaa60380919ac690b21f0221f3f6bf307/cfg/hope/domestic/default.json?at=develop&fileviewer=file-view-default#default.json-17)


**opened : Boolean**

Reflects whether or not the navigation is currently opened.


### Methods

**toggle()**

Toggles the navigation menu open and close.



## Demo

To see the demo:
- clone this repository
- then `bower install webcomponents/webcomponentsjs`
- run server `python -m SimpleHTTPServer 8000` (server needed for link import to work)
- point Chrome to http://0.0.0.0:8000/demo.html (need to work on compatibility issues with other browsers)
