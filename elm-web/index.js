'use strict';

// Require index.html so it gets copied to dist
require('./index.html');
require('./src/Stylesheets.elm');

var Elm = require('./src/App.elm');
var mountNode = document.getElementById('main');

// .embed() can take an optional second argument. This would be an object describing the data we need to start a program, i.e. a userID or some token
var app = Elm.App.embed(mountNode);

app.ports.updateLocation.subscribe(function(location) {
    document.title = location.title;
    history.pushState({ pathname: location.pathname }, location.title, location.pathname)
    console.log(location)
})

app.ports.updateTitle.subscribe(function(title) {
    document.title = title;
    history.replaceState(history.state, document.title, document.location.pathname)
    console.log(title)
})

window.addEventListener('popstate', function(event) {
    console.log(event.state)
    app.ports.pathUpdated.send(event.state.pathname)
})

app.ports.pathUpdated.send(window.location.pathname)