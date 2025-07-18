import api from '@/lib/api';
import {
  snippetLikeResponseSchema,
  type Snippet,
  snippetLikeSchema,
  snippetsLikedSchema,
} from '../types';
import { isAxiosError } from 'axios';

type Props = {
  snippetId: Snippet['_id'];
};
export default {
  likeSnippet: async ({ snippetId }: Pick<Props, 'snippetId'>) => {
    const url = `/like/${snippetId}`;
    try {
      const { data } = await api.post(url);

      const response = snippetLikeResponseSchema.safeParse(data);
      if (response.success) return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },

  getSnippetLiked: async ({ snippetId }: Pick<Props, 'snippetId'>) => {
    const url = `/like/${snippetId}`;
    try {
      const { data } = await api.get(url);

      const response = snippetLikeSchema.safeParse(data);
      if (response.success) return response.data.liked;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },

  getAllSnippetLiked: async () => {
    const url = `/like`;
    try {
      const { data } = await api.get(url);

      const response = snippetsLikedSchema.safeParse(data);
      if (response.success) return response.data.snippet;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },
};
