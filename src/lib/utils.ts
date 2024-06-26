import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export function convertDistance(distanceInKm: number) {
	const scale = Math.pow(10, -7.3); // Veränderte Skalierung zu 10^-5 für eine kleinere Skala
	return distanceInKm * scale; // Skaliert die Distanz
	// return distanceInKm / 400000000; // Scale down for better visualization in Three.js units
}

export function convertDistanceSmall(distanceInKm: number) {
	const scale = Math.pow(10, -4.8); // Eine etwas größere Skalierung im Vergleich zu -7.3 in convertDistance
	return distanceInKm * scale; // Skaliert die Distanz mit der gegebenen Skala
}

export function calculateSelfRotationSpeedHours(sideralRotation: number): number {
	// Ein voller Umlauf entspricht 360 Grad.
	const fullRotationInDegrees = 360;

	// Gesamtanzahl der Sekunden in einer Stunde
	const secondsPerHour = 3600;

	// Gesamtanzahl der Sekunden für einen kompletten sideralen Rotationszyklus
	const totalRotationSeconds = sideralRotation * secondsPerHour;

	// Berechnung der Eigenrotationsgeschwindigkeit in Grad pro Sekunde
	const rotationSpeed = fullRotationInDegrees / totalRotationSeconds;

	return rotationSpeed;
}

export function capitalizeFirstLetter(string: string) {
	if (typeof string !== 'string' || string.length === 0) {
		return '';
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getMoonData = async (url: string) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};
