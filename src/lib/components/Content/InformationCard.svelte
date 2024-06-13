<script>
	import { cn } from "$lib/utils";

	// your script goes here

	import { Button, buttonVariants } from "../ui/button";

</script>

!<!-- markup (zero or more items) goes here -->

<div class="p-4 min-w-md fixed top-4 z-[10000000000000000000000000] bg-black/80 blur-mdleft-4  rounded-sm border">
	<div class="w-full h-full flex flex-col justify-center items-center">
        <a href={`planet/earth`} class={cn(buttonVariants({variant:"default"}))}>More Information about the planet</a>
	</div>
</div>

<style>

</style>
