import { Router } from  "express";
import isAuthorized from "../middlewares/auth.js";
import stadiumControllers from "../controllers/stadiumControllers.js";

const router = Router();

router.get("/",(req,res) => {
    stadiumControllers.getAll(req,res);
    /* res.send("Mostrar todos los stadiums"); */
});

router.get("/:id", (req, res) => {
    stadiumControllers.getById(req,res);
    /* res.send("Mostrar un stadium con id" + req.params.id); */
});

router.post("/",isAuthorized, (req,res)=>{
    stadiumControllers.create(req,res);
    /* res.send("Crear un nuevo stadium"); */
}); 

router.put("/:id",isAuthorized, (req, res) => {
    stadiumControllers.update(req,res);
    /* res.send("Editar el stadium con id" + req.params.id); */
});

router.delete("/:id",isAuthorized, (req, res) => {
    stadiumControllers.deletes(req,res);
    /* res.send("Eliminar el stadium con id" +req.params.id); */
});

export default router;