import axios from "axios";

const getAllBySidoGugunContentTypeApi = async (params) => {
  return await axios.get(`/api/attraction/region`, {params});
};

const getDescriptionByContentIdApi = async (contentId) => {
  return await axios.get(`/api/attraction/detail/${contentId}`);
}

const getByKeyWord = async (params) => {
  return await axios.get(`/api/attraction/keyword`, {params});
}

export { getAllBySidoGugunContentTypeApi, getDescriptionByContentIdApi, getByKeyWord };
