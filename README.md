# Angular selective repeat
`scRepeat` is a module writen in ES6 which provides an easy way to selectively display a collection of items.

## Installation

Choose your preferred method:

* Bower: `bower install angular-selective-repeat`
* NPM: `npm install --save angular-selective-repeat`
* Download: [angular-selective-repeat](https://raw.githubusercontent.com/seegno/angular-selective-repeat/master/dist/angular-selective-repeat.min.js)

## Usage

1. Include `scRepeat` module and dependencies.

```html
<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-selective-repeat/dist/angular-selective-repeat.min.js"></script>
```

2. Inject `scRepeat` module on your angular application:

```js
angular.module('myApp', ['scRepeat'])
  .controller('MyController', MyController);
```

3. *./my-controller.js*:

```js
class MyController {
  constructor {
    this.collection = {
      name: 'Doe',
      age: 42,
      createdAt: 'Thu Jan 22 2015 18:57:12 GMT+0000 (WET)',
      city: 'Maryland'
	};
  }
}
```

4. *./my-view.html*:

```html
<div ng-controller="MyController as myCtrl">
  <sc-repeat sc-repeat-collection="myCtrl.collection">
    <sc-item sc-item-key="createdAt">
      {{ myCtrl.collection.createdAt | date }}
    </sc-item>
    
    <div ng-repeat="(key, value) in scRepeat.collection track by $index">
      <p>{{ key }}</p>
      <h4>{{ value }}</h4>
    </div>
  </sc-repeat>
</div>
```

## API

### scRepeat directive
`scRepeat` directive creates a wrapper for a custom list and manages its internal elements. Its main purpose is to solve layout problems in a more declarative fashion, without the need for complex filters like, picking properties in a collection that require a different layout structure or a different data format (e.g. links, dates). It exposes an API using `ScRepeatController` that stores the collection in `scRepeat.collection`.

**Usage:**

```html
<!-- using attribute directives -->
<ANY sc-repeat="expression"></ANY>

<!-- using element directives -->
<sc-repeat sc-repeat-collection="expression"></sc-repeat>
```

### scItem directive
`scItem` directive removes an individual property from the collection and so you can include it inside the `scRepeat` directive.
To pick collection items individually, you just need to include `scItem` directive as a child of `scRepeat` element and provide the property.

**Usage:**

```html
<!-- using attribute directives -->
<ANY sc-repeat="expression">
  <ANY sc-item="keyValue1"></ANY>
  <ANY sc-item="keyValue2"></ANY>
</ANY>

<!-- using element directives -->
<sc-repeat sc-repeat-collection="expression">
  <sc-item sc-item-key="keyValue1"></sc-item>
  <sc-item sc-item-key="keyValue2"></sc-item>
</sc-repeat>
```

## Contributing & Development

#### Contribute

Found a bug or want to suggest something? Take a look first on the current and closed [issues](https://github.com/seegno/angular-selective-repeat/issues). If it is something new, please [submit an issue](https://github.com/seegno/angular-selective-repeat/issues/new).

#### Develop

It will be awesome if you can help us evolve `angular-selective-repeat`. Want to help?

1. [Fork it](https://github.com/seegno/angular-selective-repeat).
2. `npm install`.
3. Do your magic.
4. Run the tests: `gulp test`.
5. Build: `gulp build`
6. Create a [Pull Request](https://github.com/seegno/angular-selective-repeat/compare).

*The source files are written in ES6.*