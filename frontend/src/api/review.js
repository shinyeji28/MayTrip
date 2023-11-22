import axios from "axios";

const formDataHeader = { "Content-Type": "multipart/form-data" };

const getReviewList = async () => {
  return await axios.get(`/api/review`);
};

const getDetail = async (id) => {
  return await axios.get(`/api/review/${id}`);
};

export { getReviewList, getDetail };
