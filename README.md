# react-shift
Creates a carousel component out of an array of JSX trees. Each element of the array is a page of the carousel.

## Installation
```
npm install react-shift
```

## Getting started
```jsx
var React = require('react/addons'),
		Shift = require('react-shift'),
		pageKey = 0,
		pagesArray = [
			<div key={pageKey++}>First page</div>,
			<div key={pageKey++}>Second page</div>,
			<div key={pageKey++}>Third page</div>
		];

React.render(
  <Shift pages={pagesArray}/>,
  document.getElementById("react-shift-anchor")
);
```

## Customization
The component can be passed an options object to customize the navigation.
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
  <Shift options={shiftOptions} pages={pagesArray}/>,
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
span#react-shift-page-numbers {
}

/* navigation arrows */
div.react-shift-nav-arrow {
  display: inline-block; /* Recommended */
  width: 80px; /* Set to prevent navigation from being nudged on first and last page */
}
#react-shift-next-page {
}
#react-shift-previous-page {
}

/* current page number within pagination */
a#react-shift-current-page {
}

/* fast links */
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