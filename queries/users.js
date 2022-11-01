const db = require('../db/index.js');

const getUsers = async (req,res,next) => {
    try {
        let users = await db.any("SELECT * FROM users");
        res.status(200).json({
            users,
            status:"success",
            message:"ALL USERS"
        })    
    } catch (err) {
        next(err)
        
    }
}

const getUser = async (req,res,next) => {
    try {
        let user = await db.one("SELECT * FROM users WHERE id = $1", req.params.id);
        res.status(200).json({
            user,
            status:"success",
            message:"ALL USERS"
        })
        
    } catch (err) {
        next(err)
        
    }
}

const createUser = async (req,res,next) => {
    try {
        let user = await db.one("INSERT INTO users(name, age) VALUES(${name}, ${age}) RETURNING *", req.body);
        res.status(200).json({
            user,
            status:"success",
            message:"NEW USER UPDATED"
        })
    } catch (err) {
        next(err);
        
    }
}

const deleteUser = async (req,res,next) => {
    try {
        await db.none("DELETE FROM users WHERE id = $1", req.params.id);
        res.status(200).json({
           
            status:"success",
            message:" USER DELETED"
        })

        
    } catch (err) {
        next(err)
        
    }
}



module.exports = {getUsers, getUser, createUser, deleteUser};