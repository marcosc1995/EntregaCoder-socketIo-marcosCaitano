const { options } = require("./optionsMariaDB");
const knex = require("knex")(options);

async function createTable() {
    await knex.schema.hasTable('productos').then(function(exists){
        if (!exists){
            return knex.schema.createTable('productos', (table)=>{
                table.increments("id");
                table.string("title");
                table.float("price");
                table.string("productImg");
                console.log('La tabla "productos" se ha creado');
            })
        }
    })
//   await knex.schema.hasTable("productos");
//   return knex.schema.createTable("productos", (table) => {
//     table.increments("id");
//     table.string("title");
//     table.float("price");
//     table.string("productImg");
//     console.log('La tabla "productos" se ha creado');
//   });
// }
//   return knex.schema.createTableIfNotExists("productos", (table) => {
//     table.increments("id");
//     table.string("title");
//     table.float("price");
//     table.string("productImg");
//     console.log('La tabla "productos" se ha creado');
//   });
//   return knex.schema.dropTableIfExists("productos").finally(() => {
//     return knex.schema.createTable("productos", (table) => {
//       table.increments("id");
//       table.string("title");
//       table.float("price");
//       table.string("productImg");
//       console.log('La tabla "productos" se ha creado');
//     });
//   });
}
module.exports = createTable;
