// const express = require('express')
const rateLimit = require('api-rate-limiter-middleware')
const BlogLimiter = rateLimit({
    minutes: 5,
    maxRequests: 3
})
module.exports = BlogLimiter;