import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const base_url = "http://localhost:8080/api/";

export default class AuthService{
    private navigate = useNavigate();

    signup(registerRequest: RegisterRequest){
        axios.post(base_url + "auth/signup", registerRequest)
            .then(
                (response) => {
                    if(response.status === 200){
                        toast.success("Signup succesful, check email for verification steps");
                        this.navigate("/login");
                        return response.data;
                    }
                    else if(response.status === 409){
                        toast.error("Signup unsuccessful, username already in use. Retry");
                    }

                    return response;
                }
            )
    }
}