const knex = require("knex");

const config = {
  client: "sqlite3",
  connection: {
    filename: './src/db/ecommerce.sqlite',
  },
  useNullAsDefault: true,
};

class ClienteSql {
  constructor() {
    this.knex = knex(config);
  }

  async createTable() {
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

  insertArticles(articles) {
    return this.knex("mensajes").insert(articles);
  }

  getArticles() {
    return this.knex("mensajes").select("*");
  }

  getArticleById(id) {
    return this.knex("mensajes").select("*").where("id_articulo", id);
  }

  updateArticle(id, article) {
    return this.knex("mensajes").where("id_articulo", id).update(article);
  }

  deleteArticle(id) {
    return this.knex("mensajes").where("id_articulo", id).del();
  }

  updateArticleStock(id, newStock) {
    return this.knex("mensajes")
      .where("id_articulo", id)
      .update({ stock: newStock });
  }

  close() {
    return this.knex.destroy();
  }
}

module.exports = ClienteSql;
