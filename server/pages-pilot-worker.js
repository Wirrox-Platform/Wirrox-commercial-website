import {onRequest} from '../functions/api/partners/[[action]].js';

// Manual Pages uploads use the same handler as file-based Git builds.
export default {
  fetch(request, env) {
    if (new URL(request.url).pathname.startsWith('/api/partners/')) {
      return onRequest({request, env});
    }
    return env.ASSETS.fetch(request);
  },
};
