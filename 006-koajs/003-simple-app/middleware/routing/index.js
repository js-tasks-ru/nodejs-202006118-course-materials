const Router = require('@koa/router');
const booksController = require('./../../controller/books');

const router = new Router(/*{prefix: '/api'}*/);

router.get('/books', booksController.getAll);
router.get('/books/:id', booksController.getById);
router.post('/books', booksController.create);
router.put('/books/:id', booksController.update);
router.delete('/books/:id', booksController.delete);

module.exports = router;
