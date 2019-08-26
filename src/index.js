const express = require('express')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
const exphbs = require('express-handlebars')
const cloudinary = require('cloudinary')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

const app = express()
require('./database')
require('./passport/local-auth')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public/uploads'),
    filename(req, file, callback) {
        callback(null, new Date().getTime()+path.extname(file.originalname))
    }
})

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 20000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if(mimetype && extname) {
            return cb(null, true)
        }
        cb("error: archivo debe ser una imagen valida")
    }
}).single('image'))


cloudinary.config({
    cloud_name: 'damnrp3tn',
    api_key: '477111763213311',
    api_secret: 'CVu_5qXOcGbmHKFTbL9pyso31pE'
})

app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use(require('./routes/index'))

app.use('/public', express.static(path.join(__dirname, '/public')))

app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en el puerto ${app.get('port')}`)
})