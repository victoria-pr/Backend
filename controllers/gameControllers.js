import Stadium from "../models/stadium.js";
import Game from "../models/game.js";
import Tournament from "../models/tournament.js";

const getAll = async (req,res) => {
    try{
        let games = await Game.findAll({
            attributes: ["idgame","name","datetime","idstadium", "idtournament"],
            include: [
                {model: Stadium,
                attributes: ["name", "idstadium"],
                as: "stadium"},
                {model: Tournament,
                attributes: ["name", "idtournament"],
                as: "tournament"}
            ]
        });
        res.send(games);  
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error ocurred while retrieving games"
        });
    }
};

const getById = async (req,res) => {
    try{
        let id = req.params.id;
        let game = await Game.findByPk(id,{
            attributes: ["idgame","name","datetime","idstadium", "idtournament"],
            include: [
                {model: Stadium,
                attributes: ["name", "idstadium"],
                as: "stadium"},
                {model: Tournament,
                attributes: ["name", "idtournament"],
                as: "tournament"}
            ]
        });
        if (!game) {
            res.status(404).send({
                message: `Cannot find game with id=${id}.`
            });
        }else{
            res.send(game);
        }
    }catch (error) {
        res.status(500).send({
            message:error.message || "Some error ocurred while retrieving game."
        });
    }
};

const create = async (req,res) => {
    try{ 
        let name = req.body.name;
        let datetime = req.body.datetime;
        let idstadium = req.body.idstadium;
        let idtournament = req.body.idtournament;
        let game = await Game.create({
            "name":name, 
            "datetime":datetime,
            "idstadium":idstadium,
            "idtournament":idtournament,});
        res.send(game);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while creating game."
      });
    }
};

const update = async (req,res) => {
    try{
        let name = req.body.name;
        let datetime = req.body.datetime;
        let idstadium = req.body.idstadium;
        let idtournament = req.body.idtournament;
        let idgame = req.params.id;

        let game = await Game.update ({
            "name":name, 
            "datetime":datetime,
            "idstadium":idstadium,
            "idtournament":idtournament},{
                where: {
                    idgame: idgame
                }
        });
        res.send(game);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while updating games."
      });
    }
}

const deletes = async (req,res) => {
    try{
        let idgame = req.params.id;
        let game = await Game.destroy({
            where: {
                idgame : idgame
            } 
        });
        console.log(game);
        if (game === 0){
            res.status(404).send({
                message: `Game with id=${idgame} not found.`
            });
        } 
        else{
            res.send("game deleted");
        }
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while deleting Games."
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