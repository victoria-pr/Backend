import connection from "../config/db.js";

const getAll = (req, res) => {
    let sql = "SELECT game.name, game.datetime,game.idstadium, stadium.name as stadium_name, tournament.name as tournament_name \
    FROM game\
    JOIN stadium ON game.idstadium = stadium = idstadium\
    JOIN tournament ON game.idtournament = tournament.idtournament";
    connection.query(sql, (err,result) => {
        if (err) throw err;
        res.send(result);
    }); 
    //return query
};

const getById = (req,res) => {
    let sql = "SELECT game.name, game.datetime,game.idstadium, stadium.name as stadium_name, tournament.name as tournament_name\
    FROM game\
    JOIN stadium ON game.idstadium = stadium = idstadium\
    JOIN tournament ON game.idtournament = tournament.idtournament\
    WHERE idgame = ?";
    connection.query(sql, [req.params.id],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const create = (req,res) => {
    let name = req.body.name;
    let datetime = req.body.datetime;
    let idstadium = req.body.idstadium;
    let idtournament = req.body.idtournament;
    let sql = "INSERT INTO game (name,datetime,idstadium,idtournament) \
    VALUES (?,?,?,?)";
    connection.query(sql, [name,datetime,idstadium,idtournament],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const update = (req,res) => {
    let name = req.body.name;
    let datetime = req.body.datetime;
    let idstadium = req.body.idstadium;
    let idtournament = req.body.idtournament;
    let sql = "UPDATE game\
    SET name= ?,datetime = ?,idstadium=?,idtournament = ?\
    WHERE idgame = ?";
    connection.query(sql, [name,datetime,idstadium,idtournament],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const deletes = (req,res) => {
    let idgame = req.params.id;
    let sql = "DELETE FROM game WHERE idgame = ?";
    connection.query(sql, [idgame],(err,result) => {
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