/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const CF_ACCESS_CLIENT_ID = process.env.REACT_APP_CF_ACCESS_CLIENT_ID || "";
const CF_ACCESS_CLIENT_SECRET =
  process.env.REACT_APP_CF_ACCESS_CLIENT_SECRET || "";

export const BACKEND_URL = "https://test.eightcubed.site/api/";

type MethodType = "put" | "post" | "get" | "patch" | "delete";
type ApiRoutes =
  | "showTreeDirectory"
  | "createDirectory"
  | "upload"
  | "delete"
  | "download";

export async function fetchJson<T>(
  apiRoutes: ApiRoutes,
  method: MethodType = "get",
  data?: Record<string, any>,
  id?: string,
  params?: Record<string, any>,
): Promise<T> {
  const url = `${BACKEND_URL}${apiRoutes}${id ? `/${id}` : ""}`;

  const config: AxiosRequestConfig = {
    url,
    method,
    headers: { "Content-Type": "application/json" },
    data: data ? JSON.stringify(data) : undefined,
    params,
    responseType: "json",
    withCredentials: false,
  };

  const response: AxiosResponse<T> = await axios(config);
  return response.data;
}

export async function uploadFile<T>(
  apiRoutes: ApiRoutes,
  formData: FormData,
  id?: string,
  params?: Record<string, any>,
): Promise<T> {
  const url = `${BACKEND_URL}${apiRoutes}${id ? `/${id}` : ""}`;

  const config: AxiosRequestConfig = {
    url,
    method: "post",
    headers: { "Content-Type": "multipart/form-data" },
    data: formData,
    params,
    responseType: "json",
    withCredentials: false,
  };

  const response: AxiosResponse<T> = await axios(config);
  return response.data;
}

export async function downloadFile(
  id?: string,
  responseType: AxiosRequestConfig["responseType"] = "blob",
): Promise<Blob | ArrayBuffer> {
  const url = `${BACKEND_URL}files${id ? `/${id}` : ""}`;

  const config: AxiosRequestConfig = {
    url,
    method: "get",
    headers: {
      "CF-Access-Client-Id": CF_ACCESS_CLIENT_ID || "",
      "CF-Access-Client-Secret": CF_ACCESS_CLIENT_SECRET || "",
    },
    responseType,
    withCredentials: false,
  };

  const response: AxiosResponse<Blob | ArrayBuffer> = await axios(config);
  return response.data;
}

export async function downloadFolder(
  pathName?: string,
  responseType: AxiosRequestConfig["responseType"] = "blob",
): Promise<Blob | ArrayBuffer> {
  const url = `${BACKEND_URL}folder${pathName ? `/${pathName}` : ""}`;

  const config: AxiosRequestConfig = {
    url,
    method: "get",
    headers: {
      "CF-Access-Client-Id": CF_ACCESS_CLIENT_ID || "",
      "CF-Access-Client-Secret": CF_ACCESS_CLIENT_SECRET || "",
    },
    responseType,
    withCredentials: false,
  };

  const response: AxiosResponse<Blob | ArrayBuffer> = await axios(config);
  return response.data;
}
