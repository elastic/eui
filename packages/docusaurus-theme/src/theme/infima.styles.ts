import { css } from '@emotion/react';

export const getInfimaStyles = () => css`
  :root {
    --ifm-color-scheme: light;

    /* Colors. */
    --ifm-dark-value: 10%;
    --ifm-darker-value: 15%;
    --ifm-darkest-value: 30%;
    --ifm-light-value: 15%;
    --ifm-lighter-value: 30%;
    --ifm-lightest-value: 50%;

    /*
    This seems like a lot, but we want to ensure enough contrast.
    Goal is to have a min score of 3 on https://www.myndex.com/APCA/fullmatrix
    For fontWeight 400 + score 3, the cell must show a value < 16px (fontsize we use in places like alerts)
    See also https://github.com/facebookincubator/infima/issues/55#issuecomment-884023075
     */
    --ifm-contrast-background-value: 90%;
    --ifm-contrast-foreground-value: 70%;
    /* Using slightly different values for dark mode */
    --ifm-contrast-background-dark-value: 70%;
    --ifm-contrast-foreground-dark-value: 90%;

    --ifm-color-primary: #3578e5;
    --ifm-color-secondary: #ebedf0;
    --ifm-color-success: #00a400;
    --ifm-color-info: #54c7ec;
    --ifm-color-warning: #ffba00;
    --ifm-color-danger: #fa383e;
    --ifm-color-primary-dark: rgb(48, 108, 206);
    --ifm-color-primary-darker: rgb(45, 102, 195);
    --ifm-color-primary-darkest: rgb(37, 84, 160);
    --ifm-color-primary-light: rgb(83, 140, 233);
    --ifm-color-primary-lighter: rgb(114, 161, 237);
    --ifm-color-primary-lightest: rgb(154, 188, 242);
    --ifm-color-primary-contrast-background: rgb(235, 242, 252);
    --ifm-color-primary-contrast-foreground: rgb(16, 36, 69);
    --ifm-color-secondary-dark: rgb(212, 213, 216);
    --ifm-color-secondary-darker: rgb(200, 201, 204);
    --ifm-color-secondary-darkest: rgb(164, 166, 168);
    --ifm-color-secondary-light: rgb(238, 240, 242);
    --ifm-color-secondary-lighter: rgb(241, 242, 245);
    --ifm-color-secondary-lightest: rgb(245, 246, 248);
    --ifm-color-secondary-contrast-background: rgb(253, 253, 254);
    --ifm-color-secondary-contrast-foreground: rgb(71, 71, 72);
    --ifm-color-success-dark: rgb(0, 148, 0);
    --ifm-color-success-darker: rgb(0, 139, 0);
    --ifm-color-success-darkest: rgb(0, 115, 0);
    --ifm-color-success-light: rgb(38, 178, 38);
    --ifm-color-success-lighter: rgb(77, 191, 77);
    --ifm-color-success-lightest: rgb(128, 210, 128);
    --ifm-color-success-contrast-background: rgb(230, 246, 230);
    --ifm-color-success-contrast-foreground: rgb(0, 49, 0);
    --ifm-color-info-dark: rgb(76, 179, 212);
    --ifm-color-info-darker: rgb(71, 169, 201);
    --ifm-color-info-darkest: rgb(59, 139, 165);
    --ifm-color-info-light: rgb(110, 207, 239);
    --ifm-color-info-lighter: rgb(135, 216, 242);
    --ifm-color-info-lightest: rgb(170, 227, 246);
    --ifm-color-info-contrast-background: rgb(238, 249, 253);
    --ifm-color-info-contrast-foreground: rgb(25, 60, 71);
    --ifm-color-warning-dark: rgb(230, 167, 0);
    --ifm-color-warning-darker: rgb(217, 158, 0);
    --ifm-color-warning-darkest: rgb(179, 130, 0);
    --ifm-color-warning-light: rgb(255, 196, 38);
    --ifm-color-warning-lighter: rgb(255, 207, 77);
    --ifm-color-warning-lightest: rgb(255, 221, 128);
    --ifm-color-warning-contrast-background: rgb(255, 248, 230);
    --ifm-color-warning-contrast-foreground: rgb(77, 56, 0);
    --ifm-color-danger-dark: rgb(225, 50, 56);
    --ifm-color-danger-darker: rgb(213, 48, 53);
    --ifm-color-danger-darkest: rgb(175, 39, 43);
    --ifm-color-danger-light: rgb(251, 86, 91);
    --ifm-color-danger-lighter: rgb(251, 116, 120);
    --ifm-color-danger-lightest: rgb(253, 156, 159);
    --ifm-color-danger-contrast-background: rgb(255, 235, 236);
    --ifm-color-danger-contrast-foreground: rgb(75, 17, 19);

    --ifm-color-white: #fff;
    --ifm-color-black: #000;

    --ifm-color-gray-0: var(--ifm-color-white);
    --ifm-color-gray-100: #f5f6f7;
    --ifm-color-gray-200: #ebedf0;
    --ifm-color-gray-300: #dadde1;
    --ifm-color-gray-400: #ccd0d5;
    --ifm-color-gray-500: #bec3c9;
    --ifm-color-gray-600: #8d949e;
    --ifm-color-gray-700: #606770;
    --ifm-color-gray-800: #444950;
    --ifm-color-gray-900: #1c1e21;
    --ifm-color-gray-1000: var(--ifm-color-black);

    --ifm-color-emphasis-0: var(--ifm-color-gray-0);
    --ifm-color-emphasis-100: var(--ifm-color-gray-100);
    --ifm-color-emphasis-200: var(--ifm-color-gray-200);
    --ifm-color-emphasis-300: var(--ifm-color-gray-300);
    --ifm-color-emphasis-400: var(--ifm-color-gray-400);
    --ifm-color-emphasis-500: var(--ifm-color-gray-500);
    --ifm-color-emphasis-600: var(--ifm-color-gray-600);
    --ifm-color-emphasis-700: var(--ifm-color-gray-700);
    --ifm-color-emphasis-800: var(--ifm-color-gray-800);
    --ifm-color-emphasis-900: var(--ifm-color-gray-900);
    --ifm-color-emphasis-1000: var(--ifm-color-gray-1000);

    /* Base. */
    --ifm-color-content: var(--ifm-color-emphasis-900);
    --ifm-color-content-inverse: var(--ifm-color-emphasis-0);
    --ifm-color-content-secondary: #525860;

    --ifm-background-color: transparent; /* Body's background. */
    --ifm-background-surface-color: var(--ifm-color-content-inverse);
    --ifm-global-border-width: 1px;
    --ifm-global-radius: 0.4rem;

    --ifm-hover-overlay: rgba(0, 0, 0, 0.05);

    /* Typography. */
    --ifm-font-color-base: var(--ifm-color-content);
    --ifm-font-color-base-inverse: var(--ifm-color-content-inverse);
    --ifm-font-color-secondary: var(--ifm-color-content-secondary);
    --ifm-font-family-base: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu,
      Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, 'Segoe UI',
      Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol';
    --ifm-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
      'Liberation Mono', 'Courier New', monospace;
    --ifm-font-size-base: 100%;

    --ifm-font-weight-light: 300;
    --ifm-font-weight-normal: 400;
    --ifm-font-weight-semibold: 500;
    --ifm-font-weight-bold: 700;

    --ifm-font-weight-base: var(--ifm-font-weight-normal);
    --ifm-line-height-base: 1.65;

    /* Spacing. */
    --ifm-global-spacing: 1rem;
    --ifm-spacing-vertical: var(--ifm-global-spacing);
    --ifm-spacing-horizontal: var(--ifm-global-spacing);

    /* Transitions. */
    --ifm-transition-fast: 200ms;
    --ifm-transition-slow: 400ms;
    --ifm-transition-timing-default: cubic-bezier(0.08, 0.52, 0.52, 1);

    /* Shadows. */
    --ifm-global-shadow-lw: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
    --ifm-global-shadow-md: 0 5px 40px rgba(0, 0, 0, 0.2);
    --ifm-global-shadow-tl: 0 12px 28px 0 rgba(0, 0, 0, 0.2),
      0 2px 4px 0 rgba(0, 0, 0, 0.1);

    /* Z-index. */
    --ifm-z-index-dropdown: 100;
    --ifm-z-index-fixed: 200;
    --ifm-z-index-overlay: 400;
    --ifm-container-width: 1140px;
    --ifm-container-width-xl: 1320px;
    --ifm-code-background: rgb(246, 247, 248);
    --ifm-code-border-radius: var(--ifm-global-radius);
    --ifm-code-font-size: 90%;
    --ifm-code-padding-horizontal: 0.1rem;
    --ifm-code-padding-vertical: 0.1rem;

    --ifm-pre-background: var(--ifm-code-background);
    --ifm-pre-border-radius: var(--ifm-code-border-radius);
    --ifm-pre-color: inherit;
    --ifm-pre-line-height: 1.45;
    --ifm-pre-padding: 1rem;
    --ifm-heading-color: inherit;
    --ifm-heading-margin-top: 0;
    --ifm-heading-margin-bottom: var(--ifm-spacing-vertical);
    --ifm-heading-font-family: var(--ifm-font-family-base);
    --ifm-heading-font-weight: var(--ifm-font-weight-bold);
    --ifm-heading-line-height: 1.25;

    --ifm-h1-font-size: 2rem;
    --ifm-h2-font-size: 1.5rem;
    --ifm-h3-font-size: 1.25rem;
    --ifm-h4-font-size: 1rem;
    --ifm-h5-font-size: 0.875rem;
    --ifm-h6-font-size: 0.85rem;
    --ifm-image-alignment-padding: 1.25rem;
    /* Leading is the distance between two baselines */
    /* TODO: add appropriate mobile leading */
    --ifm-leading-desktop: 1.25;
    --ifm-leading: calc(var(--ifm-leading-desktop) * 1rem);
    --ifm-list-left-padding: 2rem;
    --ifm-list-margin: 1rem;
    --ifm-list-item-margin: 0.25rem;
    --ifm-list-paragraph-margin: 1rem;
    --ifm-table-cell-padding: 0.75rem;

    --ifm-table-background: transparent;
    --ifm-table-stripe-background: rgba(0, 0, 0, 0.03);

    --ifm-table-border-width: 1px;
    --ifm-table-border-color: var(--ifm-color-emphasis-300);

    --ifm-table-head-background: inherit;
    --ifm-table-head-color: inherit;
    --ifm-table-head-font-weight: var(--ifm-font-weight-bold);

    --ifm-table-cell-color: inherit;
    /* Links. */
    --ifm-link-color: var(--ifm-color-primary);
    --ifm-link-decoration: none;
    --ifm-link-hover-color: var(--ifm-link-color);
    --ifm-link-hover-decoration: underline;

    /* Paragraphs. */
    --ifm-paragraph-margin-bottom: var(--ifm-leading);

    /* Blockquotes. */
    --ifm-blockquote-font-size: var(--ifm-font-size-base);
    --ifm-blockquote-border-left-width: 2px;
    --ifm-blockquote-padding-horizontal: var(--ifm-spacing-horizontal);
    --ifm-blockquote-padding-vertical: 0;
    --ifm-blockquote-shadow: none;
    --ifm-blockquote-color: var(--ifm-color-emphasis-800);
    --ifm-blockquote-border-color: var(--ifm-color-emphasis-300);

    /* Horizontal Rules. */
    --ifm-hr-background-color: var(--ifm-color-emphasis-500);
    --ifm-hr-height: 1px;
    --ifm-hr-margin-vertical: 1.5rem;
    --ifm-scrollbar-size: 7px;
    --ifm-scrollbar-track-background-color: #f1f1f1;
    --ifm-scrollbar-thumb-background-color: #c0c0c0;
    --ifm-scrollbar-thumb-hover-background-color: #a7a7a7;
    --ifm-alert-background-color: inherit; /* Set a default which will be overridden later. */
    --ifm-alert-border-color: inherit; /* Set a default which will be overridden later. */
    --ifm-alert-border-radius: var(--ifm-global-radius);
    --ifm-alert-border-width: 0px; /* For users that want to easily add a border */
    --ifm-alert-border-left-width: 5px;
    --ifm-alert-color: var(--ifm-font-color-base);
    --ifm-alert-padding-horizontal: var(--ifm-spacing-horizontal);
    --ifm-alert-padding-vertical: var(--ifm-spacing-vertical);
    --ifm-alert-shadow: var(--ifm-global-shadow-lw);
    --ifm-avatar-intro-margin: 1rem;
    --ifm-avatar-intro-alignment: inherit;
    --ifm-avatar-photo-size: 3rem;
    --ifm-badge-background-color: inherit; /* Set a default which will be overridden later. */
    --ifm-badge-border-color: inherit; /* Set a default which will be overridden later. */
    --ifm-badge-border-radius: var(--ifm-global-radius);
    --ifm-badge-border-width: var(--ifm-global-border-width);
    --ifm-badge-color: var(--ifm-color-white);
    --ifm-badge-padding-horizontal: calc(var(--ifm-spacing-horizontal) * 0.5);
    --ifm-badge-padding-vertical: calc(var(--ifm-spacing-vertical) * 0.25);
    --ifm-breadcrumb-border-radius: 1.5rem;
    --ifm-breadcrumb-spacing: 0.5rem;
    --ifm-breadcrumb-color-active: var(--ifm-color-primary);
    --ifm-breadcrumb-item-background-active: var(--ifm-hover-overlay);
    --ifm-breadcrumb-padding-horizontal: 0.8rem;
    --ifm-breadcrumb-padding-vertical: 0.4rem;
    --ifm-breadcrumb-size-multiplier: 1;
    --ifm-breadcrumb-separator: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 256 256"><g><g><polygon points="79.093,0 48.907,30.187 146.72,128 48.907,225.813 79.093,256 207.093,128"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>');
    --ifm-breadcrumb-separator-filter: none;
    --ifm-breadcrumb-separator-size: 0.5rem;
    --ifm-breadcrumb-separator-size-multiplier: 1.25;
    --ifm-button-background-color: inherit;
    --ifm-button-border-color: var(--ifm-button-background-color);
    --ifm-button-border-width: var(--ifm-global-border-width);
    --ifm-button-color: var(--ifm-font-color-base-inverse);
    --ifm-button-font-weight: var(--ifm-font-weight-bold);
    --ifm-button-padding-horizontal: 1.5rem;
    --ifm-button-padding-vertical: 0.375rem;
    --ifm-button-size-multiplier: 1;
    --ifm-button-transition-duration: var(--ifm-transition-fast);
    --ifm-button-border-radius: calc(
      var(--ifm-global-radius) * var(--ifm-button-size-multiplier)
    );
    --ifm-button-group-spacing: 2px;
    --ifm-card-background-color: var(--ifm-background-surface-color);
    --ifm-card-border-radius: calc(var(--ifm-global-radius) * 2);
    --ifm-card-horizontal-spacing: var(--ifm-global-spacing);
    --ifm-card-vertical-spacing: var(--ifm-global-spacing);
    --ifm-dropdown-background-color: var(--ifm-background-surface-color);
    --ifm-dropdown-font-weight: var(--ifm-font-weight-semibold);
    --ifm-dropdown-link-color: var(--ifm-font-color-base);
    --ifm-dropdown-hover-background-color: var(--ifm-hover-overlay);
    --ifm-hero-background-color: var(--ifm-background-surface-color);
    --ifm-hero-text-color: var(--ifm-color-emphasis-800);
    --ifm-menu-color: var(--ifm-color-emphasis-700);
    --ifm-menu-color-active: var(--ifm-color-primary);
    --ifm-menu-color-background-active: var(--ifm-hover-overlay);
    --ifm-menu-color-background-hover: var(--ifm-hover-overlay);
    --ifm-menu-link-padding-horizontal: 0.75rem;
    --ifm-menu-link-padding-vertical: 0.375rem;
    --ifm-menu-link-sublist-icon: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.5)" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>');
    --ifm-menu-link-sublist-icon-filter: none;
    --ifm-navbar-background-color: var(--ifm-background-surface-color);
    --ifm-navbar-height: 3.75rem;
    --ifm-navbar-item-padding-horizontal: 0.75rem;
    --ifm-navbar-item-padding-vertical: 0.25rem;
    --ifm-navbar-link-color: var(--ifm-font-color-base);
    --ifm-navbar-link-hover-color: var(--ifm-color-primary);
    --ifm-navbar-link-active-color: var(--ifm-link-color);
    --ifm-navbar-padding-horizontal: var(--ifm-spacing-horizontal);
    --ifm-navbar-padding-vertical: calc(var(--ifm-spacing-vertical) * 0.5);
    --ifm-navbar-shadow: var(--ifm-global-shadow-lw);
    --ifm-navbar-search-input-background-color: var(--ifm-color-emphasis-200);
    --ifm-navbar-search-input-color: var(--ifm-color-emphasis-800);
    --ifm-navbar-search-input-placeholder-color: var(--ifm-color-emphasis-500);
    --ifm-navbar-search-input-icon: url('data:image/svg+xml;utf8,<svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16px" width="16px"><path d="M6.02945,10.20327a4.17382,4.17382,0,1,1,4.17382-4.17382A4.15609,4.15609,0,0,1,6.02945,10.20327Zm9.69195,4.2199L10.8989,9.59979A5.88021,5.88021,0,0,0,12.058,6.02856,6.00467,6.00467,0,1,0,9.59979,10.8989l4.82338,4.82338a.89729.89729,0,0,0,1.29912,0,.89749.89749,0,0,0-.00087-1.29909Z" /></svg>');
    --ifm-navbar-sidebar-width: 83vw;
    --ifm-pagination-border-radius: var(--ifm-global-radius);
    --ifm-pagination-color-active: var(--ifm-color-primary);
    --ifm-pagination-font-size: 1rem;
    --ifm-pagination-item-active-background: var(--ifm-hover-overlay);
    --ifm-pagination-page-spacing: 0.2em;
    --ifm-pagination-padding-horizontal: calc(
      var(--ifm-spacing-horizontal) * 1
    );
    --ifm-pagination-padding-vertical: calc(var(--ifm-spacing-vertical) * 0.25);
    --ifm-pagination-nav-border-radius: var(--ifm-global-radius);
    --ifm-pagination-nav-color-hover: var(--ifm-color-primary);
    --ifm-pills-color-active: var(--ifm-color-primary);
    --ifm-pills-color-background-active: var(--ifm-hover-overlay);
    --ifm-pills-spacing: 0.125rem;
    --ifm-tabs-color: var(--ifm-font-color-secondary);
    --ifm-tabs-color-active: var(--ifm-color-primary);
    --ifm-tabs-color-active-border: var(--ifm-tabs-color-active);
    --ifm-tabs-padding-horizontal: 1rem;
    --ifm-tabs-padding-vertical: 1rem;
  }

  html {
    background-color: var(--ifm-background-color);
    color: var(--ifm-font-color-base);
    color-scheme: var(--ifm-color-scheme);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    text-rendering: optimizelegibility;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    margin: 0;
    word-wrap: break-word;
  }

  .container {
    margin: 0 auto;
    max-width: var(--ifm-container-width);
    padding: 0 var(--ifm-spacing-horizontal);
    width: 100%;
  }

  .container--fluid {
    max-width: inherit;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 calc(var(--ifm-spacing-horizontal) * -1);
  }

  .row--no-gutters {
    margin-left: 0;
    margin-right: 0;
  }

  .row--no-gutters > .col {
    padding-left: 0;
    padding-right: 0;
  }

  .row--align-top {
    align-items: flex-start;
  }

  .row--align-bottom {
    align-items: flex-end;
  }

  .row--align-center {
    align-items: center;
  }

  .row--align-stretch {
    align-items: stretch;
  }

  .row--align-baseline {
    align-items: baseline;
  }

  .col {
    --ifm-col-width: 100%;

    flex: 1 0;
    margin-left: 0;
    max-width: var(--ifm-col-width);
    padding: 0 var(--ifm-spacing-horizontal);
    width: 100%;
  }

  .col[class*='col--'] {
    flex: 0 0 var(--ifm-col-width);
  }

  .col--1 {
    --ifm-col-width: calc(1 / 12 * 100%);
  }

  .col--offset-1 {
    margin-left: calc(1 / 12 * 100%);
  }

  .col--2 {
    --ifm-col-width: calc(2 / 12 * 100%);
  }

  .col--offset-2 {
    margin-left: calc(2 / 12 * 100%);
  }

  .col--3 {
    --ifm-col-width: calc(3 / 12 * 100%);
  }

  .col--offset-3 {
    margin-left: calc(3 / 12 * 100%);
  }

  .col--4 {
    --ifm-col-width: calc(4 / 12 * 100%);
  }

  .col--offset-4 {
    margin-left: calc(4 / 12 * 100%);
  }

  .col--5 {
    --ifm-col-width: calc(5 / 12 * 100%);
  }

  .col--offset-5 {
    margin-left: calc(5 / 12 * 100%);
  }

  .col--6 {
    --ifm-col-width: calc(6 / 12 * 100%);
  }

  .col--offset-6 {
    margin-left: calc(6 / 12 * 100%);
  }

  .col--7 {
    --ifm-col-width: calc(7 / 12 * 100%);
  }

  .col--offset-7 {
    margin-left: calc(7 / 12 * 100%);
  }

  .col--8 {
    --ifm-col-width: calc(8 / 12 * 100%);
  }

  .col--offset-8 {
    margin-left: calc(8 / 12 * 100%);
  }

  .col--9 {
    --ifm-col-width: calc(9 / 12 * 100%);
  }

  .col--offset-9 {
    margin-left: calc(9 / 12 * 100%);
  }

  .col--10 {
    --ifm-col-width: calc(10 / 12 * 100%);
  }

  .col--offset-10 {
    margin-left: calc(10 / 12 * 100%);
  }

  .col--11 {
    --ifm-col-width: calc(11 / 12 * 100%);
  }

  .col--offset-11 {
    margin-left: calc(11 / 12 * 100%);
  }

  .col--12 {
    --ifm-col-width: calc(12 / 12 * 100%);
  }

  .col--offset-12 {
    margin-left: calc(12 / 12 * 100%);
  }

  .margin--none {
    margin: 0 !important;
  }

  .margin-top--none {
    margin-top: 0 !important;
  }

  .margin-left--none {
    margin-left: 0 !important;
  }

  .margin-bottom--none {
    margin-bottom: 0 !important;
  }

  .margin-right--none {
    margin-right: 0 !important;
  }

  .margin-vert--none {
    margin-bottom: 0 !important;
    margin-top: 0 !important;
  }

  .margin-horiz--none {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .margin--xs {
    margin: 0.25rem !important;
  }

  .margin-top--xs {
    margin-top: 0.25rem !important;
  }

  .margin-left--xs {
    margin-left: 0.25rem !important;
  }

  .margin-bottom--xs {
    margin-bottom: 0.25rem !important;
  }

  .margin-right--xs {
    margin-right: 0.25rem !important;
  }

  .margin-vert--xs {
    margin-bottom: 0.25rem !important;
    margin-top: 0.25rem !important;
  }

  .margin-horiz--xs {
    margin-left: 0.25rem !important;
    margin-right: 0.25rem !important;
  }

  .margin--sm {
    margin: 0.5rem !important;
  }

  .margin-top--sm {
    margin-top: 0.5rem !important;
  }

  .margin-left--sm {
    margin-left: 0.5rem !important;
  }

  .margin-bottom--sm {
    margin-bottom: 0.5rem !important;
  }

  .margin-right--sm {
    margin-right: 0.5rem !important;
  }

  .margin-vert--sm {
    margin-bottom: 0.5rem !important;
    margin-top: 0.5rem !important;
  }

  .margin-horiz--sm {
    margin-left: 0.5rem !important;
    margin-right: 0.5rem !important;
  }

  .margin--md {
    margin: 1rem !important;
  }

  .margin-top--md {
    margin-top: 1rem !important;
  }

  .margin-left--md {
    margin-left: 1rem !important;
  }

  .margin-bottom--md {
    margin-bottom: 1rem !important;
  }

  .margin-right--md {
    margin-right: 1rem !important;
  }

  .margin-vert--md {
    margin-bottom: 1rem !important;
    margin-top: 1rem !important;
  }

  .margin-horiz--md {
    margin-left: 1rem !important;
    margin-right: 1rem !important;
  }

  .margin--lg {
    margin: 2rem !important;
  }

  .margin-top--lg {
    margin-top: 2rem !important;
  }

  .margin-left--lg {
    margin-left: 2rem !important;
  }

  .margin-bottom--lg {
    margin-bottom: 2rem !important;
  }

  .margin-right--lg {
    margin-right: 2rem !important;
  }

  .margin-vert--lg {
    margin-bottom: 2rem !important;
    margin-top: 2rem !important;
  }

  .margin-horiz--lg {
    margin-left: 2rem !important;
    margin-right: 2rem !important;
  }

  .margin--xl {
    margin: 5rem !important;
  }

  .margin-top--xl {
    margin-top: 5rem !important;
  }

  .margin-left--xl {
    margin-left: 5rem !important;
  }

  .margin-bottom--xl {
    margin-bottom: 5rem !important;
  }

  .margin-right--xl {
    margin-right: 5rem !important;
  }

  .margin-vert--xl {
    margin-bottom: 5rem !important;
    margin-top: 5rem !important;
  }

  .margin-horiz--xl {
    margin-left: 5rem !important;
    margin-right: 5rem !important;
  }

  .padding--none {
    padding: 0 !important;
  }

  .padding-top--none {
    padding-top: 0 !important;
  }

  .padding-left--none {
    padding-left: 0 !important;
  }

  .padding-bottom--none {
    padding-bottom: 0 !important;
  }

  .padding-right--none {
    padding-right: 0 !important;
  }

  .padding-vert--none {
    padding-bottom: 0 !important;
    padding-top: 0 !important;
  }

  .padding-horiz--none {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .padding--xs {
    padding: 0.25rem !important;
  }

  .padding-top--xs {
    padding-top: 0.25rem !important;
  }

  .padding-left--xs {
    padding-left: 0.25rem !important;
  }

  .padding-bottom--xs {
    padding-bottom: 0.25rem !important;
  }

  .padding-right--xs {
    padding-right: 0.25rem !important;
  }

  .padding-vert--xs {
    padding-bottom: 0.25rem !important;
    padding-top: 0.25rem !important;
  }

  .padding-horiz--xs {
    padding-left: 0.25rem !important;
    padding-right: 0.25rem !important;
  }

  .padding--sm {
    padding: 0.5rem !important;
  }

  .padding-top--sm {
    padding-top: 0.5rem !important;
  }

  .padding-left--sm {
    padding-left: 0.5rem !important;
  }

  .padding-bottom--sm {
    padding-bottom: 0.5rem !important;
  }

  .padding-right--sm {
    padding-right: 0.5rem !important;
  }

  .padding-vert--sm {
    padding-bottom: 0.5rem !important;
    padding-top: 0.5rem !important;
  }

  .padding-horiz--sm {
    padding-left: 0.5rem !important;
    padding-right: 0.5rem !important;
  }

  .padding--md {
    padding: 1rem !important;
  }

  .padding-top--md {
    padding-top: 1rem !important;
  }

  .padding-left--md {
    padding-left: 1rem !important;
  }

  .padding-bottom--md {
    padding-bottom: 1rem !important;
  }

  .padding-right--md {
    padding-right: 1rem !important;
  }

  .padding-vert--md {
    padding-bottom: 1rem !important;
    padding-top: 1rem !important;
  }

  .padding-horiz--md {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }

  .padding--lg {
    padding: 2rem !important;
  }

  .padding-top--lg {
    padding-top: 2rem !important;
  }

  .padding-left--lg {
    padding-left: 2rem !important;
  }

  .padding-bottom--lg {
    padding-bottom: 2rem !important;
  }

  .padding-right--lg {
    padding-right: 2rem !important;
  }

  .padding-vert--lg {
    padding-bottom: 2rem !important;
    padding-top: 2rem !important;
  }

  .padding-horiz--lg {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }

  .padding--xl {
    padding: 5rem !important;
  }

  .padding-top--xl {
    padding-top: 5rem !important;
  }

  .padding-left--xl {
    padding-left: 5rem !important;
  }

  .padding-bottom--xl {
    padding-bottom: 5rem !important;
  }

  .padding-right--xl {
    padding-right: 5rem !important;
  }

  .padding-vert--xl {
    padding-bottom: 5rem !important;
    padding-top: 5rem !important;
  }

  .padding-horiz--xl {
    padding-left: 5rem !important;
    padding-right: 5rem !important;
  }

  .menu {
    font-weight: var(--ifm-font-weight-semibold);
    overflow-x: hidden;
  }

  .menu__list {
    list-style: none;
    margin: 0;
    padding-left: 0;
  }

  /* Non-top level menus */

  .menu__list .menu__list {
    flex: 0 0 100%;
    margin-top: 0.25rem;
    padding-left: var(--ifm-menu-link-padding-horizontal);
  }

  .menu__list-item:not(:first-child) {
    margin-top: 0.25rem;
  }

  .menu__list-item--collapsed .menu__list {
    height: 0;
    overflow: hidden;
  }

  .menu__list-item--collapsed .menu__link--sublist:after,
  .menu__list-item--collapsed .menu__caret:before {
    transform: rotateZ(90deg);
  }

  .menu__list-item-collapsible {
    flex-wrap: wrap;
    position: relative;
    border-radius: 0.25rem;
    display: flex;
    transition: background var(--ifm-transition-fast)
      var(--ifm-transition-timing-default);
  }

  .menu__list-item-collapsible:hover {
    background: var(--ifm-menu-color-background-hover);
  }

  .menu__list-item-collapsible--active {
    background: var(--ifm-menu-color-background-hover);
  }

  .menu__list-item-collapsible .menu__link:hover,
  .menu__list-item-collapsible .menu__link--active {
    background: none !important;
  }

  .menu__link,
  .menu__caret {
    align-items: center;
    border-radius: 0.25rem;
    display: flex;
    transition: background var(--ifm-transition-fast)
      var(--ifm-transition-timing-default);
  }

  .menu__link:hover,
  .menu__caret:hover {
    background: var(--ifm-menu-color-background-hover);
  }

  .menu__link {
    color: var(--ifm-menu-color);
    flex: 1;
    line-height: 1.25;
    padding: var(--ifm-menu-link-padding-vertical)
      var(--ifm-menu-link-padding-horizontal);
  }

  .menu__link:hover {
    text-decoration: none;
    color: var(--ifm-menu-color);
    transition: color var(--ifm-transition-fast)
      var(--ifm-transition-timing-default);
  }

  .menu__link--sublist-caret:after {
    content: '';
    margin-left: auto;
    min-width: 1.25rem;
    background: var(--ifm-menu-link-sublist-icon) 50% / 2rem 2rem;
    filter: var(--ifm-menu-link-sublist-icon-filter);
    height: 1.25rem;
    transform: rotate(180deg);
    width: 1.25rem;
    transition: transform var(--ifm-transition-fast) linear;
  }

  .menu__link--active {
    color: var(--ifm-menu-color-active);
  }

  .menu__link--active:hover {
    color: var(--ifm-menu-color-active);
  }

  .menu__link--active:not(.menu__link--sublist) {
    background-color: var(--ifm-menu-color-background-active);
  }

  .menu__caret {
    padding: var(--ifm-menu-link-padding-vertical)
      var(--ifm-menu-link-padding-horizontal);
  }

  .menu__caret:before {
    content: '';
    background: var(--ifm-menu-link-sublist-icon) 50% / 2rem 2rem;
    filter: var(--ifm-menu-link-sublist-icon-filter);
    height: 1.25rem;
    transform: rotate(180deg);
    width: 1.25rem;
    transition: transform var(--ifm-transition-fast) linear;
  }

  .navbar {
    background-color: var(--ifm-navbar-background-color);
    box-shadow: var(--ifm-navbar-shadow);
    display: flex;
    height: var(--ifm-navbar-height);
    padding: var(--ifm-navbar-padding-vertical)
      var(--ifm-navbar-padding-horizontal);
  }

  .navbar > .container,
  .navbar > .container-fluid {
    display: flex;
  }

  .navbar--fixed-top {
    position: sticky;
    top: 0;
    z-index: var(--ifm-z-index-fixed);
  }

  .navbar__inner {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
  }

  .navbar__brand {
    align-items: center;
    color: var(--ifm-navbar-link-color);
    display: flex;
    margin-right: 1rem;
    min-width: 0;
  }

  .navbar__brand:hover {
    color: var(--ifm-navbar-link-hover-color);
    text-decoration: none;
  }

  .navbar__title {
    flex: 1 1 auto;
  }

  .navbar__toggle {
    display: none;
    margin-right: 0.5rem;
  }

  .navbar__logo {
    flex: 0 0 auto;
    height: 2rem;
    margin-right: 0.5rem;
  }

  .navbar__logo img {
    height: 100%;
  }

  .navbar__items {
    align-items: center;
    display: flex;
    flex: 1;
    min-width: 0;
  }

  .navbar__items--center {
    flex: 0 0 auto;
  }

  .navbar__items--center .navbar__brand {
    margin: 0;
  }

  .navbar__items--center + .navbar__items--right {
    flex: 1;
  }

  .navbar__items--right {
    flex: 0 0 auto;
    justify-content: flex-end;
  }

  .navbar__items--right > :last-child {
    padding-right: 0;
  }

  .navbar__item {
    display: inline-block;
    padding: var(--ifm-navbar-item-padding-vertical)
      var(--ifm-navbar-item-padding-horizontal);
  }

  .navbar__item.dropdown .navbar__link:not([href]) {
    pointer-events: none;
  }

  .navbar__link {
    color: var(--ifm-navbar-link-color);
    font-weight: var(--ifm-font-weight-semibold);
  }

  .navbar__link:hover,
  .navbar__link--active {
    color: var(--ifm-navbar-link-hover-color);
    text-decoration: none;
  }

  .navbar--dark,
  .navbar--primary {
    --ifm-menu-color: var(--ifm-color-gray-300);
    --ifm-navbar-link-color: var(--ifm-color-gray-100);
    --ifm-navbar-search-input-background-color: rgba(255, 255, 255, 0.1);
    --ifm-navbar-search-input-placeholder-color: rgba(255, 255, 255, 0.5);

    color: var(--ifm-color-white);
  }

  .navbar--dark {
    --ifm-navbar-background-color: #242526;
    --ifm-navbar-link-hover-color: var(--ifm-color-primary);
    --ifm-menu-color-background-active: rgba(255, 255, 255, 0.05);
    --ifm-navbar-search-input-color: var(--ifm-color-white);
  }

  .navbar--primary {
    --ifm-navbar-background-color: var(--ifm-color-primary);
    --ifm-navbar-link-hover-color: var(--ifm-color-white);
    --ifm-menu-color-active: var(--ifm-color-white);
    --ifm-navbar-search-input-color: var(--ifm-color-emphasis-500);
  }

  .navbar__search-input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; /* Algolia will add type="search" to the input in Safari and Safari's styling will override the styling here. */
    background: var(--ifm-navbar-search-input-background-color)
      var(--ifm-navbar-search-input-icon) no-repeat 0.75rem center / 1rem 1rem;
    border: none;
    border-radius: 2rem;
    color: var(--ifm-navbar-search-input-color);
    cursor: text;
    display: inline-block;
    font-size: 1rem;
    height: 2rem;
    padding: 0 0.5rem 0 2.25rem;
    width: 12.5rem;
  }

  .navbar__search-input::-moz-placeholder {
    color: var(--ifm-navbar-search-input-placeholder-color);
  }

  .navbar__search-input::placeholder {
    color: var(--ifm-navbar-search-input-placeholder-color);
  }

  .navbar-sidebar {
    background-color: var(--ifm-navbar-background-color);
    bottom: 0;
    box-shadow: var(--ifm-global-shadow-md);
    left: 0;
    opacity: 0;
    overflow-x: hidden;
    position: fixed;
    top: 0;
    transform: translate3d(-100%, 0, 0);
    visibility: hidden;
    width: var(--ifm-navbar-sidebar-width);
    transition-property: opacity, visibility, transform;
    transition-duration: var(--ifm-transition-fast);
    transition-timing-function: ease-in-out;
  }

  .navbar-sidebar--show .navbar-sidebar,
  .navbar-sidebar--show .navbar-sidebar__backdrop {
    opacity: 1;
    visibility: visible;
  }

  .navbar-sidebar--show .navbar-sidebar {
    transform: translate3d(0, 0, 0);
  }

  .navbar-sidebar__backdrop {
    background-color: rgba(0, 0, 0, 0.6);
    bottom: 0;
    left: 0;
    opacity: 0;
    position: fixed;
    right: 0;
    top: 0;
    visibility: hidden;
    transition-property: opacity, visibility;
    transition-duration: var(--ifm-transition-fast);
    transition-timing-function: ease-in-out;
  }

  .navbar-sidebar__brand {
    align-items: center;
    box-shadow: var(--ifm-navbar-shadow);
    display: flex;
    flex: 1;
    height: var(--ifm-navbar-height);
    padding: var(--ifm-navbar-padding-vertical)
      var(--ifm-navbar-padding-horizontal);
  }

  .navbar-sidebar__items {
    display: flex;
    height: calc(100% - var(--ifm-navbar-height));
    transform: translateZ(0);
    transition: transform var(--ifm-transition-fast) ease-in-out;
  }

  .navbar-sidebar__items--show-secondary {
    transform: translate3d(calc((var(--ifm-navbar-sidebar-width)) * -1), 0, 0);
  }

  .navbar-sidebar__item {
    flex-shrink: 0;
    padding: 0.5rem;
    width: calc(var(--ifm-navbar-sidebar-width));
  }

  .navbar-sidebar__back {
    background: var(--ifm-menu-color-background-active);
    font-size: 15px;
    font-weight: var(--ifm-button-font-weight);
    margin: 0 0 0.2rem -0.5rem;
    padding: 0.6rem 1.5rem;
    position: relative;
    text-align: left;
    top: -0.5rem;
    width: calc(100% + 1rem);
  }

  .navbar-sidebar__close {
    display: flex;
    margin-left: auto;
  }

  .pagination-nav {
    display: grid;
    grid-gap: var(--ifm-spacing-horizontal);
    gap: var(--ifm-spacing-horizontal);
    grid-template-columns: repeat(2, 1fr);
  }

  .pagination-nav__link {
    border: 1px solid var(--ifm-color-emphasis-300);
    border-radius: var(--ifm-pagination-nav-border-radius);
    display: block;
    height: 100%;
    line-height: var(--ifm-heading-line-height);
    padding: var(--ifm-global-spacing);
    transition: border-color var(--ifm-transition-fast)
      var(--ifm-transition-timing-default);
  }

  .pagination-nav__link:hover {
    border-color: var(--ifm-pagination-nav-color-hover);
    text-decoration: none;
  }

  .pagination-nav__link--next {
    grid-column: 2/3;
    text-align: right;
  }

  .pagination-nav__label {
    font-size: var(--ifm-h4-font-size);
    font-weight: var(--ifm-heading-font-weight);
    word-break: break-word;
  }

  .pagination-nav__link--prev .pagination-nav__label::before {
    content: '« ';
  }

  .pagination-nav__link--next .pagination-nav__label::after {
    content: ' »';
  }

  .pagination-nav__sublabel {
    color: var(--ifm-color-content-secondary);
    font-size: var(--ifm-h5-font-size);
    font-weight: var(--ifm-font-weight-semibold);
    margin-bottom: 0.25rem;
  }

  .breadcrumbs {
    margin-bottom: 0;
    padding-left: 0;
  }

  .breadcrumbs__item {
    display: inline-block;
  }

  .breadcrumbs__item:not(:last-child):after {
    background: var(--ifm-breadcrumb-separator) center;
    content: ' ';
    display: inline-block;
    filter: var(--ifm-breadcrumb-separator-filter);
    height: calc(
      var(--ifm-breadcrumb-separator-size) *
        var(--ifm-breadcrumb-size-multiplier) *
        var(--ifm-breadcrumb-separator-size-multiplier)
    );
    margin: 0 var(--ifm-breadcrumb-spacing);
    opacity: 0.5;
    width: calc(
      var(--ifm-breadcrumb-separator-size) *
        var(--ifm-breadcrumb-size-multiplier) *
        var(--ifm-breadcrumb-separator-size-multiplier)
    );
    /*rtl:raw:
        transform: rotate(180deg);
        */
  }

  .breadcrumbs__item--active .breadcrumbs__link {
    background: var(--ifm-breadcrumb-item-background-active);
    color: var(--ifm-breadcrumb-color-active);
  }

  .breadcrumbs__link {
    border-radius: var(--ifm-breadcrumb-border-radius);
    color: var(--ifm-font-color-base);
    display: inline-block;
    font-size: calc(1rem * var(--ifm-breadcrumb-size-multiplier));
    padding: calc(
        var(--ifm-breadcrumb-padding-vertical) *
          var(--ifm-breadcrumb-size-multiplier)
      )
      calc(
        var(--ifm-breadcrumb-padding-horizontal) *
          var(--ifm-breadcrumb-size-multiplier)
      );
    transition-property: background, color;
    transition-duration: var(--ifm-transition-fast);
    transition-timing-function: var(--ifm-transition-timing-default);
  }

  .breadcrumbs__link:link:hover,
  .breadcrumbs__link:visited:hover,
  area[href].breadcrumbs__link:hover {
    background: var(--ifm-breadcrumb-item-background-active);
    text-decoration: none;
  }

  .breadcrumbs__link:-moz-any-link:hover {
    background: var(--ifm-breadcrumb-item-background-active);
    text-decoration: none;
  }

  .breadcrumbs__link:any-link:hover {
    background: var(--ifm-breadcrumb-item-background-active);
    text-decoration: none;
  }

  .breadcrumbs--sm {
    --ifm-breadcrumb-size-multiplier: 0.8;
  }

  .breadcrumbs--lg {
    --ifm-breadcrumb-size-multiplier: 1.2;
  }

  .markdown:before {
    content: '';
    display: table;
  }

  .markdown:after {
    clear: both;
    content: '';
    display: table;
  }

  .clean-btn {
    background: none;
    border: none;
    color: inherit;
    cursor: pointer;
    font-family: inherit;
    padding: 0;
  }

  .text--truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (pointer: fine) {
    .thin-scrollbar {
      scrollbar-width: thin;
    }
    .thin-scrollbar::-webkit-scrollbar {
      height: var(--ifm-scrollbar-size);
      width: var(--ifm-scrollbar-size);
    }
    .thin-scrollbar::-webkit-scrollbar-track {
      background: var(--ifm-scrollbar-track-background-color);
      border-radius: 10px;
    }
    .thin-scrollbar::-webkit-scrollbar-thumb {
      background: var(--ifm-scrollbar-thumb-background-color);
      border-radius: 10px;
    }
    .thin-scrollbar::-webkit-scrollbar-thumb:hover {
      background: var(--ifm-scrollbar-thumb-hover-background-color);
    }
  }

  @media (min-width: 1440px) {
    .container {
      max-width: var(--ifm-container-width-xl);
    }
  }

  @media (max-width: 996px) {
    .col {
      --ifm-col-width: 100%;
      flex-basis: var(--ifm-col-width);
      margin-left: 0;
    }

    .navbar > .container,
    .navbar > .container-fluid {
      padding: 0;
    }

    .navbar__toggle {
      display: inherit;
    }

    .navbar__item {
      display: none;
    }

    .navbar__search-input {
      width: 9rem;
    }
  }

  @media print {
    .menu {
      display: none;
    }

    .navbar {
      display: none;
    }

    .pagination-nav {
      display: none;
    }
  }
`;
