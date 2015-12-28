/*global describe, it, expect, jasmine, beforeEach*/
/*jslint node: true */
'use strict';
var stream, Stream = require('../stream');

beforeEach(function () {
	stream = new Stream();
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300;

describe('The Stream constructor', function () {

	it('should be a function', function () {
		expect(Stream).toEqual(jasmine.any(Function));
	});

	it('should return an object', function () {
		expect(new Stream()).toEqual(jasmine.any(Object));
	});

	it('should work without new', function () {
		expect(Stream).not.toThrow();
	});

	it('should have an "emit" method', function () {
		expect(Stream.emit).toEqual(jasmine.any(Function));
	});

	it('should have a "bind" method', function () {
		expect(Stream.bind).toEqual(jasmine.any(Function));
	});

	describe('emit method', function () {

		/*
			since these are global,
			mind the namespace
		*/

		it('invoke every listener on that channel', function (done) {
			(new Stream()).on('first global event', done);
			Stream.emit('first global event');
		});

		it('should carry arguments to every listener', function () {
			(new Stream()).on('second global event', function () {
				expect(arguments.length).toBe(3);
			});
			Stream.emit('second global event', 1, 2, 3);
		});

	});

});




describe('A stream instance', function () {

	it('should have an "on" method', function () {
		expect(stream.on).toEqual(jasmine.any(Function));
	});

	it('should have an "emit" method', function () {
		expect(stream.emit).toEqual(jasmine.any(Function));
	});

	it('should have a "bind" method', function () {
		expect(stream.bind).toEqual(jasmine.any(Function));
	});

	describe('emit method', function () {

		it('should invoke listeners', function (done) {
			stream.on('test event', done);
			stream.emit('test event');
		});

		it('should carry argument splats', function () {
			stream.on('test event', function () {
				expect(arguments.length).toBe(3);
			});
			stream.emit('test event', 1, 2, 3);
		});

	});

	describe('bind method', function () {

		it('should return a function', function () {
			expect(stream.bind()).toEqual(jasmine.any(Function));
		});

		it('should execute events in bulk', function (done) {
			var listeners = stream.bind('test', 'event', 'test event');
			stream.on('test event', done);
			listeners();
		});

		it('should return the length of events', function (done) {
			var listeners = stream.bind('test', 'event', 'test event');
			stream.on('test event', done);
			expect(listeners()).toEqual(jasmine.any(Number));
		});

		it('should carry argument splats', function () {
			var listeners = stream.bind('test', 'event', 'test event');
			stream.on('test event', function () {
				expect(arguments.length).toBe(3);
			});
			listeners(1, 2, 3);
		});

	});

});
