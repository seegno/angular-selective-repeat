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
        function ScRepeatController() {
            this.removedProperties = [];
        }
        _prototypeProperties(ScRepeatController, null, {
            removeProperty: {
                value: function removeProperty(key) {
                    if (!this.collection) {
                        return;
                    }
                    this.removedProperties.push(key);
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
            restrict: "EA",
            scope: true,
            controller: "ScRepeatController",
            controllerAs: "scRepeat",
            require: "scRepeat",
            compile: function(element, attrs) {
                if (!(attrs.scRepeatCollection || attrs.scRepeat)) {
                    throw new Error("You need to provide a collection.");
                }
                var collection = $parse(attrs.scRepeatCollection || attrs.scRepeat);
                return {
                    pre: function(scope, element, attrs, scRepeat) {
                        scRepeat.collection = collection(scope);
                        var unwatch = scope.$watchCollection(function() {
                            return collection(scope);
                        }, function(collection) {
                            scRepeat.collection = collection;
                            if (scRepeat.removedProperties.length) {
                                angular.forEach(scRepeat.removedProperties, function(property) {
                                    delete scRepeat.collection[property];
                                });
                            }
                        });
                        scope.$on("$destroy", function() {
                            unwatch();
                        });
                    }
                };
            }
        };
    }
    scRepeatDirective.$inject = [ "$parse" ];
    function scItemDirective() {
        return {
            restrict: "EA",
            require: "^scRepeat",
            priority: 601,
            link: function(scope, element, attrs, scRepeat) {
                if (!scRepeat.collection) {
                    return;
                }
                if (!(attrs.scItemKey || attrs.scItem)) {
                    throw new Error("You need to provide a `key`.");
                }
                scRepeat.removeProperty(attrs.scItemKey || attrs.scItem);
            }
        };
    }
    var ngModule = angular.module("scRepeat", []).controller("ScRepeatController", ScRepeatController).directive("scItem", scItemDirective).directive("scRepeat", scRepeatDirective);
    return ngModule;
});