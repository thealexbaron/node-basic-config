# node-basic-config

basic-config does not handle reading config files.
It has an init function that takes two objects that
represent your production, and dev config.

Once you have initialized your config, you can call
`config.get(parentConfigKey, nestedConfigKey)`. If a
key does not exist, an error will be thrown.

# Usage

    var config = require('config')

    config.init({
        // production config
        siteUrl: 'http://production.site',
        mailServiceCredentials: {
            username : 'production@user.com',
            password : 'userp@ss'
        }
    }, {
        // dev config
        siteUrl: 'http://dev.site',
        mailServiceCredentials: {
            username : 'development@user.com',
            password : 'devp@ss'
        }
    })

    console.log(
        config.get('siteUrl') //http://dev.site
    )

    console.log(
        config.get('mailServiceCredentials', 'username') // development@user.com
    )

