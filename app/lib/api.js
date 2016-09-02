module.exports = {
  handleErrors (response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  },
}
