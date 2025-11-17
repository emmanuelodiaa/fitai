// utils/openaiClient.js
import Constants from "expo-constants";
import { Platform } from "react-native";

const OPENAI_KEY = Constants.expoConfig.extra?.EXPO_PUBLIC_OPENAI_KEY;

console.log("OpenAI key:", OPENAI_KEY);
console.log("Constants.expoCongfig.extra:", Constants.expoConfig.extra);

export async function createChatResponse(message) {
  try {
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_KEY}`,
        "OpenAI-Beta": "responses=v1",
        "expo-platform": Platform.OS,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: `Answer the following in 200 words or less. Do NOT exceed 200 words.\n\n${message}`,
          }
        ],
      }),
    });

    const data = await res.json();
    console.log("OpenAI response:", data);

    if (data.error) {
      console.error("OpenAI API Error:", data.error)
      return `AI Error: ${data.error.message}`;
    }

    const outputText =
      data?.output?.[0]?.content?.[0]?.text ?? "No response from AI";

    return outputText;

  } catch (err) {
    console.error("OpenAI error:", err);
    throw err;
  }
}
