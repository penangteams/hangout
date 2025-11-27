import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ command }) => {

const babelPlugins: (string | [string, { target: string }])[] = [
  ['babel-plugin-react-compiler', { target: '18' }]
];


  // For dev server
  if (command === 'serve') {
    babelPlugins.push('@babel/plugin-transform-react-jsx-development');
  }

  return {
        server: {
    port: 3000
  },
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: babelPlugins
        }
      })
    ],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // same alias as tsconfig
    },
  },
  };
});
