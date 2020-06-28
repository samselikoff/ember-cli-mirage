import { getContext } from '@ember/test-helpers';

import {pushMirageIntoStore as _pushMirageIntoStore} from 'ember-cli-mirage';

/**
 * This utility pushes the mirage store into the ember store
 *
 * If you call this method with no parameters, it will push the entire mirage store into ember store
 *
 * You may also call this method with an array of resource names. ['accounts', 'accountTypes']. These must
 * be the resource names camelized.
 *
 * You may also call it with a hash. This hash will have the resource names as the keys and the values will either
 * be true (push all records for that resource) or a where hash or function that will be applied to the that resource.
 * {
 *   accounts: true,
 *   accountTypes: { state: 'OH' }
 *   users: item => item.name.includes("Joe")
 * }
 *
 * @param config   undefined means push all resources
 *                 An array will push only the resources in the array
 *                 hash in the form of resource=value    Value may be true, all records, or a where hash or function
 */
let pushMirageIntoStore = function(config) {
  let context = getContext();
  let store = context.owner.lookup('service:store');

  _pushMirageIntoStore(context.server, store, config);
}

export {
  pushMirageIntoStore
}
