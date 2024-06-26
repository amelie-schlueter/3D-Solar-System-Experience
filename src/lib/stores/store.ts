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
	avgTemp: '',
	sideralRotation: '',
	sideralOrbit: '',
	meanRadius: ''
});

export const activePlanet = writable('');

export const defaultPopupContent = {
	name: '',
	description: '',
	bodyType: '',
	gravity: '',
	massVolume: '',
	discoveredBy: '',
	discoveryDate: '',
	avgTemp: '',
	sideralRotation: '',
	sideralOrbit: '',
	meanRadius: ''
};

export const defaultMoon = {
	name: 'moon',
	meanRadius: 1737.4,
	semimajorAxis: 384400,
	perihelion: 147095000,
	aphelion: 152100000,
	eccentricity: 0.0167,
	inclination: 50,
	sideralOrbit: 27.3217,
	color: 'white'
};

const emptyMoon = {
	name: '',
	meanRadius: 0,
	semimajorAxis: 0,
	perihelion: 0,
	aphelion: 0,
	eccentricity: 0,
	inclination: 0,
	sideralOrbit: 0,
	color: ''
};

export const configuratorValues = writable({
	name: 'planet',
	meanRadius: 6371.0084,
	semimajorAxis: 149598023,
	perihelion: 147095000,
	aphelion: 152100000,
	eccentricity: 0.0167,
	inclination: 50,
	sideralOrbit: 23.9345,
	color: 'white',
	moons: [],
	autoRotate: true
});

export const planetDetailIsFetching = writable(false);

export const detailMoonData = writable<any[]>([]);
