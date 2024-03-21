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
      { path: '/master/work-unit', exact: true, element: <WorkUnitPage /> },
      { path: '/master/case-cause', exact: true, element: <CaseCausePage /> },
      { path: '/master/cost-centre', exact: true, element: <GLNumberPage /> },
      { path: '/master/case-status', exact: true, element: <CaseStatusPage /> },
      { path: '/master/reportStatus', exact: true, element: <ReportStatusPage /> },
      { path: '/master/case-category/level-one', exact: true, element: <BaselOnePage /> },
      { path: '/master/case-category/level-two', exact: true, element: <BaselTwoPage /> },
      { path: '/master/case-category/level-three', exact: true, element: <BaselThreePage /> },

      // ============================== LED ROUTES =====================================
      { path: '/LED/list', exact: true, element: <ListLED /> },
      { path: '/LED/inbox', exact: true, element: <InboxLED /> },
      { path: '/LED/report', exact: true, element: <FormLED /> },
      { path: '/LED/zero-report', exact: true, element: <>laporan nihil</> },
      { path: '/LED/edit-report/:reportId', exact: true, element: <EditFormLED /> },
      { path: '/LED/detail-report/:reportId', exact: true, element: <DetailLED /> },
      { path: '/LED/update-report/:reportId', exact: true, element: <UpdateFormLED /> },

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
