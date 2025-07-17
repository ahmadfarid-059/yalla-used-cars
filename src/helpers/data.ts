import fs from "fs";
import path from "path";
import { ApiDataStructure, Car } from "@/types/cars";

export function getDataFromFile(): ApiDataStructure | null {
  try {
    const filePath = path.join(process.cwd(), "src/data/data.json");
    const jsonData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading data file:", error);
    return null;
  }
}

export function getUsedCars(): Car[] {
  const apiData = getDataFromFile();
  if (!apiData || !apiData.data || !apiData.data.used_cars) {
    return [];
  }
  return apiData.data.used_cars;
}

export function getFeaturedCars(): Car[] {
  const apiData = getDataFromFile();
  if (!apiData || !apiData.data || !apiData.data.featured_used_cars) {
    return [];
  }
  return apiData.data.featured_used_cars;
}
