import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import atImport from 'postcss-import';

const purgeOptions = {
  content: ['./layouts/**/*.html', './content/**/*.{md,html}'],
  defaultExtractor: content => (content.match(/[A-Za-z0-9-_:/]+/g) || []),
  safelist: [
    /(^|\s)fa-/,        // Font Awesome classes
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
