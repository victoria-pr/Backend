import mysql from "mysql2";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3309,
    user: "root",
    password: "mi-contraseña", /*esta tiene que ser la contraseña que pusimos en el workbench*/ 
    database: "petanca" /*así ya nos hace el use directamente*/
})

export default connection;