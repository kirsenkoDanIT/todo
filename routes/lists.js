const Router = require('express')
const router = Router()
const TODO = require('../models/todo')

router.get('/lists', (req, res) => {
    res.render('lists', {
        title: 'list create'
    })
})

router.post('/api/lists', async (req, res) => {
    try {
        const list = await new TODO({
            title: req.body.title,
            text: req.body.text
        })
        await list.save()
            console.log('created')        
    } catch (error) {
        console.log(error);
    }

})

router.get('/lists/:id', async (req, res) => {
    try {
        let todo
        const lists = await TODO.find({
            _id: req.params.id
        })
        lists.forEach(item => todo = item)
        res.render('list', {
            title: 'todo',
            todo
        })
    } catch (error) {
        console.log(error)
    }

})

router.delete('/api/lists/:id', async (req, res) => {
    try {
        await TODO.findOneAndDelete({
            _id: req.body.id
        })
        console.log('deleted')
    } catch (error) {
        console.log(error)
    }
})

router.put("/api/lists/:id", async (req, res) => {
    console.log(req.body)
    console.log(req.params.id);
    try {
        const list = await TODO.findOneAndUpdate({
            _id: req.params.id,
        }, {
            title: req.body.title,
            text: req.body.text
        })
        console.log(list);
        console.log('edited')
    } catch (err) {
        console.log(err)
    }
    
})

module.exports = router