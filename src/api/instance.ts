import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = "https://openrouter.ai/api";
} else if (process.env.NODE_ENV === "production") {
  baseURL = "...";
}

const instance = axios.create({
  baseURL,
  timeout: 60000, // 毫秒
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么

    // config.headers["Authorization"] =
    //   "Bearer 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";
    config.headers["HTTP-Referer"] = "mistralai/mistral-7b-instruct:free";

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export { instance };
