<script>
	import PageTitle from '$lib/components/PageTitle.svelte'

	const { data } = $props()
</script>

<PageTitle>List</PageTitle>

<table>
	<tbody>
		{#each data.boardList as board}
			<tr>
				<td><a href="/board/{board.id}">{board.title}</a></td>
			</tr>
		{/each}
	</tbody>
</table>
