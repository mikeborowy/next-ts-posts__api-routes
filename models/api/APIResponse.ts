import type { NextApiResponse } from "next";
import type { APIMessage } from "./APIMessage";

export type APIResponse<T = unknown, M = null, D = null> = NextApiResponse & {
  data: T | null;
  message: M extends null ? APIMessage : M;
  details?: D;
};
