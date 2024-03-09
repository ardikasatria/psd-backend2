import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const systemMessage = {
  role: "system",
  content:
    "Kamu adalah asisten robot yang mahir di codingan dan membuat latihan soal codingan",
};

export const getStreamingCompletion = async ({ userPrompt }) => {
  return client.chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [systemMessage, { role: "user", content: userPrompt }],
    stream: true,
    temperature: 0.7
  });
};

