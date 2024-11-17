<script>
	import PageTitle from '$lib/components/PageTitle.svelte'
	import Table from '../Table.svelte'

	const { data } = $props()
</script>

<title>{data.board.title}</title>

<PageTitle>{data.board.title}</PageTitle>

<div class="align-center flex justify-center">
	<Table
		rowSize={data.board.answer.length}
		colSize={data.board.answer[0].length}
		answer={data.board.answer}
	/>
</div>
