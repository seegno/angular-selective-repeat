/**
 * angular-selective-repeat - Angular Selective Repeat
 * @version v0.0.0
 * @link https://github.com/seegno/angular-selective-repeat
 * @license MIT
 */
(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define([ "angular" ], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("angular"));
    } else {
        root.scRepeat = factory(root.angular);
    }
})(this, function(angular) {
    var _prototypeProperties = function(child, staticProps, instanceProps) {
        if (staticProps) Object.defineProperties(child, staticProps);
        if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
    };
    var ScRepeatController = function() {
        function ScRepeatController() {}
        _prototypeProperties(ScRepeatController, null, {
            removeFromCollection: {
                value: function removeFromCollection(key) {
                    if (!this.collection) {
                        return;
                    }
                    delete this.collection[key];
                },
                writable: true,
                enumerable: true,
                configurable: true
            }
        });
        return ScRepeatController;
    }();
    function scRepeatDirective($parse) {
        return {
            restrict: "E",
            controller: "ScRepeatController",
            controllerAs: "scRepeat",
            require: "scRepeat",
            compile: function(element, attrs) {
                var collection = $parse(attrs.scRepeatCollection);
                return {
                    pre: function(scope, element, attrs, scRepeat) {
                        scRepeat.collection = collection(scope);
                    }
                };
            }
        };
    }
    scRepeatDirective.$inject = [ "$parse" ];
    function scItemDirective() {
        return {
            restrict: "E",
            require: "^scRepeat",
            link: function(scope, element, attrs, scRepeat) {
                if (!scRepeat) {
                    return;
                }
                if (!attrs.scItemKey) {
                    throw new Error("[sc-item-key] attribute is required.");
                }
                scRepeat.removeFromCollection(attrs.scItemKey);
            }
        };
    }
    function scRepeatRestDirective() {
        return {
            restrict: "E",
            require: "^scRepeat",
            transclude: true,
            template: '<div ng-repeat="(key, value) in scRepeat.collection track by $index" ng-transclude></div>',
            link: function(scope, element, attrs, scRepeat) {
                if (!scRepeat.collection) {
                    return;
                }
            }
        };
    }
    var ngModule = angular.module("scRepeat", []).controller("ScRepeatController", ScRepeatController).directive("scItem", scItemDirective).directive("scRepeat", scRepeatDirective).directive("scRepeatRest", scRepeatRestDirective);
    return ngModule;
});