import axios from "axios";

let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3000";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "...";
}

const instance = axios.create({
  baseURL,
  timeout: 15000, // 毫秒
});

axios.interceptors.request.use(
  (req: any) => {
    // 在发送请求前要做的事儿

    const a = "0";

    // req.headers = {
    //   "Authorization": `Bearer sk-or-v1-af5...142`,
    //   "HTTP-Referer": `mistralai/mistral-7b-instruct:free`,
    //   "X-Title": '测试机器人',
    //   "Content-Type": "application/json"};
    return req;
  },
  (err: any) => {
    // 在请求错误时要做的事儿

    // 该返回的数据则是axios.catch(err)中接收的数据
    return Promise.reject(err);
  },
);

// use(两个参数)
axios.interceptors.response.use(
  (res: any) => {
    // 请求成功对响应数据做处理

    // 该返回的数据则是axios.then(res)中接收的数据
    return res;
  },
  (err: any) => {
    // 在请求错误时要做的事儿

    // 该返回的数据则是axios.catch(err)中接收的数据
    return Promise.reject(err);
  },
);

export { instance };
