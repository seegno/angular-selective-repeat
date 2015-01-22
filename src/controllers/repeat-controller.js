
/**
 * `ScRepeatController`.
 *
 * @ngInject
 */

class ScRepeatController {
  removeFromCollection(key) {
    if (!this.collection) {
      return;
    }

    delete this.collection[key];
  }
}

/**
 * Export `ScRepeatController`.
 */

export default ScRepeatController;
