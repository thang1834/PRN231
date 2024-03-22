import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import { refreshToken } from 'src/ultils/Authentication';

// routes config
import routes from '../routes';
import { jwtDecode } from 'jwt-decode';

const AppContent = () => {
    const navigate = useNavigate();
    const [startPage, setStartPage] = useState("");

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('accessToken') !== null;
        if (!isAuthenticated) {
            navigate('/login');
        }
        checkStartPage();
    }, []);

    const checkStartPage = () => {
        let userRoles = [];
        let accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            let decodedToken = jwtDecode(accessToken);
            if (Array.isArray(decodedToken.role)) {
                userRoles = decodedToken.role;
            } else {
                userRoles = [decodedToken.role];
            }

            // Kiểm tra từng role
            if (userRoles.includes('Admin')) {
                setStartPage("dashboard");
            } else {
                setStartPage("welcome");
            }
        }
    }

    return (
        <CContainer lg>
            <Suspense fallback={<CSpinner color="primary" />}>
                <Routes>
                    {routes.map((route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={<route.element />}
                                />
                            )
                        );
                    })}
                    <Route
                        path="/"
                        element={<Navigate to={startPage} replace />}
                    />
                </Routes>
            </Suspense>
        </CContainer>
    );
};

export default React.memo(AppContent);
