import { Router } from  "express";
import isAuthorized from "../middlewares/auth.js";

const router = Router();

router.get("/",(req,res) => {
    res.send("Mostrar todos los torneos");
});

router.get("/:id", (req, res) => {
    res.send("Mostrar un torneo con id" + req.params.id);
});

router.post("/",isAuthorized, (req,res)=>{
    res.send("Crear un nuevo torneo");
}); 

router.put("/:id",isAuthorized, (req, res) => {
    res.send("Editar el torneo con id" + req.params.id);
});

router.delete("/:id",isAuthorized, (req, res) => {
    res.send("Eliminar el torneo con id" +req.params.id);
});

export default router;