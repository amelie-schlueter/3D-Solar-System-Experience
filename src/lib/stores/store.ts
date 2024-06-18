import { writable } from 'svelte/store';

export const cameraControls = writable(undefined);

export const journeyStarted = writable(false);

export const popupContent = writable({
	name: '',
	description: '',
	bodyType: '',
	gravity: '',
	massVolume: '',
	discoveredBy: '',
	discoveryDate: '',
	avgTemp: ''
});

export const activePlanet = writable('earth');

export const defaultPopupContent = {
	name: '',
	description: '',
	bodyType: '',
	gravity: '',
	massVolume: '',
	discoveredBy: '',
	discoveryDate: '',
	avgTemp: ''
};
