const position = {
  right: 0,
  left: 0,
  direction: null,
  clear() {
    this.right = 0;
    this.left = 0;
  }
};

export default (e, left, right) => {
  e = Math.round(e);

  position.direction = null;

  if (e < 450) {
    position.left += 1;
    position.right = 0;
  } else if (e > 550) {
    position.right += 1;
    position.left = 0;
  }

  if (position.left > 4) {
    position.clear();
    left();
    return;
  }

  if (position.right > 4) {
    position.clear();
    right();
    return;
  }
};
