const db = require('./../db/data.json');

module.exports = {
  getAll(ctx, next) {
    ctx.body = db.map((book, id) => {
      return {
        ...book,
        id,
      }
    });
  },

  getById(ctx, next) {
    const id = ctx.params.id;

    if (id > db.length-1) {
      ctx.throw(404);
      return;
    }

    ctx.body = {
      ...db[id],
      id: Number(id),
    };
  },

  create(ctx, next) {
    const {title, author} = ctx.request.body;
    const newLength = db.push({title, author});
    ctx.body = {
      id: newLength - 1,
      title,
      author,
    }
  },

  update() {
  },

  delete() {
  },
}
