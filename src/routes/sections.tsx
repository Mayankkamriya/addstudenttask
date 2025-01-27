import { lazy, Suspense, ReactNode } from 'react';
import { Outlet, Navigate, useRoutes,useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { varAlpha } from 'src/theme/styles';
import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'src/firebase/config'; 
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

// Page imports
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

// ----------------------------------------------------------------------

// Protected route component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return renderFallback;
  }

  return user ? children : <Navigate to="/login" replace />;
};

// Header Component - Shows login/logout based on auth state
const Header = () => {
  const [user] = useAuthState(auth); // Get the authentication state
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
      {/* Add other header components here */}
    </header>
  );
};

// ----------------------------------------------------------------------

export function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          {/* <Header/> */}
          <Suspense fallback={renderFallback}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <HomePage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        {
          path: 'students-page',
          element: (
            <ProtectedRoute>
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
