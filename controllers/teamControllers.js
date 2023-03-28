import Team from "../models/team.js";
import Player from "../models/player.js";
import Stadium from "../models/stadium.js";

const getAll = async (req,res) => {
    try{
        let teams = await Team.findAll({
            attributes: ["idteam","name","creation_date","idcaptain", "idstadium"],
            include: [
                {model: Player,
                attributes: ["name", "idplayer"],
                as: "players"},
                {model: Stadium,
                attributes: ["name", "idstadium"],
                as: "stadium"},
                {model: Player,
                    attributes: ["idplayer", "name", "last_name", "age"],
                    as: "captain"}, 
            ]
        });
        res.send(teams);  
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error ocurred while retrieving teams"
        });
    }
};

const getById = async (req,res) => {
    try{
        let id = req.params.id;
        let team = await Team.findByPk(id,{
            attributes: ["name","creation_date","idcaptain"],
            include: [
                {model: Player,
                attributes: ["name", "idplayer"],
                as: "players"},
                {model: Stadium,
                attributes: ["name", "idstadium"],
                as: "stadium"},
                {model: Player,
                attributes: ["idplayer", "name", "last_name", "age"],
                as: "captain"}, 
            ]
        });
        if (!team) {
            res.status(404).send({
                message: `Cannot find team with id=${id}.`
            });
        }else{
            res.send(team);
        }
    }catch (error) {
        res.status(500).send({
            message:error.message || "Some error ocurred while retrieving team."
        });
    }
};

const create = async (req,res) => {
    try{
        let name = req.body.name;
        let creation_date = req.body.creation_date;
        let idcaptain = req.body.idcaptain;
        let idstadium = req.body.idstadium;
        let team = await Team.create({
            "name": name, 
            "creation_date":creation_date,
            "idcaptain":idcaptain,
            "idstadium":idstadium});
        res.send(team);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while creating team."
      });
    }
};

const update = async (req,res) => {
    try{
        let name = req.body.name;
        let creation_date = req.body.creation_date;
        let idcaptain = req.body.idcaptain;
        let idstadium = req.body.idstadium;
        let idteam = req.params.id;

        let team = await Team.update ({
            "name": name, 
            "creation_date":creation_date,
            "idcaptain":idcaptain,
            "idstadium":idstadium},{
                where: {
                    idteam: idteam
                }
        });
        res.send(team);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while updating teams."
      });
    }
}

const deletes = async (req,res) => {
    try{
        let idteam = req.params.id;
        let team = await Team.destroy({
            where: {
                idteam : idteam
            } 
        });
        console.log(team);
        if (team === 0){
            res.status(404).send({
                message: `Team with id=${idteam} not found.`
            });
        } 
        else{
            res.send("team deleted");
        }
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while deleting teams."
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