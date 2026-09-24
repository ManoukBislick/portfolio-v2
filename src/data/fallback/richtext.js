/** Tiny helpers to write Storyblok rich text documents by hand. */
const text = (value, marks) => ({
	type: 'text',
	text: value,
	...(marks ? { marks } : {}),
});

export const p = (...parts) => ({
	type: 'paragraph',
	content: parts.map((part) => (typeof part === 'string' ? text(part) : part)),
});

export const bold = (value) => text(value, [{ type: 'bold' }]);
export const italic = (value) => text(value, [{ type: 'italic' }]);

export const h = (level, value) => ({
	type: 'heading',
	attrs: { level },
	content: [text(value)],
});

export const ul = (...items) => ({
	type: 'bullet_list',
	content: items.map((item) => ({ type: 'list_item', content: [p(item)] })),
});

export const quote = (value) => ({ type: 'blockquote', content: [p(value)] });

export const doc = (...blocks) => ({ type: 'doc', content: blocks });
