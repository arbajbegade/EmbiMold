import Configuration from './configuration';
import Auth from './auth';

// Clear session and redirect to login
function resetSessionStorageAndRedirect() {
  Auth.removeSession();
  window.location.href = Configuration.getContextPath();
}

// Secure Fetch API wrapper
function secureApiFetch(endpoint, init = {}) {
  const user = Auth.getLoggedInUser();

  // Add Authorization header if token exists
  const authHeader = user?.access_token
    ? { Authorization: `Bearer ${user.access_token}` }
    : {};

  // Merge headers
  const mergedInit = {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...authHeader
    }
  };

  // Full API URL
  const fullUrl = Configuration.getDefaultApiUrl() + endpoint;

  // Fetch with error handling
  return fetch(fullUrl, mergedInit)
    .then(resp => {
      if (resp.status === 401) {
        resetSessionStorageAndRedirect();
        return;
      }
      return resp;
    })
    .catch(err => {
      if (err.message?.toLowerCase().includes('network')) {
        console.error("Network error:", err.message);
        // Optional: Show toast here
      }
      return Promise.reject(err);
    });
}

export { resetSessionStorageAndRedirect };
export default secureApiFetch;
