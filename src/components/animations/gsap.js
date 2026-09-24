'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { Flip } from 'gsap/Flip';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
	gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip, useGSAP);
	gsap.defaults({ ease: 'power3.out', duration: 1.1 });
}

/** Media query used to opt in to motion. Mirrors the inline script in <head>. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

/** The calm house ease: fast start, long soft landing. */
export const EASE = 'expo.out';

/** Tell the page GSAP booted, so the no-flash guard can stay in place. */
export function markGsapReady() {
	if (typeof document !== 'undefined') {
		document.documentElement.classList.add('gsap-ready');
	}
}

/** Make an element visible again (used when motion is reduced). */
export function show(targets) {
	gsap.set(targets, { autoAlpha: 1, clearProps: 'transform' });
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Flip, useGSAP };
