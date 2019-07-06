var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;

var func1 = require('../src/function1.js');
var func2 = require('../src/function2.js');
var func3 = require('../src/function3.js');
//var funcIndex = require('../src/index.js');

describe('Istanbul Code Coverage PoC', function() {  
    describe('Code coverage check for nested function calls', function() {
        it('function1 implicit', function() {
            expect(func1.function1()).to.be.equal("hello function 1");
        });

        it('function2 implicit', function() {
            expect(func2.function2()).to.be.equal("hello function 2");
        });

        it('function3 implicit', function() {
            expect(func3.function3()).to.be.equal("hello function 3 ... hello function 4");
        });

        //it('indexFunction implicit', function() {
        //    expect(function (){
        //        funcIndex.indexFunction();
        //    }).not.to.throw(Error);
        //});
    });
});