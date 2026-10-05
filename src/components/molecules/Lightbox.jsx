'use client';

import { useEffect, useRef } from 'react';
import { cn, imageSize } from '@/lib/utils';
import { Picture } from '@/components/atoms';

const SWIPE = 50;

const iconButton =
	'flex size-11 items-center justify-center rounded-full bg-cream-50/10 text-cream-50 transition-colors duration-300 hover:bg-cream-50/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50';

function Chevron({ direction }) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
			<path
				d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

/**
 * Shows one image of a list full screen, with arrows (and arrow keys or a swipe)
 * to browse the rest. Escape, the close button or a click next to the image closes it.
 * `index` stays set while it closes, so the image can fade out with it.
 */
export default function Lightbox({
	images = [],
	index = 0,
	open = false,
	onChange,
	onClose,
}) {
	const dialogRef = useRef(null);
	const swipeStart = useRef(null);
	const image = images[index] ?? null;
	const many = images.length > 1;

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (open && !dialog.open) dialog.showModal();
		if (!open && dialog.open) dialog.close();
	}, [open]);

	// Keep the page behind the lightbox from scrolling.
	useEffect(() => {
		if (!open) return;
		const root = document.documentElement;
		const previous = root.style.overflow;
		root.style.overflow = 'hidden';
		return () => {
			root.style.overflow = previous;
		};
	}, [open]);

	const go = (step) =>
		onChange((index + step + images.length) % images.length);

	const onKeyDown = (event) => {
		if (!many) return;
		if (event.key === 'ArrowLeft') go(-1);
		if (event.key === 'ArrowRight') go(1);
	};

	// A click on the dark area around the image closes the lightbox.
	const onBackdrop = (event) => {
		if (event.target === event.currentTarget) onClose();
	};

	const onPointerDown = (event) => {
		swipeStart.current = event.clientX;
	};
	const onPointerUp = (event) => {
		if (swipeStart.current === null || !many) return;
		const distance = event.clientX - swipeStart.current;
		swipeStart.current = null;
		if (Math.abs(distance) > SWIPE) go(distance < 0 ? 1 : -1);
	};

	const size = image ? imageSize(image.src) : null;

	return (
		<dialog
			ref={dialogRef}
			aria-label={image?.alt || 'Image'}
			onClose={onClose}
			onCancel={onClose}
			onKeyDown={onKeyDown}
			onClick={onBackdrop}
			className={cn(
				'm-0 size-full max-h-none max-w-none bg-transparent p-0 text-cream-50',
				'backdrop:bg-sage-950/90',
				'opacity-0 transition-[opacity,display,overlay] transition-discrete duration-300 open:opacity-100 starting:open:opacity-0 motion-reduce:transition-none',
			)}
		>
			{image ? (
				<div
					onClick={onBackdrop}
					onPointerDown={onPointerDown}
					onPointerUp={onPointerUp}
					className="flex size-full flex-col items-center justify-center gap-4 px-4 py-20 sm:px-24"
				>
					<Picture
						key={image.src}
						image={image}
						sizes="90vw"
						width={size?.width}
						height={size?.height}
						className="h-auto max-h-[calc(100dvh-13rem)] w-auto max-w-full rounded-lg transition-opacity duration-500 starting:opacity-0 motion-reduce:transition-none"
					/>
					{image.caption || many ? (
						<p className="flex shrink-0 gap-4 text-sm text-cream-200">
							{many ? (
								<span aria-live="polite" className="tabular-nums">
									{index + 1} / {images.length}
								</span>
							) : null}
							{image.caption ? <span>{image.caption}</span> : null}
						</p>
					) : null}
				</div>
			) : null}

			<button
				type="button"
				onClick={onClose}
				aria-label="Close"
				className={cn(iconButton, 'absolute top-4 right-4')}
			>
				<svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
					<path
						d="M6 6l12 12M18 6L6 18"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
					/>
				</svg>
			</button>

			{many ? (
				<>
					<button
						type="button"
						onClick={() => go(-1)}
						aria-label="Previous image"
						className={cn(
							iconButton,
							'absolute bottom-4 left-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2',
						)}
					>
						<Chevron direction="left" />
					</button>
					<button
						type="button"
						onClick={() => go(1)}
						aria-label="Next image"
						className={cn(
							iconButton,
							'absolute right-4 bottom-4 sm:top-1/2 sm:bottom-auto sm:-translate-y-1/2',
						)}
					>
						<Chevron direction="right" />
					</button>
				</>
			) : null}
		</dialog>
	);
}
