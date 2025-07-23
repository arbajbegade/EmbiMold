const Auth = {
  removeSession: () => {
    localStorage.clear();
  },

  getLoggedInUser: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const [, payload] = token.split('.');
      const decoded = atob(payload);
      const parsed = JSON.parse(decoded);

      return {
        access_token: token,
        ...parsed
      };
    } catch (error) {
      console.error("Invalid token format:", error);
      return null;
    }
  }
};

export default Auth;
