import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BACKEND_URL = "http://localhost:8080/";

type MethodType = "put" | "post" | "get" | "patch" | "delete";

type ApiRoutes = "showTreeDirectory";

interface FetchType {
  method: MethodType;
  apiRoutes: ApiRoutes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any> | FormData;
  bearerToken?: string;
  id?: string;
  multipartFormData?: boolean;
}

export async function Fetch<T>({
  method,
  apiRoutes,
  data = {},
  //   bearerToken,
  id = "",
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
