import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CImage,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import img1 from 'src/assets/images/login-building.jpg';
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [decodedToken, setDecodedToken] = useState(null);
    const [accessToken, setAccessToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            let userRoles = [];

            if (Array.isArray(decodedToken.role)) {
                userRoles = decodedToken.role;
            } else {
                userRoles = [decodedToken.role];
            }

            // Kiểm tra từng role
            if (userRoles.includes('Admin')) {
                navigate('/dashboard');
            } else {
                navigate('/welcome');
            }
        }
    }, [accessToken]);

    const setParams = (event) => {
        const { name, value } = event.target;
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleDecode = (jwtToken) => {
        try {
            const decoded = jwtDecode(jwtToken);
            console.log(decoded);
            setDecodedToken(decoded);
        } catch (error) {
            console.error('Error decoding token:', error);
            setDecodedToken(null);
        }
    };

    const login = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password }),
        };
        await fetch('http://localhost:5277/User/login', requestOptions)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((result) => {
                localStorage.setItem('accessToken', result.token.accessToken);
                localStorage.setItem('refreshToken', result.token.refreshToken);
                console.log(result.token.refreshToken);
                setAccessToken(result.token.accessToken);
                handleDecode(result.token.accessToken);
            })
            .catch((error) => {
                toast.error('Invalid username or password');
            });
    };
    return (
        <>
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center login-body">
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol md={8}>
                            <CCardGroup>
                                <CCard>
                                    <CImage rounded src={img1} width={450} height={450}></CImage>
                                </CCard>
                                <CCard className="p-4 login-form">
                                    <CCardBody>
                                        <CForm className="p-5">
                                            <h1>Login</h1>
                                            <p className="text-medium-emphasis">Sign In to your account</p>
                                            <CInputGroup className="mb-3">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    placeholder="Username"
                                                    autoComplete="username"
                                                    name="username"
                                                    onChange={setParams}
                                                />
                                            </CInputGroup>
                                            <CInputGroup className="mb-4">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>
                                                <CFormInput
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    name="password"
                                                    onChange={setParams}
                                                />
                                            </CInputGroup>
                                            <CRow className="justify-content-center">
                                                <CCol md={5}>
                                                    <CButton color="primary" className="px-4" onClick={login}>
                                                        Login
                                                    </CButton>
                                                </CCol>
                                            </CRow>
                                        </CForm>
                                    </CCardBody>
                                </CCard>
                            </CCardGroup>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;
