
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const LandingPage = lazy(() => import('../pages/landing/page'));
const HomePage = lazy(() => import('../pages/home/page'));
const UploadCVPage = lazy(() => import('../pages/upload-cv/page'));
const CompanyResearchPage = lazy(() => import('../pages/company-research/page'));
const CoverLetterPage = lazy(() => import('../pages/cover-letter/page'));
const EmailControlPage = lazy(() => import('../pages/email-control/page'));
const LoginPage = lazy(() => import('../pages/auth/login/page'));
const SignupPage = lazy(() => import('../pages/auth/signup/page'));
const TermsOfServicePage = lazy(() => import('../pages/terms-of-service/page'));
const PrivacyPolicyPage = lazy(() => import('../pages/privacy-policy/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/home',
    element: <HomePage />
  },
  {
    path: '/upload-cv',
    element: <UploadCVPage />
  },
  {
    path: '/company-research',
    element: <CompanyResearchPage />
  },
  {
    path: '/cover-letter',
    element: <CoverLetterPage />
  },
  {
    path: '/email-control',
    element: <EmailControlPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/terms-of-service',
    element: <TermsOfServicePage />
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export default routes;
