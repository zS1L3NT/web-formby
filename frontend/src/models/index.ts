export type WithTimestamps<T> = T & {
	created_at: string
	updated_at: string
}
