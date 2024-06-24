<script lang="ts">
	// your script goes here
	import * as Dialog from '$lib/components/ui/dialog';
	import { Keyboard, Mouse, MouseIcon, MousePointerClick, Move } from 'lucide-svelte';
	import Button from '../ui/button/button.svelte';
	import Hotkey from './HotkeyItem.svelte';
	import HotkeyWrapper from './HotkeyWrapper.svelte';
	import PlanetIcon from '$lib/images/icons/PlanetIcon.svelte';
</script>

<Dialog.Root>
	<Dialog.Trigger class="fixed bottom-8 right-8 z-[100]">
		<Button size="icon" variant="secondary">
			<Keyboard class="w-5 h-5" strokeWidth={1.5} /></Button
		>
	</Dialog.Trigger>
	<Dialog.Content class="w-full max-w-[20rem] md:max-w-[30rem]">
		<Dialog.Header>
			<Dialog.Title>Controls</Dialog.Title>
			<Dialog.Description>
				This is an interactive space experience. If you need help with the navigation, you can use
				this cheatsheet
			</Dialog.Description>
		</Dialog.Header>
		<div class="border-b"></div>
		<div class="w-full grid md:grid-cols-2 md:gap-x-8 gap-y-4 text-sm">
			<div class="flex items-center gap-4 text-sm">
				<HotkeyWrapper>
					<Hotkey><MousePointerClick class="w-4 h-4" strokeWidth={1.5} /></Hotkey>
					<Hotkey><Move class="w-4 h-4" strokeWidth={1.5} /></Hotkey>
				</HotkeyWrapper>
				<p>Orbit around</p>
			</div>
			<div class="flex items-center gap-4 text-sm">
				<HotkeyWrapper>
					<Hotkey><Mouse class="w-4 h-4" strokeWidth={1.5} /></Hotkey>
				</HotkeyWrapper>
				<p>Zoom in/out</p>
			</div>
			<div class="flex items-center gap-4 text-sm">
				<HotkeyWrapper>
					<Hotkey>⌘</Hotkey>
					<Hotkey><Mouse class="w-4 h-4" strokeWidth={1.5} /></Hotkey>
				</HotkeyWrapper>
				<p>Pan Around</p>
			</div>
			<div class="flex items-center gap-4 text-sm">
				<HotkeyWrapper>
					<Hotkey><PlanetIcon /></Hotkey>
					<Hotkey><MousePointerClick class="w-4 h-4" strokeWidth={1.5} /></Hotkey>
				</HotkeyWrapper>
				<p>Planet Info</p>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
