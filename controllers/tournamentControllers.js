import connection from "../config/db.js";

const getAll = (req, res) => {
    let sql = "SELECT *\
    FROM tournament\
    JOIN game ON game.idtournament = tournament.idtournament\
    JOIN stadium ON game.idstadium = stadium.idstadium";
    connection.query(sql, (err,result) => {
        if (err) throw err;
        res.send(result);
    }); 
};

const getById = (req,res) => {
    let sql = "SELECT *\
    FROM tournament as tour\
    JOIN game ON game.idtournament = tour.idtournament\
    JOIN stadium ON game.idstadium = stadium.idstadium\
    WHERE tour.idtournament = ?";
    connection.query(sql, [req.params.id],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const create = (req,res) => {
    let name = req.body.name;
    let sql = "INSERT INTO tournament (name) \
    VALUES (?)";
    connection.query(sql, [name],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const update = (req,res) => {
    let name = req.body.name;
    let sql = "UPDATE tournament\
    SET name= ?\
    WHERE idtournament = ?";
    connection.query(sql, [name],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const deletes = (req,res) => {
    let idtournament = req.params.id;
    let sql = "DELETE FROM tournament WHERE idtournament = ?";
    connection.query(sql, [idtournament],(err,result) => {
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