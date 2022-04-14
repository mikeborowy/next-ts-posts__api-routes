import { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { fetchFeedbackAPI } from "../../api/fetchFeedback";
import { FEEDBACK_DIR_PATH } from "../../constants/feedbackDirectoryPath";
import { extractData } from "../../helpers/extractData";
import { FeedbackModel } from "../../models/FeedbackModel";

type FeedbackPageProps = {
  feedbackList: FeedbackModel[];
};

export const FeedbackPage: NextPage<FeedbackPageProps> = (
  props: FeedbackPageProps
) => {
  const { feedbackList } = props;
  const [feedbackDetails, setFeedbackDetails] =
    useState<FeedbackModel | null>();

  const handleOnFeedbackClick = async (feedbackId: string) => {
    const response = await fetchFeedbackAPI<FeedbackModel>({
      method: "GET",
      feedbackId,
    });

    setFeedbackDetails(response.data);
  };

  return (
    <ul>
      {feedbackList.map((feedback) => {
        return (
          <li key={feedback.id}>
            <div>{feedback.email}</div>
            <button
              onClick={() => feedback?.id && handleOnFeedbackClick(feedback.id)}
            >
              Show more
            </button>
            {feedbackDetails && feedbackDetails.id === feedback.id && (
              <div>
                <text>{feedbackDetails.feedback}</text>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const feedbackList = extractData(FEEDBACK_DIR_PATH);

  return {
    props: {
      feedbackList,
    },
  };
};

export default FeedbackPage;
