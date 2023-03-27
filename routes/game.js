import { Router } from  "express";
import isAuthorized from "../middlewares/auth.js";
import gameControllers from "../controllers/gameControllers.js";

const router = Router();

router.get("/",(req,res) => {
    gameControllers.getAll(req,res);
   /*  res.send("Mostrar todos los games"); */
});

router.get("/:id", (req, res) => {
    gameControllers.getById(req,res);
   /*  res.send("Mostrar un game con id" + req.params.id); */
});

router.post("/",isAuthorized, (req,res)=>{
    gameControllers.create(req,res);
    /* res.send("Crear un nuevo game"); */
}); 

router.put("/:id",isAuthorized, (req, res) => {
    gameControllers.update(req,res);
    /* res.send("Editar el game con id" + req.params.id); */
});

router.delete("/:id",isAuthorized, (req, res) => {
    gameControllers.deletes(req,res);
    /* res.send("Eliminar el game con id" +req.params.id); */
});

export default router;