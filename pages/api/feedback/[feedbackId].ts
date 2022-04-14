import { FEEDBACK_DIR_PATH } from "../../../constants/feedbackDirectoryPath";
import { extractData } from "../../../helpers/extractData";
import { FeedbackModel } from "../../../models/FeedbackModel";
import { APIRequest } from "../@types/APIRequest";
import { APIResponse } from "../@types/APIResponse";

type FeedbackAPIParams = {
  feedbackId: string;
};

export default function feedbackAPIPagesHandler(
  req: APIRequest<FeedbackAPIParams>,
  res: APIResponse<FeedbackModel>
) {
  const { feedbackId } = req.query;
  const feedbackList: FeedbackModel[] = extractData(FEEDBACK_DIR_PATH);
  const feedback = feedbackList.find((feedback) => feedback.id === feedbackId);

  if (feedback) {
    res.status(200).json({ message: "Success", data: feedback });
    return;
  }

  res.status(200).json({ message: "Not found", data: null });
}
