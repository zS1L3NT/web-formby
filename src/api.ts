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
		createForm: builder.mutation<
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
			WithTimestamps<iQuestion<any>>[],
			{ form_id: string } & OptionalToken
		>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}/questions`,
				method: "GET",
				token
			}),
			providesTags: ["Question"]
		}),
		createFormQuestion: builder.mutation<
			ApiResponse & { question: WithTimestamps<iQuestion<any>> },
			Omit<iQuestion<any>, "id" | "form_id"> & { form_id: string } & RequiredToken
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
			WithTimestamps<iQuestion<any>>,
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
			ApiResponse & { question: WithTimestamps<iQuestion<any>> },
			Partial<Omit<iQuestion<any>, "id" | "form_id">> & {
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
		getFormResponseAnswers: builder.query<
			WithTimestamps<iAnswer<any>>[],
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
		createFormResponse: builder.mutation<
			ApiResponse,
			{ form_id: string; answers: Omit<iAnswer<any>, "id" | "response_id">[] } & OptionalToken
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
		getUser: builder.query<WithTimestamps<iUser>, { user_id: string } | { token: string }>({
			query: (data) => ({
				url: "user_id" in data ? `/users/${data.user_id}` : `/user`,
				method: "GET",
				token: "token" in data ? data.token : undefined
			}),
			providesTags: ["User"]
		}),
		updateUser: builder.mutation<ApiResponse, Omit<Partial<iUser>, "id"> & RequiredToken>({
			query: ({ token, ...user }) => ({
				url: `/user`,
				method: "PUT",
				body: user,
				token
			}),
			invalidatesTags: ["User"]
		}),
		updateUserPassword: builder.mutation<
			ApiResponse,
			{ old_password: string; new_password: string } & RequiredToken
		>({
			query: ({ token, old_password, new_password }) => ({
				url: `/user/password`,
				method: "PUT",
				body: {
					old_password,
					new_password
				},
				token
			})
		}),
		deleteUser: builder.mutation<ApiResponse, RequiredToken>({
			query: ({ token }) => ({
				url: `/user`,
				method: "DELETE",
				token
			}),
			invalidatesTags: ["User"]
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
			invalidatesTags: ["User"]
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
			invalidatesTags: ["User"]
		}),
		logout: builder.mutation<ApiResponse, RequiredToken>({
			query: ({ token }) => ({
				url: "/logout",
				method: "POST",
				token
			}),
			invalidatesTags: ["User"]
		})
	})
})

export default api
export const {
	useCreateFormMutation,
	useCreateFormQuestionMutation,
	useCreateFormResponseMutation,
	useDeleteFormMutation,
	useDeleteFormQuestionMutation,
	useDeleteUserMutation,
	useGetFormQuery,
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
	useLazyGetFormQuestionQuery,
	useLazyGetFormResponseAnswersQuery,
	useLazyGetFormResponseQuery,
	useLazyGetFormResponsesQuery,
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useUpdateFormMutation,
	useUpdateFormQuestionMutation,
	useUpdateUserMutation,
	useUpdateUserPasswordMutation
} = api
