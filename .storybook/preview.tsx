import 'tailwindcss/tailwind.css';
import '../src/index.css';

import i18n from '../src/i18n';

import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import type { Preview } from "@storybook/react";
import { I18nextProvider } from "react-i18next";
import React, { Suspense, useEffect } from "react";
import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { action } from '@storybook/addon-actions';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
    },
  },
};

// Wrap your stories in the I18nextProvider component
const withI18next = (Story, context) => {
  const { locale } = context.globals;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

const withRouter = (Story, context) => {
  const initialRoute = context.parameters?.route || '/';

  return (
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/*" element={<Story />} />
      </Routes>
    </MemoryRouter>
  );
};

const withLocationLogger = (Story) => {
  const location = useLocation();

  useEffect(() => {
    action('location')(location);
  }, [location]);

  return <Story />;
}

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English', right: '🇺🇸' },
        { value: 'es', title: 'Español', right: '🇪🇸' },
      ],
      showName: true,
    },
  },
};

export default preview;
export const decorators = [withI18next, withLocationLogger, withRouter];
