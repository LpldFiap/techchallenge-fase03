import { TPost } from "../types/posts";
import { httpRequest } from "./http.services"

const BASE_API = import.meta.env.VITE_BASE_API;

export const getAllPosts = async (): Promise<TPost[]> => {
    const response = await httpRequest(`${BASE_API}posts`, { method: 'GET' });
    return response as TPost[] || [];
}

export const getPostById = async (id: string): Promise<TPost> => {
    const response = await httpRequest(`${BASE_API}posts/${id}`, { method: 'GET' });
    return response as TPost;
}