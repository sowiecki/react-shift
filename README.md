# react-shift
Creates a carousel component out of [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) trees. Intended to be light-weight and easy to get started with. React-Shift can be used to serve a simple static webpage or dropped as a small component into a larger stack.

Version 0.3.x does away with passing JSX as an array. It now uses the more idiomatic way of simply wrapping child elements in the component.

## Installation
```
npm install react-shift
```

## Getting started
```jsx
var React = require('react/addons'),
	Shift = require('react-shift'),
	pageKey = 0;

React.render(
  <Shift>
    <div key={pageKey++}>First page</div>
    <div key={pageKey++}>Second page</div>
    <div key={pageKey++}>Third page</div>
  </Shift>,
  document.getElementById("react-shift-anchor")
);
```

## Customization
The component can be passed an options object to customize the navigation. ```fastLinks``` creates a shortcut link to a page, where the key is the link name and the value is the page index.
```jsx
var shiftOptions = {
  nextPage: "»",
  previousPage: "«",
  fastLinks: {
    "Photos": 3, // Remember, indexing of an array starts at 0
    "About me": 7
  }
}

React.render(
  <Shift options={shiftOptions}>
    <div key={pageKey++}>First page</div>
    <div key={pageKey++}>Second page</div>
    <div key={pageKey++}>Third page</div>
  </Shift>,
  document.getElementById("react-shift-anchor")
);
```

## Styling
```css
/* component wrapper */
div#react-shift-wrapper {	
}

/* page division */
div#react-shift-page {
}

/* navigation */
nav#react-shift-navigation {
}

/* navigation arrows */
div.react-shift-nav-arrow {
  display: inline-block; /* Recommended */
  width: 80px; /* Set to maintain spacing on arrow exit */
}
#react-shift-next-page {
}
#react-shift-previous-page {
}

/* pagination */
span#react-shift-page-numbers {
}
a#react-shift-current-page {
}

/* fast links */
div#react-shift-fast-links {
}
a.react-shift-fast-link {
}
```

## Transition animations
Pass ```Object.options.transitions: true ``` to activate transition animations. Transitions are controlled by ReactCSSTransitionGroup.
```css
/* minimum required for page transition */
.react-shift-page-enter {  
  position: absolute;
  right: 0; left: 0;
  opacity: 0.01;
  transition: opacity .25s ease-in;
}
.react-shift-page-enter.react-shift-page-enter-active {  
  opacity: 1;
}
.react-shift-page-leave {  
  position: absolute;
  right: 0; left: 0;
  opacity: 1;
  transition: opacity .25s ease-in;
}
.react-shift-page-leave.react-shift-page-leave-active {
  position: absolute;
  opacity: 0.01;
  transition: opacity .25s ease-in;
}
```