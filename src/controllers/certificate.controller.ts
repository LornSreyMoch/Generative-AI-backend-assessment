import { Request, Response } from "express";
import { Certificate } from "../entity/certificate.entity";
import { UserInfo } from "../entity/user.entity";
import { AppDataSource } from "../config";

export const createCertificate = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate);
    const userInfoRepo = AppDataSource.getRepository(UserInfo);

    try {
        const user = await userInfoRepo.findOne({ where: { id: req.user?.id } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { userId, courseName } = req.body;

        if (!userId || !courseName) {
            return res.status(400).json({ message: "userId and courseName are required" });
        }

        const certificate = new Certificate();
        certificate.user = userId;
        certificate.courseName = courseName;

        await certificateRepo.save(certificate);

        return res.status(201).json({
            id: certificate.id,
            userId: userId,
            courseName: courseName,
            createdAt: certificate.createdAt,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getCertificatesByUserId = async (req: Request, res: Response) => {

    try {
        const certificateRepo = AppDataSource.getRepository(Certificate);
        const userInfoRepo = AppDataSource.getRepository(UserInfo);
        const certificate = new Certificate();
        const userId = await userInfoRepo.findOne({ where: { id: req.user?.id } });
        if (!userId) {
            return res.status(404).json({ message: "User not found" });
        }
        await certificateRepo.save(certificate);
        return res.status(200).json({ 
            id: certificate.id,
            courseName: certificate.courseName,
            createdAt: certificate.createdAt,
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching data", error: error });
    }
};

// Get by Id
export const getCertificateById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const certificateRepo = AppDataSource.getRepository(Certificate);
        const certificate = await certificateRepo.findOne({ where: { id } });

        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        return res.status(200).json({ message: "Certificate successfully.", data: certificate });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error fetching data", error: error });
    }
};