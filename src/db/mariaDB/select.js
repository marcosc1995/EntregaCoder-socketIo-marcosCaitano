const { options } = require ('./optionsMariaDB')
const knex = require('knex')(options)
const createTable = require('../mariaDB/createTable')

async function selectProductos() {
   
    
    const list = await knex.from('productos').select('*')
    return list
}

module.exports = selectProductos