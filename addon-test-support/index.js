import setupMirage from './setup-mirage';
export { setupMirage };

import { dependencySatisfies, macroCondition } from '@embroider/macros';

if (macroCondition(dependencySatisfies('ember-qunit', '*'))) {
  window.QUnit.config.urlConfig.push({ id: 'mirageLogging', label: 'Mirage logging', });
}

