import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn, isExternal } from '@/lib/utils';

const components = {
	a: ({ href = '', children, ...props }) =>
		isExternal(href) ? (
			<a href={href} target="_blank" rel="noopener noreferrer" {...props}>
				{children}
			</a>
		) : (
			<a href={href} {...props}>
				{children}
			</a>
		),
	// eslint-disable-next-line @next/next/no-img-element
	img: ({ alt = '', ...props }) => <img alt={alt} loading="lazy" {...props} />,
};

/** Markdown for blog articles (Storyblok markdown field), with GitHub-flavoured extras. */
export default function Markdown({ children, className }) {
	if (!children) return null;
	return (
		<div className={cn('prose-calm', className)}>
			<ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
				{children}
			</ReactMarkdown>
		</div>
	);
}
