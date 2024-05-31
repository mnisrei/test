import Login from '@pages/Login';
import Signup from '@pages/SignUp';
import PrivatePage from '@pages/private';
import ErrorBoundary from '@shared-components/error-boundry';
import { lazy } from 'react';
import ProtectedRoute from './routes/private-routes';
const HomeLazyLoaded = lazy(() => import('@pages/Home'));

const publicRoute = [
    {
        path: '/',
        element: <HomeLazyLoaded />,
        id: 'home',
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/login',
        element: <Login />,
        id: 'login',
        errorElement: <ErrorBoundary />,
    },
    {
        path: '/signup',
        element: <Signup />,
        id: 'signup',
        errorElement: <ErrorBoundary />,
    },
];

const privateRoute = [
    {
        path: '/profile',
        element: (
            <ProtectedRoute>
                <PrivatePage />
            </ProtectedRoute>
        ),
        id: 'PrivatePage',
        errorElement: <ErrorBoundary />,
    },
];

export {
    publicRoute, privateRoute
}