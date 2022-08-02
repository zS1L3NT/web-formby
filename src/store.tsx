import { configureStore } from "@reduxjs/toolkit"

import api from "./api"
import { errorHandlerMiddleware } from "./components/ErrorHandler"
import ErrorSlice from "./slices/ErrorSlice"

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		error: ErrorSlice
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware, errorHandlerMiddleware)
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
