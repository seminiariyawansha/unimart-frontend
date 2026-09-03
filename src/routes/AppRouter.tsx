import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';
import ListingsPage from '../features/listings/pages/ListingsPage';
import ListingFormPage from '../features/listings/pages/ListingFormPage';
import ListingDetailsPage from '../features/listings/pages/ListingDetailsPage';
import MyListingsPage from '../features/listings/pages/MyListingsPage';
import ReviewFormPage from '../features/reviews/pages/ReviewFormPage';
import LoginPage from '../features/auth/pages/LoginPage';

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            { path: '/', element: <ListingsPage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/listings/:id', element: <ListingDetailsPage /> },
            {
                path: '/listings/new',
                element: (
                    <ProtectedRoute>
                        <ListingFormPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/listings/:id/edit',
                element: (
                    <ProtectedRoute>
                        <ListingFormPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/orders/:orderId/review',
                element: (
                    <ProtectedRoute>
                        <ReviewFormPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/my/listings',
                element: (
                    <ProtectedRoute>
                        <MyListingsPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}