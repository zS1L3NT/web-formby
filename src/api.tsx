import { createApi } from "@reduxjs/toolkit/query/react"

import { WithTimestamps } from "./models"
import { iAnswer } from "./models/Answer"
import { iForm } from "./models/Form"
import { iQuestion } from "./models/Question"
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
	tagTypes: ["User", "Form", "Question", "Answer"],
	baseQuery: axiosBaseQuery,
	endpoints: builder => ({
		setAnswers: builder.mutation<
			ApiResponse,
			{ answers: Omit<iAnswer, "id" | "user_id">[] } & OptionalToken
		>({
			query: ({ token, answers }) => ({
				url: "/answers",
				method: "POST",
				body: {
					answers
				},
				token
			})
		}),
		getForms: builder.query<WithTimestamps<iForm>[], { page?: number } & RequiredToken>({
			query: ({ token, page }) => ({
				url: "/forms",
				method: "GET",
				params: {
					page
				},
				token
			}),
			providesTags: result => result?.map(form => ({ type: "Form", id: form.id })) ?? []
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
			invalidatesTags: result => (result ? [{ type: "Form", id: result.form.id }] : [])
		}),
		getForm: builder.query<WithTimestamps<iForm>, { form_id: string } & OptionalToken>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}`,
				method: "GET",
				token
			}),
			providesTags: result => (result ? [{ type: "Form", id: result.id }] : [])
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
			invalidatesTags: result => (result ? [{ type: "Form", id: result.form.id }] : [])
		}),
		deleteForm: builder.mutation<ApiResponse, { form_id: string } & RequiredToken>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}`,
				method: "DELETE",
				token
			}),
			invalidatesTags: (result, error, args) =>
				result ? [{ type: "Form", id: args.form_id }] : []
		}),
		getFormAnswers: builder.query<
			WithTimestamps<iAnswer>[],
			{ form_id: string } & RequiredToken
		>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}/answers`,
				method: "GET",
				token
			}),
			providesTags: result => result?.map(answer => ({ type: "Answer", id: answer.id })) ?? []
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
			providesTags: result =>
				result?.map(question => ({ type: "Question", id: question.id })) ?? []
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
			invalidatesTags: result => (result ? [{ type: "Question" }] : [])
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
			providesTags: result => (result ? [{ type: "Question", id: result.id }] : [])
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
			invalidatesTags: result => (result ? [{ type: "Question" }] : [])
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
			invalidatesTags: (result, error, args) => (result ? [{ type: "Question" }] : [])
		}),
		getUser: builder.query<WithTimestamps<iUser>, RequiredToken>({
			query: ({ token }) => ({
				url: "/user",
				method: "GET",
				token
			}),
			providesTags: result => (result ? [{ type: "User", id: result.id }] : [])
		}),
		updateUser: builder.mutation<ApiResponse, Partial<iUser> & RequiredToken>({
			query: ({ token, ...user }) => ({
				url: "/user",
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
	useGetFormAnswersQuery,
	useGetFormQuery,
	useGetFormQuestionQuery,
	useGetFormQuestionsQuery,
	useGetFormsQuery,
	useGetUserQuery,
	useLazyGetFormAnswersQuery,
	useLazyGetFormQuestionsQuery,
	useLazyGetFormsQuery,
	useLazyGetUserQuery,
	useLazyGetFormQuery,
	useLazyGetFormQuestionQuery,
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useSetAnswersMutation,
	useSetFormMutation,
	useSetFormQuestionMutation,
	useUpdateFormMutation,
	useUpdateFormQuestionMutation,
	useUpdateUserMutation
} = api
