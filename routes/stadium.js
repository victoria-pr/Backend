import { Router } from  "express";
import isAuthorized from "../middlewares/auth.js";

const router = Router();

router.get("/",(req,res) => {
    res.send("Mostrar todos los stadiums");
});

router.get("/:id", (req, res) => {
    res.send("Mostrar un stadium con id" + req.params.id);
});

router.post("/",isAuthorized, (req,res)=>{
    res.send("Crear un nuevo stadium");
}); 

router.put("/:id",isAuthorized, (req, res) => {
    res.send("Editar el stadium con id" + req.params.id);
});

router.delete("/:id",isAuthorized, (req, res) => {
    res.send("Eliminar el stadium con id" +req.params.id);
});

export default router;