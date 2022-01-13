async function HttpRequest(url, params = {}) {
  let hasError;
    let response;
  try {
    response = await fetch(url, params);
    
    if (!response.ok ) {
        throw Error;
    }
    response = await response.json();
  } catch (err) {
    hasError = "Something went wrong!";
  }

  return { response, hasError };
}

export default HttpRequest;
