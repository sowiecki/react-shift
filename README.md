# react-shift
Creates a carousel component out of an array of JSX trees. Each index of the array is a page of the carousel.

## Installation
```
npm install react-shift
```

## Usage
```jsx
var Shift = require('react-shift'),
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