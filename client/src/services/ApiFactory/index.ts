import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

export class ApiFactory {
  private axiosInstance: AxiosInstance;

  private constructor(options: AxiosRequestConfig) {
    this.axiosInstance = axios.create(options);
  }

  static createAxiosInstance(options: AxiosRequestConfig): AxiosInstance {
    const axiosConsumer = new ApiFactory(options);

    // TODO: Add general interceptor information

    return axiosConsumer.axiosInstance;
  }
}
