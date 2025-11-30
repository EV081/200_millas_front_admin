import axios from "axios";
import type {
    AxiosRequestConfig,
    AxiosResponse,
    RawAxiosRequestHeaders,
} from "axios";

export type ApiType =
    | "default"
    | "users"
    | "products"
    | "clientes"
    | "empleado"
    | "analytic";

const BASE_CONFIG: Record<
    ApiType,
    { envVar: string; fallback: string }
> = {
    default: {
        envVar: "VITE_API_URL",
        fallback: "https://wp4cigovo1.execute-api.us-east-1.amazonaws.com",
    },
    users: {
        envVar: "VITE_API_USERS_URL",
        fallback: "https://zq0fbveqte.execute-api.us-east-1.amazonaws.com",
    },
    products: {
        envVar: "VITE_API_PRODUCTS_URL",
        fallback: "https://y6am9ly97g.execute-api.us-east-1.amazonaws.com",
    },
    clientes: {
        envVar: "VITE_API_CLIENTES_URL",
        fallback: "https://2tkz55hms1.execute-api.us-east-1.amazonaws.com",
    },
    empleado: {
        envVar: "VITE_API_EMPLEADO_URL",
        fallback: "https://cmkk23rz22.execute-api.us-east-1.amazonaws.com",
    },
    analytic: {
        envVar: "VITE_API_ANALYTIC_URL",
        fallback: "https://9chtp1assj.execute-api.us-east-1.amazonaws.com",
    },
};

export default class Api {
    private static _instances: Map<ApiType, Api> = new Map();
    private static _lastToken: string | null = null;

    private _basePath: string;
    private _authorization: string | null;

    public set authorization(value: string | null) {
        this._authorization = value;
        Api._lastToken = value;
        // Sincronizar el token en todas las instancias
        Api._instances.forEach((instance) => {
            instance._authorization = value;
        });
    }

    public get authorization() {
        return this._authorization;
    }

    private constructor(basePath: string, authorization: string | null) {
        this._basePath = basePath;
        this._authorization = authorization;
    }

    /**
     * Devuelve (o crea) una instancia para un ApiType concreto.
     * Lee la variable de entorno correspondiente a cada servicio.
     */
    public static async getInstance(type: ApiType = "default"): Promise<Api> {
        if (!Api._instances.has(type)) {
            const cfg = BASE_CONFIG[type];
            // import.meta.env no es indexable por tipo, casteamos a any para leer la variable dinámica
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const envVal = (import.meta.env as any)[cfg.envVar] || cfg.fallback;

            if (!envVal) {
                throw new Error(
                    `Variable de entorno ${cfg.envVar} no configurada y no hay fallback`
                );
            }

            const instance = new Api(envVal, Api._lastToken);
            Api._instances.set(type, instance);
        }

        return Api._instances.get(type)!;
    }

    /**
     * Establece token global y lo propaga a todas las instancias.
     */
    public static setGlobalToken(token: string | null) {
        Api._lastToken = token;
        Api._instances.forEach((instance) => (instance._authorization = token));
    }

    public async request<RequestType, ResponseType>(config: AxiosRequestConfig) {
        const headers: RawAxiosRequestHeaders = {
            "Content-Type": "application/json",
            Authorization: this._authorization ? `Bearer ${this._authorization}` : "",
        };

        const configOptions: AxiosRequestConfig = {
            ...config,
            baseURL: this._basePath,
            headers: headers,
        };

        const path = this._basePath + (config.url || "");

        // Trazas: Log de la petición
        console.group(`API Request [${config.method?.toUpperCase() || "GET"}]`);
        console.log("URL:", path);
        console.log("Method:", config.method?.toUpperCase() || "GET");
        console.log("Headers:", headers);
        if (config.data) {
            console.log("Request Body:", config.data);
        }
        if (config.params) {
            console.log("Query Params:", config.params);
        }
        console.groupEnd();

        try {
            const response = await axios<RequestType, AxiosResponse<ResponseType>>(
                path,
                configOptions
            );

            // Trazas: Log de la respuesta exitosa
            console.group(`API Response [${config.method?.toUpperCase() || "GET"}]`);
            console.log("URL:", path);
            console.log("Status:", response.status, response.statusText);
            console.log("Response Data:", response.data);
            console.log("Response Headers:", response.headers);
            console.groupEnd();

            return response;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // Trazas: Log del error
            console.group(`API Error [${config.method?.toUpperCase() || "GET"}]`);
            console.log("URL:", path);
            if (error.response) {
                console.log("Status:", error.response.status, error.response.statusText);
                console.log("Error Response Data:", error.response.data);
                console.log("Error Response Headers:", error.response.headers);
            } else if (error.request) {
                console.log("Request made but no response received");
                console.log("Request:", error.request);
            } else {
                console.log("Error setting up request:", error.message);
            }
            console.log("Full Error:", error);
            console.groupEnd();

            throw error;
        }
    }

    public get<RequestType, ResponseType>(config: AxiosRequestConfig) {
        const configOptions: AxiosRequestConfig = {
            ...config,
            method: "GET",
        };

        return this.request<RequestType, ResponseType>(configOptions);
    }

    public post<RequestBodyType, ResponseBodyType>(
        data: RequestBodyType,
        options: AxiosRequestConfig,
    ) {
        const configOptions: AxiosRequestConfig = {
            ...options,
            method: "POST",
            data,
        };

        return this.request<RequestBodyType, ResponseBodyType>(configOptions);
    }

    public delete(options: AxiosRequestConfig) {
        const configOptions: AxiosRequestConfig = {
            ...options,
            method: "DELETE",
        };

        return this.request<void, void>(configOptions);
    }

    public put<RequestBodyType, ResponseBodyType>(
        data: RequestBodyType,
        options: AxiosRequestConfig,
    ) {
        const configOptions: AxiosRequestConfig = {
            ...options,
            method: "PUT",
            data: data,
        };

        return this.request<RequestBodyType, ResponseBodyType>(configOptions);
    }

    public patch<RequestBodyType, ResponseBodyType>(
        data: RequestBodyType,
        options: AxiosRequestConfig,
    ) {
        const configOptions: AxiosRequestConfig = {
            ...options,
            method: "PATCH",
            data: data,
        };

        return this.request<RequestBodyType, ResponseBodyType>(configOptions);
    }
}