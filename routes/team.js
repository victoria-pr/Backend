import { Router } from  "express";
import isAuthorized from "../middlewares/auth.js";
import teamControllers from "../controllers/teamControllers.js";

const router = Router();

router.get("/",(req,res) => {
    teamControllers.getAll(req,res);
    /* res.send("Mostrar todos los teams"); */
});

router.get("/:id", (req, res) => {
    teamControllers.getById(req,res);
    /* res.send("Mostrar un team con id" + req.params.id); */
});

router.post("/",isAuthorized, (req,res)=>{
    teamControllers.create(req,res);
    /* res.send("Crear un nuevo team"); */
}); 

router.put("/:id",isAuthorized, (req, res) => {
    teamControllers.update(req,res);
    /* res.send("Editar el team con id" + req.params.id); */
});

router.delete("/:id",isAuthorized, (req, res) => {
    teamControllers.deletes(req,res);
    /* res.send("Eliminar el team con id" +req.params.id); */
});

export default router;