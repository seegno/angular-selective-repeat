
/**
 * `ScRepeatController`.
 *
 * @ngInject
 */

class ScRepeatController {
  constructor() {
    this.removedProperties = [];
  }

  /**
   * Adds a given property `key` to a list of removed properties.
   */

  removeProperty(key) {
    if (!this.collection) {
      return;
    }

    this.removedProperties.push(key);
  }
}

/**
 * Export `ScRepeatController`.
 */

export default ScRepeatController;
