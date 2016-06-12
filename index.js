'use strict'

module.exports = {

    _productionConfig: null,

    _devOverrides: null,

    init: function(productionConfig, devOverrides) {
        if (!productionConfig) {
            throw new Error('you must provide a first argument - productionConfig')
        }

        if (!devOverrides) {
            devOverrides = {}
        }
        else if (typeof devOverrides !== 'object') {
            throw new Error('init expects second argument (devOverrides) to be an object but instead received ' + typeof devOverrides)
        }

        if (typeof productionConfig !== 'object') {
            throw new Error('init expects first argument (productionConfig) to be an object but instead received ' + typeof productionConfig)
        }

        this._productionConfig = productionConfig
        this._devOverrides = devOverrides
    },

    get: function(parentConfigKey, nestedConfigKey) {
        if (!this._productionConfig) {
            throw new Error('you must first call init before you can call get function')
        }

        if (!parentConfigKey) {
            throw new Error('get function expects parent config key as first argument');
        }
        else if (!this._productionConfig[parentConfigKey] && !this._devOverrides[parentConfigKey]) {
            throw new Error('Config key "' + parentConfigKey + '" does not exist.');
        }
        else if (parentConfigKey && nestedConfigKey) {
            if (typeof this._devOverrides[parentConfigKey] !== 'object' && typeof this._productionConfig[parentConfigKey] !== 'object') {
                throw new Error('Config key "' + parentConfigKey + '" is not a nested group. It is a ' + typeof this._productionConfig[parentConfigKey])
            }
            else if (
                (this._devOverrides[parentConfigKey] && !this._devOverrides[parentConfigKey][nestedConfigKey])
                && (this._productionConfig[parentConfigKey] && !this._productionConfig[parentConfigKey][nestedConfigKey])
            ) {
                throw new Error('Config key "' + nestedConfigKey + '" does not exist in config group "' + parentConfigKey + '".')
            }
        }

        if (parentConfigKey && nestedConfigKey) {
            if (this._devOverrides[parentConfigKey] && this._devOverrides[parentConfigKey][nestedConfigKey]) {
                return this._devOverrides[parentConfigKey][nestedConfigKey]
            }
            else if (this._productionConfig[parentConfigKey] && this._productionConfig[parentConfigKey][nestedConfigKey]) {
                return this._productionConfig[parentConfigKey][nestedConfigKey];
            }
        }
        else {
            if (this._devOverrides[parentConfigKey]) {
                return this._devOverrides[parentConfigKey]
            }
            else {
                return this._productionConfig[parentConfigKey]
            }
        }
    }
};