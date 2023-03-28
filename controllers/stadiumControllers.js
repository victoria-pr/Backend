import connection from "../config/db.js";

const getAll = (req, res) => {
    let sql = "SELECT * \
    FROM stadium\
    JOIN game ON game.idstadium = stadium.idstadium\
    JOIN tournament ON game.idtournament = tournament.idtournament";
    connection.query(sql, (err,result) => {
        if (err) throw err;
        res.send(result);
    }); 
};

const getById = (req,res) => {
    let sql = "SELECT * \
    FROM stadium\
    JOIN game ON game.idstadium = stadium.idstadium\
    JOIN tournament ON game.idtournament = tournament.idtournament\
    WHERE idgame = ?";
    connection.query(sql, [req.params.id],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
};

const create = (req,res) => {
    let name = req.body.name;
    let address = req.body.address;
    let capacity = req.body.capacity;
    let sql = "INSERT INTO stadium (name,address,capacity) \
    VALUES (?,?,?)";
    connection.query(sql, [name,address,capacity],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const update = (req,res) => {
    let name = req.body.name;
    let address = req.body.address;
    let capacity = req.body.capacity;
    let sql = "UPDATE stadium\
    SET name= ?,address = ?,capacity=?\
    WHERE idstadium = ?";
    connection.query(sql, [name,address,capacity],(err,result) => {
        if (err) throw err;
        res.send(result);
    });
}

const deletes = (req,res) => {
    let idgame = req.params.id;
    let sql = "DELETE FROM stadium WHERE idstadium = ?";
    connection.query(sql, [idstadium],(err,result) => {
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