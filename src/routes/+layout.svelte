<script lang="ts">
	import '../app.css'
	let { children } = $props()
</script>

<div class="mx-auto h-full w-full max-w-screen-lg text-center">
	<div class="flex h-full w-auto flex-col justify-center">
		{@render children()}
	</div>
</div>
