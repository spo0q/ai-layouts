import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import atImport from 'postcss-import';

const purgeOptions = {
  content: ['./layouts/**/*.html', './content/**/*.{md,html}'],
  defaultExtractor: content => (content.match(/[A-Za-z0-9-_:/]+/g) || []),
  safelist: [
    // Font Awesome classes were previously safelisted which prevented
    // PurgeCSS from removing unused rules from third-party CSS and
    // caused the full fontawesome stylesheet to be emitted on every page.
    // Remove the `fa-` safelist so PurgeCSS can strip unused FA selectors.
    /(^|\s)dbb-/,       // debug-bar classes
    'dev', 'prod'
  ]
};

export default {
  plugins: [
    atImport(),
    autoprefixer(),
    purgeCSSPlugin(purgeOptions),
    cssnano({ preset: 'default' })
  ]
};
