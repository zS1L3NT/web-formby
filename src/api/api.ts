import { ThunkAction } from "@reduxjs/toolkit"
import { PatchCollection } from "@reduxjs/toolkit/dist/query/core/buildThunks"
import { MutationLifecycleApi } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
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

export const optimistic = async (
	{ dispatch, queryFulfilled }: MutationLifecycleApi<any, any, any, any>,
	...actions: ThunkAction<PatchCollection, any, any, any>[]
) => {
	const patches = actions.map(action => dispatch(action))
	queryFulfilled.catch(() => patches.map(patch => patch.undo()))
}

export default api
