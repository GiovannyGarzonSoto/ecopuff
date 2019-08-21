const router = require('express').Router()
const cloudinary = require('cloudinary')
const fs = require('fs-extra')
const pool = require('../database')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.send('login')
})

module.exports = router
