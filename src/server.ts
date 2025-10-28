import { app } from "./app"

app.get("/", async () => {
  return { message: "API rodando!" };
});

const start = async () => {
  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
    console.log("🚀 --> Server running on http://localhost:3333");
    console.log("📖 --> Documentation available at http://localhost:3333/docs");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start()