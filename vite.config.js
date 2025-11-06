import { defineConfig } from 'vite';
import path from 'path';
import postcss from './postcss.config.js';

function getEntries(type,pattern){
    const glob = require('glob');
    const entries = {};
    const options = {};

    if(type != 'js'){
      options.ignore = [
        'src/components/**',
        'src/tools/*'
      ]
    }

    const files = glob.sync(`${pattern}.${type}`,options);

    files.forEach(file => {
      const name = path.basename(file, path.extname(file));
      entries[name] = path.resolve(__dirname,file);
    });

    return entries;
}

export default defineConfig({
  build: {
    outDir: 'assets',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        ...getEntries('js','src/components/*'),
        ...getEntries('{css,scss}','src/**/*'),
        ...getEntries('js','src/tools/*')
      },
      output: {
        entryFileNames: '[name].js',
        manualChunks: undefined,
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]', 
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
