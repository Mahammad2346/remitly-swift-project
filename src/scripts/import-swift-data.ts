import { AppDataSource } from "../database/data-source";
import { SwiftCode } from "../models/SwiftCode";
import * as XLSX from "xlsx";

const importData = async () => {
  try {
    await AppDataSource.initialize();
    console.log("📦 Database connected!");

    const workbook = XLSX.readFile("Interns_2025_SWIFT_CODES.xlsx");
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet);

    const swiftRepo = AppDataSource.getRepository(SwiftCode);

    let importedCount = 0;

    for (const row of rows) {
      const swiftCode = row["SWIFT CODE"];
      const bankName = row["NAME"];
      const address = row["ADDRESS"];
      const countryISO2 = row["COUNTRY ISO2 CODE"];
      const countryName = row["COUNTRY NAME"];

  
      if (!swiftCode || !bankName || !address || !countryISO2 || !countryName) {
        continue;
      }

      const isHeadquarter = swiftCode.endsWith("XXX");

      const swiftEntity = swiftRepo.create({
        swiftCode: swiftCode.toUpperCase(),
        bankName,
        address,
        countryISO2: countryISO2.toUpperCase(),
        countryName: countryName.toUpperCase(),
        isHeadquarter,
      });

      await swiftRepo.save(swiftEntity);
      importedCount++;
    }

    console.log(`Import completed! Total imported: ${importedCount}`);
    process.exit(0);
  } catch (error) {
    console.error("Import error:", error);
    process.exit(1);
  }
};

importData();
