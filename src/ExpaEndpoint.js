
const API_BASE = 'http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/';

const getPagedFromExpa = (object, options) => {
  const url = `${API_BASE + object}/?access_token=${options.access_token}&page=${options.page}`;
  return fetch(url, options).then(response => response.json()).then((obj) => {
    if (!obj.paging || !obj.data) {
      throw new Error(
        `EXPA did not return paged object: ${JSON.stringify(obj)}`,
      );
    }
    return obj;
  });
};

export default getPagedFromExpa;
