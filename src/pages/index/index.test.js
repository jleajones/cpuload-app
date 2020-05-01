import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Component from './index';

describe('UI:page:', () => {
  afterEach(() => {
    cleanup();
  });

  describe('[/]', () => {
    it('renders the table component', () => {
      const { getByTestId } = render(<Component />);
      expect(getByTestId('cpu-table')).toBeDefined();
    });
  });
});
