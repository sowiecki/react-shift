import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRender from 'react-shallow-render';
import { findClass, findType } from 'react-shallow-renderer-helpers';

import Shift from '../src/react-shift.jsx';
import Arrow from '../src/arrow.jsx';

const shallowRenderer = TestUtils.createRenderer();

describe('Shift', () => {
  let component, children;

  const props = {
    classes: {
      page: 'test-page',
      navigation: 'test-navigation',
      navArrow: 'test-nav-arrow',
      nextPage: 'test-next-page',
      previousPage: 'test-previous-page'
    }
  };

  beforeEach(() => {
    children = [
      <div>Example child #1</div>,
      <div>Example child #2</div>,
      <div>Example child #3</div>
    ];

    shallowRenderer.render(<Shift children={children} {...props}/>);

    component = shallowRenderer.getRenderOutput();
  });

  it('renders', () => {
    expect(component).to.be.defined;
  });

  it('renders children in the correct order', () => {
    shallowRenderer.render(<Shift children={children} {...props}/>);
    component = shallowRenderer.getRenderOutput();

    const pageWrapper = findClass(component, 'test-page');
    const navigation = findClass(component, 'test-navigation');

    const renderedPageContent = pageWrapper.props.children.props.children;
    expect(renderedPageContent).to.equal(children[0].props.children);
  });
})
