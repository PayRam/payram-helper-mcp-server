/**
 * One-line, agent-actionable explanations for PayRam API HTTP statuses.
 * Appended to thrown error messages so an agent never has to guess what a
 * bare status code means or which credential/step fixes it.
 */
export const explainHttpStatus = (status: number): string => {
  switch (status) {
    case 400:
      return 'Bad request - a required field is missing or malformed; check the payload against the tool description.';
    case 401:
      return 'Auth failed - JWT expired (re-run ./setup_payram_agents.sh signin) or wrong credential type (merchant endpoints need the API-Key header, admin endpoints need the Bearer JWT).';
    case 403:
      return 'Authenticated but not allowed - the key/member lacks the required permission for this endpoint.';
    case 404:
      return 'Not found - the resource id is wrong, or the PayRam version on this server predates this endpoint.';
    case 429:
      return 'Rate limited - back off and retry; avoid tight polling loops.';
    case 500:
      return 'PayRam server error - inspect logs on the server: docker logs payram 2>&1 | tail -80. For payment creation this often means no deposit wallet is linked yet (run payram_doctor).';
    case 502:
    case 503:
    case 504:
      return 'PayRam is up but not serving - the container may be starting or crash-looping: docker logs -f payram.';
    default:
      return '';
  }
};

/** Compose "<context> failed (HTTP <n>): <body>" plus the hint when known. */
export const apiErrorMessage = (context: string, status: number, body: string): string => {
  const hint = explainHttpStatus(status);
  return `${context} failed (HTTP ${status}): ${body}${hint ? `\nHint: ${hint}` : ''}`;
};
