const router = require('express').Router()

const { fn, col } = require('sequelize');
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        'author', 
        [fn('COUNT', col('title')), 'articles'], 
        [fn('SUM', col('likes')), 'likes']
      ],
      order: [['likes', 'DESC']],
      group: 'author'
    })

    res.json(authors)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router