import { useQuery } from 'react-query';
import getPosts from '../services/getPosts';
import { GetPostsResponse } from '../services/getPosts/types';

export default function usePosts() {
  return useQuery<GetPostsResponse>({
    queryKey: ['usePosts'],
    queryFn: async () =>
      getPosts(),
  });
}
