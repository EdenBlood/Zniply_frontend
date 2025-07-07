import api from '@/lib/api'
import { isAxiosError } from 'axios';
import { snippetsSchema, snippetSchema, type Snippet, type SnippetData, snippetResponseSchema, type User, snippetsAnotherUserSchema, searchSnippetResponseSchema } from '@/types/index';

export type Props= {
  formData: SnippetData;
  snippetId: Snippet['_id'];
  search: string;
  userId: User['_id'];
}

export default {
  createSnippet: async ({formData}: Pick<Props, 'formData'>) => {
    const url = `/snippets`;
    try {
      const { data } = await api.post(url, formData);

      const response = snippetResponseSchema.safeParse(data)

      if (response.success) return response.data
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error)
      }
    }
  },

  getAllUserSnippets: async ({userId}: Pick<Props, 'userId'>) => {
    const url = `/snippets/user/${userId}`;
    try {
      const { data } = await api.get(url);

      const response = snippetsAnotherUserSchema.safeParse(data)
      if (response.success) return response.data
    } catch (error) {
      if( isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },

  getSnippets: async () => {
    const url = `/snippets`;
    try {
      const { data } = await api.get(url);

      const response = snippetsSchema.safeParse(data);
      if (response.success) return response.data.snippet;
    } catch (error) {
      if( isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },
  

  getSnippetById: async ({snippetId}: Pick<Props, 'snippetId'> ) => {
    const url = `/snippets/${snippetId}`;
    try {
      const { data } = await api.get(url);
      const response = snippetSchema.safeParse(data);
      if (response.success) return response.data.snippet;
    } catch (error) {
      if( isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },

  updateSnippet: async ({formData, snippetId}: Pick<Props, 'formData' | 'snippetId'>) => {
    const url = `/snippets/${snippetId}`
    try {
      const { data } = await api.put(url, formData);

      const response = snippetResponseSchema.safeParse(data)
      if (response.success) return response.data
    } catch (error) {
      if( isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },

  deleteSnippet: async ({snippetId}: Pick<Props, 'snippetId'>) => {
    const url = `/snippets/${snippetId}`;
    try {
      const { data } = await api.delete<{msg: string}>(url);
      return data.msg;
    } catch (error) {
      if( isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  },

  searchSnippets: async ({search}: Pick<Props, 'search'>) => {
    const url = `/snippets/search?query=${search}`;

    try {
      const { data } = await api.get(url);
      
      const response = searchSnippetResponseSchema.safeParse(data)
      if (response.success) return response.data
    } catch (error) {
      if( isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }
}