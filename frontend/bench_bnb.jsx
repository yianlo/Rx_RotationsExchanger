var React = require('react'),
    ReactDOM = require('react-dom'),
    App = require('./components/App'),
    SearchResult = require('./components/searchResult'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute;


var routes = (
  <Route path="/" component={App}>
    <IndexRoute component={SearchResult}/>
  </Route>
)

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render( <Router>{routes}</Router>, content);
})
