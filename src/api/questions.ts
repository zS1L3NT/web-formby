import { WithTimestamps } from "../models"
import { iQuestion } from "../models/Question"
import api, { ApiResponse, OptionalToken, RequireToken } from "./api"

const questions = api.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
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
			Omit<iQuestion<any>, "id" | "form_id"> & { form_id: string } & RequireToken
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
			} & RequireToken
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
			{ form_id: string; question_id: string } & RequireToken
		>({
			query: ({ token, form_id, question_id }) => ({
				url: `/forms/${form_id}/questions/${question_id}`,
				method: "DELETE",
				token
			}),
			invalidatesTags: ["Question"]
		})
	})
})

export const {
	useCreateFormQuestionMutation,
	useDeleteFormQuestionMutation,
	useGetFormQuestionQuery,
	useGetFormQuestionsQuery,
	useLazyGetFormQuestionsQuery,
	useLazyGetFormQuestionQuery,
	useUpdateFormQuestionMutation
} = questions
