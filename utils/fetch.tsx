import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const BACKEND_URL = "http://localhost:8080/";
// export const BACKEND_URL = "http://192.168.29.16:8080/";

type MethodType = "put" | "post" | "get" | "patch" | "delete";

type ApiRoutes = "showTreeDirectory" | "listFiles" | "createDirectory";

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
      config.data = data;
    } else {
      headers["Content-Type"] = "application/json";
      config.data = JSON.stringify(data);
    }

    const response: AxiosResponse<T> = await axios(config);
    return response.data;
  } catch (error) {
    // console.error("Error in Fetch:", error);
    throw error as string;
  }
}
