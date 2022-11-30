const { options } = require("./optionsSQLite3");
const knex = require("knex")(options);

async function createTableMsj() {
  await knex.schema.hasTable("mensajes").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("mensajes", (table) => {
        table.increments("id");
        table.string("email");
        table.string("mensaje");
        table.timestamp("date");
        console.log('La tabla "mensajes" se ha creado');
      });
    }
  });
}

module.exports = createTableMsj;
