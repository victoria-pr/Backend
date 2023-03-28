import connection from "../config/orm.js";
import Sequelize from "sequelize";

const Stadium = connection.define("stadium",{
    idstadium: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unsigned: true
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    capacity: {
        type: Sequelize.INTEGER,
        allowNull:false,
    },
    address: {
        type: Sequelize.STRING(120),
        allowNull: true,
    },
},
{
    freezeTableName: true, //porque sino al ponerle player, lo pluraliza. Si no tuvieramos la tabla hecha en MYSQL, daría igual pero como ya la tenemos y se llama player, da problemas
    timestamps: false
});

export default Stadium;