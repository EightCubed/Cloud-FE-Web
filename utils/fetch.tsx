import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const BACKEND_URL = "http://localhost:8080/";
// export const BACKEND_URL = "http://192.168.29.16:8080/";

type MethodType = "put" | "post" | "get" | "patch" | "delete";

type ApiRoutes =
  | "showTreeDirectory"
  | "listFiles"
  | "createDirectory"
  | "upload";

interface FetchType {
  method: MethodType;
  apiRoutes: ApiRoutes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any> | FormData;
  bearerToken?: string;
  id?: string;
  fileName?: string;
  multipartFormData?: boolean;
}

export async function Fetch<T>({
  method,
  apiRoutes,
  data = {},
  //   bearerToken,
  id = "",
  fileName = "./uploads",
  multipartFormData = false,
}: FetchType): Promise<T> {
  try {
    const url = `${BACKEND_URL}${apiRoutes}${id ? `/${id}` : ""}`;
    const headers: Record<string, string> = {};

    // if (protectedRoutes.includes(apiRoutes) && bearerToken) {
    //   headers["Authorization"] = `Bearer ${bearerToken}`;
    // }

    headers["Content-Type"] = "application/json";

    const config: AxiosRequestConfig = {
      method,
      url,
      withCredentials: false,
      headers,
      data,
    };

    if (fileName) {
      config.params = {
        fileName,
      };
    }

    if (multipartFormData) {
      headers["Content-Type"] = "multipart/form-data";
      config.data = data;
    } else {
      headers["Content-Type"] = "application/json";
      config.data = JSON.stringify(data);
    }

    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const errMsg = error.response?.data || error.message;
      console.error("Axios error:", errMsg);
      throw errMsg;
    } else if (error instanceof Error) {
      console.error("Generic error:", error.message);
      throw error.message;
    } else {
      console.error("Unknown error:", error);
      throw String(error);
    }
  }
}
