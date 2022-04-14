import { FeedbackModel } from "../models/FeedbackModel";
import { APIMethod } from "../pages/api/@types/APIMethod";
import { APIResponseSchema } from "../pages/api/@types/APIResponse";

type OptionsType = {
  method: APIMethod;
  body?: FeedbackModel;
  feedbackId?: string;
};

export const fetchFeedbackAPI = async <R = unknown>(
  options?: OptionsType
): Promise<APIResponseSchema<R>> => {
  try {
    const { method, body, feedbackId } = options ?? {};
    const init: RequestInit = {
      body: body && JSON.stringify(body),
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/api/feedback/${feedbackId ?? ""}`, init);
    return response.json();
  } catch (error) {
    throw new Error("Error: fetchFeedbackAPI");
  }
};
