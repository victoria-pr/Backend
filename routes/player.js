import { Router } from  "express";
import isAuthorized from "../middlewares/auth.js";
import playerControllers from "../controllers/playerControllers.js";

const router = Router();

router.get("/",(req,res) => {
    playerControllers.getAll(req,res);
    /* res.send("Mostrar todos los jugadores"); */
});

router.get("/:id", (req, res) => {
    playerControllers.getById(req,res);
   /*  res.send("Mostrar un jugador con id" + req.params.id); */
});

router.post("/", isAuthorized, (req,res)=>{
    playerControllers.create(req,res);
    /* res.send("Crear un nuevo jugador"); */
}); 

router.put("/:id", isAuthorized, (req, res) => {
    playerControllers.update(req,res);
    /* res.send("Editar el jugador con id" + req.params.id); */
});

router.delete("/:id",isAuthorized, (req, res) => {
    playerControllers.deletes(req,res);
   /*  res.send("Eliminar el jugador con id" +req.params.id); */
});

export default router;