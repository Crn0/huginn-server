import path from "node:path";
import fs from "fs/promises";

export const removeTempFiles = async () => {
  const tempDir = path.join(import.meta.dirname, "..", "temp");

  const filePaths = await fs.readdir(tempDir);

  await Promise.all(
    filePaths.map(async (filePath) =>
      filePath !== ".gitignore" ? fs.unlink(filePath) : Promise.resolve()
    )
  );
};
