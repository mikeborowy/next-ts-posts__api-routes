// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//http://localhost:3000/api/feedback
import { FeedbackModel } from "../../../models/FeedbackModel";
import fs from "fs";
import { APIResponse } from "../../../models/api/APIResponse";
import { APIRequest } from "../../../models/api/APIRequest";
import { FEEDBACK_DIR_PATH } from "../../../constants/feedbackDirectoryPath";
import { extractData } from "../../../helpers/extractData";

type FeedbackDetailsModel = "Missing Email" | "Missing Feedback";

export default function feedbackAPIPageHandler(
  req: APIRequest,
  res: APIResponse<FeedbackModel | FeedbackModel[], null, FeedbackDetailsModel>
) {
  if (req.method === "POST") {
    const body: FeedbackModel = req.body;
    const { email, feedback } = body;

    if (!email) {
      res.status(200).json({
        message: "Missing field",
        data: null,
        details: "Missing Email",
      });
    }

    if (!feedback) {
      res.status(200).json({
        message: `Missing field`,
        data: null,
        details: "Missing Feedback",
      });
    }

    const newFeedback: FeedbackModel = {
      id: new Date().toISOString(),
      email,
      feedback,
    };

    const feedbackList: FeedbackModel[] = extractData(FEEDBACK_DIR_PATH);
    feedbackList.push(newFeedback);

    fs.writeFileSync(FEEDBACK_DIR_PATH, JSON.stringify(feedbackList));
    res.status(201).json({ message: "Success", data: newFeedback });
  } else {
    const feedbackList: FeedbackModel[] = extractData(FEEDBACK_DIR_PATH);
    res.status(200).json({ message: "This Works!", data: feedbackList });
  }
}
