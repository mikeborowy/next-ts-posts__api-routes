import { APIResponse } from "../models/api/APIResponse";
import { APIMethod } from "../models/api/APIMethod";
import { FeedbackModel } from "../models/FeedbackModel";

type OptionsType = {
  method: APIMethod;
  body?: FeedbackModel;
  feedbackId?: string;
};

export const fetchFeedbackAPI = async <R = unknown>(
  options?: OptionsType
): Promise<APIResponse<R>> => {
  try {
    const { method, body, feedbackId } = options ?? {};
    const init: RequestInit = {
      body: body && JSON.stringify(body),
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/api/feedback/${feedbackId}`, init);
    return response.json();
  } catch (error) {
    throw new Error("Error: fetchFeedbackAPI");
  }
};
