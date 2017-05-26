# Nav Header
The default navigation header for CNN.com

## Use in Project

```bash
bower install https://github.com/acassagnol/nav-header-test.git
```

Include an import link in the parent document:

```html
<link rel="import" href="/bower_components/nav-header/nav-header.html">
```

Add nav-header tag

```html
<nav-header opened nav-data="{{CNN.pageModel.nav.subs}}" watch-live-config="{{appConfig.watchLiveButton}}"></nav-header>
```

```javascript
// basic example of how you might dynamically import the component **should actually use injector.js**

importHref('nav-header', function (){

    // after web component has been loaded, add it to page
    var nav = document.createElement('nav-header');
    nav.setAttribute('nav-data', JSON.stringify(CNN.pageModel.nav.buckets.subs));
    nav.setAttribute('watch-live-config', JSON.stringify(CNN.appConfig.watchLiveButton));

    document.body.replaceChild(nav, document.querySelector('#nav-container'));

});

function importHref(name, cb) {

    // should check if this has already been imported

    console.log('Loading Web Component: ' + name);

    var link = document.createElement('link');
    link.setAttribute('rel', 'import');
    link.setAttribute('href', '/bower_components/' + name + '/' + name + '.html');
    link.onload = function() {
        // do stuff after load
        if (typeof cb === 'function') {
            cb();
        }
    };
    document.head.appendChild(link);

}
```

## API Reference

### Properties

**nav-data : Array**

An array containing the list of links for the navigation. This is pulled in from [Pal's nav.subs object](http://cnn-pal.prod.56m.dmtio.net/section/domestic/v1/index.html/?context=content%2Fby-uri&workspace=false)


**watch-live-config : Object**

A JSON object containing the configuration for the Watch Live button. This is pulled in from [Trinity](https://bitbucket.org/vgtf/cnn-trinity/src/bc9ae4aeaa60380919ac690b21f0221f3f6bf307/cfg/hope/domestic/default.json?at=develop&fileviewer=file-view-default#default.json-17)


**opened : Boolean**

Reflects whether or not the navigation is currently opened.


### Methods

**toggle()**

Toggles the navigation menu open and close.



## Demo

To see the demo:
- clone this repository `git clone https://github.com/acassagnol/nav-header-test.git nav-header`
- `cd demo`
- then `bower install`
- run server `python -m SimpleHTTPServer 8000` (server needed for link import to work)
- point Chrome to http://0.0.0.0:8000/ (need to work on compatibility issues with other browsers [issue](https://github.com/acassagnol/nav-header-test/issues/1))
