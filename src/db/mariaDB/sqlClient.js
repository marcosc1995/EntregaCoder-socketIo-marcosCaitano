const { options } = require ('./optionsMariaDB')
const knex = require('knex')(options)

class ClienteSql {
  constructor(options) {
    this.knex = knex;
  }

  createTable() {
    return this.knex.schema.dropTableIfExists("productos").finally(() => {
      return this.knex.schema.createTable("productos", (table) => {
        table.increments("id");
        table.string("title");
        table.float("price");
        table.string("productImg");
        console.log('La tabla "productos" se ha creado');
      });
    });
  }

  insertArticles(articles) {
    return this.knex("productos").insert(articles);
  }

  getArticles() {
    return this.knex("productos").select("*");
  }

  getArticleById(id) {
    return this.knex("productos").select("*").where("id_articulo", id);
  }

  updateArticle(id, article) {
    return this.knex("productos").where("id_articulo", id).update(article);
  }

  deleteArticle(id) {
    return this.knex("productos").where("id_articulo", id).del();
  }

  updateArticleStock(id, newStock) {
    return this.knex("productos")
      .where("id_articulo", id)
      .update({ stock: newStock });
  }

  close() {
    return this.knex.destroy();
  }
}

module.exports = ClienteSql
