/**
 * Animate the ng-view transitions
 */
angular.module('transition').animation('.ng-view-transition', function ($rootScope, $location, Transition) {
    'use strict';

    var previousPath = null;
    var currentPath = $location.path();

    $rootScope.$on('$routeChangeSuccess', function (e, route, prevRoute) {
        previousPath = currentPath;
        currentPath = $location.path();
    });

    var _enter = {};

    return {
        enter: function (el, done) {
            if (previousPath === null) {
                return Transition._animateEnter(currentPath, el, done);
            }
            _enter = {
                path: $location.path(),
                el: el,
                done: done
            };
        },
        leave: function (el, done) {
            return Transition._animateTransition(previousPath, _enter.path, el, _enter.el, function () {
                _enter.done();
                done();
            });
        }
    };

});
