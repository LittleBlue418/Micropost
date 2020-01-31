/**
* EasyHTTP Library
* Library for making HTTP requests
*
* @version 3.0.0
* @author Holly Thomas
* @license MIT
*
**/

class EasyHTTP {

  // GET METHOD
  async get(url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  }


  // POST METHOD
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    return responseData;
  }


  // PUT METHOD
  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    return responseData;
  }


  // DELETE METHOD
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    });

    const responseData = await 'Resource Deleted...';
    return responseData;
  }
}


export const http = new EasyHTTP();
