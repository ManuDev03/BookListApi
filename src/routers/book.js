const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/books', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        owner: req.user._id
    })

    try {
        await book.save()
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/booksforall',  async (req, res) => {
    try {

        const books = await Book.find({})
        res.send(books)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/books', auth,  async (req, res) => {
    try {
        
        await req.user.populate('books').execPopulate()
        res.send(req.user.books)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/books/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        
        const book = await Book.findOne({_id, owner: req.user._id})

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/books/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const book = await Book.findById(req.params.id)

        updates.forEach((update) => book[update] = req.body[update])
        await book.save()

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id)

        if (!book) {
            res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router