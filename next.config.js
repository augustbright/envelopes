const withSass = require('@zeit/next-sass');

module.exports = withSass({
    publicRuntimeConfig: {
        apiAddress: process.env.ENVELOPES_API_ADDRESS,
        clientAddress: process.env.ENVELOPES_CLIENT_ADDRESS
    }
});
