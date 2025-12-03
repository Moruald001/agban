let navigateFn = null;

export const setNavigate = (fn) => {
  navigateFn = fn;
};

// Ton code "vanilla" pourra appeler ceci
export const navigate = (to, options) => {
  if (!navigateFn) {
    console.error("navigate() used before setNavigate()");
    return;
  }
  navigateFn(to, options);
};
