import axios from "axios";

const formDataHeader = { "Content-Type": "multipart/form-data" };

const getReviewList = async () => {
  return await axios.get(`/api/review`);
};

const getDetail = async (id) => {
  return await axios.get(`/api/review/${id}`);
};

const registReview = async (formData) => {
  return await axios.post(`/api/review`, formData, {
    headers: formDataHeader,
  });
};

export { getReviewList, getDetail, registReview };
