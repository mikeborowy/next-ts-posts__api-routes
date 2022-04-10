import { FEEDBACK_DIR_PATH } from "../../../constants/feedbackDirectoryPath";
import { extractData } from "../../../helpers/extractData";
import { APIRequest } from "../../../models/api/APIRequest";
import { APIResponse } from "../../../models/api/APIResponse";
import { FeedbackModel } from "../../../models/FeedbackModel";

type FeedbackAPIParams = {
  feedbackId: string;
};

export default function feedbackAPIPageHandler(
  req: APIRequest<FeedbackAPIParams>,
  res: APIResponse<FeedbackModel>
) {
  const { feedbackId } = req.query;
  const feedbackList: FeedbackModel[] = extractData(FEEDBACK_DIR_PATH);
  const feedback = feedbackList.find((feedback) => feedback.id === feedbackId);

  res.status(200).json({ message: "Success", data: feedback });
}
