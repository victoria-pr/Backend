import { Sequelize } from "sequelize"

const sequelize = new Sequelize ("petanca", "root", "mi-contraseña", {
    host: "localhost",
    port: 3309,
    dialect: "mysql"
});

export default sequelize;