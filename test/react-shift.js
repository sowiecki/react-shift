import React from 'react';
import TestUtils from 'react-addons-test-utils';
import shallowRender from 'react-shallow-render';
import { findClass, findType } from 'react-shallow-renderer-helpers';

import Shift from '../src/react-shift';
import Arrow from '../src/arrow';

const shallowRenderer = TestUtils.createRenderer();

describe('Shift', () => {
  let component;

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
    props.children = [
      <div>Example child #1</div>,
      <div>Example child #2</div>,
      <div>Example child #3</div>
    ];

    shallowRenderer.render(<Shift {...props}/>);

    component = shallowRenderer.getRenderOutput();
  });

  it('renders', () => {
    expect(component).to.be.defined;
  });

  it('renders children in the correct order', () => {
    shallowRenderer.render(<Shift {...props}/>);
    component = shallowRenderer.getRenderOutput();

    const pageWrapper = findClass(component, 'test-page');
    const navigation = findClass(component, 'test-navigation');

    const renderedPageContent = pageWrapper.props.children.props.children;
    expect(renderedPageContent).to.equal(props.children[0].props.children);
  });
})
