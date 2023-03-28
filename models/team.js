import connection from "../config/orm.js";
import Sequelize from "sequelize";
import Stadium from "./stadium.js";
import Tournament from "./tournament.js";
import Game from "./game.js";

const Team = connection.define("team",{
    idteam: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unsigned: true
    },
    name: {
        type: Sequelize.STRING(45),
        allowNull: false
    },
    creation_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    idcaptain: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unsigned: true,
        references: {
            model: "player",
            key: "idplayer"
        }
    },
    idstadium: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unsigned: true,
        references: {
            model: "stadium",
            key: "idstadium"
        }
    }
},
{
    freezeTableName: true, //porque sino al ponerle player, lo pluraliza. Si no tuvieramos la tabla hecha en MYSQL, daría igual pero como ya la tenemos y se llama player, da problemas
    timestamps: false
});
Team.belongsTo(Stadium,{
    foreignKey: "idstadium"
});
Stadium.hasMany(Team,{
    foreignKey: "idstadium"
});
// Team - Game
Team.belongsToMany(Game, {
    through: "team_has_game",
    timestamps: false,
    foreignKey: "idteam",
    otherKey: "idgame"
});
Game.belongsToMany(Team, {
    through: "team_has_game",
    timestamps: false,
    foreignKey: "idgame",
    otherKey: "idteam"
});
//Team - Tournament
Team.belongsToMany(Tournament, {
    through: "tournament_has_team",
    timestamps: false,
    foreignKey: "idteam",
    otherKey: "idtournament"
});
Tournament.belongsToMany(Team, {
    through: "tournament_has_team",
    timestamps: false,
    foreignKey: "idtournament",
    otherKey: "idteam"
});

export default Team;