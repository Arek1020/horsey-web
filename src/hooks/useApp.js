import { useContext } from "react";
import AuthContext from "../context/AppProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;