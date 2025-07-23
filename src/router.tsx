import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import SidebarLayout from '@/layouts/SidebarLayout';
import CreateSnippetView from '@/views/snippets/CreateSnippetView';
import Global from './Global';
import SnippetTutorialView from '@/views/snippets/SnippetTutorialView';
import EditSnippetView from './views/snippets/EditSnippetView';
import AuthLayout from './layouts/AuthLayout';
import CreateAccountView from './views/auth/CreateAccountView.1';
import LoginView from './views/auth/LoginView';
import ForgotPasswordView from './views/auth/ForgotPasswordView';
import ResendCodeView from './views/auth/ResendCodeView';
import ConfirmTokenView from './views/auth/ConfirmTokenView';
import ForgotPasswordCodeView from './views/auth/ForgotPasswordCodeView';
import ChangePasswordView from './views/auth/ChangePasswordView';
import UserSnippetView from './views/snippets/UserSnippetView';
import EditSnippetGuestView from './views/snippets/EditSnippetGuestView';
import GuestSnippetView from './views/snippets/GuestSnippetView';
import LandingPageLayout from './layouts/LandingPageLayout';
import HomePageView from './views/landingPage/HomePageView';
import ContactView from './views/landingPage/ContactView';
import TermsView from './views/landingPage/TermsView';
import PrivacyView from './views/landingPage/PrivacyView';
import FavoriteSnippetSidebar from './layouts/FavoriteSnippetSidebar';
import FavoriteSnippetView from './views/snippets/FavoriteSnippetView';
import OAuthCallbackView from './views/auth/OAuthCallbackView';

export const router = createBrowserRouter([
  {
    element: <Global />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            //* Logged User
            path: '/snippet/user/:userId',
            element: <SidebarLayout />,
            children: [
              {
                index: true,
                element: <SnippetTutorialView type="snippet" />,
              },
              {
                path: '/snippet/user/:userId/:snippetId',
                element: <UserSnippetView />,
              },
            ],
          },
          {
            path: '/snippet/favorite',
            element: <FavoriteSnippetSidebar />,
            children: [
              {
                index: true,
                element: <SnippetTutorialView type="favoriteTutorial" />,
              },
              {
                path: '/snippet/favorite/:snippetId',
                element: <FavoriteSnippetView />,
              },
            ],
          },
          {
            //* Guest User
            path: '/snippet/guest',
            element: <SidebarLayout isGuest={true} />,
            children: [
              {
                index: true,
                element: <SnippetTutorialView type="snippet" />,
              },
              {
                path: '/snippet/guest/:snippetId',
                element: <GuestSnippetView isGuest={true} />,
              },
            ],
          },
        ],
      },
      {
        //* Logged User
        path: '/create-snippet',
        element: <CreateSnippetView />,
      },
      {
        path: '/edit-snippet/user/:userId/:snippetId',
        element: <EditSnippetView />,
      },
      {
        //* Guest User
        path: '/create-snippet/guest',
        element: <CreateSnippetView isGuest={true} />,
      },
      {
        path: '/edit-snippet/guest/:snippetId',
        element: <EditSnippetGuestView isGuest={true} />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/auth/create-account',
            element: <CreateAccountView />,
          },
          {
            path: '/auth/login',
            element: <LoginView />,
          },
          {
            path: '/auth/resend-code',
            element: <ResendCodeView />,
          },
          {
            path: '/auth/confirm-account',
            element: <ConfirmTokenView />,
          },
          {
            path: '/auth/forgot-password',
            element: <ForgotPasswordView />,
          },
          {
            path: '/auth/forgot-password/code',
            element: <ForgotPasswordCodeView />,
          },
          {
            path: '/auth/change-password/:token',
            element: <ChangePasswordView />,
          },
        ],
      },
      {
        element: <LandingPageLayout />,
        children: [
          {
            path: '/',
            element: <HomePageView />,
          },
          {
            path: '/contact',
            element: <ContactView />,
          },
          {
            path: '/terms',
            element: <TermsView />,
          },
          {
            path: '/privacy',
            element: <PrivacyView />,
          },
        ],
      },
      {
        path: '/oauth-callback',
        element: <OAuthCallbackView />,
      },
    ],
  },
]);
