const moment = require("moment");
const insertMensaje = require('../../src/db/SQLite/insert')
const selectMensajes = require('../../src/db/SQLite/select')
const createTableMsj = require('../../src/db/SQLite/createTable')
class ControllerChat {

  async loadMessage() {
    try {
        await createTableMsj()
      const listaMensajes = await selectMensajes();
      return listaMensajes;
    } catch (e) {
      throw new Error(`Se produjo un error en loadMessage: ${e.message}`);
    }
  }

  async saveMessage(data) {
    try {
      const newMessage = {
        email: data.email,
        mensaje: data.mensaje,
        date: moment().format(),
      };
      await insertMensaje(newMessage);
      return newMessage;
    } catch (e) {
      throw new Error(
        `Se produjo un error al guardar un nuevo mensaje: ${e.message}`
      );
    }
  }
}

module.exports = ControllerChat;
