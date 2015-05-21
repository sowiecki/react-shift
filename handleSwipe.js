var position = {
	right: 0
	, left: 0
	, direction: null
	, clear: function() {
		this.right = 0
		this.left = 0
	}
}

var handleSwipe = function(e) {
	e = Math.round(e)
	position.direction = null
	if (e < 450) {
		position.left += 1
		position.right = 0
	} else if (e > 550) {
		position.right += 1
		position.left = 0
	}
	if (position.left > 14) {
		position.direction = 'left'
		position.clear()
	}
	if (position.right > 14) {
		position.direction = 'right'
		position.clear()
	}
	return position.direction
}

module.exports = handleSwipe