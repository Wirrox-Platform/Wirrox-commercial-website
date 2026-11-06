import { handlePartner } from '../../../server/partners.js';

export function onRequest(context) {
  return handlePartner(context.request, context.env);
}
