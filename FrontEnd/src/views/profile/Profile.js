import React, { useEffect, useState } from 'react';
import * as loadService from '../../ultils/apiServices/loadServices';
import * as postService from '../../ultils/apiServices/postServices';
import { format } from 'date-fns';
import {
    CForm,
    CCol,
    CFormInput,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CPagination,
    CPaginationItem,
    CFormCheck,
} from '@coreui/react';
import { jwtDecode } from 'jwt-decode';
import './Profile.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
    });
    const [user, setUser] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(true);
    const [decodedToken, setDecodedToken] = useState({});
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const availableToken = localStorage.getItem('accessToken');
        if (availableToken) {
            setAccessToken(availableToken);
        }
        if (accessToken) {
            fetchUserById();
        }
        if (success) {
            toast.success('Success');
            setSuccess(false);
        }
        setLoading(false);
    }, [accessToken, loading]);

    const refresh = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        if (isTokenExpired(accessToken)) {
            try {
                var token = {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                };
                const response = await postService.refreshToken(token);
                localStorage.setItem('accessToken', response.token.accessToken);
                localStorage.setItem('refreshToken', response.token.refreshToken);
                setAccessToken(response.token.accessToken);
                console.log('ok');
            } catch (err) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                navigate('/login');
            }
        }
    };

    const fetchUserById = async () => {
        await refresh();
        try {
            const decoded = jwtDecode(accessToken);
            setDecodedToken(decoded);
            const res = await loadService.loadUserById(decoded.nameid, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (res) {
                res.dob = formatDateString(res.dob);
                setUser(res);
            }
            setSuccess(true);
        } catch (err) {
            toast.error('Error');
        }
    };

    function formatDateString(inputDateString) {
        const inputDate = new Date(inputDateString);
        const formattedDate = format(inputDate, 'yyyy-MM-dd');
        return formattedDate;
    }

    const handleChangeProfileForm = (e) => {
        const { name, value } = e.target;
        setUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmitProfileForm = async (e) => {
        await refresh();
        e.preventDefault();
        try {
            const res = await postService.updateUser(decodedToken.nameid, user, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setSuccess(true);
            setLoading(true);
            console.log('Profile updated successfully');
        } catch (error) {
            toast.error('Error');
            // Handle error
            console.error('Failed to update profile:', error.message);
        }
    };

    const handleChangePasswordForm = (e) => {
        const { name, value } = e.target;
        const err = Object.assign({}, error);
        if (name == 'confirmPassword') {
            if (value != passwords.newPassword) {
                err[name] = `Must match new password`;
                setError(err);
            } else {
                setError({});
            }
        } else {
            setPasswords((prevPasswords) => ({
                ...prevPasswords,
                [name]: value,
            }));
        }
    };

    const handleSubmitPasswordForm = async (e) => {
        await refresh();
        e.preventDefault();
        if (Object.keys(error).length !== 0) return;
        try {
            const res = await postService.changePassword(decodedToken.nameid, passwords, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setSuccess(true);
            setLoading(true);
            console.log('Passwords changed successfully:', passwords);
        } catch (error) {
            toast.error('Error');
            console.error('Failed to change passwords:', error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="row">
                <CCol md={6}>
                    <div
                        className="profile-form"
                        style={{
                            backgroundColor: '#3c4b64',
                            color: '#FFFFFF99',
                            padding: '6%',
                            marginTop: '2%',
                            borderRadius: 25,
                        }}
                    >
                        <h2>Update Profile</h2>
                        <CForm onSubmit={handleSubmitProfileForm}>
                            <CFormInput
                                type="text"
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={user.firstName}
                                onChange={handleChangeProfileForm}
                            />
                            <CFormInput
                                type="text"
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={user.lastName}
                                onChange={handleChangeProfileForm}
                            />
                            <CFormInput
                                type="email"
                                id="email"
                                name="email"
                                label="Email"
                                value={user.email}
                                onChange={handleChangeProfileForm}
                            />
                            <CFormInput
                                type="date"
                                id="dob"
                                name="dob"
                                label="Date Of Birth"
                                value={user.dob}
                                onChange={handleChangeProfileForm}
                            />
                            <CFormInput
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                label="Phone Number"
                                value={user.phoneNumber}
                                onChange={handleChangeProfileForm}
                            />
                            <CFormInput
                                type="text"
                                id="identifyNumber"
                                name="identifyNumber"
                                label="Identify Number"
                                value={user.identificationNumber}
                                onChange={handleChangeProfileForm}
                            />
                            <CButton type="submit" color="primary" style={{ marginTop: '4%' }}>
                                Update Profile
                            </CButton>
                        </CForm>
                    </div>
                </CCol>
                <CCol>
                    <div
                        className="change-password-form"
                        style={{
                            backgroundColor: '#3c4b64',
                            color: '#FFFFFF99',
                            padding: '6%',
                            marginTop: '2%',
                            borderRadius: 25,
                        }}
                    >
                        <h2>Change Password</h2>
                        <CForm onSubmit={handleSubmitPasswordForm}>
                            <CFormInput
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                label="Current Password"
                                value={passwords.currentPassword}
                                onChange={handleChangePasswordForm}
                                required
                            />
                            <CFormInput
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                label="New Password"
                                value={passwords.newPassword}
                                onChange={handleChangePasswordForm}
                                required
                            />
                            <div>
                                <CFormInput
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    value={passwords.confirmPassword}
                                    onChange={handleChangePasswordForm}
                                    required
                                />
                                <span className="error-message">{error.confirmPassword}</span>
                            </div>
                            <CButton type="submit" color="primary" style={{ marginTop: '4%' }}>
                                Change Password
                            </CButton>
                        </CForm>
                    </div>
                </CCol>
            </div>
            <ToastContainer />
        </>
    );
};

export default Profile;
