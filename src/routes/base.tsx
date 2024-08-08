import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/layouts/Base';
import Home from '@/pages/home';
import { LoginForm } from '@/pages/login';
import EnrollPage from '@/pages/enroll';
import StudentPage from '@/pages/student';
import FacultyPage from '@/pages/faculty';
import StudentDetailsPage from '@/pages/StudentDetails';
import FacultyDetailsPage from '@/pages/facultyDetails';
import TemporaryFaculty from '@/pages/temporaryFaculty';
import Gatepass from '@/pages/gatePass';
import ViewGatePass from '@/pages/viewGatePass';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  }, {
    path: '/login',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
    ],
  },{
    path: '/enroll',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <EnrollPage />,
      },
    ],
  },{
    path: '/student',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <StudentPage />,
      },
      {
        path: ':studentId', // Dynamic route parameter
        element: <StudentDetailsPage />, // Component to render
      }
    ],
  },{
    path: '/faculty',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <FacultyPage />,
      },
      {
        path: ':studentId', // Dynamic route parameter
        element: <FacultyDetailsPage />, // Component to render
      }
    ],
  },{
    path: '/temporary-faculty',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <TemporaryFaculty />,
      },
    ],
  },{
    path: '/gate-pass',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Gatepass />,
      },
    ],
  },{
    path: '/view-gate-pass',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ViewGatePass />,
      },
    ],
  },
]);

export const CustomRouter = () => {
  return <RouterProvider router={router} />;
};
