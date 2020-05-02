const { readdirSync } = require('fs');
const { resolve } = require('path');

/* exports.targets = readdirSync(resolve(__dirname, '../packages')).filter(
  (p) => !p.endsWith('.ts') && !p.startsWith('.'),
); */

exports.targets = ['rich-text-types', 'vue-renderer'];
