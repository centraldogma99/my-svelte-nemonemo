import { boards } from '$lib/boards'

export const load = () => {
	return {
		boardList: boards.map((board) => ({
			id: board.id,
			title: board.title
		}))
	}
}
