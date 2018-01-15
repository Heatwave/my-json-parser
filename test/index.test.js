// @ts-check
'use strict';

const parse = require('../index').parse;
// const parse = JSON.parse;
const should = require('chai').should();

describe('myJsonParser', () => {
    describe('parse valid json string', () => {
        it('should parse empty object success', () => {
            const json = '{}';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Object.keys(result).length, 0);
        });

        it('should parse single string success', () => {
            const json = '"value"';
            const result = parse(json);
            result.should.equal('value');
        });

        it('should parse single number success', () => {
            const json = '-123.456E+2';
            const result = parse(json);
            result.should.equal(-12345.6);
        });

        it('should parse single array success', () => {
            const json = '[1, 2, 3]';
            const result = parse(json);
            result.should.be.an('array');
            result.length.should.equal(3);
            result[0].should.equal(1);
            result[1].should.equal(2);
            result[2].should.equal(3);
        });

        it('should parse single true success', () => {
            const json = 'true';
            const result = parse(json);
            result.should.equal(true);
        });

        it('should parse single false success', () => {
            const json = 'false';
            const result = parse(json);
            result.should.equal(false);
        });

        it('should parse single null success', () => {
            const json = 'null';
            const result = parse(json);
            should.equal(null, result);
        });

        it('should parse single string success', () => {
            const json = '{ "key": "value" }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal('value');
        });

        it('should parse single int number success', () => {
            const json = '{ "key": 123 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(123);
        });

        it('should parse single negative int number success', () => {
            const json = '{ "key": -100 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(-100);
        });

        it('should parse single int number with exponential notation success', () => {
            const json = '{ "key": 1e5 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(100000);
        });

        it('should parse single int number with exponential notation success', () => {
            const json = '{ "key": 1E5 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(100000);
        });

        it('should parse single int number with positive exponential notation success', () => {
            const json = '{ "key": 1e+5 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(100000);
        });

        it('should parse single int number with negative exponential notation success', () => {
            const json = '{ "key": 1E-5 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(0.00001);
        });

        it('should parse single float number success', () => {
            const json = '{ "key": 1.234 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(1.234);
        });

        it('should parse single float number success', () => {
            const json = '{ "key": 0.5 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(0.5);
        });

        it('should parse single negative float number success', () => {
            const json = '{ "key": -0.5 }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.equal(-0.5);
        });

        it('should parse single true success', () => {
            const json = '{ "key": true }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.be.true;
        });

        it('should parse single false success', () => {
            const json = '{ "key": false }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.be.false;
        });

        it('should parse single null success', () => {
            const json = '{ "key": null }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(result.key, null);
        });

        it('should parse nested object success', () => {
            const json = '{ "key": { "key": "value" } }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.key.should.equal('value');
        });

        it('should parse empty array success', () => {
            const json = '{ "key": [] }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Array.isArray(result.key), true);
            should.equal(result.key.length, 0);
        });

        it('should parse array with single number success', () => {
            const json = '{ "key": [123] }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Array.isArray(result.key), true);
            should.equal(result.key.length, 1);
            result.key[0].should.equal(123);
        });

        it('should parse array with single string success', () => {
            const json = '{ "key": ["value"] }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Array.isArray(result.key), true);
            should.equal(result.key.length, 1);
            result.key[0].should.equal('value');
        });

        it('should parse array with single object success', () => {
            const json = '{ "key": [{}] }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Array.isArray(result.key), true);
            should.equal(result.key.length, 1);
            result.key[0].should.be.an('object');
        });

        it('should parse array with single true success', () => {
            const json = '{ "key": [true] }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Array.isArray(result.key), true);
            should.equal(result.key.length, 1);
            result.key[0].should.equal(true);
        });

        it('should parse array with single false success', () => {
            const json = '{ "key": [false] }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Array.isArray(result.key), true);
            should.equal(result.key.length, 1);
            result.key[0].should.equal(false);
        });

        it('should parse array with single null success', () => {
            const json = '{ "key": [null] }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Array.isArray(result.key), true);
            should.equal(result.key.length, 1);
            should.equal(null, result.key[0]);
        });

        it('should parse array with single array success', () => {
            const json = '{ "key": [[]] }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Array.isArray(result.key), true);
            should.equal(result.key.length, 1);
            result.key[0].should.be.an('array');
            result.key[0].length.should.equal(0);
        });

        it('should parse two key success', () => {
            const json = '{ "key1": 123, "key2": "value" }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Object.keys(result).length, 2);
            result.key1.should.equal(123);
            result.key2.should.equal('value');
        });

        it('should parse two key success', () => {
            const json = '{ "key1": "value", "key2": 123 }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Object.keys(result).length, 2);
            result.key1.should.equal('value');
            result.key2.should.equal(123);
        });

        it('should parse two key success', () => {
            const json = '{ "key1": [], "key2": true }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Object.keys(result).length, 2);
            result.key1.should.be.an('array');
            result.key2.should.equal(true);
        });

        it('should parse three key success', () => {
            const json = '{ "key1": [], "key2": true, "key3": -0.123E2 }';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Object.keys(result).length, 3);
            result.key1.should.be.an('array');
            result.key2.should.equal(true);
            result.key3.should.equal(-12.3);
        });

        it('should parse empty success', () => {
            const json = '  { "key":      true,    "key1":  "  123"}  ';
            const result = parse(json);
            result.should.be.an('object');
            should.equal(Object.keys(result).length, 2);
            result.key.should.be.true;
            result.key1.should.equal('  123');
        });

        it('should parse complex json success', () => {
            const json = '{ "key": { "key": "value", "key1": [ 1, 2, 3 ], "key2": { "key": 123, "key1": true, "key2": [ true, false, true ], "key3": { "key": null, "key1": "abc\\"qwe", "key2": -0.123E-3 } } } }';
            const result = parse(json);
            result.should.be.an('object');
            result.key.should.be.an('object');
            result.key.key.should.equal('value');
            result.key.key1.should.an('array');
            result.key.key1.length.should.equal(3);
            result.key.key1[0].should.equal(1);
            result.key.key1[1].should.equal(2);
            result.key.key1[2].should.equal(3);
            result.key.key2.should.an('object');
            result.key.key2.key.should.equal(123);
            result.key.key2.key1.should.be.true;
            result.key.key2.key2.length.should.equal(3);
            result.key.key2.key2[0].should.be.true;
            result.key.key2.key2[1].should.be.false;
            result.key.key2.key2[2].should.be.true;
            result.key.key2.key3.should.an('object');
            should.equal(null, result.key.key2.key3.key);
            result.key.key2.key3.key1.should.equal('abc"qwe');
            result.key.key2.key3.key2.should.equal(-0.000123);
        });
    });

    describe('parse invalid json string', () => {
        it('should throw exception', () => {
            const json = '{';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{{}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{}{}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{[]}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{\'123\': 123}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{"key",}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{"key":,}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{ "key": 1 23}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{  "ke y": ';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{,}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{"key": 123,}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{"key": 123, "key1": "123" , }';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{ "key" 123}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{"key": , "key1": 123}';
            (() => parse(json)).should.throw(SyntaxError);
        });

        it('should throw exception', () => {
            const json = '{ "key": [1, 2,]}';
            (() => parse(json)).should.throw(SyntaxError);
        });
    });
});