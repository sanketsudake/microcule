var stack = require('../');
var express = require('express');
var app = express();

var logger = require('../lib/plugins/logger');
var mschema = require('../lib/plugins/mschema');
var bodyParser = require('../lib/plugins/bodyParser');
var sourceGithubGist = require('../lib/plugins/sourceGithubGist');
var sourceGithubRepo = require('../lib/plugins/sourceGithubRepo');

var handler = stack.spawn({
  // code: nodeService,
  language: "javascript"
});

app.use(logger());

// source from github gist
app.use(sourceGithubGist({
  token: "1234",
  main: "echoHttpRequest.js",
  gistID: "357645b8a17daeb17458"
}));

app.use(bodyParser());
app.use(mschema({
  "hello": {
    "type": "string",
    "required": true
  }
}));
app.use(handler);
app.use(function(req, res, next){
  // Note: It's most likely you will not be able to call res.end or res.write here,
  // as the stack.spawn handler should end the response
  // Any middlewares places after stack.spawn should be considered "post processing" logic
  console.log('post process service');
})

app.listen(3000, function () {
  console.log('server started on port 3000');
});