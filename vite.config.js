import { defineConfig } from 'vite';
import path from 'path';
import postcss from './postcss.config.js';

export default defineConfig({
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: './src/components/main.js',
        ...getStyleEntries()
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/components/styles/_variables.scss" as *;
        `
      },
      postcss
    }
  }
});

function getStyleEntries() {
  const glob = require('glob'); 
  const entries = {};
  
  const files = glob.sync('src/**/*.{css,scss}', {
    ignore: ['src/components/**'] 
  });
  
  files.forEach(file => {
    const name = path.basename(file, path.extname(file));;
    entries[name] = path.resolve(__dirname, file);
  });
  
  return entries;
}