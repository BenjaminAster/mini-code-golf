
ctx = (/** @type {any} */ (canvas).getContext`2d`);

const canvasWidth = 800;
const canvasHeight = 600;
const ballRadius = 8;

const TAU = 6.3;

ballX = 200;

const STATE_NOTHING = 0;
const STATE_AIMING = 1;
const STATE_ROLLING = 2;

const leftEdge = 0;
const halfTrackHeight = 150;

const /** @type {any} */ DEBUG__FPS = "system";
// const /** @type {any} */ DEBUG__FPS = 5;

math = Math;

draw = (/** @type {number} */ timestamp) => {
	deltaTime = timestamp - prevTime;
	ctx.fillStyle = "tan";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);

	if (state == STATE_ROLLING) {
		ballX += dirX * relativeVelocity * deltaTime;
		ballY += dirY * relativeVelocity * deltaTime;

		if (ballX < ballRadius) {
			ballX = ballRadius * 2 - ballX;
			dirX = -dirX;
		}
		if (ballX > canvasWidth - ballRadius) {
			ballX = (canvasWidth - ballRadius) * 2 - ballX;
			dirX = -dirX;
		}
		if (ballY < ballRadius - canvasHeight / 2) {
			ballY = (ballRadius - canvasHeight / 2) * 2 - ballY;
			dirY = -dirY;
		}
		if (ballY > canvasHeight / 2 - ballRadius) {
			ballY = (canvasHeight / 2 - ballRadius) * 2 - ballY;
			dirY = -dirY;
		}

		relativeVelocity -= deltaTime / 5000;

		if (relativeVelocity < 0) {
			state = STATE_NOTHING;
		}
	}
	if (state == STATE_AIMING) {
		// ctx.lineCap = "round";
		// ctx.setLineDash([0, 20]);
		ctx.strokeStyle = "#8888";
		(/** @type {any} */ (ctx.beginPath))(ctx.lineWidth = ballRadius * 3);
		ctx.moveTo(ballX, ballY + canvasHeight / 2);
		ctx.lineTo(ballX + dirX / 3, ballY + canvasHeight / 2 + dirY / 3);
		(/** @type {any} */ (ctx.closePath))(ctx.stroke());
	}

	ctx.fillStyle = "#000";
	ctx.beginPath();
	ctx.arc(ballX, ballY + canvasHeight / 2, ballRadius, 0, TAU);
	ctx.fill();
	ctx.closePath();

	// prevBallX = ballX;
	// prevBallY = ballY;
	prevTime = timestamp;

	if (DEBUG__FPS === "system") {
		requestAnimationFrame(draw);
	} else {
		setTimeout(() => draw(performance.now()), 1000 / DEBUG__FPS);
	}
};

// canvas.width = canvasWidth;
// canvas.height = canvasHeight;

onpointerdown = (event) => {
	if (!state /* state == STATE_NOTHING */) {
		state = STATE_AIMING;
		dirX = dirY = 0;
		return ({ x: pointerdownX, y: pointerdownY } = event);
	} else {
		return state;
	}
};

onpointermove = (event) => {
	if (state == STATE_AIMING) {
		dirX = event.x - pointerdownX;
		return (dirY = event.y - pointerdownY);
	} else {
		return false;
	}
};

onpointerup = (event) => {
	relativeVelocity = math.hypot(dirX, dirY);
	dirX /= relativeVelocity;
	dirY /= relativeVelocity;
	relativeVelocity /= 1000;
	state = STATE_ROLLING;
};



draw(
	// prevBallX =
	// prevBallY =
	prevTime =
	ballY =
	state = 0 /* STATE_NOTHING */
);
