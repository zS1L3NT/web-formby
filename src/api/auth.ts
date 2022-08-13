import { WithTimestamps } from "../models"
import { iUser } from "../models/User"
import api, { ApiResponse, RequireToken } from "./api"

const auth = api.injectEndpoints({
	overrideExisting: false,
	endpoints: builder => ({
		getUser: builder.query<WithTimestamps<iUser>, { user_id: string } | { token: string }>({
			query: data => ({
				url: "user_id" in data ? `/users/${data.user_id}` : `/user`,
				method: "GET",
				token: "token" in data ? data.token : undefined
			}),
			providesTags: ["User"]
		}),
		updateUser: builder.mutation<ApiResponse, Omit<Partial<iUser>, "id"> & RequireToken>({
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
			{ old_password: string; new_password: string } & RequireToken
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
		deleteUser: builder.mutation<ApiResponse, RequireToken>({
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
		logout: builder.mutation<ApiResponse, RequireToken>({
			query: ({ token }) => ({
				url: "/logout",
				method: "POST",
				token
			}),
			invalidatesTags: ["User"]
		})
	})
})

export const {
	useDeleteUserMutation,
	useGetUserQuery,
	useLazyGetUserQuery,
	useLoginMutation,
	useLogoutMutation,
	useRegisterMutation,
	useUpdateUserMutation,
	useUpdateUserPasswordMutation
} = auth
