import { Router } from "express";
import { createCertificate, getCertificatesByUserId, getCertificateById } from "../controllers/certificate.controller";
import protectRoute from "../middleware/auth";
import { RoleEnum } from "../common";

const router = Router();

router.post("/create", protectRoute([RoleEnum[2]]), createCertificate);
router.post("/:userid", protectRoute(), getCertificatesByUserId);
router.post("/:id", protectRoute(), getCertificateById);


export default router;
