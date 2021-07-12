'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = function() {
  return Promise.all([
    getChannelURL('release'),
    getChannelURL('beta'),
    getChannelURL('canary')
  ]).then((urls) => {
    return {
      useYarn: true,
      scenarios: [
        {
          name: 'ember-lts-3.20',
          npm: {
            devDependencies: {
              'ember-source': '~3.20.0'
            }
          }
        },
        {
          name: 'ember-release',
          npm: {
            devDependencies: {
              'ember-source': urls[0]
            }
          }
        },
        {
          name: 'ember-beta',
          npm: {
            devDependencies: {
              'ember-source': urls[1]
            }
          }
        },
        {
          name: 'ember-canary',
          npm: {
            devDependencies: {
              'ember-source': urls[2]
            }
          }
        },
        {
          name: 'ember-default',
          npm: {
            devDependencies: {}
          }
        },
        {
          name: 'ember-default-with-jquery',
          env: {
            EMBER_OPTIONAL_FEATURES: JSON.stringify({
              'jquery-integration': true
            })
          },
          npm: {
            devDependencies: {
              '@ember/jquery': '^0.5.1'
            }
          }
        },
        embroiderSafe({
          npm: {
            devDependencies: {
              "webpack": '^5.0.0',
            },
          },
        }),
        embroiderOptimized({
          npm: {
            devDependencies: {
              "webpack": '^5.0.0',
            },
          },
        }),
      ]
    };
  });
};
