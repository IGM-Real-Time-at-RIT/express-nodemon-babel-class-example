const lerp = (v0, v1, alpha) => {
  return (1 - alpha) * v0 + alpha * v1;
};

const redraw = (time) => {
  updatePosition();

  ctx.clearRect(0, 0, 500, 500);

  const keys = Object.keys(squares);

  for(let i = 0; i < keys.length; i++) {

    const square = squares[keys[i]];

    //if alpha less than 1, increase it by 0.05
    if(square.alpha < 1) square.alpha += 0.05;

    if(square.hash === hash) {
      ctx.filter = "none"
    }
    else {
      ctx.filter = "hue-rotate(40deg)";
    }

    square.x = lerp(square.prevX, square.destX, square.alpha);
    square.y = lerp(square.prevY, square.destY, square.alpha);

    // if we are mid animation or moving in any direction
    if(square.frame > 0 || (square.moveUp || square.moveDown || square.moveRight || square.moveLeft)) {
      square.frameCount++;

      if(square.frameCount % 8 === 0) {
        if(square.frame < 7) {
          square.frame++;
        } else {
          square.frame = 0;
        }
      }
    }

    ctx.drawImage(
      walkImage, 
      square.width * square.frame,
      square.height * square.direction,
      square.width, 
      square.height,
      square.x, 
      square.y, 
      square.width, 
      square.height,
    );

    ctx.strokeRect(square.x, square.y, square.width, square.height);
  }

  requestAnimationFrame(redraw);
};