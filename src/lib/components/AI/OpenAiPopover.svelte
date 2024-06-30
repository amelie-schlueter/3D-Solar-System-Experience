<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { Bot, PlusIcon, UserIcon, Wand2, XIcon } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import { useChat } from '@ai-sdk/svelte';
	import { Textarea } from '../ui/textarea';

	export let name;

	const templates = [
		{
			label: `Discovery Time`,
			value: `When was ${name} discovered?`
		},
		{
			label: `Interesting Facts`,
			value: `What is the most interesting fact about ${name}?`
		},
		{
			label: `Distance from Sun`,
			value: `What is the distance of ${name} from the sun?`
		}
	];

	const useTemplate = (value: string) => {
		$input = value;
		handleSubmit();
	};

	const { input, handleSubmit, messages, metadata, setMessages } = useChat({
		body: {
			planet: { name }
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
	<Popover.Content class=" lg:w-[32rem] w-[90vw] mb-2 px-4 py-3">
		<div class="flex flex-col gap-2">
			{#if $messages.length !== 0}
				<ul class="space-y-4 py-2">
					{#each $messages as message}
						<li class="flex items-center">
							{#if message.role === 'assistant'}
								<div
									class="flex w-full text-muted-foreground text-start justify-start items-start gap-2"
								>
									<div
										class="p-1 bg-muted text-primary rounded-full w-7 h-7 flex-shrink-0 flex items-start justify-center"
									>
										<Bot class="w-4 h-4 " />
									</div>
									{message.content}
								</div>
							{:else}
								<div class="flex items-center gap-2">
									<div
										class="p-1 bg-muted rounded-full w-7 h-7 flex flex-shrink-0 items-start justify-center"
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

			<form on:submit={submitHandler} class="flex flex-col justify-start items-end gap-4">
				<Textarea
					placeholder="What is the most interesting fact about neptune?"
					bind:value={$input}
				/>
				<div class="flex flex-col gap-2 w-full">
					<p class="text-sm font-medium">Suggestions:</p>
					<div class="flex flex-wrap gap-2">
						{#each templates as template}
							<Button
								variant="secondary"
								size="sm"
								on:click={() => useTemplate(template.value)}
								class="w-fit"
							>
								{template.label}
							</Button>
						{/each}
					</div>
				</div>
				<Button type="submit" variant="secondary" size="sm" disabled={!$input}
					><span class="mr-1">Send</span>
				</Button>
			</form>
		</div>
	</Popover.Content>
</Popover.Root>
