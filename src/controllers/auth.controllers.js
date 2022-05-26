const { response } = require('express');
const User = require('../models/user');
const { generarJWT } = require('../helpers/jwt.helper');




const register = async(req, res = response ) => {

    const { No_control, password } = req.body;

    try {
        
        const doesExist = await User.findOne({ No_control });

        if (doesExist) {
            return res.status(400).json({
                status: false,
                message: `Ya existe un usuario con el No_control ${ No_control }.`
            })
        }

        const data = {
            ...req.body
        }

        const user = new User(data);
        const savedUser = await user.save();
        const accessToken = await generarJWT(savedUser.id, savedUser.No_control);

        res.status(201).json({
            accessToken,
            message: `Usuario creado con éxito`,
            status: true,
            user: savedUser,
        })


    } catch( error ) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }

}



////////////////////////////////////////////////////////////////////////


const login = async(req, res = response) => {

    const { No_control, password } = req.body;

    try {

        const user = await User.findOne({ No_control })


        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'Username inválido.'
            })
        }



        if (!password) {
            return res.status(404).json({
                status: false,
                message: 'Contraseña inválida.'
            });
        }


        const accessToken = await generarJWT(user.id, user.No_control);


        res.status(200).json({
            accessToken,
            status: true,
            user,
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }
    
}







const renewJWT = async(req, res = response) => {

    const id = req.id
    const role = req.role
    const accessToken = await generarJWT(id, role)
    const user = await User.findById(id)


    let deptartament;
    if ( user.role == 'USER_ROLE' ) {
        deptartament = await Department.findOne({ user }, '_id name ubication')
    }

    res.json({
        accessToken,
        deptartament,
        menu: getMenuFrontEnd( user.role ),
        status: true,
        user,
    })
}


module.exports = {
    register,
    login,
    renewJWT
}
