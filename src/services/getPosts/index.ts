import api from "../../api";
import { GetPostsResponse } from "./types";

const getPosts = async () => {
  const { data } = await api.get<GetPostsResponse>('posts', {
    timeout: 5 * 1000,
  });

  return data;
};

export default getPosts;
