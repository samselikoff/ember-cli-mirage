# Supplying helpers from addons

Some addons supply Mirage models, route functions, or other code to help applications set up their Mirage configuration. The build's target environment and the [environment options](#environment-options) together determine whether Mirage's code will be included in the build or not, so addons that supply code that imports modules from mirage have to include or exclude that code accordingly.

To support this, Mirage writes an `includedInBuild` value to `ENV['ember-cli-mirage']` that other addons can read. To take advantage of this in your addon, you need to first make sure that your addon's hooks are called _after_ `ember-cli-mirage`'s by putting the following in your addon's `package.json`:

```diff
  "ember-addon": {
    "configPath": "tests/dummy/config",
+    "after": [
+      "ember-cli-mirage"
+    ],
  }
```

Then you can look for the `includedInBuild` property of `ENV['ember-cli-mirage']` (being careful to not assume that `ENV['ember-cli-mirage']` is present, since it won't be if `ember-cli-mirage` isn't installed in the consuming application):

```js
included(app) {
  this.mirageConfig = config['ember-cli-mirage'] || {};
  this._super.included.apply(this, arguments);
},

treeForAddon() {
  let tree = this._super(...arguments);
  if (!mirageConfig.includedInBuild) {
    // Exclude mirage-dependent files, e.g. use broccol-funnel to exclude
    // files in `addon/mirage/`:
    //
    // const removeFile = require('broccoli-funnel');
    // tree = funnel(tree, {
    //   exclude: 'mirage/**/*.js',
    // });
  }
  return tree;
}
```