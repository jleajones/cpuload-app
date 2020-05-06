import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Component from './index';

describe('UI:component:', () => {
  afterEach(() => {
    cleanup();
  });

  describe('[Header]', () => {
    it('has alert className', () => {
      const { getByTestId } = render(<Component averageLoad={1.19} alerts={[]} recoveries={[]}/>);
      expect(getByTestId('header').classList.length).toEqual(2);
    });
  });
});
