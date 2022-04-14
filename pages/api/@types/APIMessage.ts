export const API_MESSAGES = {
  SUCCESS: "Success",
  OK: "This Works!",
  MISSING_FIELD: "Missing field",
  FAILED: "Failed",
  NOT_FOUND: "Not found",
} as const;

type Keys = keyof typeof API_MESSAGES;
export type APIMessage = typeof API_MESSAGES[Keys];
