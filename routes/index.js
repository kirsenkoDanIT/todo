const Router = require('express')
const router = Router()
const TODO = require('../models/todo')

router.get('/', async (req, res) => {
    try {
        const lists = await TODO.find({})
        console.log(lists);
        res.render('index', {
            title: 'Home',
            lists
        })
    } catch (error) {
        console.log(error);
    }

})

module.exports = router