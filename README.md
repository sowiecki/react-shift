# react-shift
Creates a carousel component out of an array of JSX trees. Each index of the array is a page of the carousel.

Passing an options object to the carousel component allows customization of the paging arrows and named links.

## Installation
```
npm install react-shift
```

## Usage
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

/* navigation and pagination */
nav#react-shift-navigation {
}

/* pagination */
span#react-shift-page-numbers {
}

/* navigation arrows */
a#react-shift-nav-arrow {
}

/* current page number within pagination */
a#react-shift-current-page {
}

/* fast links */
a.react-shift-fast-link {
	
}
```