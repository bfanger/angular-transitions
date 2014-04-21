# Angular Transitions

## Introduction
ngAnimate works great for adding and removing UI elements (using the enter and leave) or animating between a active/valid state (addClass, removeClass and setClass).

The trouble begins when animating a transition between 2 UI elements (Using ng-view or ng-include for example). 

* The enter and leave animations start at the same time.
* The class(es) on the new and the old element are the same.

This is fine for crossfade or sliding animations, but becomes cumbersome with complex animation sequences.

You'll need to:
* Set different classes ng-view to select the correct enter and leave animations
* Sync the leave and enter animations, delaying the *enter* for the duration of the *leave*


Using the Transition service you have access to both the *enter* Element and the *leave* Element in the same callback.

Add the `ng-view-transition` class to the ng-view.
```
<div ng-view class="ng-view-transition"></div>
```

```
angular.module('myApp', ['transition']).run(function (Transition) {

	// Page transition from the homepage to the products page.
    Transition.transition('/', '/products', function (fromEl, toEl, done) {
        console.log('transition anim');
        done();
    });

    // For entry / refresh
	Transition.enter('/', function (el, done) {
        console.log('enter anim');
        done();
    });

});
```