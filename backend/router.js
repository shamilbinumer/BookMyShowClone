import { Router } from "express";
import * as controller from "./controller.js";
import Auth from "../backend/middleware/auth.js";

const router=Router();
router.route("/register").post(controller.addTask)
router.route("/movies").get(controller.getTask)
router.route("/MovieDetails/:id").post(controller.getDetails);
router.route("/DelMovie/:id").delete(controller.delMovie)
router.route("/edit/:id").patch(controller.edit)
router.route("/adduser").post(controller.addUser);
router.route("/login").post(controller.login)
router.route("/home").get(Auth,controller.home);

export default router;
