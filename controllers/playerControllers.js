import connection from "../config/db.js";

const getAll = (req, res) => {
    let sql = "SELECT player.idplayer,player.name, player.last_name,player.age, team.name as team_name \
    FROM player\
    LEFT JOIN team ON player.idteam = team.idteam";
    connection.query(sql, (err,result) => {
        if (err) throw err;
        res.send(result);
    }); 
    //return query
};

const getById = (req,res) => {
    let sql = "SELECT player.idplayer,player.name, player.last_name,player.age, team.name as team_name \
    FROM player\
    LEFT JOIN team ON player.idteam = team.idteam\
    WHERE idplayer = ?";
    connection.query(sql, [req.params.id],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const create = (req,res) => {
    let name = req.body.name;
    let last_name = req.body.last_name;
    let age = req.body.age;
    let idteam = req.body.idteam;
    let sql = "INSERT INTO player (name,last_name,age,idteam) \
    VALUES (?,?,?,?)";
    connection.query(sql, [name,last_name,age,idteam],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const update = (req,res) => {
    let name = req.body.name;
    let last_name = req.body.last_name;
    let age = req.body.age;
    let idteam = req.body.idteam;
    let idplayer = req.params.id;
    let sql = "UPDATE player\
    SET name= ?,last_name = ?,age=?,idteam = ?\
    WHERE idplayer = ?";
    connection.query(sql, [name,last_name,age,idteam,idplayer],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const deletes = (req,res) => {
    let idplayer = req.params.id;
    let sql = "DELETE FROM player WHERE idplayer = ?";
    connection.query(sql, [idplayer],(err,result) => {
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