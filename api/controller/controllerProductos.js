const selectProductos = require('../../src/db/mariaDB/select')
const insertProducto = require('../../src/db/mariaDB/insertProduct')
const createTable = require('../../src/db/mariaDB/createTable')
// const sqlClient = require('../../src/db/mariaDB/sqlClient')
// const { default: ClienteSql } = require('../../src/db/mariaDB/sqlClient')
// const options = require('../../src/db/mariaDB/optionsMariaDB')
// const sql = new sqlClient(options)

// sql.createTable().then(()=>{
//     console.log('tabla creada')
// })

class ControllerProductos{

    
    async getAllProductos(){
        try {
            await createTable()
            const list = await selectProductos()
            return list
        } catch(error){
            throw new Error(`Se produjo un error en getAllProductos: ${error.message}`)
        }
    }

    async saveProductos(producto){
        try{
            const newProducto = {
                title: producto.title,
                price: producto.price,
                productImg: producto.productImg,
            }
            await insertProducto(newProducto)
            return newProducto

        } catch(error){
            throw new Error(`Se produjo un error al guardar el nuevo producto: ${error.message}`)
        }
    }
}

module.exports = ControllerProductos
