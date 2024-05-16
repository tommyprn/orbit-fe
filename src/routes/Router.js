import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import BlankLayout from 'src/layouts/blank/BlankLayout';
import Loadable from '../layouts/full/shared/loadable/Loadable';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ***Dashboard**** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/dashboard')));

/* ****Master Pages***** */
const BranchPage = Loadable(lazy(() => import('../views/master/branch')));
const RegionPage = Loadable(lazy(() => import('../views/master/region')));
const WorkUnitPage = Loadable(lazy(() => import('../views/master/work-unit')));
const GLNumberPage = Loadable(lazy(() => import('../views/master/cost-centre')));
const BaselOnePage = Loadable(lazy(() => import('../views/master/case-category/level-one')));
const BaselTwoPage = Loadable(lazy(() => import('../views/master/case-category/level-two')));
const CaseCausePage = Loadable(lazy(() => import('../views/master/case-cause')));
const CaseStatusPage = Loadable(lazy(() => import('../views/master/case-status')));
const BaselThreePage = Loadable(lazy(() => import('../views/master/case-category/level-three')));
const DirectoratePage = Loadable(lazy(() => import('../views/master/directorate')));
const ReportStatusPage = Loadable(lazy(() => import('../views/master/report-status')));

/* ****LED Pages***** */
const FormLED = Loadable(lazy(() => import('../views/loss-event-database/formLED')));
const NilPage = Loadable(lazy(() => import('../views/loss-event-database/nilPage')));
const ListLED = Loadable(lazy(() => import('../views/loss-event-database/listLED')));
const InboxLED = Loadable(lazy(() => import('../views/loss-event-database/inboxLED')));
const DetailLED = Loadable(lazy(() => import('../views/loss-event-database/detailLED')));
const EditFormLED = Loadable(lazy(() => import('../views/loss-event-database/editFormLED')));
const UpdateFormLED = Loadable(lazy(() => import('../views/loss-event-database/updateFormLED')));

/* ****Report Pages***** */
const LedReport = Loadable(lazy(() => import('../views/report/led-report')));
const OfficeReport = Loadable(lazy(() => import('../views/report/office-report')));
const TopIssueReport = Loadable(lazy(() => import('../views/report/top-issue')));
const DatabaseReport = Loadable(lazy(() => import('../views/report/database-report')));
const IrmActionReport = Loadable(lazy(() => import('../views/report/irm-action-report')));

/* ****404 Pages***** */
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Dashboard /> },

      // ============================== MASTER ROUTES =====================================
      { path: '/master/branch', exact: true, element: <BranchPage /> },
      { path: '/master/region', exact: true, element: <RegionPage /> },
      { path: '/master/work-unit', exact: true, element: <WorkUnitPage /> },
      { path: '/master/case-cause', exact: true, element: <CaseCausePage /> },
      { path: '/master/cost-centre', exact: true, element: <GLNumberPage /> },
      { path: '/master/case-status', exact: true, element: <CaseStatusPage /> },
      { path: '/master/directorate', exact: true, element: <DirectoratePage /> },
      { path: '/master/report-status', exact: true, element: <ReportStatusPage /> },
      { path: '/master/case-category/level-one', exact: true, element: <BaselOnePage /> },
      { path: '/master/case-category/level-two', exact: true, element: <BaselTwoPage /> },
      { path: '/master/case-category/level-three', exact: true, element: <BaselThreePage /> },

      // ============================== LED ROUTES =====================================
      { path: '/LED/list', exact: true, element: <ListLED /> },
      { path: '/LED/inbox', exact: true, element: <InboxLED /> },
      { path: '/LED/report', exact: true, element: <FormLED /> },
      { path: '/LED/zero-report', exact: true, element: <NilPage /> },
      { path: '/LED/edit-report/:reportId', exact: true, element: <EditFormLED /> },
      { path: '/LED/update-report/:reportId', exact: true, element: <UpdateFormLED /> },
      {
        path: '/LED/detail-report/:reportId?/:incidentNumber?',
        exact: true,
        element: <DetailLED />,
      },

      // ============================== REPORT ROUTES =====================================
      { path: '/report/LED', exact: true, element: <LedReport /> },
      { path: '/report/office', exact: true, element: <OfficeReport /> },
      { path: '/report/database', exact: true, element: <DatabaseReport /> },
      { path: '/report/top-issue', exact: true, element: <TopIssueReport /> },
      { path: '/report/irm-action', exact: true, element: <IrmActionReport /> },

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
