// Example usage of package

var React = require('react/addons'),
		Shift = require('./react-shift.jsx'),
		arrowLabels = {
		  next: ">>>",
		  previous: "<<<"
		},
	  fastLinks = {
	    "Third page": 2,
	    "Fifth page": 4
	  };

React.render(
  <Shift arrowLabels={arrowLabels} fastLinks={fastLinks} transitions={true}>
  	<div>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lectus justo, varius eget tellus at, auctor suscipit tellus. Vestibulum ullamcorper urna non purus tempor, eget fermentum eros porta. Proin nulla enim, sagittis nec sagittis eu, faucibus eu erat. Etiam luctus molestie nisi aliquet malesuada. Quisque pellentesque sodales augue, in luctus enim posuere ac. Mauris posuere magna ac condimentum blandit. Proin hendrerit turpis ac vestibulum hendrerit. Quisque non interdum mi.
		</div>
		<span>
			Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam nec sem quis dolor malesuada aliquam in at ipsum. Etiam blandit cursus sapien in molestie. Suspendisse pharetra ante elit, ut vehicula nisi faucibus sit amet. Donec faucibus eu nisi rhoncus finibus. Nunc ac rutrum sapien, in aliquet nunc. Sed at magna et enim facilisis hendrerit. Suspendisse tristique in quam in aliquam. In hac habitasse platea dictumst. Sed at elementum nulla.
		</span>
		<div>
			Nam quis tincidunt turpis. Ut egestas luctus lectus et tincidunt. Sed eget tellus ut lectus tempus iaculis. Phasellus porttitor ultricies mi ut aliquam. Etiam sollicitudin finibus nibh, vitae finibus sapien tempor scelerisque. Phasellus laoreet turpis sed lobortis facilisis. Integer venenatis lobortis ipsum, eget viverra ipsum sodales vitae. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam vitae orci feugiat, laoreet arcu a, hendrerit eros. Vivamus accumsan ante justo. In hac habitasse platea dictumst. Pellentesque fringilla, leo ut cursus viverra, ex nulla tempus diam, maximus dapibus augue magna ac nisi. Ut venenatis, diam sollicitudin euismod sollicitudin, sapien neque egestas nulla, quis venenatis dui metus id libero. Nulla pharetra, odio nec gravida dapibus, erat lectus aliquam tellus, eget consectetur risus nibh et lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut augue sem, laoreet a rhoncus ornare, dapibus consequat magna.
		</div>
		<div>
			Fusce id laoreet neque. Etiam tincidunt sem tortor, eu pharetra lorem tincidunt ut. Nulla tincidunt mattis felis convallis iaculis. Nunc viverra elit vel posuere mollis. Vivamus et ullamcorper orci, sagittis vestibulum nibh. Phasellus vitae neque aliquam, dignissim urna et, facilisis est. Nullam mollis lacinia quam, eu faucibus elit blandit vitae. Etiam tempus tempus fermentum. In eget urna rutrum, finibus purus non, interdum magna. Sed elementum a metus a elementum.
		</div>
		<div>
			Vestibulum interdum dapibus iaculis. Pellentesque a condimentum erat, non tempus erat. Sed pellentesque, arcu eget tristique facilisis, sapien ligula pharetra tellus, at malesuada nisl diam nec purus. Morbi aliquam ante erat, nec hendrerit enim malesuada vel. Sed in lorem quis enim aliquam consectetur eu nec leo. Nulla facilisi. Aenean malesuada risus sed tortor aliquam maximus.
		</div>
  </Shift>,
  document.getElementById("react-shift-anchor")
);