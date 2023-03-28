import connection from "../config/orm.js";
import Sequelize from "sequelize";

const Tournament = connection.define("tournament",{
    idtournament: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unsigned: true
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: true
    },
},
{
    freezeTableName: true, //porque sino al ponerle player, lo pluraliza. Si no tuvieramos la tabla hecha en MYSQL, daría igual pero como ya la tenemos y se llama player, da problemas
    timestamps: false
});

export default Tournament;