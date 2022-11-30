import { WithTimestamps } from "../models"
import { iAnswer } from "../models/Answer"
import api, { RequireToken } from "./api"

const answers = api.injectEndpoints({
	endpoints: builder => ({
		getFormResponseAnswers: builder.query<
			WithTimestamps<iAnswer<any>>[],
			{ form_id: string; response_id: string } & RequireToken
		>({
			query: ({ token, form_id, response_id }) => ({
				url: `/forms/${form_id}/responses/${response_id}/answers`,
				method: "GET",
				token
			}),
			providesTags: ["Answer"]
		})
	})
})

export const { useGetFormResponseAnswersQuery, useLazyGetFormResponseAnswersQuery } = answers
