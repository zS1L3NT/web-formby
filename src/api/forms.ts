import { WithTimestamps } from "../models"
import { iForm } from "../models/Form"
import api, { ApiResponse, OptionalToken, RequireToken } from "./api"

const forms = api.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		getForms: builder.query<WithTimestamps<iForm>[], RequireToken>({
			query: ({ token }) => ({
				url: "/forms",
				method: "GET",
				token
			}),
			providesTags: ["Form"]
		}),
		createForm: builder.mutation<
			ApiResponse & { form: WithTimestamps<iForm> },
			Omit<iForm, "id" | "user_id"> & RequireToken
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
			Partial<Omit<iForm, "id" | "user_id">> & { form_id: string } & RequireToken
		>({
			query: ({ token, form_id, ...form }) => ({
				url: `/forms/${form_id}`,
				method: "PUT",
				body: form,
				token
			}),
			invalidatesTags: ["Form"]
		}),
		deleteForm: builder.mutation<ApiResponse, { form_id: string } & RequireToken>({
			query: ({ token, form_id }) => ({
				url: `/forms/${form_id}`,
				method: "DELETE",
				token
			}),
			invalidatesTags: ["Form"]
		})
	})
})

export const {
	useCreateFormMutation,
	useDeleteFormMutation,
	useGetFormQuery,
	useGetFormsQuery,
	useLazyGetFormsQuery,
	useLazyGetFormQuery,
	useUpdateFormMutation
} = forms
