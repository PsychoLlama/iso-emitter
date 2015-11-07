# tiny sub

A capable, light-weight event emitter for node or the browser.

Before we go too far, it's nice to see some code in action and get a feel for how it works...

```javascript
var stream = new Stream()

stream.on('either this event', 'or this one').run(thisHandler, andThisToo)

stream.emit('event name', ...args)
```

Okie dokie, let's get into it. What's so cool about tiny sub? Well, there are a couple of ways it differs from traditional event libraries. For starters...

- events can share state through the `this` object.
- event instances are scoped, not global.
- incredibly succinct splat-oriented API.
- optionally, emit an event across *every* instance.

Now that you've got an idea of what tiny sub does for you, let's dig into some API.

## stream.on(event[, ...event])

`.on` is how you declare which events you want to subscribe to. It takes as many arguments as you want, allowing you to subscribe to multiple events all at once (say whaaaaaa?). Here's what it looks like:

```javascript
stream
.on('collision', 'kicked', 'out of bounds')
.run(function (player, event) {
  // remove the player
});
```

## stream.run(handler[, ...handler])

Now that know how to target events, `run` is how you handle them. Like `.on`, you can pass in as many event handlers as you want, leading to a very powerful API. Here's an example:

```javascript
function diff(state) {
  // find the difference
  this.diff = diff;
}
function render() {
  // render this.diff
}
stream.on('state change').run(diff, render)
```
> note: as a personal rule, I try not to use lambdas excessively. Naming functions can make your code significantly cleaner and easier to debug, especially when dealing with async.

## Stream/stream.emit('event'[, ...args])

To fire an event, you pass the name first, followed by any arguments you want to send. Pretty self explanatory. But wait! It has a slight twist - you can fire that event for *every Stream instance at once!* Every event stream can be controlled from the constructor by calling emit. Let's take a look...

```javascript
var ui = new Stream()
ui.on('join').run(animation.join)
var state = new Stream()
state.on('join').run(process.user)

Stream.emit('join', user)
```

In the example, both `ui` and `state` will receive the join event and user argument, even though they're unique streams.

## Stream/stream.bind('event'[...'event'])

Turn your event into a function by using `.bind`, allowing you to pass it to things like `setTimeout`, DOM events and anything else that accepts a function. You give it a list of events to fire, and it returns a function that accepts the arguments to emit with. Examples!

```javascript
var addImage = slide.bind('next image')

button.addEventListener('click', addImage)
setInterval(addImage, 3000)
```

Similar to `.emit`, `.bind` can be used with the Stream constructor to emit on every instance.

## event state

This is a pretty neat part of tiny sub. Every event has it's own state, allowing those callbacks to communicate with each other. The state is accessed through the `this` object. Let's see what it looks like in action!

```javascript
function validate(input) {
  // validate
  if (!valid) {
    this.invalid = true;
  }
}
function encrypt(input) {
  if (this.invalid) {
    return;
  }
  // encrypt input
  this.encrypted = encrypted;
}
function send(input) {
  if (this.invalid) {
    return;
  }
  // send this.encrypted
}

stream.on('input').run(validate, encrypt, send);
```

## closing notes

If you're having difficulties with function order, here's a pro tip: handlers are invoked in the order which they subscribed.


Welp, that's pretty much it for the API! If you have any issues or questions, submit an issue or a pull request and I'll follow up with you. If you're looking for a more powerful async library, check out another project of mine, [Callback.js](https://github.com/PsychoLlama/CallbackJS).

I'd love to hear from you, so send me any feedback you have!

\- You're awesome.