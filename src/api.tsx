import { createApi } from "@reduxjs/toolkit/query/react"

import { WithTimestamps } from "./models"
import { iAnswer } from "./models/Answer"
import { iForm } from "./models/Form"
import { iQuestion } from "./models/Question"
import { iResponse } from "./models/Response"
import { iUser } from "./models/User"
import axiosBaseQuery from "./utils/axiosBaseQuery"

type ApiResponse = {
	message: string
}

type RequiredToken = {
	token: string
}

type OptionalToken = {
	token?: string | null | undefined
}

const api = createApi({
	reducerPath: "api",
	tagTypes: ["User", "Form", "Question", "Response", "Answer"],
	baseQuery: axiosBaseQuery,
	endpoints: builder => ({
		getForms: builder.query<WithTimestamps<iForm>[], { page?: number } & RequiredToken>({
			query: ({ token, page }) => ({
				url: "/forms",
				method: "GET",
				params: {
					page
				},
				token
			}),
			providesTags: ["Form"]
		}),
		setForm: builder.mutation<
			ApiResponse & { form: WithTimestamps<iForm> },
			Omit<iForm, "id" | "user_id"> & RequiredToken
		>({
			query: ({ token, ...form }) => ({
				url: "/forms",
				method: "POST",
				body: form,
				token
			}),
			invalidatesTags: ["Form"]
		}),
		getForm: builder.query<WithTimestamps<iForm>, { form_id: string } & OptionalToken>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}`,
				method: "GET",
				token
			}),
			providesTags: ["Form"]
		}),
		updateForm: builder.mutation<
			ApiResponse & { form: WithTimestamps<iForm> },
			Partial<Omit<iForm, "id" | "user_id">> & { form_id: string } & RequiredToken
		>({
			query: ({ token, form_id, ...form }) => ({
				url: `/forms/${form_id}`,
				method: "PUT",
				body: form,
				token
			}),
			invalidatesTags: ["Form"]
		}),
		deleteForm: builder.mutation<ApiResponse, { form_id: string } & RequiredToken>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}`,
				method: "DELETE",
				token
			}),
			invalidatesTags: ["Form"]
		}),
		getFormQuestions: builder.query<
			WithTimestamps<iQuestion>[],
			{ form_id: string } & OptionalToken
		>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}/questions`,
				method: "GET",
				token
			}),
			providesTags: ["Question"]
		}),
		setFormQuestion: builder.mutation<
			ApiResponse & { question: WithTimestamps<iQuestion> },
			Omit<iQuestion, "id" | "form_id"> & { form_id: string } & RequiredToken
		>({
			query: ({ token, form_id, ...question }) => ({
				url: `/forms/${form_id}/questions`,
				method: "POST",
				body: question,
				token
			}),
			invalidatesTags: ["Question"]
		}),
		getFormQuestion: builder.query<
			WithTimestamps<iQuestion>,
			{ form_id: string; question_id: string } & OptionalToken
		>({
			query: ({ token, form_id, question_id }) => ({
				url: `/forms/${form_id}/questions/${question_id}`,
				method: "GET",
				token
			}),
			providesTags: ["Question"]
		}),
		updateFormQuestion: builder.mutation<
			ApiResponse & { question: WithTimestamps<iQuestion> },
			Partial<Omit<iQuestion, "id" | "form_id">> & {
				form_id: string
				question_id: string
			} & RequiredToken
		>({
			query: ({ token, form_id, question_id, ...question }) => ({
				url: `/forms/${form_id}/questions/${question_id}`,
				method: "PUT",
				body: question,
				token
			}),
			invalidatesTags: ["Question"]
		}),
		deleteFormQuestion: builder.mutation<
			ApiResponse,
			{ form_id: string; question_id: string } & RequiredToken
		>({
			query: ({ token, form_id, question_id }) => ({
				url: `/forms/${form_id}/questions/${question_id}`,
				method: "DELETE",
				token
			}),
			invalidatesTags: ["Question"]
		}),
		getFormQuestionAnswers: builder.query<
			WithTimestamps<iAnswer>[],
			{ form_id: string; question_id: string } & RequiredToken
		>({
			query: ({ token, form_id, question_id }) => ({
				url: `/forms/${form_id}/questions/${question_id}/answers`,
				method: "GET",
				token
			}),
			providesTags: ["Answer"]
		}),
		getFormResponseAnswers: builder.query<
			WithTimestamps<iAnswer>[],
			{ form_id: string; response_id: string } & RequiredToken
		>({
			query: ({ token, form_id, response_id }) => ({
				url: `/forms/${form_id}/responses/${response_id}/answers`,
				method: "GET",
				token
			}),
			providesTags: ["Answer"]
		}),
		getFormResponses: builder.query<
			WithTimestamps<iResponse>[],
			{ form_id: string } & RequiredToken
		>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}/responses`,
				method: "GET",
				token
			}),
			providesTags: ["Response"]
		}),
		setFormResponse: builder.mutation<
			ApiResponse,
			{ form_id: string; answers: Omit<iAnswer, "id">[] } & OptionalToken
		>({
			query: ({ token, form_id, answers }) => ({
				url: `/forms/${form_id}/responses`,
				method: "POST",
				body: {
					answers
				},
				token
			}),
			invalidatesTags: ["Response"]
		}),
		getFormResponse: builder.query<
			WithTimestamps<iResponse>,
			{ form_id: string; response_id: string } & RequiredToken
		>({
			query: ({ token, form_id, response_id }) => ({
				url: `/forms/${form_id}/responses/${response_id}`,
				method: "GET",
				token
			}),
			providesTags: ["Response"]
		}),
		getUser: builder.query<WithTimestamps<iUser>, { user_id: string } & RequiredToken>({
			query: ({ token, user_id }) => ({
				url: `/users/${user_id}`,
				method: "GET",
				token
			}),
			providesTags: result => (result ? [{ type: "User", id: result.id }] : [])
		}),
		updateUser: builder.mutation<ApiResponse, Partial<iUser> & RequiredToken>({
			query: ({ token, ...user }) => ({
				url: `/users/${user.id}`,
				method: "PUT",
				body: user,
				token
			}),
			invalidatesTags: (result, error, args) =>
				result ? [{ type: "User", id: args.id }] : []
		}),
		register: builder.mutation<
			ApiResponse & { token: string; user: WithTimestamps<iUser> },
			Partial<Omit<iUser, "id"> & { password: string }>
		>({
			query: user => ({
				url: "/register",
				method: "POST",
				body: user
			}),
			invalidatesTags: result => (result ? [{ type: "User", id: result.user.id }] : [])
		}),
		login: builder.mutation<
			ApiResponse & { token: string; user: WithTimestamps<iUser> },
			{ email: string; password: string }
		>({
			query: user => ({
				url: "/login",
				method: "POST",
				body: user
			}),
			invalidatesTags: result => (result ? [{ type: "User", id: result.user.id }] : [])
		}),
		logout: builder.mutation<ApiResponse, RequiredToken>({
			query: ({ token }) => ({
				url: "/logout",
				method: "POST",
				token
			}),
			invalidatesTags: result => (result ? [{ type: "User" }] : [])
		})
	})
})

export default api
export const {
	useDeleteFormMutation,
	useDeleteFormQuestionMutation,
	useGetFormQuery,
	useGetFormQuestionAnswersQuery,
	useGetFormQuestionQuery,
	useGetFormQuestionsQuery,
	useGetFormResponseAnswersQuery,
	useGetFormResponseQuery,
	useGetFormResponsesQuery,
	useGetFormsQuery,
	useGetUserQuery,
	useLazyGetFormQuestionsQuery,
	useLazyGetFormsQuery,
	useLazyGetUserQuery,
	useLazyGetFormQuery,
	useLazyGetFormQuestionAnswersQuery,
	useLazyGetFormQuestionQuery,
	useLazyGetFormResponseAnswersQuery,
	useLazyGetFormResponseQuery,
	useLazyGetFormResponsesQuery,
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useSetFormMutation,
	useSetFormQuestionMutation,
	useSetFormResponseMutation,
	useUpdateFormMutation,
	useUpdateFormQuestionMutation,
	useUpdateUserMutation
} = api
