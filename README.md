# [UNMAINTAINED] Iso-emitter
[![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/iso-emitter)[![Travis](https://img.shields.io/travis/PsychoLlama/iso-emitter.svg?style=flat-square)](https://travis-ci.org/PsychoLlama/iso-emitter)[![Gitter](https://img.shields.io/badge/chat-on%20gitter-red.svg?style=flat-square)](https://gitter.im/PsychoLlama/iso-emitter)

Just an isomorphic event emitter

## Maintenance Notice
I don't maintain this. In fact, I'd like to forget I wrote it, but some projects need to stay around and keep my humility in check.

Please hide your eyes and move along.

## Why
The libraries I build are often expected to work
in node and the browser with the same code,
and to keep things portable, I avoid build steps.
They're awesome, but they have their place.

Iso-emitter is a tiny event emitter that
is node agnostic.

It's also splat oriented:

```javascript
var stream = new Stream
stream.on('event 1', 'event 2', handler1, handler2)

stream.emit('event 1' /*, arguments */ )
// both handlers are invoked
```

## Usage
Iso-emitter is intentionally kept simple.

### `on(...events, ...callbacks)`
Now coming to a theater near you, *splat oriented API* (bum bumda bum!)

Events are strings. Callbacks are functions. It really doesn't matter what
order you put them in, but to keep things clean, I recommend
ordering events left, callbacks right.

### `emit(event[, arguments])`
Call emit, optionally with arguments, to invoke all subscribed functions.

### `bind(...events)`
After passing in the events you want to emit on, it'll return a function
that emits to each of them. Named after the glorious `Function.prototype.bind`.

### `Stream.emit`
When you call it from the constructor, it emits globally, on every
stream instance.

### Examples:

**Listening**
```javascript
var stream = new Stream
stream.on('turn', function (direction) {
	var positions = {
		Up: { direction: -1, axis: 'y' },
		Down: { direction: 1, axis: 'y' },
		Left: { direction: -1, axis: 'x' },
		Right: { direction: 1, axis: 'x' },
	}
	player.direction(positions[direction])
})
```

**Binding**
```javascript
var turn = (new Stream).bind('turn', 'render')

window.onkeydown = function (e) {
	if (typeof e.key === 'string') {
		var direction = e.key.match(/Arrow(\w+)/)
		turn(direction[1])
	}
}
```

**splat subscribing**
```javascript
stream.on(
	'out of bounds',
	'collision',
	player.eliminate
)
```

**emitting**
```javascript
stream.on('move', function (coords) {
	if (outOfBounds(coords)) {
		stream.emit('out of bounds', player)
	}
})
```

## Finishing Words

Hope ya like it. If you find any problems, hit me up on gitter or submit
an issue or pull request.
