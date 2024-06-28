<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Bot, PlusIcon, UserIcon, Wand2, XIcon } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import Input from '../ui/input/input.svelte';
	import { useChat } from '@ai-sdk/svelte';
	import HotkeyItem from '../Content/HotkeyItem.svelte';
	import { Textarea } from '../ui/textarea';
	import { onMount } from 'svelte';
	import { v4 as uuid } from 'uuid';

	const { input, handleSubmit, messages, metadata, setMessages } = useChat({
		body: {
			planet: 'neptune'
		}
	});

	const submitHandler = (e: SubmitEvent) => {
		e.preventDefault();
		handleSubmit();
	};
</script>

<Popover.Root>
	<Popover.Trigger>
		<Button class="w-fit" variant="default"
			><Wand2 class="w-4 h-4 mr-2 " />
			Ask AI
		</Button></Popover.Trigger
	>
	<Popover.Content class=" w-[27rem] mb-2 px-4 py-3">
		<div class="flex flex-col gap-2">
			{#if $messages.length !== 0}
				<ul class="space-y-2 py-2">
					{#each $messages as message}
						<li class="flex items-center">
							{#if message.role === 'assistant'}
								<div class="flex w-full text-end justify-end items-center gap-2">
									{message.content}
									<div
										class="p-1 bg-muted rounded-full w-7 h-7 flex-shrink-0 flex items-center justify-center"
									>
										<Bot class="w-4 h-4 " />
									</div>
								</div>
							{:else}
								<div class="flex items-center gap-2">
									<div
										class="p-1 bg-muted rounded-full w-7 h-7 flex flex-shrink-0 items-center justify-center"
									>
										<UserIcon class="w-4 h-4 " />
									</div>
									{message.content}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
			{/if}
			<form on:submit={submitHandler} class="flex flex-col justify-end items-end gap-4">
				<Textarea
					placeholder="What is the most interesting fact about neptune?"
					bind:value={$input}
				/>
				<Button type="submit" variant="secondary" size="sm" disabled={!$input}
					><span class="mr-1">Send</span>
				</Button>
			</form>
		</div>
	</Popover.Content>
</Popover.Root>
