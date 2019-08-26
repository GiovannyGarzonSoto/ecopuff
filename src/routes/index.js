const router = require('express').Router()
const fs = require('fs-extra')
const Photo = require('../models/photos')
const cloudinary = require('cloudinary')
const passport = require('passport')

cloudinary.config({
    cloud_name: 'damnrp3tn',
    api_key: '477111763213311',
    api_secret: 'CVu_5qXOcGbmHKFTbL9pyso31pE'
})

router.get('/', async(req, res) => {
    const photos = await Photo.find()
    res.render('index', {photos})
})

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/admin',
    failureRedirect: '/signup',
    passReqToCallback: true
}))

router.get('/signin', (req, res, next) => {
    res.render('signin')
})

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/admin',
    failureRedirect: '/signin',
    passReqToCallback: true
}))

router.get('/logout', (req, res, next) => {
    req.logout()
    res.redirect('/')
})

router.get('/admin', isAuthenticated, async(req, res) => {
    const photos = await Photo.find()
    res.render('admin', {photos})
})

router.post('/image', isAuthenticated, async(req, res) => {
    const { title, description } = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const newPhoto = new Photo({
        title,
        description,
        imageURL: result.secure_url,
        public_id: result.public_id
    })
    await newPhoto.save()
    await fs.unlink(req.file.path)
    res.redirect('/admin')
})

router.get('/images/delete/:id', isAuthenticated, async(req, res) => {
    const {id} = req.params
    const result = await Photo.findByIdAndDelete(id)
    const data = await cloudinary.v2.uploader.destroy(result.public_id)
    console.log(data)
    res.redirect('/admin')
})

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next()
    }
    res.redirect('/')
}

module.exports = router