import { lazy, Suspense, ReactNode } from 'react';
import { Outlet, Navigate, useRoutes,useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { useAuthState } from 'react-firebase-hooks/auth'; // Import for auth state
import { auth } from 'src/firebase/config'; // Import your firebase auth configuration
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

// Lazy loading pages
export const HomePage = lazy(() => import('src/pages/home'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Login = lazy(() => import('src/pages/LoginPage'));
export const StudentsPage = lazy(() => import('src/pages/StudentsPage'));
export const Logout = lazy(() => import('src/pages/Logout'));

// ----------------------------------------------------------------------

// Fallback for loading
const renderFallback = (
  <Box display="flex" alignItems="center" justifyContent="center" flex="1 1 auto">
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

// ProtectedRoute for StudentsPage
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth); // Check auth state
  if (loading) {
    return renderFallback; // Show loading if auth state is being checked
  }
  return user ? children : <Navigate to="/login" replace />; // Redirect to login if not logged in
};

// Sidebar Header (Login/Logout button)
const SidebarHeader = () => {
  const [user] = useAuthState(auth); // Get auth state to check if logged in
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <header>
      <Button
        onClick={() => navigate(user ? '/log-out' : '/login')}
        color="primary"
      >
        {user ? 'Logout' : 'Login'}
      </Button>
    </header>
  );
};

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      element: (
        <ProtectedRoute>
        <DashboardLayout>
          {/* <SidebarHeader /> Sidebar header for login/logout button */}
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
        </ProtectedRoute>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'students-page',
          element: (
            <ProtectedRoute> {/* Only show if logged in */}
              <StudentsPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'log-out',
          element: (
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      path: 'sign-in',
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: 'login',
      element: (
        <AuthLayout>
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
