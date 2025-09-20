import { removeTempFiles } from "./remove-temp-files.js";

process.stdin.resume();

const events = ["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "uncaughtException", "SIGTERM"] as const;

for (const event of events) {
  process.on(event, async () => {
    try {
      await removeTempFiles()
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
}
