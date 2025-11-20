import { GoogleGenAI, Type } from "@google/genai";
import { AIPlanRequest, AIPlanResponse } from "../types";

// In a real app, this would come from environment variables
// Using a placeholder for the demo. The user needs to provide their key or we mock the response if key is missing.
const API_KEY = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const GeminiService = {
  generateLearningPlan: async (request: AIPlanRequest): Promise<AIPlanResponse> => {
    if (!API_KEY) {
      throw new Error("API Key is missing. Please check your configuration.");
    }

    const prompt = `
      I need a learning and productivity plan.
      Goal: ${request.goal}
      Duration: ${request.duration}
      Time Available: ${request.timePerDay}
      Current Skill Level: ${request.skillLevel}

      Create a structured roadmap with sequential steps and daily habit suggestions.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              roadmapTitle: { type: Type.STRING },
              roadmapDescription: { type: Type.STRING },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    deadlineOffsetDays: { type: Type.INTEGER },
                    suggestedResources: { 
                      type: Type.ARRAY, 
                      items: { type: Type.STRING } 
                    }
                  },
                  required: ["title", "description", "deadlineOffsetDays"]
                }
              },
              dailyHabits: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["roadmapTitle", "roadmapDescription", "steps", "dailyHabits"]
          }
        }
      });

      if (response.text) {
        return JSON.parse(response.text) as AIPlanResponse;
      } else {
        throw new Error("No content received from Gemini.");
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }
};