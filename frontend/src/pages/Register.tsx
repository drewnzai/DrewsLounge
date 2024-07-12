import {Box, Button, TextField, Typography, useTheme} from "@mui/material";
import {tokens} from "../theme";
import AuthService from "../services/AuthService.service";
import {RegisterRequest} from "../models/RegisterRequest";
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as yup from "yup";
import {toast} from "react-toastify";

export default function Register(){

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const authService = new AuthService();

    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
        confirmedPassword: "",
        email: ""
    };

    const handleFormSubmit = (values: any) => {
        
        if(values.password === values.confirmedPassword){
            
            const registerRequest: RegisterRequest = {
                username: values.username,
                password: values.confirmedPassword,
                email: values.email
            };
            
            authService.signup(registerRequest);
        }

        else{
            toast.error("The passwords do not match");
            return;
        }
        
    };

    const checkoutSchema = yup.object().shape({
        password: yup.string().required("required"),
        username: yup.string().required("required"),
        confirmedPassword: yup.string().required("required"),
        email: yup.string().email().required("required")

    });



    return(
        <Box display={"flex"}
            sx={{
                alignItems: "center",
                justifyContent: "center",
                padding: "3px"
            }}>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            mt={"150px"}
                            display="block"
                            width="300px"
                            gap="30px"
                            p={"10px"}
                            sx={{
                                alignItems: "center",
                                justifyContent: "center"

                            }}

                        >
                            <Typography
                                variant="h2"
                                color={colors.grey[100]}
                                fontWeight="bold"
                                sx={{ m: "0 0 5px 0"}}
                                >
                                Register
                            </Typography>
                   
                            <Box width={"100%"}
                                display={"block"}
                                justifyContent={"space-between"}
                                >
                                <TextField
                                    sx={{
                                        borderRadius: "4px"
                                    }}
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Username"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                    name="username"
                                    error={!!touched.username && !!errors.username}
                                    helperText={touched.username && errors.username}

                                />
                                <br/>
                                <br/>
                                <TextField
                                    sx={{
                                        borderRadius: "4px"
                                    }}
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}

                                />
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.password}
                                name="password"
                                error={!!touched.password && !!errors.password}
                                helperText={touched.password && errors.password}

                            />
                            
                            <br/>
                            <br/>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="password"
                                label="Confirm the password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.confirmedPassword}
                                name="confirmedPassword"
                                error={!!touched.confirmedPassword && !!errors.confirmedPassword}
                                helperText={touched.confirmedPassword && errors.confirmedPassword}
                            />
                            </Box>


                        
                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">

                            <Button type="submit" color="secondary" variant="contained">
                                    Register
                            </Button>
                        
                        
                        </Box>
                        <Box display="flex" justifyContent="center" mt="20px">

                        <h4>Already have an existing account? 
                            <a href="/login"> Login here</a>
                        </h4>

                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
}