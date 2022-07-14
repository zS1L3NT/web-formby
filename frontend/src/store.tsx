import { configureStore } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
	endpoints: () => ({})
})

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware)
})

export type Store = typeof store
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState>
export default store
