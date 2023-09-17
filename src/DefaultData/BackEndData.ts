import BackendInterface from "../Interfaces/BackendInterface";

const BackEndData: BackendInterface = {
    apiUrl: "http://localhost:8000",
    // apiUrl: "https://fakestoreapi.com/products"
    authApiRootPoint: "/api/v1/auth",
    authenticateUrlPoint: "/api/v1/auth/authenticate"
}

export default BackEndData;