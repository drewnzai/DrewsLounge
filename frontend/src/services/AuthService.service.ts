import axios from "axios";
import { LoginRequest } from "../models/LoginRequest";
import { RegisterRequest } from "../models/RegisterRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const base_url = "http://localhost:8080/api/auth/";

export default class AuthService{
    private navigate = useNavigate();

    signup(registerRequest: RegisterRequest){
        axios.post(base_url + "signup", registerRequest)
            .then(
                (response) => {
                    if(response.status === 200){
                        toast.success("Signup succesful, check email for verification steps");
                        this.navigate("/verifyaccount");
                    }
                    else if(response.status === 409){
                        toast.error("Signup unsuccessful, username already in use. Retry");
                    }

                    return response;
                }
            )
    }

    login(loginRequest: LoginRequest){
        axios.post(base_url + "login", loginRequest)
        .then(
            (response) => {
                
            if(response.data == "Wrong Credentials"){
                toast.error("Wrong");
                return;
            }
            }
        )
    }
}