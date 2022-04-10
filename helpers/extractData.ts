import fs from "fs";

export const extractData = (filePath: string) => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
};
