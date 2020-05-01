import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Component from './index';

describe('UI:component:', () => {
  afterEach(() => {
    cleanup();
  });

  describe('[Header]', () => {
    it('renders the header component', () => {
      const { getByTestId } = render(<Component />);
      expect(getByTestId('header')).toBeDefined();
    });
  });
});
