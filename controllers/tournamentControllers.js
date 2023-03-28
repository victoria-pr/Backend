import Stadium from "../models/stadium.js";
import Game from "../models/game.js";
import Tournament from "../models/tournament.js";

const getAll = async (req,res) => {
    try{
        let tournaments = await Tournament.findAll({
            attributes: ["idtournament", "name"],
            include:{
                model: Game,
                attributes: ["name", "idgame"],
                as: "games"
            }
        });
        res.send(tournaments);  
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error ocurred while retrieving tournament"
        });
    }
};

const getById = async (req,res) => {
    try{
        let id = req.params.id;
        let tournament = await Tournament.findByPk(id,{
            attributes: ["idtournament", "name"],
            include: {
                model: Game,
                attributes: ["name", "idgame"],
                as: "games"
            }
        });
        if (!tournament) {
            res.status(404).send({
                message: `Cannot find tournament with id=${id}.`
            });
        }else{
            res.send(tournament);
        }
    }catch (error) {
        res.status(500).send({
            message:error.message || "Some error ocurred while retrieving tournament."
        });
    }
};

const create = async (req,res) => {
    try{ 
        let name = req.body.name;
       
        let tournament = await Tournament.create({
            "name":name,});
        res.send(tournament);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while creating tournament."
      });
    }
};

const update = async (req,res) => {
    try{
        let name = req.body.name;
        let idtournament = req.params.id;

        let tournament = await Tournament.update ({
            "name":name},{
                where: {
                    idtournament: idtournament
                }
        });
        res.send(tournament);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while updating tournaments."
      });
    }
}

const deletes = async (req,res) => {
    try{
        let idtournament = req.params.id;
        let tournament = await Tournament.destroy({
            where: {
                idtournament : idtournament
            } 
        });
        console.log(tournament);
        if (tournament === 0){
            res.status(404).send({
                message: `Tournament with id=${idtournament} not found.`
            });
        } 
        else{
            res.send("tournament deleted");
        }
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while deleting Tournament."
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