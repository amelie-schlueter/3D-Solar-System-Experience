<script>
	import { T, useTask } from '@threlte/core';
	import {
		Instance,
		OrbitControls,
		InstancedMesh,
		interactivity,
		Text,
		Suspense,
		HTML,
		FakeGlowMaterial,
		Outlines,
		Stars
	} from '@threlte/extras';
	import { useLoader } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { AmbientLight, PointLight, TextureLoader } from 'three';

	//

	const earth = useLoader(TextureLoader).load('src/public/sun.jpeg');
	const clouds = useLoader(TextureLoader).load('src/public/earth-clouds.jpeg');
	interactivity();
	const scale = spring(1);
	let rotation = 0;
	useTask((delta) => {
		rotation += delta * 0.15;
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[10, 10, 10]}
	on:create={({ ref }) => {
		ref.lookAt(0, 1, 0);
	}}
>
	<OrbitControls />
</T.PerspectiveCamera>
<Stars />
<T.AmbientLight intensity={0.1} />
<T.Mesh rotation.y={rotation} position.y={1} scale={$scale} on:click={() => {}}>
	<T.IcosahedronGeometry args={[1, 6]} />
	<T is={AmbientLight} intensity={2} />
	<T.MeshStandardMaterial map={$earth} />
	<FakeGlowMaterial glowColor="orange" glowInternalRadius={20} />
	<Outlines color="orange" opacity={0.5} thickness={0.005} />
</T.Mesh>

<T.Mesh rotation.y={rotation * 1.4} position.y={1} scale={$scale} on:click={() => {}}>
	<T.IcosahedronGeometry args={[1, 4]} />

	<T.MeshStandardMaterial map={$earth} />
</T.Mesh>
