import React from 'react';
import CIcon from '@coreui/icons-react';
import {
    cilBell,
    cilCalculator,
    cilChartPie,
    cilCursor,
    cilDescription,
    cilDrop,
    cilNotes,
    cilPencil,
    cilPuzzle,
    cilSpeedometer,
    cilStar,
    cilMap,
    cilPeople,
    cilHome,
    cilUser,
    cilWallet,
} from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
    {
        component: CNavItem,
        name: 'Dashboard',
        to: '/dashboard',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        badge: {
            color: 'info',
            text: 'NEW',
        },
    },
    {
        component: CNavTitle,
        name: 'Theme',
    },
    {
        component: CNavItem,
        name: 'Contract',
        to: '/dashboard/contract',
        icon: <CIcon icon={cilMap} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'House',
        to: '/dashboard/house',
        icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'User',
        to: '/user',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Role',
        to: '/role',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Payment',
        to: '/payment',
        icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Statistic',
        to: '/dashboard/statistic',
        icon: <CIcon icon={cilWallet} customClassName="nav-icon" />,
    },
];

export default _nav;
