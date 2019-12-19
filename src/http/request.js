import axios from 'axios';
axios.interceptors.response.use(function (response) {
  // Toast.hide();
  return response;
}, function (error) {
  
  return Promise.reject(error);
});
const post = function (url, data = null) {
  // Toast.loading('Loading...', 0, () => {
  //   console.log('Load complete !!!');
  // });
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      data
    }).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      reject(err);
    })
  })
};
const get = function (url) {
  // Toast.loading('Loading...', 0, () => {
  //   console.log('Load complete !!!');
  // });
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url
    }).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err);
    })
  })
}
export { post, get }