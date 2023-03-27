import connection from "../config/db.js";

const getAll = (req, res) => {
    let sql = "SELECT team.name, team.creation_date,team.idstadium, stadium.name as stadium_name\
    FROM team\
    JOIN stadium ON team.idstadium = stadium.idstadium";
    connection.query(sql, (err,result) => {
        if (err) throw err;
        res.send(result);
    }); 
};

const getById = (req,res) => {
    let sql = "SELECT team.name, team.creation_date,team.idstadium, player.name as player_name, stadium.name as stadium_name\
    FROM team\
    JOIN stadium ON team.idstadium = stadium = idstadium\
    JOIN player ON team.idteam = player.idteam\
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