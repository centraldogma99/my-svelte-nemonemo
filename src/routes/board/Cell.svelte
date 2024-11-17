<script lang="ts">
	import { CellStatus } from '$lib/constants'
	import type { SvelteHTMLElements } from 'svelte/elements'

	const { status, children, ...tdProps }: { status: CellStatus } & SvelteHTMLElements['td'] =
		$props()
</script>

<td
	class="border-1 h-6 w-6 select-none border border-dashed border-black text-sm text-black"
	class:bg-black={status === CellStatus.Filled}
	{...tdProps}
>
	{status === CellStatus.X ? 'X' : ''}
</td>
