import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { LIST, OBJECT, OR, STRING, UNDEFINED, validate } from "validate-any"
import ObjectValidator from "validate-any/dist/validators/ObjectValidator"

import { BaseQueryFn } from "@reduxjs/toolkit/dist/query"

type ApiError = {
	type: string
	message: string
	stack?: any[]
	fields?: Record<string, string[]>
}

const API_ERROR: ObjectValidator<ApiError> = OBJECT({
	type: STRING(),
	message: STRING(),
	stack: OR(LIST(), UNDEFINED()),
	fields: OR(OBJECT(), UNDEFINED())
})

export default (async ({ url, method, data, params }) => {
	try {
		const result = await axios({
			url: "http://localhost:8000/api" + url,
			method,
			data,
			params
		})
		return { data: result.data }
	} catch (e) {
		const error = e as AxiosError
		console.error(error)

		const result = validate(error.response?.data, API_ERROR)
		const apiError = {
			type: result.data?.type ?? error.name,
			message: result.data?.message ?? error.message,
			stack: result.data?.stack,
			fields: result.data?.fields
		}

		return {
			error: apiError
		}
	}
}) as BaseQueryFn<
	{
		url: string
		method: AxiosRequestConfig["method"]
		data?: AxiosRequestConfig["data"]
		params?: AxiosRequestConfig["params"]
	},
	unknown,
	ApiError
>
