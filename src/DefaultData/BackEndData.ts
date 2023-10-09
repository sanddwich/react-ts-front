import BackendInterface from "../Interfaces/BackendInterface";

const apiServer = "http://localhost:8000";
const restApiUserController = apiServer + "/api/v1/users";

const BackEndData: BackendInterface = {
    apiUrl: apiServer,
    authApiRootPoint: apiServer + "/api/v1/auth",
    authenticateUrlPoint: apiServer + "/api/v1/auth/authenticate",
    apiCheckTokenUrl: apiServer + "/api/v1/checkToken",
    authApiLogoutUrl: apiServer + "/api/v1/auth/logout",
    apiServiceControllerGetExample: apiServer + "/api/v1/service/getExample",
    apiServiceControllerPostExample: apiServer + "/api/v1/service/postExample",
    test: apiServer + "/api/v1/users",
}

export default BackEndData;