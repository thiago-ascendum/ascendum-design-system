// Puts the health report next to the Storybook build: /report/ on the published site.
import { cpSync, mkdirSync } from 'node:fs';

mkdirSync('dist/report', { recursive: true });
cpSync('index.html', 'dist/report/index.html');
cpSync('build', 'dist/report/build', { recursive: true });
cpSync('shots', 'dist/report/shots', { recursive: true });
console.log('Report copied to dist/report');
