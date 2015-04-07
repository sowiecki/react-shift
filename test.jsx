var React = require('react/addons'),
		Shift = require('./react-shift.jsx'),
		shiftOptions = {
		  nextPage: "»",
		  previousPage: "«",
		  fastLinks: {
		    "Photos": 3, // Remember, indexing of an array starts at 0
		    "About me": 7
		  }
		},
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