// const express = require('express')
const rateLimit = require('api-rate-limiter-middleware')
const BlogLimiter = rateLimit({
    minutes: 5,
    maxRequests: 40
})
module.exports = BlogLimiter;
