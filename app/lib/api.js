const api = {
  handleErrors (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }
};

export default api;
