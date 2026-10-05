'use client';

import { useState } from 'react';
import { cn, imageSize } from '@/lib/utils';
import { Container, Picture } from '@/components/atoms';
import { Lightbox } from '@/components/molecules';
import ImageReveal from '@/components/animations/ImageReveal';

/** Width / height of an image, or portrait when Storyblok doesn't tell us. */
function ratioOf(image) {
	const size = imageSize(image.src);
	return size ? size.width / size.height : 4 / 5;
}

/** Wide images on their own row, the rest in pairs: 0 | 1 2 | 3 | 4 5 … */
function toRows(list) {
	const rows = [];
	list.forEach((image, index) => {
		const item = { image, index };
		if (index % 3 === 0 || index % 3 === 1) rows.push([item]);
		else rows[rows.length - 1].push(item);
	});
	return rows;
}

/** The image itself, as a button that opens it in the lightbox. */
function Zoomable({ image, sizes, onOpen }) {
	return (
		<button
			type="button"
			onClick={onOpen}
			aria-label={image.alt ? `View larger: ${image.alt}` : 'View larger'}
			className="relative block size-full cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-cream-50"
		>
			<Picture image={image} fill sizes={sizes} />
		</button>
	);
}

function Caption({ image }) {
	return image.caption ? (
		<figcaption className="mt-3 text-sm text-sage-600">
			{image.caption}
		</figcaption>
	) : null;
}

/**
 * A relaxed image gallery where every third image goes wide.
 * The images in between come in pairs that keep their own shape: each one gets
 * a width in proportion to its aspect ratio, so both end up equally tall and
 * nothing is cropped. Click an image to see it larger and browse the rest.
 */
export default function Gallery({ images = [], className }) {
	const [active, setActive] = useState(0);
	const [open, setOpen] = useState(false);
	const list = images.filter((image) => image?.src);
	if (!list.length) return null;

	const show = (index) => {
		setActive(index);
		setOpen(true);
	};

	return (
		<section className={cn('py-12 sm:py-16', className)}>
			<Container className="flex flex-col gap-5 sm:gap-8">
				{toRows(list).map((row, index) => {
					if (index % 2 === 0) {
						const [{ image, index: position }] = row;
						return (
							<figure key={image.src}>
								<ImageReveal className="aspect-[16/9] rounded-lg bg-sage-100">
									<Zoomable
										image={image}
										sizes="(min-width: 1280px) 1200px, 100vw"
										onOpen={() => show(position)}
									/>
								</ImageReveal>
								<Caption image={image} />
							</figure>
						);
					}

					return (
						<div
							key={row[0].image.src}
							className="flex flex-col gap-5 sm:flex-row sm:gap-8"
						>
							{row.map(({ image, index: position }) => {
								const ratio = ratioOf(image);
								return (
									<figure
										key={image.src}
										style={{ '--ratio': ratio }}
										className={cn(
											'min-w-0 sm:grow-(--ratio) sm:basis-0',
											row.length === 1 && 'sm:max-w-[calc(50%-1rem)]',
										)}
									>
										<ImageReveal
											className="rounded-lg bg-sage-100"
											style={{ aspectRatio: ratio }}
										>
											<Zoomable
												image={image}
												sizes="(min-width: 1280px) 700px, (min-width: 640px) 60vw, 100vw"
												onOpen={() => show(position)}
											/>
										</ImageReveal>
										<Caption image={image} />
									</figure>
								);
							})}
						</div>
					);
				})}
			</Container>

			<Lightbox
				images={list}
				index={active}
				open={open}
				onChange={setActive}
				onClose={() => setOpen(false)}
			/>
		</section>
	);
}
