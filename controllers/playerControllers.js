import connection from "../config/db.js";
import Player from "../models/player.js";
import Team from "../models/team.js";

const getAll = async (req,res) => {
    try{
        let players = await Player.findAll({
            attributes: ["idplayer","name","last_name","age"],
            include: {
                model: Team,
                attributes: ["name", "idteam"],
                as: "team"
            }
        });
        res.send(players);  
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error ocurred while retrieving players"
        });
    }
};

const getById = async (req,res) => {
    try{
        let id = req.params.id;
        let player = await Player.findByPk(id,{
            attributes: ["idplayer", "name","last_name","age"],
            include: {
                model: Team,
                attributes: ["name", "idteam"],
                as: "team"
            }
        });
        if (!player) {
            res.status(404).send({
                message: `Cannot find player with id=${id}.`
            });
        }else{
            res.send(player);
        }
    }catch (error) {
        res.status(500).send({
            message:error.message || "Some error ocurred while retrieving players."
        });
    }
};

const create = async (req,res) => {
    try{
        let name = req.body.name;
        let last_name = req.body.last_name;
        let age = req.body.age;
        let idteam = req.body.idteam;
        let player = await Player.create({
            "name": name, 
            "last_name":last_name, 
            "age":age, 
            "idteam":idteam});
        res.send(player);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while creating players."
      });
    }
};

const update = async (req,res) => {
    try{
        let name = req.body.name;
        let last_name = req.body.last_name;
        let age = req.body.age;
        let idteam = req.body.idteam;
        let idplayer = req.params.id;

        let player = await Player.update ({
            "name":name,
            "last_name":last_name,
            "age":age,
            "idteam":idteam},{
                where: {
                    idplayer: idplayer
                }
        });
        /*opción 2
        let player = Player.findByPK(idplayer);
        player.name = name;
        player.last_name = last_name:
        player.age = age;
        player.idteam = idteam;
        player.save();
        */
        res.send(player);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while updating players."
      });
    }
}

const deletes = async (req,res) => {
    try{
        let idplayer = req.params.id;
        let player = await Player.destroy({
            where: {
                idplayer : idplayer
            } 
        });
        console.log(player);
        if (player === 0){
            res.status(404).send({
                message: `Player with id=${idplayer} not found.`
            });
        } 
        else{
            res.send("player deleted");
        }
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while deleting players."
        });
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    deletes,
}