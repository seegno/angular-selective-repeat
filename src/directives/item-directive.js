
/**
 * `scItem`.
 *
 * `scItem` directive removes an individual property from the
 * collection and so you can include it inside the `scRepeat` directive.
 * To pick collection items individually, you just need to include `scItem`
 * directive as a child of `scRepeat` element and provide the property.
 *
 * Usage:
 *
 * ```html
 * <!-- using attribute directives -->
 * <ANY sc-repeat="expression">
 *   <ANY sc-item="keyValue1"></ANY>
 *   <ANY sc-item="keyValue2"></ANY>
 *  </ANY>
 *
 * <!-- using element directives -->
 * <sc-repeat sc-repeat-collection="expression">
 *   <sc-item sc-item-key="keyValue1"></sc-item>
 *   <sc-item sc-item-key="keyValue2"></sc-item>
 * </sc-repeat>
 * ```
 *
 * @ngInject
 */

function scItemDirective() {
  return {
    restrict: 'EA',
    require: '^scRepeat',
    priority: 601,
    link: (scope, element, attrs, scRepeat) => {
      if (!scRepeat.collection) {
        return;
      }

      if (!(attrs.scItemKey || attrs.scItem)) {
        throw new Error('You need to provide a `key`.');
      }

      scRepeat.removeProperty(attrs.scItemKey || attrs.scItem);
    }
  };
}

/**
 * Export `scItemDirective`.
 */

export default scItemDirective;
