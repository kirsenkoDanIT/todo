const express = require('express')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')

const indexPage = require('./routes/index')
const listsPage = require('./routes/lists')
const config = require('./config')



const app = express()

app.set('view engine', 'ejs')
app.set("layout extractScripts", true)

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(expressLayouts)
app.use(indexPage)
app.use(listsPage)

app.use(express.static(path.join(__dirname, 'static')))


async function start() {
    try {
        await mongoose.connect(config.DB, {
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(config.PORT, () => {
            console.log(`Started on port ${config.PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()

