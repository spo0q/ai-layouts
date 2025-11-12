import atImport from 'postcss-import';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default {
  plugins: [
    atImport(),
    autoprefixer(),
    cssnano({ preset: 'default' })
  ]
};
