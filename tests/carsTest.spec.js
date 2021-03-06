var _ = require('lodash');
var sinon = require('sinon');
var chai = require('chai');
var chaiAsPromise = require('chai-as-promised');
var expect = chai.expect;
var should = chai.should();

chai.use(chaiAsPromise);

describe('Cars Controller Tests', function() {
    var aCar, Car, CarsImages, Image, Make, models, req, res, carsController;
    var authorization, authentication;

    beforeEach(function() {
        var dummy = function() {};
        var middleware = function(req, res, next) {
            next(req,res);
        };
        authentication = middleware;
        authorization = function() {
            return {
                authorize: dummy,
                authorization: middleware,
            };
        };
        aCar = {
            'name': 'Guest User',
            email: 'guest@abc.com',
            subject: 'Test',
            message: 'Testing test'
        };
        Car = {
            create: dummy,
            destroy: dummy,
            findOne: dummy,
            findAll: dummy,
            findAndCountAll: dummy,
            then: dummy,
            catch: dummy,
            update: dummy
        };
        sinon.stub(Car);
        Car.create.returns(Car);
        Car.findOne.returns(Car);
        Car.findAll.returns(Car);
        Car.findAndCountAll.returns(Car);
        Car.then.returns(Car);
        Car.destroy.returns(Car);
        Car.update.returns(Car);

        CarsImages = _.clone(Car);
        Image = _.clone(Car);
        Make = _.clone(Car);
        models = {
          Car: Car,
          CarsImages: CarsImages,
          Image: Image,
          Make: Make
        }

        req = {};
        res = {
            status: dummy,
            send: dummy,
            json: dummy
        };

        sinon.stub(res);
        res.status.returns(res);
        carsController = require('../controllers/carsController')(models);
    });

    afterEach(function() {
        Car = null;
    });

    it('should be possible to save a car to the DBMS', function() {
        req.body = aCar;
        carsController.carsPost(req, res);
        expect(Car.create.called).to.be.true;
        expect(Car.then.called).to.be.true;
        expect(Car.catch.called).to.be.true;
        expect(Car.destroy.called).to.be.false;
        expect(Car.update.called).to.be.false;
    });

    it('should be possible to retrieve one car from the DBMS', function() {
        req.params = {id: 1};
        carsController.carsGet(req, res);
        expect(Car.findOne.called).to.be.true;
        expect(Car.then.called).to.be.true;
        expect(Car.catch.called).to.be.true;
        expect(Car.destroy.called).to.be.false;
        expect(Car.update.called).to.be.false;
    });

    it('should be possible to retrieve all cars from the DBMS', function() {
        req.params = {id: null};
        carsController.carsGetAll(req, res);
        expect(Car.findAndCountAll.called).to.be.true;
        expect(Car.findAll.called).to.be.false;
        expect(Car.then.called).to.be.true;
        expect(Car.catch.called).to.be.true;
        expect(Car.destroy.called).to.be.false;
        expect(Car.update.called).to.be.false;
    });

    it('should be possible to update a car to the DBMS', function() {
        aCar.id = 1;
        req.body = aCar;
        req.params = {id: 1};
        carsController.carsPut(req, res);
        expect(Car.create.called).to.be.false;
        expect(Car.then.called).to.be.true;
        expect(Car.catch.called).to.be.true;
        expect(Car.destroy.called).to.be.false;
        expect(Car.update.called).to.be.true;
    });

    it('should be possible to delete a car from the DBMS', function() {
        req.params = {id: 1};
        carsController.carsDelete(req, res);
        expect(Car.findAll.called).to.be.false;
        expect(Car.then.called).to.be.true;
        expect(Car.catch.called).to.be.true;
        expect(Car.destroy.called).to.be.true;
        expect(Car.update.called).to.be.false;
    });

    it('should be possible to retrieve all models.', function() {
        req.params = {id: 9};
        carsController.carsGetModels(req, res);
        expect(Car.findAll.called).to.be.true;
        expect(Car.then.called).to.be.true;
        expect(Car.catch.called).to.be.true;
        expect(Car.destroy.called).to.be.false;
        expect(Car.update.called).to.be.false;
    });

    it('should be possible to retrieve all years.', function() {
        req.params = {id: 9};
        carsController.carsGetYears(req, res);
        expect(Car.findAll.called).to.be.true;
        expect(Car.then.called).to.be.true;
        expect(Car.catch.called).to.be.true;
        expect(Car.destroy.called).to.be.false;
        expect(Car.update.called).to.be.false;
    });
});
