import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import BlankLayout from 'src/layouts/blank/BlankLayout';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Master Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/dashboard')));
const GLNumberPage = Loadable(lazy(() => import('../views/master/costCentre')));
const WorkUnitPage = Loadable(lazy(() => import('../views/master/workUnit')));
const BaselOnePage = Loadable(lazy(() => import('../views/master/caseCategory/levelOne')));
const BaselTwoPage = Loadable(lazy(() => import('../views/master/caseCategory/levelTwo')));
const CaseCausePage = Loadable(lazy(() => import('../views/master/caseCause')));
const CaseStatusPage = Loadable(lazy(() => import('../views/master/caseStatus')));
const BaselThreePage = Loadable(lazy(() => import('../views/master/caseCategory/levelThree')));
const ReportStatusPage = Loadable(lazy(() => import('../views/master/reportStatus')));

/* ****LED Pages***** */
const FormLED = Loadable(lazy(() => import('../views/loss-event-database/formLED')));
const ListLED = Loadable(lazy(() => import('../views/loss-event-database/listLED')));
const InboxLED = Loadable(lazy(() => import('../views/loss-event-database/inboxLED')));
const DetailLED = Loadable(lazy(() => import('../views/loss-event-database/detailLED')));
const EditFormLED = Loadable(lazy(() => import('../views/loss-event-database/editFormLED')));
const UpdateFormLED = Loadable(lazy(() => import('../views/loss-event-database/updateFormLED')));

/* ****Report Pages***** */
const ReportPage = Loadable(lazy(() => import('../views/report/report')));

/* ****404 Pages***** */
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Dashboard /> },

      // ============================== MASTER ROUTES =====================================
      { path: '/master/workUnit', exact: true, element: <WorkUnitPage /> },
      { path: '/master/caseCause', exact: true, element: <CaseCausePage /> },
      { path: '/master/costCentre', exact: true, element: <GLNumberPage /> },
      { path: '/master/caseStatus', exact: true, element: <CaseStatusPage /> },
      { path: '/master/reportStatus', exact: true, element: <ReportStatusPage /> },
      { path: '/master/caseCategory/levelOne', exact: true, element: <BaselOnePage /> },
      { path: '/master/caseCategory/levelTwo', exact: true, element: <BaselTwoPage /> },
      { path: '/master/caseCategory/levelThree', exact: true, element: <BaselThreePage /> },

      // ============================== LED ROUTES =====================================
      { path: '/LED/list', exact: true, element: <ListLED /> },
      { path: '/LED/inbox', exact: true, element: <InboxLED /> },
      { path: '/LED/report', exact: true, element: <FormLED /> },
      { path: '/LED/editReport/:reportId', exact: true, element: <EditFormLED /> },
      { path: '/LED/detailReport/:reportId', exact: true, element: <DetailLED /> },
      { path: '/LED/updateReport/:reportId', exact: true, element: <UpdateFormLED /> },

      // ============================== REPORT ROUTES =====================================
      { path: '/report', exact: true, element: <ReportPage /> },

      // ============================== ERROR PAGE =====================================
      { path: '/404', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
