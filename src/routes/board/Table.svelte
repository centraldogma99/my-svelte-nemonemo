<script lang="ts">
	import { CellStatus } from '$lib/constants'
	import { isEqual } from 'lodash-es'
	import Cell from './Cell.svelte'

	interface TableProps {
		rowSize: number
		colSize: number
		initialTable?: CellStatus[][]
		answer: boolean[][]
	}

	const getArrayWithLength = (length: number) => Array.from({ length })

	const { rowSize, colSize, initialTable, answer }: TableProps = $props()
	let table = $state<CellStatus[][]>(
		initialTable ??
			getArrayWithLength(rowSize).map(() => getArrayWithLength(colSize).map(() => CellStatus.Empty))
	)

	const handleCellLeftClick = (i: number, j: number) => {
		table[i][j] = table[i][j] === CellStatus.Empty ? CellStatus.Filled : CellStatus.Empty

		if (isEqual(table, booleanMapToCellStatusMap(answer))) {
			// GAME FINISHED
			console.info('Congratulation!')
		}
	}

	const handleCellRightClick = (i: number, j: number) => {
		table[i][j] = table[i][j] !== CellStatus.X ? CellStatus.X : CellStatus.Empty
	}

	const { rowHints, colHints } = generateHints(answer)

	function getLineHints(line: boolean[]): number[] {
		const hints: number[] = []
		let count = 0

		for (const cell of line) {
			if (cell) {
				count += 1 // 채워진 칸을 발견하면 카운트를 증가
			} else if (count > 0) {
				hints.push(count) // 채우기 종료, 카운트를 힌트에 추가
				count = 0
			}
		}

		if (count > 0) {
			hints.push(count) // 마지막 그룹을 힌트에 추가
		}

		return hints.length ? hints : [0] // 빈 경우 [0] 반환
	}

	const booleanMapToCellStatusMap = (map: boolean[][]): CellStatus[][] =>
		map.map((row) => row.map((cell) => (cell ? CellStatus.Filled : CellStatus.Empty)))

	function generateHints(grid: boolean[][]): {
		rowHints: number[][]
		colHints: number[][]
	} {
		const rowHints = grid.map(getLineHints)
		const colHints = Array.from({ length: grid[0].length }, (_, colIndex) =>
			getLineHints(grid.map((row) => row[colIndex]))
		)

		return { rowHints, colHints }
	}
</script>

<table class="table-fixed border-collapse border-2 border-[#555555]">
	<tbody>
		<tr>
			<td></td>
			{#each colHints as colHint}
				<td class="p-1 text-center align-bottom leading-5">
					{#each colHint as hint}
						{hint}
						<br />
					{/each}
				</td>
			{/each}
		</tr>
		{#each table as row, i}
			<tr>
				<td class="p-1 text-right">{rowHints[i].join(' ')}</td>
				{#each row as cell, j}
					<Cell
						status={cell}
						onclick={() => handleCellLeftClick(i, j)}
						oncontextmenu={(e) => {
							e.preventDefault()
							handleCellRightClick(i, j)
						}}
					/>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
