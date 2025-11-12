import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';

export default {
  plugins: [
    purgeCSSPlugin({
      content: [
        './layouts/_partials/debug-bar/**/*.html'
      ]
    })
  ]
}
