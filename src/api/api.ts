import { createApi } from "@reduxjs/toolkit/query/react"
import axiosBaseQuery from "../utils/axiosBaseQuery"

export type ApiResponse = {
	message: string
}

export type RequireToken = {
	token: string
}

export type OptionalToken = {
	token?: string | null | undefined
}

const api = createApi({
	reducerPath: "api",
	tagTypes: ["User", "Form", "Question", "Response", "Answer"],
	baseQuery: axiosBaseQuery,
	endpoints: () => ({})
})

export default api