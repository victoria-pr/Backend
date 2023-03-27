import { Router } from  "express";
import playerRouter from  "./player.js";
import teamRouter from  "./team.js";
import stadiumRouter from  "./stadium.js";
import gameRouter from  "./game.js";
import tournamentRouter from  "./tournament.js";

const router = Router();

router.use("/players", playerRouter);
router.use("/teams", teamRouter);
router.use("/stadiums", stadiumRouter);
router.use("/games", gameRouter);
router.use("/tournaments", tournamentRouter);

export default router;