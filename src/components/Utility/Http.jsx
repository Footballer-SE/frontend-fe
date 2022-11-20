import axios from "axios";

export const Http = {
  /**
   *
   * @param {*} url
   * @param {*} _data
   * @param {*} _headers
   * @returns
   */
  POST: async (url, _data, _headers) => {
    const result = await axios({
      url: url,
      method: "post",
      data: _data,
      headers: {
        ..._headers,
      },
    });

    return result;
  },

  /**
   *
   * @param {*} url
   * @param {*} _data
   * @param {*} _headers
   * @returns
   */
  PUT: async (url, _data, _headers) => {
    const result = await axios({
      url: url,
      method: "put",
      data: _data,
      headers: {
        ..._headers,
      },
    });

    return result;
  },
  /**
   *
   * @param {*} url
   * @param {*} _data
   * @param {*} _headers
   * @returns
   */
  DELETE: async (url, _data, _headers) => {
    const result = await axios({
      url: url,
      method: "delete",
      data: _data,
      headers: {
        ..._headers,
      },
    });

    return result;
  },
  /**
   *
   * @param {*} url
   * @param {*} _data
   * @param {*} _headers
   * @returns
   */
  GET: async (url, _data, _headers) => {
    const result = await axios({
      url: url,
      method: "get",
      data: _data,
      headers: {
        ..._headers,
      },
    });

    return result;
  },
};
