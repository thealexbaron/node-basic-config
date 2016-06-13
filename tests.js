var assert = require('chai').assert;
var config = require('./')

describe('Config', function() {
    describe('#get()', function() {
        it('should throw if not initialized', function() {
            assert.throws(function() {
                config.get('someKey')
            }, 'you must first call init before you can call get function')
        })

        it('should throw when trying to retrieve non-existent key', function() {
            config.init({})

            assert.throws(function() {
                config.get('someKey')
            }, 'Config key "someKey" does not exist.')
        })

        it('should throw when trying to retrieve non-existent nested key', function() {
            config.init({someKey: 'someVal'})

            assert.throws(function() {
                config.get('someKey', 'someNestedKey')
            }, 'Config key "someKey" is not a nested group.')
        })

        it('should retrieve parent key', function() {
            config.init({someKey: 'someVal'})

            assert.equal(config.get('someKey'), 'someVal')
        })

        it('should retrieve nested key', function() {
            config.init({someKey: { someNestedKey: 'someNestedVal' }})

            assert.equal(config.get('someKey', 'someNestedKey'), 'someNestedVal')
        })

        it('should retrieve overridden parentKey', function() {
            config.init({someKey: 'someVal'}, {someKey: 'someDevVal'})

            assert.equal(config.get('someKey'), 'someDevVal')
        })

        it('should retrieve overridden nestedKey', function() {
            config.init({someKey: { someNestedKey: 'someNestedVal' }}, {someKey: { someNestedKey: 'someDevNestedVal' }})

            assert.equal(config.get('someKey', 'someNestedKey'), 'someDevNestedVal')
        })

        it('should retrieve parent key even if config key is false', function() {
            config.init({someKey: false})

            assert.equal(config.get('someKey'), false)
        })

        it('should retrieve parent key even if config key is empty string', function() {
            config.init({someKey: ''})

            assert.equal(config.get('someKey'), '')
        })

        it('should retrieve nested key even if config key is false', function() {
            config.init({someKey: {nestedKey: false}})

            assert.equal(config.get('someKey', 'nestedKey'), false)
        })
    })

    describe('#init()', function() {
        it('should throw if initialized with non-object - productionConfig', function() {
            assert.throws(function() {
                config.init('stringWhereObjectShouldBe', {})
            }, /init expects first argument \(productionConfig\) to be an object but instead received/)
        })

        it('should not throw if initialized with null - devOverrides', function() {
            assert.doesNotThrow(function() {
                config.init({}, null)
            })
        })

        it('should not throw when called with objects', function() {
            assert.doesNotThrow(function() {
                config.init({}, {})
            })
        })
    })
})