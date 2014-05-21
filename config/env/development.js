'use strict';

module.exports = {
    db: 'mongodb://khalid:w4mpw4mp@ds053188.mongolab.com:53188/toosents',
    app: {
        name: 'www.toosents.com'
    },
    facebook: {
        clientID: '448805395254583',
        clientSecret: '579e7fffe5b01edc89a231b684d16091',
        callbackURL: 'https://www.toosents.com/auth/facebook/callback'
    },
    twitter: {
        clientID: 'mgJmjy2ZiZp8OxBp21c5YzwSH',
        clientSecret: 'eTTOF7NdliOzvpgdhfVEBlm3F1nlPuhOQisDq1GknzMMP7xt9F',
        callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    google: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://localhost:3000/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://localhost:3000/auth/linkedin/callback'
    }
};
