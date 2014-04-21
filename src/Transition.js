angular.module('transition').factory('Transition', function () {

    var SPLIT = ' \u261E ';

    return {
        _transitions: {},

        /**
         *
         * @param {string} to
         * @param {Function} callback
         */
        enter: function (to, callback) {
            this._transitions[to] = callback;
        },

        /**
         *
         * @param {String} fromPath
         * @param {String} toPath
         * @param {Function} callback
         */
        transition: function (fromPath, toPath, callback) {
            this._transitions[fromPath + SPLIT + toPath] = callback;
        },

        _animateEnter: function (path, el, done) {
            if (this._transitions[path]) {
                return this._transitions[path](el, done);
            }
            done();
        },

        _animateTransition: function (fromPath, toPath, fromEl, toEl, done) {
            var key = fromPath + SPLIT + toPath;
            if (this._transitions[key]) {
                return this._transitions[key](fromEl, toEl, done);
            }
            done();
        }
    };
});