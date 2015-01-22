
/**
 * Module dependencies.
 */

import angular from 'angular';

/**
 * `scRepeat`.
 *
 * `scRepeat` directive creates a wrapper for a custom list and manages its
 * internal elements. Its main purpose is to solve layout problems in a more
 * declarative fashion, without the need for complex filters like, picking
 * properties in a collection that require a different layout structure or a
 * different data format (e.g. links, dates). It exposes an API using
 * `ScRepeatController` that stores the collection in `scRepeat.collection`.
 *
 * Usage:
 *
 * ```html
 * <!-- using attribute directives -->
 * <ANY sc-repeat="expression"></ANY>
 *
 * <!-- using element directives -->
 * <sc-repeat sc-repeat-collection="expression"></sc-repeat>
 * ```
 *
 * @ngInject
 */

function scRepeatDirective($parse) {
  return {
    restrict: 'EA',
    scope: true,
    controller: 'ScRepeatController',
    controllerAs: 'scRepeat',
    require: 'scRepeat',
    compile: (element, attrs) => {
      if (!(attrs.scRepeatCollection || attrs.scRepeat)) {
        throw new Error('You need to provide a collection.');
      }

      var collection = $parse(attrs.scRepeatCollection || attrs.scRepeat);

      // Assignment of `collection` to `ScRepeatController` should be done on
      // `preLinking` function before child elements are linked. Since
      // `postLink` is executed after that, there wouldn't be any `collection`
      // available for property removal.
      return {
        pre: (scope, element, attrs, scRepeat) => {
          scRepeat.collection = angular.copy(collection(scope));

          // Observes changes on the collection and updates
          // `scRepeat.collection` and removes properties on
          // `removedProperties` list if they exist.
          var unwatch = scope.$watchCollection(() => {
            return collection(scope);
          }, (collection) => {
            scRepeat.collection = angular.copy(collection);

            if (scRepeat.removedProperties.length) {
              angular.forEach(scRepeat.removedProperties, (property) => {
                delete scRepeat.collection[property];
              });
            }
          });

          // Listens to `scope` `$destroy` event and deregister `$watcher`.
          scope.$on('$destroy', () => {
            unwatch();
          });
        }
      };
    }
  };
}

/**
 * Export `scRepeatDirective`.
 */

export default scRepeatDirective;
