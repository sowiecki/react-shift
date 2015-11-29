import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import shallowRender from 'react-shallow-render';

import Shift from '../src/react-shift.jsx';

const shallowRenderer = TestUtils.createRenderer();

describe('Shift', () => {
  let component;

  beforeEach(() => {
    const shift = (
      <Shift>
        <div>Example child #1</div>
        <div>Example child #2</div>
        <div>Example child #3</div>
      </Shift>
    );

    shallowRenderer.render(shift);
    component = shallowRenderer.getRenderOutput();
  });

  it('renders', () => {
    expect(component).to.be.defined;
  })
})
