const { Router } = require('express');
const { check } = require('express-validator');
const { register, login, renewJWT } = require('../controllers/auth.controllers.js');
const { validarCampos } = require('../middlewares/validar-campos.middleware');
const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validar-jwt.middleware');


const router = Router();


router.post('/login', [
    check('No_control', 'El username es requerido.').not().isEmpty(),
    check('password', 'El password es requerido.').not().isEmpty(),
    validarCampos
], login);

router.post('/register', [
    check('No_control', 'El username es requerido.').not().isEmpty(),
    check('f_name', 'El name es requerido.').not().isEmpty(),
    check('l_name', 'El name es requerido.').not().isEmpty(),
    check('major', 'El name es requerido.').not().isEmpty(),
    check('semester', 'El name es requerido.').not().isEmpty(),
    check('password', 'El password es requerido.').not().isEmpty()
], register);




router.get('/renew', validarJWT, renewJWT);



module.exports = router;