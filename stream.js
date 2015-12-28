/*global module*/

var Stream;

(function () {
	'use strict';

	var streams = [];

	function array(obj) {
		return Array.prototype.slice.call(obj);
	}

	function callbacks(args) {
		return array(args).filter(function (cb) {
			return typeof cb === 'function';
		});
	}

	function events(args) {
		return array(args).filter(function (event) {
			return typeof event === 'string';
		});
	}

	Stream = function () {
		if (!(this instanceof Stream)) {
			return new Stream();
		}
		this.events = {};
		streams.push(this);
	};

	Stream.prototype = {
		constructor: Stream,
		on: function () {
			var cbs, names, stream = this;
			cbs = callbacks(arguments);
			names = events(arguments);

			names.forEach(function (event) {
				cbs.forEach(function (cb) {
					if (!stream.events[event]) {
						stream.events[event] = [];
					}
					stream.events[event].push(cb);
				});
			});

			return this;
		},

		emit: function (event) {
			if (!event) {
				return this;
			}
			var args = array(arguments).slice(1);
			if (!this.events[event]) {
				return this;
			}
			this.events[event].forEach(function (cb) {
				cb.apply(null, args);
			});

			return this;
		},

		bind: function () {
			var names, stream = this;
			names = events(arguments);

			return function () {
				var args = array(arguments);

				names.forEach(function (event) {
					stream.emit.apply(stream, [event].concat(args));
				});

				return names.length;
			};
		}

	};

	Stream.emit = function (event) {
		var args = array(arguments);
		streams.forEach(function (stream) {
			stream.emit.apply(stream, args);
		});
		return streams.length;
	};

	if (typeof module !== 'undefined') {
		module.exports = Stream;
	}

}());
