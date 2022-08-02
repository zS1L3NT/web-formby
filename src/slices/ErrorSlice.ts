import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import { ApiError } from "../utils/axiosBaseQuery"

const slice = createSlice({
	name: "error",
	initialState: <ApiError | null>null,
	reducers: {
		setError: (state, action: PayloadAction<ApiError>) => action.payload
	}
})

export default slice.reducer
export const { setError } = slice.actions
