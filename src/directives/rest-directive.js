
/**
 * `scRepeatRest` directive.
 *
 * @ngInject
 */

function scRepeatRestDirective() {
  return {
    restrict: 'E',
    require: '^scRepeat',
    transclude: true,
    template: '<div ng-repeat="(key, value) in scRepeat.collection track by $index" ng-transclude></div>',
    link: (scope, element, attrs, scRepeat) => {
      if (!scRepeat.collection) {
        return;
      }
    }
  };
}

/**
 * Export `scRepeatRestDirective`.
 */

export default scRepeatRestDirective;
