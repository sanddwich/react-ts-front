import BackendInterface from "../Interfaces/BackendInterface";

const apiServer = "http://localhost:8000"

const BackEndData: BackendInterface = {
    apiUrl: apiServer,
    // apiUrl: "https://fakestoreapi.com/products"
    authApiRootPoint: apiServer + "/api/v1/auth",
    authenticateUrlPoint: apiServer + "/api/v1/auth/authenticate",
    apiCheckTokenUrl: apiServer + "/api/v1/checkToken",
}

export default BackEndData;