import Heading from '@theme/Heading';
import {
  EuiButtonEmpty,
  EuiCard,
  EuiIcon,
  EuiImage,
  EuiLink,
  EuiText,
  EuiTextAlign,
  useEuiMemoizedStyles,
  UseEuiTheme,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { HomepageContainer, HomepageSection } from '../layout';
import { css } from '@emotion/react';
import { useContext } from 'react';
import { AppThemeContext } from '@elastic/eui-docusaurus-theme/lib/components/theme_context/index.js';

const CONTENT_DATA = [
  {
    title: 'Buttons',
    href: '/docs/components/button',
    imageSrc: {
      light:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIG9wYWNpdHk9IjAuMTgiIGQ9Ik0zMDAgMEgwVjE1MEgzMDBWMFoiIGZpbGw9IiM1QTc3QUQiLz4KPHJlY3QgeD0iMzIiIHk9IjY4LjUiIHdpZHRoPSI2MyIgaGVpZ2h0PSIxMyIgZmlsbD0iI0M0QzRDNCIvPgo8cmVjdCB4PSIzMiIgeT0iNTUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI2LjA3NTU2IiBmaWxsPSIjMDA3N0NDIi8+CjxyZWN0IHg9IjU5IiB5PSI3MSIgd2lkdGg9IjY3IiBoZWlnaHQ9IjgiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxODQiIHk9IjY3IiB3aWR0aD0iODMiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjMDA3MUMyIi8+Cjwvc3ZnPgo=',
      dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIG9wYWNpdHk9IjAuMTgiIGQ9Ik0zMDAgMEgwVjE1MEgzMDBWMFoiIGZpbGw9IiM1QTc3QUQiLz4KPHJlY3QgeD0iMzIiIHk9IjY4LjUiIHdpZHRoPSI2MyIgaGVpZ2h0PSIxMyIgZmlsbD0iI0M0QzRDNCIvPgo8cmVjdCB4PSIzMiIgeT0iNTUiIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIHJ4PSI2LjA3NTU2IiBmaWxsPSIjMDA3N0NDIi8+CjxyZWN0IHg9IjU5IiB5PSI3MSIgd2lkdGg9IjY3IiBoZWlnaHQ9IjgiIHJ4PSIyIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxODQiIHk9IjY3IiB3aWR0aD0iODMiIGhlaWdodD0iMTYiIHJ4PSIyIiBmaWxsPSIjMDA3MUMyIi8+Cjwvc3ZnPgo=',
    },
    imageAlt: 'EUI buttons',
    description: 'Variable in colours, types and sizes',
  },
  {
    title: 'Forms',
    href: '/docs/components/form-controls/',
    imageSrc: {
      light:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIG9wYWNpdHk9IjAuMTgiIGQ9Ik0zMDAgMEgwVjE1MEgzMDBWMFoiIGZpbGw9IiM1QTc3QUQiLz4KPHJlY3QgeD0iMjUiIHk9IjE2IiB3aWR0aD0iNjYuMDUyNiIgaGVpZ2h0PSI2IiByeD0iMiIgZmlsbD0iIzdEODY5QyIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHJlY3QgeD0iMjUiIHk9IjMwIiB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMjUuNSIgeT0iMzAuNSIgd2lkdGg9IjI0OSIgaGVpZ2h0PSIyMyIgcng9IjEuNSIgc3Ryb2tlPSIjN0Q4NjlDIiBzdHJva2Utb3BhY2l0eT0iMC41Ii8+CjxyZWN0IHg9IjI1IiB5PSI3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIyNCIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjI1LjUiIHk9IjcwLjUiIHdpZHRoPSIxMTkiIGhlaWdodD0iMjMiIHJ4PSIxLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIxNjkiIHk9IjcwIiB3aWR0aD0iMTA2IiBoZWlnaHQ9IjI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTY5LjUiIHk9IjcwLjUiIHdpZHRoPSIxMDUiIGhlaWdodD0iMjMiIHJ4PSIxLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNMjY2LjM3OSA4MC4xMDQ4TDI2My4yNTYgODMuMTc4OEMyNjMuMTE0IDgzLjMxOTEgMjYyLjg4NyA4My4zMTk0IDI2Mi43NDQgODMuMTc4OEwyNTkuNjIxIDgwLjEwNDhDMjU5LjQ3OSA3OS45NjUxIDI1OS4yNDkgNzkuOTY1MSAyNTkuMTA3IDgwLjEwNDhDMjU4Ljk2NCA4MC4yNDQ2IDI1OC45NjQgODAuNDcxMiAyNTkuMTA3IDgwLjYxMUwyNjIuMjMgODMuNjg1QzI2Mi42NTcgODQuMTA1NSAyNjMuMzQ0IDg0LjEwNDUgMjYzLjc3IDgzLjY4NUwyNjYuODkzIDgwLjYxMUMyNjcuMDM2IDgwLjQ3MTIgMjY3LjAzNiA4MC4yNDQ2IDI2Ni44OTMgODAuMTA0OEMyNjYuNzUxIDc5Ljk2NTEgMjY2LjUyMSA3OS45NjUxIDI2Ni4zNzkgODAuMTA0OFoiIGZpbGw9IiM3RDg2OUMiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxyZWN0IHg9IjI1IiB5PSIxMTAiIHdpZHRoPSI3MiIgaGVpZ2h0PSIyNCIgcng9IjMuNjQ1MzQiIGZpbGw9IiMwMDc3Q0MiLz4KPHJlY3QgeD0iNDMiIHk9IjEyMCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjQiIHJ4PSIxLjIiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIG9wYWNpdHk9IjAuMTgiIGQ9Ik0zMDAgMEgwVjE1MEgzMDBWMFoiIGZpbGw9IiM1QTc3QUQiLz4KPHJlY3QgeD0iMjUiIHk9IjE2IiB3aWR0aD0iNjYuMDUyNiIgaGVpZ2h0PSI2IiByeD0iMiIgZmlsbD0iIzdEODY5QyIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHJlY3QgeD0iMjUiIHk9IjMwIiB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMjUuNSIgeT0iMzAuNSIgd2lkdGg9IjI0OSIgaGVpZ2h0PSIyMyIgcng9IjEuNSIgc3Ryb2tlPSIjN0Q4NjlDIiBzdHJva2Utb3BhY2l0eT0iMC41Ii8+CjxyZWN0IHg9IjI1IiB5PSI3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIyNCIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjI1LjUiIHk9IjcwLjUiIHdpZHRoPSIxMTkiIGhlaWdodD0iMjMiIHJ4PSIxLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIxNjkiIHk9IjcwIiB3aWR0aD0iMTA2IiBoZWlnaHQ9IjI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTY5LjUiIHk9IjcwLjUiIHdpZHRoPSIxMDUiIGhlaWdodD0iMjMiIHJ4PSIxLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNMjY2LjM3OSA4MC4xMDQ4TDI2My4yNTYgODMuMTc4OEMyNjMuMTE0IDgzLjMxOTEgMjYyLjg4NyA4My4zMTk0IDI2Mi43NDQgODMuMTc4OEwyNTkuNjIxIDgwLjEwNDhDMjU5LjQ3OSA3OS45NjUxIDI1OS4yNDkgNzkuOTY1MSAyNTkuMTA3IDgwLjEwNDhDMjU4Ljk2NCA4MC4yNDQ2IDI1OC45NjQgODAuNDcxMiAyNTkuMTA3IDgwLjYxMUwyNjIuMjMgODMuNjg1QzI2Mi42NTcgODQuMTA1NSAyNjMuMzQ0IDg0LjEwNDUgMjYzLjc3IDgzLjY4NUwyNjYuODkzIDgwLjYxMUMyNjcuMDM2IDgwLjQ3MTIgMjY3LjAzNiA4MC4yNDQ2IDI2Ni44OTMgODAuMTA0OEMyNjYuNzUxIDc5Ljk2NTEgMjY2LjUyMSA3OS45NjUxIDI2Ni4zNzkgODAuMTA0OFoiIGZpbGw9IiM3RDg2OUMiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxyZWN0IHg9IjI1IiB5PSIxMTAiIHdpZHRoPSI3MiIgaGVpZ2h0PSIyNCIgcng9IjMuNjQ1MzQiIGZpbGw9IiMwMDc3Q0MiLz4KPHJlY3QgeD0iNDMiIHk9IjEyMCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjQiIHJ4PSIxLjIiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
    },
    imageAlt: 'EUI form controls',
    description: 'Input tags, layouts, and validations for your forms',
  },
  {
    title: 'Toasts',
    href: '/docs/components/toast',
    imageSrc: {
      light:
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIG9wYWNpdHk9IjAuMTgiIGQ9Ik0zMDAgMEgwVjE1MEgzMDBWMFoiIGZpbGw9IiM1QTc3QUQiLz4KPHJlY3QgeD0iMjUiIHk9IjM2IiB3aWR0aD0iNzEiIGhlaWdodD0iODIiIHJ4PSI0IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyNS41IiB5PSIzNi41IiB3aWR0aD0iNzAiIGhlaWdodD0iODEiIHJ4PSIzLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIzMyIgeT0iNzciIHdpZHRoPSI1NSIgaGVpZ2h0PSI2LjI3MDc4IiByeD0iMiIgZmlsbD0iIzdEODY5QyIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHJlY3QgeD0iNDUuMDE5IiB5PSI4Ni40MDYyIiB3aWR0aD0iMzAuOTYyIiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iMzkuNzI4IiB5PSI5Mi42NzciIHdpZHRoPSI0MS41NDM5IiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iNDIuMDE0MyIgeT0iOTguOTQ3NyIgd2lkdGg9IjM2Ljk3MTUiIGhlaWdodD0iMy4xMzUzOSIgcng9IjEuNTY3NyIgZmlsbD0iI0QzREFFNiIvPgo8cmVjdCB4PSI1MS44MTIzIiB5PSIxMDUuMjE5IiB3aWR0aD0iMTcuMzc1MyIgaGVpZ2h0PSIzLjEzNTM5IiByeD0iMS41Njc3IiBmaWxsPSIjRDNEQUU2Ii8+CjxwYXRoIGQ9Ik0yNiA0MEMyNiAzOC4zNDMxIDI3LjM0MzEgMzcgMjkgMzdIOTJDOTMuNjU2OSAzNyA5NSAzOC4zNDMxIDk1IDQwVjY4SDI2VjQwWiIgZmlsbD0iIzAwNzdDQyIvPgo8cmVjdCB4PSIxMTQiIHk9IjM2IiB3aWR0aD0iNzEiIGhlaWdodD0iODIiIHJ4PSI0IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxMTQuNSIgeT0iMzYuNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjgxIiByeD0iMy41IiBzdHJva2U9IiM3RDg2OUMiIHN0cm9rZS1vcGFjaXR5PSIwLjUiLz4KPHJlY3QgeD0iMTIyIiB5PSI3NyIgd2lkdGg9IjU1IiBoZWlnaHQ9IjYuMjcwNzgiIHJ4PSIyIiBmaWxsPSIjN0Q4NjlDIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIxMzQuMDE5IiB5PSI4Ni40MDYyIiB3aWR0aD0iMzAuOTYyIiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iMTI4LjcyOCIgeT0iOTIuNjc3IiB3aWR0aD0iNDEuNTQzOSIgaGVpZ2h0PSIzLjEzNTM5IiByeD0iMS41Njc3IiBmaWxsPSIjRDNEQUU2Ii8+CjxyZWN0IHg9IjEzMS4wMTQiIHk9Ijk4Ljk0NzciIHdpZHRoPSIzNi45NzE1IiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iMTQwLjgxMiIgeT0iMTA1LjIxOSIgd2lkdGg9IjE3LjM3NTMiIGhlaWdodD0iMy4xMzUzOSIgcng9IjEuNTY3NyIgZmlsbD0iI0QzREFFNiIvPgo8cGF0aCBkPSJNMTE1IDQwQzExNSAzOC4zNDMxIDExNi4zNDMgMzcgMTE4IDM3SDE4MUMxODIuNjU3IDM3IDE4NCAzOC4zNDMxIDE4NCA0MFY2OEgxMTVWNDBaIiBmaWxsPSIjMDBCRkIzIi8+CjxyZWN0IHg9IjIwMyIgeT0iMzYiIHdpZHRoPSI3MSIgaGVpZ2h0PSI4MiIgcng9IjQiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjIwMy41IiB5PSIzNi41IiB3aWR0aD0iNzAiIGhlaWdodD0iODEiIHJ4PSIzLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIyMTEiIHk9Ijc3IiB3aWR0aD0iNTUiIGhlaWdodD0iNi4yNzA3OCIgcng9IjIiIGZpbGw9IiM3RDg2OUMiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxyZWN0IHg9IjIyMy4wMTkiIHk9Ijg2LjQwNjIiIHdpZHRoPSIzMC45NjIiIGhlaWdodD0iMy4xMzUzOSIgcng9IjEuNTY3NyIgZmlsbD0iI0QzREFFNiIvPgo8cmVjdCB4PSIyMTcuNzI4IiB5PSI5Mi42NzciIHdpZHRoPSI0MS41NDM5IiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iMjIwLjAxNCIgeT0iOTguOTQ3NyIgd2lkdGg9IjM2Ljk3MTUiIGhlaWdodD0iMy4xMzUzOSIgcng9IjEuNTY3NyIgZmlsbD0iI0QzREFFNiIvPgo8cmVjdCB4PSIyMjkuODEyIiB5PSIxMDUuMjE5IiB3aWR0aD0iMTcuMzc1MyIgaGVpZ2h0PSIzLjEzNTM5IiByeD0iMS41Njc3IiBmaWxsPSIjRDNEQUU2Ii8+CjxwYXRoIGQ9Ik0yMDQgNDBDMjA0IDM4LjM0MzEgMjA1LjM0MyAzNyAyMDcgMzdIMjcwQzI3MS42NTcgMzcgMjczIDM4LjM0MzEgMjczIDQwVjY4SDIwNFY0MFoiIGZpbGw9IiNGMDRFOTgiLz4KPC9zdmc+Cg==',
      dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIG9wYWNpdHk9IjAuMTgiIGQ9Ik0zMDAgMEgwVjE1MEgzMDBWMFoiIGZpbGw9IiM1QTc3QUQiLz4KPHJlY3QgeD0iMjUiIHk9IjM2IiB3aWR0aD0iNzEiIGhlaWdodD0iODIiIHJ4PSI0IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIyNS41IiB5PSIzNi41IiB3aWR0aD0iNzAiIGhlaWdodD0iODEiIHJ4PSIzLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIzMyIgeT0iNzciIHdpZHRoPSI1NSIgaGVpZ2h0PSI2LjI3MDc4IiByeD0iMiIgZmlsbD0iIzdEODY5QyIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHJlY3QgeD0iNDUuMDE5IiB5PSI4Ni40MDYyIiB3aWR0aD0iMzAuOTYyIiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iMzkuNzI4IiB5PSI5Mi42NzciIHdpZHRoPSI0MS41NDM5IiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iNDIuMDE0MyIgeT0iOTguOTQ3NyIgd2lkdGg9IjM2Ljk3MTUiIGhlaWdodD0iMy4xMzUzOSIgcng9IjEuNTY3NyIgZmlsbD0iI0QzREFFNiIvPgo8cmVjdCB4PSI1MS44MTIzIiB5PSIxMDUuMjE5IiB3aWR0aD0iMTcuMzc1MyIgaGVpZ2h0PSIzLjEzNTM5IiByeD0iMS41Njc3IiBmaWxsPSIjRDNEQUU2Ii8+CjxwYXRoIGQ9Ik0yNiA0MEMyNiAzOC4zNDMxIDI3LjM0MzEgMzcgMjkgMzdIOTJDOTMuNjU2OSAzNyA5NSAzOC4zNDMxIDk1IDQwVjY4SDI2VjQwWiIgZmlsbD0iIzAwNzdDQyIvPgo8cmVjdCB4PSIxMTQiIHk9IjM2IiB3aWR0aD0iNzEiIGhlaWdodD0iODIiIHJ4PSI0IiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxMTQuNSIgeT0iMzYuNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjgxIiByeD0iMy41IiBzdHJva2U9IiM3RDg2OUMiIHN0cm9rZS1vcGFjaXR5PSIwLjUiLz4KPHJlY3QgeD0iMTIyIiB5PSI3NyIgd2lkdGg9IjU1IiBoZWlnaHQ9IjYuMjcwNzgiIHJ4PSIyIiBmaWxsPSIjN0Q4NjlDIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIxMzQuMDE5IiB5PSI4Ni40MDYyIiB3aWR0aD0iMzAuOTYyIiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iMTI4LjcyOCIgeT0iOTIuNjc3IiB3aWR0aD0iNDEuNTQzOSIgaGVpZ2h0PSIzLjEzNTM5IiByeD0iMS41Njc3IiBmaWxsPSIjRDNEQUU2Ii8+CjxyZWN0IHg9IjEzMS4wMTQiIHk9Ijk4Ljk0NzciIHdpZHRoPSIzNi45NzE1IiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iMTQwLjgxMiIgeT0iMTA1LjIxOSIgd2lkdGg9IjE3LjM3NTMiIGhlaWdodD0iMy4xMzUzOSIgcng9IjEuNTY3NyIgZmlsbD0iI0QzREFFNiIvPgo8cGF0aCBkPSJNMTE1IDQwQzExNSAzOC4zNDMxIDExNi4zNDMgMzcgMTE4IDM3SDE4MUMxODIuNjU3IDM3IDE4NCAzOC4zNDMxIDE4NCA0MFY2OEgxMTVWNDBaIiBmaWxsPSIjMDBCRkIzIi8+CjxyZWN0IHg9IjIwMyIgeT0iMzYiIHdpZHRoPSI3MSIgaGVpZ2h0PSI4MiIgcng9IjQiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjIwMy41IiB5PSIzNi41IiB3aWR0aD0iNzAiIGhlaWdodD0iODEiIHJ4PSIzLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIyMTEiIHk9Ijc3IiB3aWR0aD0iNTUiIGhlaWdodD0iNi4yNzA3OCIgcng9IjIiIGZpbGw9IiM3RDg2OUMiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxyZWN0IHg9IjIyMy4wMTkiIHk9Ijg2LjQwNjIiIHdpZHRoPSIzMC45NjIiIGhlaWdodD0iMy4xMzUzOSIgcng9IjEuNTY3NyIgZmlsbD0iI0QzREFFNiIvPgo8cmVjdCB4PSIyMTcuNzI4IiB5PSI5Mi42NzciIHdpZHRoPSI0MS41NDM5IiBoZWlnaHQ9IjMuMTM1MzkiIHJ4PSIxLjU2NzciIGZpbGw9IiNEM0RBRTYiLz4KPHJlY3QgeD0iMjIwLjAxNCIgeT0iOTguOTQ3NyIgd2lkdGg9IjM2Ljk3MTUiIGhlaWdodD0iMy4xMzUzOSIgcng9IjEuNTY3NyIgZmlsbD0iI0QzREFFNiIvPgo8cmVjdCB4PSIyMjkuODEyIiB5PSIxMDUuMjE5IiB3aWR0aD0iMTcuMzc1MyIgaGVpZ2h0PSIzLjEzNTM5IiByeD0iMS41Njc3IiBmaWxsPSIjRDNEQUU2Ii8+CjxwYXRoIGQ9Ik0yMDQgNDBDMjA0IDM4LjM0MzEgMjA1LjM0MyAzNyAyMDcgMzdIMjcwQzI3MS42NTcgMzcgMjczIDM4LjM0MzEgMjczIDQwVjY4SDIwNFY0MFoiIGZpbGw9IiNGMDRFOTgiLz4KPC9zdmc+Cg==',
    },
    imageAlt: 'EUI toasts',
    description: '...',
  },
  {
    title: 'Charts',
    href: '/',
    imageSrc: {
      light:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMzAwIDE1MCI+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNUE3N0FEIiBvcGFjaXR5PSIuMTgiLz4KICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIwIDIwKSI+CiAgICAgIDxnIHN0cm9rZT0iIzY5NzA3RCIgc3Ryb2tlLWRhc2hhcnJheT0iNCI+CiAgICAgICAgPGxpbmUgeDE9IjEzMi4yMTkiIHgyPSIxMzEuMjIyIiB5MT0iLTc4LjgzNyIgeTI9IjE4My44MzciIHRyYW5zZm9ybT0icm90YXRlKC05MCAxMzEuNzIgNTIuNSkiLz4KICAgICAgICA8bGluZSB4MT0iMTY0LjQ3MSIgeDI9IjE2NC40NzEiIHkxPSIuNjY3IiB5Mj0iMTA0LjMzMyIvPgogICAgICA8L2c+CiAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1IDEpIj4KICAgICAgICA8cGF0aCBmaWxsPSIjMDA2QkI0IiBkPSJNMCA4Mi41NjE0MDM1TDMyLjE2MTEyMTcgODIuNTYxNDAzNSAzMi4xNjExMjE3IDk5LjUyOTM3OUMzMi4xNjExMjE3IDEwMS43Mzg1MTggMzAuMzcwMjYwNyAxMDMuNTI5Mzc5IDI4LjE2MTEyMTcgMTAzLjUyOTM3OUw0IDEwMy41MjkzNzlDMS43OTA4NjEgMTAzLjUyOTM3OSAyLjcwNTQxNWUtMTYgMTAxLjczODUxOCAwIDk5LjUyOTM3OUwwIDgyLjU2MTQwMzUgMCA4Mi41NjE0MDM1ek02NS40MzEyNDc3IDMwLjE0MTQ2NDhMOTcuNTkyMzY5NCAzMC4xNDE0NjQ4IDk3LjU5MjM2OTQgOTkuNTI5Mzc5Qzk3LjU5MjM2OTQgMTAxLjczODUxOCA5NS44MDE1MDg0IDEwMy41MjkzNzkgOTMuNTkyMzY5NCAxMDMuNTI5Mzc5TDY5LjQzMTI0NzcgMTAzLjUyOTM3OUM2Ny4yMjIxMDg3IDEwMy41MjkzNzkgNjUuNDMxMjQ3NyAxMDEuNzM4NTE4IDY1LjQzMTI0NzcgOTkuNTI5Mzc5TDY1LjQzMTI0NzcgMzAuMTQxNDY0OCA2NS40MzEyNDc3IDMwLjE0MTQ2NDh6Ii8+CiAgICAgICAgPHBhdGggZmlsbD0iIzlBQkNEMiIgZD0iTTAsNzIuMDc3NDE1OCBMMzIuMTYxMTIxNyw3Mi4wNzc0MTU4IEwzMi4xNjExMjE3LDc4LjU2MTQwMzUgQzMyLjE2MTEyMTcsODAuNzcwNTQyNSAzMC4zNzAyNjA3LDgyLjU2MTQwMzUgMjguMTYxMTIxNyw4Mi41NjE0MDM1IEw0LDgyLjU2MTQwMzUgQzEuNzkwODYxLDgyLjU2MTQwMzUgMi43MDU0MTVlLTE2LDgwLjc3MDU0MjUgMCw3OC41NjE0MDM1IEwwLDcyLjA3NzQxNTggTDAsNzIuMDc3NDE1OCBaIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDE1NC42MzkpIi8+CiAgICAgICAgPHBhdGggZmlsbD0iIzlBQkNEMiIgZD0iTTY1LjQzMTI0NzcsMCBMOTcuNTkyMzY5NCwwIEw5Ny41OTIzNjk0LDI2LjE0MTQ2NDggQzk3LjU5MjM2OTQsMjguMzUwNjAzOCA5NS44MDE1MDg0LDMwLjE0MTQ2NDggOTMuNTkyMzY5NCwzMC4xNDE0NjQ4IEw2OS40MzEyNDc3LDMwLjE0MTQ2NDggQzY3LjIyMjEwODcsMzAuMTQxNDY0OCA2NS40MzEyNDc3LDI4LjM1MDYwMzggNjUuNDMxMjQ3NywyNi4xNDE0NjQ4IEw2NS40MzEyNDc3LDAgTDY1LjQzMTI0NzcsMCBaIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDMwLjE0MSkiLz4KICAgICAgICA8cGF0aCBmaWxsPSIjMDA2QkI0IiBkPSJNMTM1LjI5ODUxMiw3Mi4wNzc0MTU4IEwxNjcuNDU5NjM0LDcyLjA3NzQxNTggTDE2Ny40NTk2MzQsOTkuNTI5Mzc5IEMxNjcuNDU5NjM0LDEwMS43Mzg1MTggMTY1LjY2ODc3MywxMDMuNTI5Mzc5IDE2My40NTk2MzQsMTAzLjUyOTM3OSBMMTM5LjI5ODUxMiwxMDMuNTI5Mzc5IEMxMzcuMDg5MzczLDEwMy41MjkzNzkgMTM1LjI5ODUxMiwxMDEuNzM4NTE4IDEzNS4yOTg1MTIsOTkuNTI5Mzc5IEwxMzUuMjk4NTEyLDcyLjA3NzQxNTggTDEzNS4yOTg1MTIsNzIuMDc3NDE1OCBaIi8+CiAgICAgICAgPHBhdGggZmlsbD0iIzlBQkNEMiIgZD0iTTEzOS4yOTg1MTIsMTAuNDgzOTg3NyBMMTYzLjQ1OTYzNCwxMC40ODM5ODc3IEMxNjUuNjY4NzczLDEwLjQ4Mzk4NzcgMTY3LjQ1OTYzNCwxMi4yNzQ4NDg3IDE2Ny40NTk2MzQsMTQuNDgzOTg3NyBMMTY3LjQ1OTYzNCw3Mi4wNzc0MTU4IEwxNjcuNDU5NjM0LDcyLjA3NzQxNTggTDEzNS4yOTg1MTIsNzIuMDc3NDE1OCBMMTM1LjI5ODUxMiwxNC40ODM5ODc3IEMxMzUuMjk4NTEyLDEyLjI3NDg0ODcgMTM3LjA4OTM3MywxMC40ODM5ODc3IDEzOS4yOTg1MTIsMTAuNDgzOTg3NyBaIi8+CiAgICAgICAgPHBhdGggZmlsbD0iIzAwNkJCNCIgZD0iTTIwMC43Mjk3Niw0MC42MjU0NTI1IEwyMzIuODkwODgyLDQwLjYyNTQ1MjUgTDIzMi44OTA4ODIsOTkuNTI5Mzc5IEMyMzIuODkwODgyLDEwMS43Mzg1MTggMjMxLjEwMDAyMSwxMDMuNTI5Mzc5IDIyOC44OTA4ODIsMTAzLjUyOTM3OSBMMjA0LjcyOTc2LDEwMy41MjkzNzkgQzIwMi41MjA2MjEsMTAzLjUyOTM3OSAyMDAuNzI5NzYsMTAxLjczODUxOCAyMDAuNzI5NzYsOTkuNTI5Mzc5IEwyMDAuNzI5NzYsNDAuNjI1NDUyNSBMMjAwLjcyOTc2LDQwLjYyNTQ1MjUgWiIvPgogICAgICAgIDxwYXRoIGZpbGw9IiM5QUJDRDIiIGQ9Ik0yMDAuNzI5NzYsMTkuNjU3NDc3IEwyMzIuODkwODgyLDE5LjY1NzQ3NyBMMjMyLjg5MDg4MiwzNi42MjU0NTI1IEMyMzIuODkwODgyLDM4LjgzNDU5MTUgMjMxLjEwMDAyMSw0MC42MjU0NTI1IDIyOC44OTA4ODIsNDAuNjI1NDUyNSBMMjA0LjcyOTc2LDQwLjYyNTQ1MjUgQzIwMi41MjA2MjEsNDAuNjI1NDUyNSAyMDAuNzI5NzYsMzguODM0NTkxNSAyMDAuNzI5NzYsMzYuNjI1NDUyNSBMMjAwLjcyOTc2LDE5LjY1NzQ3NyBMMjAwLjcyOTc2LDE5LjY1NzQ3NyBaIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAtMSAwIDYwLjI4MykiLz4KICAgICAgPC9nPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==',
      dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIG9wYWNpdHk9IjAuMTgiIGQ9Ik0zMDAgMEgwVjE1MEgzMDBWMFoiIGZpbGw9IiM1QTc3QUQiLz4KPHJlY3QgeD0iMjUiIHk9IjE2IiB3aWR0aD0iNjYuMDUyNiIgaGVpZ2h0PSI2IiByeD0iMiIgZmlsbD0iIzdEODY5QyIgZmlsbC1vcGFjaXR5PSIwLjUiLz4KPHJlY3QgeD0iMjUiIHk9IjMwIiB3aWR0aD0iMjUwIiBoZWlnaHQ9IjI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMjUuNSIgeT0iMzAuNSIgd2lkdGg9IjI0OSIgaGVpZ2h0PSIyMyIgcng9IjEuNSIgc3Ryb2tlPSIjN0Q4NjlDIiBzdHJva2Utb3BhY2l0eT0iMC41Ii8+CjxyZWN0IHg9IjI1IiB5PSI3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIyNCIgcng9IjIiIGZpbGw9IndoaXRlIi8+CjxyZWN0IHg9IjI1LjUiIHk9IjcwLjUiIHdpZHRoPSIxMTkiIGhlaWdodD0iMjMiIHJ4PSIxLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cmVjdCB4PSIxNjkiIHk9IjcwIiB3aWR0aD0iMTA2IiBoZWlnaHQ9IjI0IiByeD0iMiIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMTY5LjUiIHk9IjcwLjUiIHdpZHRoPSIxMDUiIGhlaWdodD0iMjMiIHJ4PSIxLjUiIHN0cm9rZT0iIzdEODY5QyIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIvPgo8cGF0aCBkPSJNMjY2LjM3OSA4MC4xMDQ4TDI2My4yNTYgODMuMTc4OEMyNjMuMTE0IDgzLjMxOTEgMjYyLjg4NyA4My4zMTk0IDI2Mi43NDQgODMuMTc4OEwyNTkuNjIxIDgwLjEwNDhDMjU5LjQ3OSA3OS45NjUxIDI1OS4yNDkgNzkuOTY1MSAyNTkuMTA3IDgwLjEwNDhDMjU4Ljk2NCA4MC4yNDQ2IDI1OC45NjQgODAuNDcxMiAyNTkuMTA3IDgwLjYxMUwyNjIuMjMgODMuNjg1QzI2Mi42NTcgODQuMTA1NSAyNjMuMzQ0IDg0LjEwNDUgMjYzLjc3IDgzLjY4NUwyNjYuODkzIDgwLjYxMUMyNjcuMDM2IDgwLjQ3MTIgMjY3LjAzNiA4MC4yNDQ2IDI2Ni44OTMgODAuMTA0OEMyNjYuNzUxIDc5Ljk2NTEgMjY2LjUyMSA3OS45NjUxIDI2Ni4zNzkgODAuMTA0OFoiIGZpbGw9IiM3RDg2OUMiIGZpbGwtb3BhY2l0eT0iMC41Ii8+CjxyZWN0IHg9IjI1IiB5PSIxMTAiIHdpZHRoPSI3MiIgaGVpZ2h0PSIyNCIgcng9IjMuNjQ1MzQiIGZpbGw9IiMwMDc3Q0MiLz4KPHJlY3QgeD0iNDMiIHk9IjEyMCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjQiIHJ4PSIxLjIiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
    },
    imageAlt: 'EUI charts',
    description:
      'Cards like these help you make repeatable content more presentable',
  },
  {
    title: 'Icons',
    href: '/docs/components/icons',
    imageSrc: {
      light: 'https://eui.elastic.co/images/ff12cb327152f2b424b7-icons.svg',
      dark: 'https://eui.elastic.co/images/ff12cb327152f2b424b7-icons.svg',
    },
    imageAlt: 'EUI icons',
    description:
      'Our SVG icon library gives you full control over size and color',
  },
];

const getStyles = ({ euiTheme }: UseEuiTheme) => ({
  section: css`
    background-color: ${euiTheme.colors.lightestShade};
  `,
  list: css`
    display: grid;
    grid-template-columns: 1fr;
    gap: ${euiTheme.size.base};
    margin: 0;
    padding: 0;
    list-style: none;

    @media (min-width: 450px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 997px) {
      grid-template-columns: repeat(3, 1fr);
    }
  `,
  card: css`
    background-color: transparent;
    border: none;

    &:hover {
      box-shadow: none;

      a {
        color: ${euiTheme.colors.link};
      }
    }

    .euiCard__content {
      text-align: left;
    }

    .euiCard__title {
      margin: 0;
      font-size: var(--eui-font-size-m);

      & + * {
        margin-block-start: 0;
      }
    }

    .euiCard__title,
    .euiText {
      line-height: var(--eui-line-height-l);
    }

    .euiText p {
      margin: 0;
    }
  `,
  image: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${euiTheme.size.xxxl} ${euiTheme.size.l};
    border: ${euiTheme.border.thin};
    border-radius: ${euiTheme.border.radius.medium};
    background-color: ${euiTheme.colors.body};
  `,
  actions: css`
    display: flex;
    justify-content: center;
    inline-size: 100%;
    margin-block-start: ${euiTheme.size.xxl};
  `,
  button: css`
    min-inline-size: 12.5rem;
    border: ${euiTheme.border.width.thin} solid ${euiTheme.colors.primary};
  `,
  icon: css`
    margin-inline-start: ${euiTheme.size.s};
  `,
});

export const HomepageHighlights = () => {
  const { theme } = useContext(AppThemeContext);
  const styles = useEuiMemoizedStyles(getStyles);
  const isDarkMode = theme === 'dark';

  const headingId = useGeneratedHtmlId();

  return (
    <HomepageSection css={styles.section}>
      <HomepageContainer layout="column">
        <EuiTextAlign textAlign="center">
          <Heading as="h2" id={headingId}>
            Widely used in EUI
          </Heading>
        </EuiTextAlign>

        <ul aria-labelledby={headingId} css={styles.list}>
          {CONTENT_DATA &&
            CONTENT_DATA.map((item) => (
              <li key={item.title}>
                <EuiCard
                  title={item.title}
                  href={item.href}
                  image={
                    <div css={styles.image}>
                      <EuiImage
                        src={
                          isDarkMode ? item.imageSrc.dark : item.imageSrc.light
                        }
                        alt={item.imageAlt}
                      />
                    </div>
                  }
                  paddingSize="s"
                  hasBorder
                  css={styles.card}
                >
                  <EuiText>
                    <p>{item.description}</p>
                  </EuiText>
                </EuiCard>
              </li>
            ))}
        </ul>

        <div css={styles.actions}>
          <EuiButtonEmpty href="/docs/components/" css={styles.button}>
            All components
            <EuiIcon type="sortRight" size="s" css={styles.icon} />
          </EuiButtonEmpty>
        </div>
      </HomepageContainer>
    </HomepageSection>
  );
};
