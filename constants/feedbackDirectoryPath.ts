import path from "path";
import { cwd } from "process";

export const FEEDBACK_DIR_PATH = path.join(cwd(), "data", "feedback.json");
