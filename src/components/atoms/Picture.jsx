'use client';

import Image from 'next/image';
import { cn, imageSize, isExternal } from '@/lib/utils';

const STORYBLOK = /^https:\/\/a(-[a-z]+)?\.storyblok\.com\//;

/** Storyblok resizes its own images, so Vercel doesn't have to. */
function storyblokLoader({ src, width, quality }) {
	return `${src}/m/${width}x0/filters:quality(${quality || 75})`;
}

/**
 * Image atom. Accepts `image={{ src, alt, position }}` or a plain `src`.
 * Storyblok photos are resized by Storyblok, local photos in /public by Next.js,
 * and SVGs are served as they are. `position` sets the focal point.
 */
export default function Picture({
	image,
	src,
	alt,
	fill = false,
	sizes = '100vw',
	priority = false,
	width,
	height,
	className,
	style,
}) {
	const source = src ?? (typeof image === 'string' ? image : image?.src);
	if (!source) return null;

	const altText = alt ?? (typeof image === 'object' ? image?.alt : '') ?? '';
	const position = typeof image === 'object' ? image?.position : undefined;
	const isSvg = /\.svg($|\?)/.test(source);
	const fromStoryblok = STORYBLOK.test(source) && !isSvg;
	const size = fromStoryblok ? imageSize(source) : null;

	const shared = {
		src: source,
		alt: altText,
		sizes,
		priority,
		className: cn('object-cover', className),
		style: position ? { objectPosition: position, ...style } : style,
		...(fromStoryblok
			? { loader: storyblokLoader }
			: { unoptimized: isSvg || isExternal(source) }),
	};

	if (fill) return <Image {...shared} alt={altText} fill />;
	return (
		<Image
			{...shared}
			alt={altText}
			width={width ?? size?.width ?? 1200}
			height={height ?? size?.height ?? 900}
		/>
	);
}
