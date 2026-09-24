import { setComponents } from '@storyblok/react/rsc';

import ArticleBlok from './ArticleBlok';
import ArticleIndexBlok from './ArticleIndexBlok';
import ContactSectionBlok from './ContactSectionBlok';
import CtaBlok from './CtaBlok';
import FactsBlok from './FactsBlok';
import FeaturedProjectsBlok from './FeaturedProjectsBlok';
import HeroBlok from './HeroBlok';
import LatestArticlesBlok from './LatestArticlesBlok';
import MarqueeBlok from './MarqueeBlok';
import Page from './Page';
import PageHeroBlok from './PageHeroBlok';
import PillarsBlok from './PillarsBlok';
import ProjectBlok from './ProjectBlok';
import ProjectGridBlok from './ProjectGridBlok';
import RichTextBlok from './RichTextBlok';
import SkillsBlok from './SkillsBlok';
import TextImageBlok from './TextImageBlok';
import TimelineBlok from './TimelineBlok';

/**
 * Storyblok technical name → React component.
 * Keep this in sync with scripts/storyblok/schema.mjs.
 */
export const bloks = {
	// Content types
	page: Page,
	project: ProjectBlok,
	article: ArticleBlok,
	// Sections
	hero: HeroBlok,
	page_hero: PageHeroBlok,
	marquee: MarqueeBlok,
	pillars: PillarsBlok,
	text_image: TextImageBlok,
	facts: FactsBlok,
	timeline: TimelineBlok,
	skills: SkillsBlok,
	featured_projects: FeaturedProjectsBlok,
	project_grid: ProjectGridBlok,
	article_index: ArticleIndexBlok,
	latest_articles: LatestArticlesBlok,
	rich_text: RichTextBlok,
	cta: CtaBlok,
	contact_section: ContactSectionBlok,
};

setComponents(bloks);
