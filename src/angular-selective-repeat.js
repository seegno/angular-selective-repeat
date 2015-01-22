
/**
 * Module dependencies.
 */

import angular from 'angular';
import ScRepeatController from './controllers/repeat-controller';
import scRepeatDirective from './directives/repeat-directive';
import scItemDirective from './directives/item-directive';
import scRepeatRestDirective from './directives/rest-directive';

var ngModule = angular.module('scRepeat', [])
  .controller('ScRepeatController', ScRepeatController)
  .directive('scItem', scItemDirective)
  .directive('scRepeat', scRepeatDirective)
  .directive('scRepeatRest', scRepeatRestDirective);

/**
 * Export `scRepeat` module.
 */

export default ngModule;
