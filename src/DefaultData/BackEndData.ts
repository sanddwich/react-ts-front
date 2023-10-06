import BackendInterface from "../Interfaces/BackendInterface";

const apiServer = "http://localhost:8000"

const BackEndData: BackendInterface = {
    apiUrl: apiServer,
    authApiRootPoint: apiServer + "/api/v1/auth",
    authenticateUrlPoint: apiServer + "/api/v1/auth/authenticate",
    apiCheckTokenUrl: apiServer + "/api/v1/checkToken",
    authApiLogoutUrl: apiServer + "/api/v1/auth/logout",
    apiServiceControllerGetExample: apiServer + "/api/v1/service/getExample",
    apiServiceControllerPostExample: apiServer + "/api/v1/service/postExample",
}

export default BackEndData;