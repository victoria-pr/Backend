import connection from "../config/db.js";
import Team from "../models/team.js";

const getAll = async (req,res) => {
    try{
        let teams = await Team.findAll({
            attributes: ["idteam","name","creation_date","idcaptain","idstadium"],
            /* include: {
                model: Team,
                attributes: ["name"],
                as: "team"
            } */
        });
        res.send(teams);  
    } catch (error) {
        res.status(500).send({
            message: error.message || "some error ocurred while retrieving players"
        });
    }
};

const getAll_old = (req, res) => {
    let sql = "SELECT team.name, team.creation_date,team.idstadium, stadium.name as stadium_name\
    FROM team\
    JOIN stadium ON team.idstadium = stadium.idstadium";
    connection.query(sql, (err,result) => {
        if (err) throw err;
        res.send(result);
    }); 
};

const getById = (req,res) => {
    let sql = "SELECT team.name, team.creation_date,team.idstadium, stadium.name as stadium_name\
    FROM team\
    JOIN stadium ON team.idstadium = stadium.idstadium\
    WHERE idteam = ?";
    connection.query(sql, [req.params.id],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const create = (req,res) => {
    let name = req.body.name;
    let idcaptain = req.body.idcaptain;
    let idstadium = req.body.idstadium;
    let sql = "INSERT INTO team (name,idcaptain,idstadium) \
    VALUES (?,?,?)";
    connection.query(sql, [name,idcaptain,idstadium],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const update = (req,res) => {
    let name = req.body.name;
    let idcaptain = req.body.idcaptain;
    let idstadium = req.body.idstadium;
    let sql = "UPDATE team\
    SET name = ?, idcaptain = ?,idstadium=?\
    WHERE idteam = ?";
    connection.query(sql, [name,idcaptain,idstadium],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const deletes = (req,res) => {
    let idteam = req.params.id;
    let sql = "DELETE FROM team WHERE idteam = ?";
    connection.query(sql, [idteam],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

export default {
    getAll,
    getById,
    create,
    update,
    deletes,
}