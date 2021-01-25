const User = require("../models/User");

const User = require('../models/User');

/*
*  req => Son todos los parametro que recibimos.
*  res => Respuesta
*/

function create(req, res) {
    var user = new User();
    var params = req.body;

    user.firstName = params.firstName;
    user.lastName = params.lastName;
    user.email = params.email;
    user.age = params.age;
    user.role = params.role;

    user.save((error, userCreate) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: "Error en el servidor"
            })
        } else {
            if (!userCreated) {
                res.status(400).send({
                    statusCode: 400,
                    message: "Error al insertar el usuario"
                })
            } else {
                res.status(200).send({
                    statusCode: 200,
                    message: "Usuario almacenado correctamente",
                    dataUser: userCreated
                })
            }
        }
    })
}

function update(req, res) {
    var parameters = req.body;
    var idUser = req.params.idUser;

    User.findByIdAndUpdate(idSUer, parameters, (error, userUpdated), (error) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: "Error en el servidor"
            })
        } else {
            if (!userUpdated) {
                res.status(400).send({
                    statusCode: 400,
                    message: "Error al actualizar el usuario"
                })
            } else {
                res.status(200).send({
                    statusCode: 200,
                    message: "Usuario actualizado correctamente"
                })
            }
        }
    })
}

function remove(req, res){
    var idUser = req.params.idUser;

    User.findByIdAndDelete(idUser, (error, userRemoved) => {
        if(error){
            res.status(500).send({
                statusCode: 500,
                message: "Error en el servidor"
            })
        } else {
            if (!userRemoved){
                res.status(500).send({
                    statusCode: 400,
                    message: "Error al eliminar el usuario"
                })
            } else {
                res.status(200).send({
                    statusCode: 200,
                    message: "Usuario eliminado correctamente"
                })
            }
        }
    })
}

function getAllUsers(req, res){
    var role = req.params.role;
    User.find({role: role}, (error, AllUsers) => {
        if (error){
            res.statusCode(500).send({
                statusCode: 500,
                message: "Error en el servidor"
            })
        } else {
            res.statusCode(200).send({
                statusCode: 200,
                message: "Todos los usuarios",
                allUsers: allUsers
            })
        }
    })
}

module.exports = {
    create,
    update,
    remove,
    getAllUsers
}