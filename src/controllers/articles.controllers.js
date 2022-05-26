
const { response } = require('express');
const bcrypt = require('bcrypt');
const Article = require('../models/article');

const register = async(req, res = response ) => {

    try {

        const data = {
            ...req.body
        }

        const article = new Article(data);

        const savedArticle = await article.save();
        
        res.status(201).json({
            message: `Articulo Creado con exito`,
            status: true,
            article: savedArticle,
        })


    } catch( error ) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }

}


const getAllArticles = async(req, res = response ) => {

    try {
        

        const Articles = await Article.find()

        res.status(201).json({
            status: true,
            articles: Articles
        })


    } catch( error ) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: 'Hable con el administrador'
        })
    }

}



module.exports = {
    register,
    getAllArticles
}
