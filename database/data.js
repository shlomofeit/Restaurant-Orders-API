import fs from "fs/promises";

export async function readFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function writeToFile(filePath, content) {
  try {
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    return true;
  } catch (error) {
    throw error;
  }
}
