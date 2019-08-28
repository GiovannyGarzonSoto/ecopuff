const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://finaluser:user@cluster0-hovsi.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
.then(db =>  console.log('Base de datos conectada'))
.catch(err => console.error(err))

