import axios from 'axios'
export async function getPageData(url) {
  return await axios.get(url || 'https://httpbin.org/get')
  .then(function (response) {
    return response
  })
  .catch(function (error) {
    return error;
  });

}
