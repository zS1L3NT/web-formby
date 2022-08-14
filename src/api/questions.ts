import { WithTimestamps } from "../models"
import { iQuestion } from "../models/Question"
import sortQuestions from "../utils/sortQuestions"
import api, { ApiResponse, optimistic, OptionalToken, RequireToken } from "./api"

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
			onQueryStarted: async ({ token, form_id, question_id, ...question }, mutators) => {
				await optimistic(
					mutators,
					questions.util.updateQueryData(
						"getFormQuestions",
						{ token, form_id },
						_questions => {
							const questions = <WithTimestamps<iQuestion<any>>[]>(
								JSON.parse(JSON.stringify(_questions))
							)
							const index = questions.findIndex(q => q.id === question_id)
							if (index === -1) return

							questions[index] = {
								...questions[index]!,
								...question
							}

							return sortQuestions(questions)
						}
					)
				)
			},
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
			onQueryStarted: async ({ token, form_id, question_id }, mutators) => {
				await optimistic(
					mutators,
					questions.util.updateQueryData(
						"getFormQuestions",
						{ token, form_id },
						_questions => {
							const question = _questions.find(q => q.id === question_id)
							if (!question) return

							_questions.splice(_questions.indexOf(question), 1)
							const previousQuestion = _questions.find(
								q => q.previous_question_id === question_id
							)
							if (!previousQuestion) return

							previousQuestion.previous_question_id = question.previous_question_id
						}
					)
				)
			},
			invalidatesTags: ["Question"]
		})
	})
})

export const {
	useCreateFormQuestionMutation,
	useDeleteFormQuestionMutation,
	useGetFormQuestionsQuery,
	useLazyGetFormQuestionsQuery,
	useUpdateFormQuestionMutation
} = questions
