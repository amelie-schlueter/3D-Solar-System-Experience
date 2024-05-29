<script>
	import { T, Canvas, extend, useLoader } from '@threlte/core';
	import * as THREE from 'three';
	import { DirectionalLight, ShaderMaterial, TextureLoader } from 'three';
	import { Instance, InstancedMesh } from '@threlte/extras';

	const starTexture = useLoader(TextureLoader).load('src/public/circle.png');
</script>

<Instance position={[1, 1, 1]} />
