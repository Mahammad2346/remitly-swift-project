import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import { SwiftCode } from "../models/SwiftCode";
import { Like } from "typeorm";

export const getAllSwiftCodes = async (req: Request, res: Response) => {
  try {
    const swiftRepo = AppDataSource.getRepository(SwiftCode);
    const allCodes = await swiftRepo.find();
    return res.status(200).json(allCodes);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getSwiftCode = async (req: Request, res: Response) => {
  const { swiftCode } = req.params;

  try {
    const swiftRepo = AppDataSource.getRepository(SwiftCode);

    const code = await swiftRepo.findOneBy({
      swiftCode: swiftCode.toUpperCase()
    });

    if (!code) {
      return res.status(404).json({ message: "SWIFT code not found" });
    }

    if (code.isHeadquarter) {
      const branches = (await swiftRepo.find({
        where: {
          swiftCode: Like(`${swiftCode.slice(0, 8)}%`)
        }
      })).filter(b => b.swiftCode !== swiftCode && !b.isHeadquarter);

      return res.status(200).json({
        ...code,
        branches,
      });
    }

    return res.status(200).json(code);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};


export const getSwiftCodesByCountry = async (req: Request, res: Response) => {
  const { countryISO2 } = req.params;

  try {
    const swiftRepo = AppDataSource.getRepository(SwiftCode);

    const codes = await swiftRepo.find({
      where: {
        countryISO2: countryISO2.toUpperCase(),
      },
    });

    if (codes.length === 0) {
      return res.status(404).json({ message: "No SWIFT codes found for this country" });
    }

    return res.status(200).json({
      countryISO2: countryISO2.toUpperCase(),
      countryName: codes[0].countryName,
      swiftCodes: codes,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const createSwiftCode = async (req: Request, res: Response) => {
  const {
    swiftCode,
    bankName,
    address,
    countryISO2,
    countryName,
    isHeadquarter,
  } = req.body;

  try {
    const swiftRepo = AppDataSource.getRepository(SwiftCode);

    const newSwift = swiftRepo.create({
      swiftCode,
      bankName,
      address,
      countryISO2: countryISO2.toUpperCase(),
      countryName: countryName.toUpperCase(),
      isHeadquarter,
    });

    await swiftRepo.save(newSwift);

    return res.status(201).json({ message: "Swift code created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteSwiftCode = async (req: Request, res: Response) => {
  const { swiftCode } = req.params;

  try {
    const swiftRepo = AppDataSource.getRepository(SwiftCode);
    const code = await swiftRepo.findOneBy({ swiftCode });

    if (!code) {
      return res.status(404).json({ message: "SWIFT code not found" });
    }

    await swiftRepo.remove(code);

    return res.status(200).json({ message: "SWIFT code deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
