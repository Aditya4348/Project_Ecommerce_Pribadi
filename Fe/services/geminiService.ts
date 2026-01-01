
import { GoogleGenAI } from "@google/genai";

// Strictly follow initialization guidelines using only process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getProductAdvice = async (userQuery: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: You are a premium shopping assistant for Nexus Elite E-Commerce. 
      Product Database Info: ${context}.
      
      User Question: ${userQuery}`,
      config: {
        systemInstruction: "Be professional, concise, and helpful. Recommend products from the provided list if they match the user's needs. If nothing matches perfectly, suggest the closest alternative.",
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The AI assistant is currently unavailable. Please browse our collection manually.";
  }
};
