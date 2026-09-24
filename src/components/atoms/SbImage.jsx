'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

const STORYBLOK_ASSET = /^https:\/\/a(-[a-z]+)?\.storyblok\.com\//;

/** Uses Storyblok's own image service to resize, so Vercel doesn't have to. */
function storyblokLoader({ src, width, quality }) {
	return `${src}/m/${width}x0/filters:quality(${quality || 75})`;
}

/** Storyblok filenames contain the original size: /f/123/1600x1200/abc/name.jpg */
function sizeFromFilename(src) {
	const match = src.match(/\/(\d+)x(\d+)\//);
	return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}

/** Convert Storyblok's focal point ("x1xy1:x2xy2") into a CSS object-position. */
function focusToPosition(focus, size) {
	if (!focus || !size) return undefined;
	const [a, b] = focus.split(':');
	const [x1, y1] = a.split('x').map(Number);
	const [x2, y2] = b.split('x').map(Number);
	const x = (((x1 + x2) / 2 / size.width) * 100).toFixed(1);
	const y = (((y1 + y2) / 2 / size.height) * 100).toFixed(1);
	return `${x}% ${y}%`;
}

/**
 * Image atom for Storyblok assets and local files alike.
 * Accepts a Storyblok asset object ({ filename, alt, focus }) or a plain src.
 */
export default function SbImage({
	image,
	alt,
	fill = false,
	sizes = '100vw',
	priority = false,
	width,
	height,
	className,
	style,
	...rest
}) {
	const src = typeof image === 'string' ? image : image?.filename;
	if (!src) return null;

	const altText = alt ?? (typeof image === 'object' ? image?.alt : '') ?? '';
	const isStoryblok = STORYBLOK_ASSET.test(src);
	const intrinsic = isStoryblok ? sizeFromFilename(src) : null;
	const objectPosition = focusToPosition(image?.focus, intrinsic);

	const shared = {
		src,
		alt: altText,
		priority,
		sizes,
		className: cn('object-cover', className),
		style: objectPosition ? { objectPosition, ...style } : style,
		...(isStoryblok ? { loader: storyblokLoader } : { unoptimized: true }),
		...rest,
	};

	if (fill) return <Image {...shared} alt={altText} fill />;

	return (
		<Image
			{...shared}
			alt={altText}
			width={width ?? intrinsic?.width ?? 1200}
			height={height ?? intrinsic?.height ?? 900}
		/>
	);
}
