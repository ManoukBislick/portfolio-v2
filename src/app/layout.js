import localFont from 'next/font/local';
import './globals.css';
import { site } from '@/lib/site';
import SiteHeader from '@/components/organisms/SiteHeader';
import SiteFooter from '@/components/organisms/SiteFooter';

const poppins = localFont({
	variable: '--font-poppins',
	display: 'swap',
	src: [
		{
			path: '../fonts/poppins-latin-300-normal.woff2',
			weight: '300',
			style: 'normal',
		},
		{
			path: '../fonts/poppins-latin-400-normal.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../fonts/poppins-latin-500-normal.woff2',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../fonts/poppins-latin-600-normal.woff2',
			weight: '600',
			style: 'normal',
		},
	],
});

const cormorant = localFont({
	variable: '--font-cormorant',
	display: 'swap',
	src: [
		{
			path: '../fonts/cormorant-garamond-latin-wght-normal.woff2',
			weight: '300 700',
			style: 'normal',
		},
		{
			path: '../fonts/cormorant-garamond-latin-wght-italic.woff2',
			weight: '300 700',
			style: 'italic',
		},
	],
});

export const metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: `${site.name} — ${site.role}`,
		template: `%s — ${site.name}`,
	},
	description: site.description,
	openGraph: {
		siteName: site.name,
		locale: 'en_GB',
		type: 'website',
	},
};

export const viewport = {
	themeColor: '#fcfbf6',
};

/**
 * Runs before first paint: opt in to entrance animations only when motion is welcome,
 * and fall back to fully visible content if GSAP doesn't boot within 4 seconds.
 */
const motionGuard = `(function(){try{var d=document.documentElement;if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches){d.classList.add('js-anim');setTimeout(function(){if(!d.classList.contains('gsap-ready')){d.classList.remove('js-anim')}},4000)}}catch(e){}})();`;

export default function RootLayout({ children }) {
	return (
		<html
			lang="en"
			className={`${poppins.variable} ${cormorant.variable}`}
			suppressHydrationWarning
		>
			<head>
				<script dangerouslySetInnerHTML={{ __html: motionGuard }} />
			</head>
			<body className="grain min-h-dvh overflow-x-clip">
				<SiteHeader />
				<main id="main">{children}</main>
				<SiteFooter />
			</body>
		</html>
	);
}
