
/**
 * `scRepeat` directive.
 *
 * @ngInject
 */

function scRepeatDirective($parse) {
  return {
    restrict: 'E',
    controller: 'ScRepeatController',
    controllerAs: 'scRepeat',
    require: 'scRepeat',
    compile: (element, attrs) => {
      var collection = $parse(attrs.scRepeatCollection);

      return {
        pre: (scope, element, attrs, scRepeat) => {
          scRepeat.collection = collection(scope);
        }
      };
    }
  };
}

export default scRepeatDirective;
