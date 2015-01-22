
/**
 * Module dependencies.
 */

import angular from 'angular';
import ScRepeatController from './controllers/repeat-controller';
import scRepeatDirective from './directives/repeat-directive';
import scItemDirective from './directives/item-directive';

var ngModule = angular.module('scRepeat', [])
  .controller('ScRepeatController', ScRepeatController)
  .directive('scItem', scItemDirective)
  .directive('scRepeat', scRepeatDirective);

/**
 * Export `scRepeat` module.
 */

export default ngModule;
