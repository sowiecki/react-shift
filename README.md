![](./example.gif)

# react-shift
A simple, paginated carousel component for [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) elements. `react-shift` can be used to serve pages of content or dropped as a small component into a larger stack.

## Installation
```
npm install react-shift --save
```

## Getting started
```js
render(
  <Shift>
    <div>First page</div>
    <div>Second page</div>
    <div>Third page</div>
  </Shift>,
  node
);
```

## Props
The component can be passed objects as props to customize the navigation.

Name | Type | Properties | Description | Default
------------- | ------------- | ------------- | ------------- | -------------
`arrowLabels` | *object* | `next`, `previous` | Specifies custom next and previous page link labels. | `null`
`fastLinks` | *object* | Custom key/value pairs each defining a fast links. |  Creates a shortcut link to a page, where the key is the link name and the value is the page index to link to. | `null`
`transitions` | *object* | `active`, `name` | Used to activate and define [ReactCSSTransitionGroup](https://facebook.github.io/react/docs/animation.html) on the page subcomponent. | `null`
`classes` | *object* | `navigation`, `page`, `pagination`, `pageNumber`, `currentPage`, `fastLinks`, `navArrow`, `nextPage`, `previousPage` | Passes class names to subcomponent `classNames`. | `null`
`scrollable` | *boolean* | *N/A* | **Experimental**, has problems on mobile devices. Specifies if mouse wheel scrolling events on the page subcomponent triggers page changes. | `false`

Advanced example:
```js
const arrowLabels = {
  next: '>>>',
  previous: '<<<'
};

const fastLinks = {
  'Third page': 2,
  'Fifth page': 4
};

const classes = {
  navigation: 'react-shift-navigation',
  page: 'react-shift-page',
  pagination: 'react-shift-pagination',
  pageNumber: 'react-shift-page-number',
  currentPage: 'react-shift-current-page',
  fastLinks: 'react-shift-fast-link',
  navArrow: 'react-shift-nav-arrow',
  nextPage: 'react-shift-next-page',
  previousPage: 'react-shift-previous-page'
};

React.render(
  <Shift
    classes={classes}
    arrowLabels={arrowLabels}
    fastLinks={fastLinks}
    transitions={transitions}
      <div>First page</div>
      <div>Second page</div>
      <div>Third page</div>
  </Shift>,
  document.getElementById('react-shift-anchor')
);
```

## Demo

`npm run demo`

Open `demo.html` in a browser.
