import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, lazyPlugins } from 'vite-plus';

export default defineConfig({
  plugins: lazyPlugins(() => [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.ts'],
      refresh: true,
      fonts: [
        bunny('Geist', {
          weights: [300, 400, 500, 600],
        }),
        bunny('Prata', {
          weights: [400, 500, 600],
        }),
      ],
    }),
    inertia(),
    tailwindcss(),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    wayfinder(),
  ]),
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    origin: `${process.env.DDEV_PRIMARY_URL_WITHOUT_PORT}:5173`,
    cors: {
      origin: /https?:\/\/([A-Za-z0-9\-.]+)?(\.ddev\.site)(?::\d+)?$/,
    },
    watch: {
      ignored: ['**/vendor/**'],
    },
  },
  lint: {
    ignorePatterns: [
      'vendor/**',
      'node_modules/**',
      'public/**',
      'bootstrap/ssr/**',
      'tailwind.config.js',
      'resources/js/actions/**',
      'resources/js/components/ui/*',
      'resources/js/routes/**',
      'resources/js/wayfinder/**',
    ],
    options: {
      denyWarnings: true,
      typeAware: true,
    },
  },
  fmt: {
    htmlWhitespaceSensitivity: 'css',
    ignorePatterns: ['.github/**', 'composer.json', 'resources/js/components/ui/*', 'resources/views/mail/*'],
    printWidth: 120,
    semi: true,
    singleQuote: true,
    singleAttributePerLine: true,
    sortImports: {
      groups: [
        'type-import',
        ['value-builtin', 'value-external'],
        'type-internal',
        'value-internal',
        ['type-parent', 'type-sibling', 'type-index'],
        ['value-parent', 'value-sibling', 'value-index'],
        'unknown',
      ],
    },
    sortTailwindcss: {
      functions: ['clsx', 'cn', 'cva'],
      stylesheet: 'resources/css/app.css',
    },
    tabWidth: 2,
  },
});
