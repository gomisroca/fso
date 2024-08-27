require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')
const { DATABASE_URL } = require('./utils/config')

const sequelize = new Sequelize(DATABASE_URL)

const main = async () => {
  try {
    const blogs = await sequelize.query("SELECT * FROM blogs", { type: QueryTypes.SELECT })
    for (const blog of blogs) {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
    }
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()