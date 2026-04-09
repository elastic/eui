// @ts-ignore - webpack url-loader
import noResultsLight from '!url-loader!../../../../../static/images/empty_prompt/no-results--light.svg';
// @ts-ignore - webpack url-loader
import noResultsDark from '!url-loader!../../../../../static/images/empty_prompt/no-results--dark.svg';
// @ts-ignore - webpack url-loader
import pageNotFoundLight from '!url-loader!../../../../../static/images/empty_prompt/pageNotFound--light.png';
// @ts-ignore - webpack url-loader
import pageNotFoundDark from '!url-loader!../../../../../static/images/empty_prompt/pageNotFound--dark.png';
// @ts-ignore - webpack url-loader
import pageNotFoundLight2x from '!url-loader!../../../../../static/images/empty_prompt/pageNotFound--light@2x.png';
// @ts-ignore - webpack url-loader
import pageNotFoundDark2x from '!url-loader!../../../../../static/images/empty_prompt/pageNotFound--dark@2x.png';

export const USE_CASE_IMAGE_URLS: Record<string, string> = {
  '/images/empty_prompt/no-results--light.svg': noResultsLight,
  '/images/empty_prompt/no-results--dark.svg': noResultsDark,
  '/images/empty_prompt/pageNotFound--light.png': pageNotFoundLight,
  '/images/empty_prompt/pageNotFound--dark.png': pageNotFoundDark,
  '/images/empty_prompt/pageNotFound--light@2x.png': pageNotFoundLight2x,
  '/images/empty_prompt/pageNotFound--dark@2x.png': pageNotFoundDark2x,
};
