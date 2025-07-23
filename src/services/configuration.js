const Configuration = {
  getDefaultApiUrl: () => import.meta.env.VITE_API_BASE_URL || 'https://default-url.com',
  getContextPath: () => import.meta.env.VITE_CONTEXT_PATH || '/login',
};

export default Configuration;
