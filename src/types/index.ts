import { z } from 'zod';

export const msgResponseSchema = z.object({
  msg: z.string(),
});

//** Snippets */
export const snippetSchemaDraft = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  code: z.string(),
  user: z.string(),
  language: z.string(),
  likeCount: z.number(),
});

export const snippetsSchema = z.object({
  snippet: z.array(snippetSchemaDraft),
});

export const snippetSchema = z.object({
  snippet: snippetSchemaDraft,
});

export const snippetResponseSchema = z.object({
  msg: z.string(),
  snippet: snippetSchemaDraft,
});

export const snippetLikeSchema = z.object({
  liked: z.boolean(),
});

export const snippetLikeResponseSchema = z.object({
  msg: z.string(),
  liked: z.boolean(),
});

export type Snippet = z.infer<typeof snippetSchemaDraft>;
export type SnippetData = Pick<Snippet, 'title' | 'description' | 'code' | 'language'>;

//* Search */

export const searchSnippetResponseSchema = z.array(snippetSchemaDraft);

//* TipTap */

export type Commands = {
  toggleBold: () => boolean;
  toggleItalic: () => boolean;
  toggleUnderline: () => boolean;
  toggleCodeBlock: () => void;
  toggleH1: () => boolean;
  toggleH2: () => boolean;
  toggleH3: () => boolean;
  setParagraph: () => boolean;
  toggleOrderedList: () => boolean;
  toggleUnorderedList: () => boolean;
  addImage: () => void;
  addLink: () => void;
  showHTML: () => string;
  showText: () => string;
};

type EditorStateKey =
  | 'isBold'
  | 'isItalic'
  | 'isUnderline'
  | 'isCodeBlock'
  | 'isH1'
  | 'isH2'
  | 'isH3'
  | 'isParagraph'
  | 'isOrderedList'
  | 'isUnorderedList'
  | 'isImage'
  | 'isLink';

export type EditorState = Record<EditorStateKey, boolean>;

//** Auth */
export const authSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password_repeat: z.string(),
  token: z.string(),
  snippets: z.array(
    snippetSchemaDraft.pick({
      _id: true,
    }),
  ),
});

export const createAccountResponseSchema = z.object({
  msg: z.string(),
});

export type Auth = z.infer<typeof authSchema>;
export type CreateAccountFormData = Pick<Auth, 'name' | 'email' | 'password' | 'password_repeat'>;
export type LoginFormData = Pick<Auth, 'email' | 'password'>;
export type ForgotPasswordFormData = Pick<Auth, 'email'>;
export type ResendCodeFormData = Pick<Auth, 'email'>;
export type ConfirmTokenFormData = Pick<Auth, 'token'>;
export type ChangePasswordFormData = Pick<Auth, 'password' | 'password_repeat'>;

//* User */
export const userSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  snippets: z.array(
    snippetSchemaDraft.pick({
      _id: true,
      title: true,
      description: true,
      code: true,
    }),
  ),
});

export const userAuthSchema = userSchema.pick({
  _id: true,
  name: true,
  email: true,
});

export const userLoginSchema = z.object({
  msg: z.string(),
  userId: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserAuth = z.infer<typeof userAuthSchema>;

//* External User Fetch */
export const snippetsAnotherUserSchema = z.object({
  msg: z.string(),
  snippet: z.array(snippetSchemaDraft), //* Snippets puede ir vacío
  user: userSchema.pick({
    _id: true,
    name: true,
    email: true,
  }),
});

//* Contact */
export const contactSchema = z.object({
  asunto: z.string(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

export type Contact = z.infer<typeof contactSchema>;
export type ContactFormData = Pick<Contact, 'asunto' | 'name' | 'email' | 'message'>;
