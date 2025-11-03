import { Ollama } from "ollama";

const client = new Ollama({
  host: "https://ollama.com",
  headers: {
    Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`
  },
});

export default client;