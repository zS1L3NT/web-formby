import { WithTimestamps } from "../models"
import { iAnswer } from "../models/Answer"
import { iResponse } from "../models/Response"
import api, { ApiResponse, OptionalToken, RequireToken } from "./api"

const responses = api.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		getFormResponses: builder.query<
			WithTimestamps<iResponse>[],
			{ form_id: string } & RequireToken
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
			{ form_id: string; response_id: string } & RequireToken
		>({
			query: ({ token, form_id, response_id }) => ({
				url: `/forms/${form_id}/responses/${response_id}`,
				method: "GET",
				token
			}),
			providesTags: ["Response"]
		})
	})
})

export const {
	useCreateFormResponseMutation,
	useGetFormResponseQuery,
	useGetFormResponsesQuery,
	useLazyGetFormResponseQuery,
	useLazyGetFormResponsesQuery
} = responses
