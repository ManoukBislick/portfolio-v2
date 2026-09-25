import { setComponents } from '@storyblok/react/rsc';

import ArticleBlok from './ArticleBlok';
import ArticleListBlok from './ArticleListBlok';
import FeaturedProjectsBlok from './FeaturedProjectsBlok';
import HeroBlok from './HeroBlok';
import LatestArticlesBlok from './LatestArticlesBlok';
import PageBlok from './PageBlok';
import PageHeroBlok from './PageHeroBlok';
import ProjectBlok from './ProjectBlok';
import ProjectGridBlok from './ProjectGridBlok';
import RichTextBlok from './RichTextBlok';
import SkillsBlok from './SkillsBlok';
import TextImageBlok from './TextImageBlok';
import TimelineBlok from './TimelineBlok';

/**
 * Storyblok component name → React component.
 * The fields of each component are defined in scripts/storyblok/schema.mjs.
 * Buttons, timeline items and skill groups are rendered by their parent section.
 */
export const bloks = {
	// Content types
	page: PageBlok,
	project: ProjectBlok,
	article: ArticleBlok,
	// Sections
	hero: HeroBlok,
	page_hero: PageHeroBlok,
	text_image: TextImageBlok,
	rich_text: RichTextBlok,
	timeline: TimelineBlok,
	skills: SkillsBlok,
	featured_projects: FeaturedProjectsBlok,
	latest_articles: LatestArticlesBlok,
	project_grid: ProjectGridBlok,
	article_list: ArticleListBlok,
};

setComponents(bloks);
