import path from "path";
import fs from "fs";
import { MessageData } from "./model/data-message";

export const CHAT_FILE = path.join(__dirname, "chatData.json");

export let chatHistory: MessageData[] = [];
if (fs.existsSync(CHAT_FILE)) {
  const data = fs.readFileSync(CHAT_FILE).toString();
  chatHistory = JSON.parse(data);
}
