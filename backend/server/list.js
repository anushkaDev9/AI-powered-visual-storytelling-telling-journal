// listModels.js
import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";


const { GOOGLE_API_KEY, GOOGLE_PROJECT_ID, GOOGLE_APPLICATION_CREDENTIALS } = process.env;
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);
const models = await genAI.listModels();
console.log(models);


