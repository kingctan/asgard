// Generated by CoffeeScript 1.3.3
(function() {
  var admin, category, content, dashboard, exports, index, operator, sign;

  sign = require('../controllers/sign');

  dashboard = require('../controllers/dashboard');

  content = require('../controllers/content');

  operator = require('../controllers/operator');

  admin = require('../controllers/admin');

  category = require('../controllers/category');

  index = require('../controllers/index');

  exports = module.exports = function(app) {
    var authentication;
    authentication = function(req, res, next) {
      if (req.cookies.member) {
        return next();
      } else {
        if (req.session.member) {
          return next();
        } else {
          return res.redirect('/asgard-signin');
        }
      }
    };
    app.get('/setup', admin.setup);
    app.post('/setup', admin.add);
    app.get('/', function(req, res) {
      console.log('-- / -- ');
      return index.init(req, res);
    });
    app.get('/index/:page', index.init);
    app.get('/category/:catename', index.category);
    app.get('/category/:catename/:page', index.category);
    app.get('/member/:operator', index.operator);
    app.get('/member/:operator/:page', index.operator);
    app.get('/t/:url', index.detail);
    app.get('/asgard-signin', function(req, res) {
      console.log('-- asgard-signin(GET) -- ');
      if (req.cookies.member) {
        return res.redirect('/dashboard');
      } else {
        if (req.session.member) {
          return res.redirect('/dashboard');
        } else {
          return sign.init(req, res);
        }
      }
    });
    app.post('/asgard-signin', sign.signin);
    app.get('/signout', sign.signout);
    app.get('/dashboard', authentication, dashboard.init);
    app.get('/dashboard/content/page/:page', authentication, dashboard.page);
    app.get('/dashboard/operator/checkunique/:username', authentication, operator.checkunique);
    app.post('/dashboard/operator/add', authentication, operator.add);
    app.get('/dashboard/operator/edit/:username', authentication, operator.edit);
    app.post('/dashboard/operator/save/:username', authentication, operator.save);
    app.get('/dashboard/operator/delete/:username', authentication, operator["delete"]);
    app.post('/dashboard/operator/profile/:username', authentication, operator.profile);
    app.get('/operator-profile', authentication, operator.updateprofile);
    app.get('/dashboard/category/checkunique/:catename', authentication, category.checkunique);
    app.post('/dashboard/category/add', authentication, category.add);
    app.get('/dashboard/category/edit/:catename', authentication, category.edit);
    app.post('/dashboard/category/save/:catename', authentication, category.save);
    app.get('/dashboard/category/delete/:catename', authentication, category["delete"]);
    app.get('/dashboard/content/new', authentication, content["new"]);
    app.post('/dashboard/content/add', authentication, content.add);
    app.get('/dashboard/content/edit/:uid', authentication, content.edit);
    app.post('/dashboard/content/save/:uid', authentication, content.save);
    app.get('/dashboard/content/cancel', authentication, content.cancel);
    app.get('/dashboard/content/delete/:uid', authentication, content["delete"]);
    app.get('/dashboard/content/checkunique/:url', authentication, content.checkunique);
    app.post('/dashboard/admin/profile/:username', authentication, admin.profile);
    app.get('/admin-profile', authentication, admin.updateprofile);
    return app.get('/404', function(req, res) {
      console.log('-- 404 -- ');
      return res.render('404');
    });
  };

}).call(this);