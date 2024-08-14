import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '@/components/layouts/Base';
import Home from '@/pages/home';
import { LoginForm } from '@/pages/login';
import EnrollPage from '@/pages/enroll';
import StudentPage from '@/pages/student';
import FacultyPage from '@/pages/faculty';
import TemporaryFaculty from '@/pages/temporaryFaculty';
import Gatepass from '@/pages/gatePass';
import ViewGatePass from '@/pages/viewGatePass';
import FacultyFamily from '@/pages/facultyFamily';
import RequestGatePass from '@/components/RequestGatePass';
import ApproveGatePasses from '@/pages/approveGatePass';

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
  },
  {
    path: '/login',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LoginForm />,
      },
    ],
  },
  {
    path: '/enroll',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <EnrollPage />,
      },
      {
        path: 'student',
        element: <StudentPage />,
      },
      {
        path: 'faculty',
        element: <FacultyPage />,
      },
      {
        path: 'temporary-faculty',
        element: <TemporaryFaculty />,
      },
      {
        path: 'faculty-family',
        element: <FacultyFamily />,
      },
    ],
  },
  {
    path: '/gate-pass',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Gatepass />,
      },
      {
        path: 'request',
        element: <RequestGatePass />,
      },{
        path: 'view-pass',
        element: <ViewGatePass />,
      },{
        path: 'approve-pass',
        element: <ApproveGatePasses/>,
      }
    ],
  },
]);

export const CustomRouter = () => {
  return <RouterProvider router={router} />;
};
