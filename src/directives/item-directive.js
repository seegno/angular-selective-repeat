
/**
 * `scItemDirective`.
 *
 * @ngInject
 */

function scItemDirective() {
  return {
    restrict: 'E',
    require: '^scRepeat',
    link: (scope, element, attrs, scRepeat) => {
      if (!scRepeat) {
        return;
      }

      if (!attrs.scItemKey) {
        throw new Error('[sc-item-key] attribute is required.');
      }

      scRepeat.removeFromCollection(attrs.scItemKey);
    }
  };
}

export default scItemDirective;
