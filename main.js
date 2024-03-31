
ctx = /** @type {any} */ (canvas).getContext`2d`;

const canvasWidth = 800;
const canvasHeight = 600;
const ballRadius = 6;

const TAU = 6.3;

ballX = 200;

const STATE_NOTHING = 0;
const STATE_AIMING = 1;
const STATE_ROLLING = 2;

const halfTrackHeight = 100;

const /** @type {any} */ DEBUG__FPS = "system";
// const /** @type {any} */ DEBUG__FPS = 250;

math = Math;

draw = (/** @type {number} */ timestamp) => {
	for (
		deltaTime = timestamp - prevTime;
		0 < deltaTime--;
	) {
		if (state == STATE_ROLLING) {
			ballX += dirX * relativeVelocity;
			ballY += dirY * relativeVelocity;

			if (math.abs(ballX - canvasWidth / 2) > canvasWidth / 2 - ballRadius) {
				// ballX = ballRadius * 2 - ballX;
				dirX = -dirX;
			}
			if (math.abs(ballY) > halfTrackHeight - ballRadius) {
				// ballY += (canvasHeight / 2 - ballRadius - math.abs(ballY)) * 2 * math.sign(dirY);
				// ballY = -(halfTrackHeight - ballRadius) * 2 - ballY;
				// ballY = (halfTrackHeight - ballRadius) * 2 * math.sign(dirY) - ballY;
				// ballY = (dirY > 0
				// 	? ((halfTrackHeight - ballRadius) * 2)
				// 	: (-(halfTrackHeight - ballRadius) * 2)) - ballY;
				// ballY = -ballY;
				// ballY += (dirY > 0
				// 	? (halfTrackHeight - ballRadius) * 2
				// 	: (halfTrackHeight - ballRadius) * -2);
				dirY = -dirY;
			}

			relativeVelocity -= .000_2;

			if (relativeVelocity < 0) {
				(state = STATE_NOTHING)
			}
		}
	}

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	ctx.fillStyle = "tan";
	ctx.fillRect(0, canvasHeight / 2 - halfTrackHeight, canvasWidth, halfTrackHeight * 2);

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
	if (state == STATE_AIMING) {
		relativeVelocity = math.hypot(dirX, dirY);
		dirX /= relativeVelocity;
		dirY /= relativeVelocity;
		relativeVelocity /= 1000;
		return (state = STATE_ROLLING);
	} else {
		return false;
	}
};



draw(
	// prevBallX =
	// prevBallY =
	prevTime =
	ballY =
	state = 0 /* STATE_NOTHING */
);
