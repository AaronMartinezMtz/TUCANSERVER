const { Router } = require('express');
const { check } = require('express-validator');
const { register, getAllArticles } = require('../controllers/articles.controllers')
const { validarCampos } = require('../middlewares/validar-campos.middleware');


const router = Router();

router.post('/register', [
    check('date', 'El date es requerido.').not().isEmpty(),
    check('category', 'El category es requerido.').not().isEmpty(),
    check('title', 'El title es requerido.').not().isEmpty(),
    check('description', 'El description es requerido.').not().isEmpty(),
    check('body', 'El body es requerido.').not().isEmpty(),
    check('image', 'El image es requerido.').not().isEmpty(),
    validarCampos
], register);

router.get('/all',getAllArticles);



module.exports = router;