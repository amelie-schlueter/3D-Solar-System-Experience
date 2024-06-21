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
	// Parameters for scaling

	// const logarithmicBase = 10; // Base of the logarithm
	// const scaleFactor = 4; // This scale factor will determine how much the distances are compressed

	// // Adding 1 to avoid taking log of 0 which is undefined
	// // Use Math.max to ensure positive distances only (logarithm of negative numbers is undefined)
	// const adjustedDistance = Math.max(distanceInKm, 1);
	// const logarithmicDistance = Math.log10(adjustedDistance) * scaleFactor;

	// return logarithmicDistance;

	return distanceInKm / 50000000; // Scale down for better visualization in Three.js units
}

export function convertDistanceSmall(distanceInKm: number) {
	return distanceInKm / 400000000; // Scale down for better visualization in Three.js units
}

export function solveKepler(eccentricity: number, meanAnomaly: number) {
	let E = meanAnomaly; // Initial estimate
	const tolerance = 1e-6;
	while (true) {
		const deltaE =
			(meanAnomaly - (E - eccentricity * Math.sin(E))) / (1 - eccentricity * Math.cos(E));
		E += deltaE;
		if (Math.abs(deltaE) < tolerance) break;
	}
	return E;
}

// Berechnet die Eigenrotation der Planeten

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
