import express, { Request, Response } from "express";
import {
  createSwiftCode,
  getSwiftCode,
  getSwiftCodesByCountry,
  deleteSwiftCode,
  getAllSwiftCodes,
} from "../controllers/swiftController";

const router = express.Router();

router.post("/swift-codes", (req: Request, res: Response) => {
  createSwiftCode(req, res);
});

router.get("/swift-codes", (req: Request, res: Response) => {
  getAllSwiftCodes(req, res);
});

router.get("/swift-codes/:swiftCode", (req: Request, res: Response) => {
  getSwiftCode(req, res);
});

router.get("/swift-codes/country/:countryISO2", (req: Request, res: Response) => {
  getSwiftCodesByCountry(req, res);
});

router.delete("/swift-codes/:swiftCode", (req: Request, res: Response) => {
  deleteSwiftCode(req, res);
});

export default router;
