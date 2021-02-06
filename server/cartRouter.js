const express = require('express');
const handler = require('./handler');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('server/db/getBasket.json', 'utf8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/getBasket.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/getBasket.json');
});

router.delete('/:id', (req, res) => {
    handler(req, res, 'del', 'server/db/getBasket.json');
});

module.exports = router;