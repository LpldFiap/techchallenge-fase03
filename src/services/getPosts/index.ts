import api from "../../api";
import { GetPostsResponse } from "./types";

const getProdutos = async () => {
  const { data } = await api.get<GetPostsResponse>('post', {
    timeout: 5 * 1000,
  });

  return data;
};

export default getProdutos;
