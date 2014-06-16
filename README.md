restify-routes
==============

With this module, you can include a folder composed by many files each one describing one or many routes. This helps you to organize your code.

# Folder tree

```
- my-routes
-- base
--- index.js
-- queuer
--- queue.js
```

**Note** that file names are only for your help.

# Route file

Let's see how index.js and queue.js are written

**base/index.js**
```js
module.exports = {
  '/': {
    get: function(req, res, cb) {
      res.json({});
      return cb();
    }
  },
  '/test': {
    get: function(req, res, cb) {
      setTimeout(function() {
        res.send('GO AWAY');
        res.end();
      }, 5000);
    }
  }
};
```
**queues/queue.js**
```js
var worker = require('../libs/worker');

module.exports = {
  '/api/queue': {
    get: function(req, res, cb) {
      res.json({
        hello: 'world'
      });
      return cb();
    },
    post: function(req, res, cb) {
      var response = worker.doer(req.params);
      res.json(response);
      return cb();
    }
  },
  '/api/queue/:id': {
    get: function(req, res, cb) {
      res.json({
        id: req.params.id
      });
      return cb();
    }
  }
}
```

As you can see, you write a route and for each you can specify a **get**, **post**, **put**, **del**, **head**. Please refer to restify api-help for more details.

# How to use.

```js
var server = restify.createServer([...]);
//
var restifyRoutes = require('restify-routes');
restifyRoutes.set(server, __dirname + '/routes');
```

