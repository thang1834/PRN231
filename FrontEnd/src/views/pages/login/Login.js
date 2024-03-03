import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [decodedToken, setDecodedToken] = useState(null);
    const [error, setError] = useState('');

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
            setDecodedToken(decoded);
        } catch (error) {
            console.error('Error decoding token:', error);
            setDecodedToken(null);
        }
    };

    const login = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password }),
        };
        fetch('https://localhost:7080/api/User/login', requestOptions)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((result) => {
                console.log(result.token);
                localStorage.setItem('accessToken', result.token);
                handleDecode(result.token);
            })
            .catch((error) => {
                setError('Invalid username or password');
            });
    };
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
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
    );
};

export default Login;
