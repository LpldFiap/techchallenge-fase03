import api from "../../api";

const deletePost = async (postId: string) => {
  const { data } = await api.delete(`post/${postId}`, {
    timeout: 5 * 1000,
  });

  return data;
};

export default deletePost;
