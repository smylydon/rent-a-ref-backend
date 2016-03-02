var express = require('express');
var jwt = require('jsonwebtoken');
var _ = require('lodash-node');

var routes = function(models) {
    var authenticationRouter = express.Router();
    var authenticationController = require('../controllers/authenticationController')(models.User);
    var carsController = require('../controllers/carsController')(models.Car);
    var commentsController = require('../controllers/commentsController')(models.Comment);

    function ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers['authorization']; //jshint ignore:line

        if (!_.isUndefined(bearerHeader)) {
            var bearer = bearerHeader.split(' ');
            bearerToken = bearer[1];
            req.token = bearerToken;
            jwt.verify(bearerToken, process.env.JWT_SECRET, function(err, decoded) {
                if (err) {
                    res.status(403).json({
                        success: false,
                        message: 'Bad token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).json({
                success: false,
                message: 'No token.'
            });
        }
    }

    /*
      authenticationRouter.use('/comments', ensureAuthorized);
    */

    authenticationRouter.route('/login')
        .post(authenticationController.login);

    authenticationRouter.route('/cars')
        .get(carsController.carsGetAll);

    authenticationRouter.route('/cars')
        .post(carsController.carsPost);

    authenticationRouter.route('/cars/:id')
        .get(carsController.carsGet);

    authenticationRouter.route('/cars')
        .put(carsController.carsPut);

    authenticationRouter.route('/cars/:id')
        .delete(carsController.carsDelete);

    authenticationRouter.route('/comment')
        .post(commentsController.commentPost);

    authenticationRouter.route('/comments/:id')
        .get(commentsController.commentGet);

    return authenticationRouter;
};

module.exports = routes;
