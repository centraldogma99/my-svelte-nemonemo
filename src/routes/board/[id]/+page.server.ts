import { boards } from '$lib/boards'
import { error } from '@sveltejs/kit'

export const load = ({ params }) => {
	const board = boards.find((board) => board.id === params.id)

	if (!board) return error(404)
	return {
		board
	}
}
