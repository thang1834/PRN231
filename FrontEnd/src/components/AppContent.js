import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';
import { isAuthenticated, refreshToken } from 'src/ultils/Authentication';

// routes config
import routes from '../routes';

const AppContent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('accessToken') !== null;
        if (!isAuthenticated) {
            navigate('/login');
        }
        refresh();
    }, []);

    const refresh = async () => {
        try {
            refreshToken();
        } catch (error) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
        }
    };

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
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                </Routes>
            </Suspense>
        </CContainer>
    );
};

export default React.memo(AppContent);
