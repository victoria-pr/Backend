import Stadium from "../models/stadium.js";
import Team from "../models/team.js";
import Game from "../models/game.js";

const getAll = async (req,res) => {
    try{
        let stadiums = await Stadium.findAll({
            attributes: ["idstadium","name","address","capacity"],
            include: [
                {model: Team,
                attributes: ["name", "idteam"],
                as: "teams"},
                {model: Game,
                attributes: ["name", "idgame"],
                as: "games"}
            ]
        });
        res.send(stadiums);  
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error ocurred while retrieving stadiums"
        });
    }
};

const getById = async (req,res) => {
    try{
        let id = req.params.id;
        let stadium = await Stadium.findByPk(id,{
            attributes: ["idstadium","name","address","capacity"],
            include: [
                {model: Team,
                attributes: ["name", "idstadium"],
                as: "teams"},
                {model: Game,
                attributes: ["name", "idgame"],
                as: "games"}
            ]
        });
        if (!stadium) {
            res.status(404).send({
                message: `Cannot find stadium with id=${id}.`
            });
        }else{
            res.send(stadium);
        }
    }catch (error) {
        res.status(500).send({
            message:error.message || "Some error ocurred while retrieving stadium."
        });
    }
};

const create = async (req,res) => {
    try{ 
        let name = req.body.name;
        let address = req.body.address;
        let capacity = req.body.capacity;
    
        let stadium = await Stadium.create({
            "name": name, 
            "address":address,
            "capacity":capacity});
        res.send(stadium);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while creating stadium."
      });
    }
};

const update = async (req,res) => {
    try{
        let name = req.body.name;
        let address = req.body.address;
        let capacity = req.body.capacity;
        let idstadium = req.params.id;

        let stadium = await Stadium.update ({
            "name": name, 
            "address":address,
            "capacity":capacity},{
                where: {
                    idstadium: idstadium
                }
        });
        res.send(stadium);
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while updating stadiums."
      });
    }
}

const deletes = async (req,res) => {
    try{
        let idstadium = req.params.id;
        let stadium = await Stadium.destroy({
            where: {
                idstadium : idstadium
            } 
        });
        console.log(stadium);
        if (stadium === 0){
            res.status(404).send({
                message: `Stadium with id=${idstadium} not found.`
            });
        } 
        else{
            res.send("stadium deleted");
        }
    }catch (error){
        res.status(500).send({
            message:error.message || "Some error ocurred while deleting Stadiums."
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