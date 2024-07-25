import 'tailwindcss/tailwind.css';
import '../src/index.css';

import i18n from '../src/i18n';

import type { Preview } from "@storybook/react";
import React, { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
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
export const decorators = [withI18next];
