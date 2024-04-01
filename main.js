
const canvasWidth = 800;
const canvasHeight = 300;

ctx = /** @type {any} */ (canvas).getContext`2d`;

const ballRadius = 6;

const TAU = 7; // context2d.arc() clamps values >2pi to 2pi

ballX = 50;
ballY = 150;

const STATE_NOTHING = 0;
const STATE_AIMING = 1;
const STATE_ROLLING = 2;

const halfTrackHeight = 100;
const goalCircleRadius = 150;
goalX = canvasWidth - goalCircleRadius;
const goalY = canvasHeight / 2;
// const circleRectangleIntersectionX = 539;

// const testCircleX = 400;
// const testCircleY = 80;
// const testCircleRadius = 40;

const numOfCircles = 6;
circlesXData = [500, 150, 500, 300, 620, 680];
circlesYData = [85, 210, 215, 90, 150, 150];
circlesRadiusData = [50, 70, 50, 70, 20, 20];

const /** @type {any} */ DEBUG__FPS = "system";
// const /** @type {any} */ DEBUG__FPS = 10;

math = Math;
math_atan2 = math.atan2;
math_hypot = math.hypot;
ctx_beginPath = (/** @type {any} */ _) => ctx.beginPath();
// ctx_closePath = (/** @type {any} */ _) => ctx.closePath();

drawCircle = (...centerX_centerY_radius) => {
	ctx_beginPath();
	ctx.arc(...centerX_centerY_radius, 0, TAU);
	ctx.fill();
};

collisionWithCircle = (centerX, centerY, radius) => {
	if ((distanceToPreviousCircleCenter = math_hypot(ballX - centerX, ballY - centerY)) * math.sign(radius) < radius + ballRadius) {
		ballAngle = 2 * math_atan2(centerX - ballX, ballY - centerY) - ballAngle;
	}
};

draw = (/** @type {number} */ timestamp) => {
	for (
		deltaTime = timestamp - prevTime;
		state == STATE_ROLLING && (
			ballX += math.cos(ballAngle) * relativeVelocity,
			ballY += math.sin(ballAngle) * relativeVelocity,
			0 < deltaTime--
		);
		relativeVelocity -= .000_2,
		(relativeVelocity < 0) && (state = STATE_NOTHING)
	) {
		for (tempNumber = numOfCircles; tempNumber--;) {
			if (level * 5 & 1 << tempNumber) {
				// console.log(tempNumber);
				collisionWithCircle(circlesXData[tempNumber], circlesYData[tempNumber], circlesRadiusData[tempNumber]);
			}
		}

		// collisionWithCircle(testCircleX, testCircleY, testCircleRadius);
		if (ballX < circleRectangleIntersectionX) {
			if (ballX < ballRadius) {
				ballAngle = math.PI - ballAngle;
			}
			if (math.abs(ballY - canvasHeight / 2) > halfTrackHeight - ballRadius) {
				ballAngle = -ballAngle;
			}
		} else {
			collisionWithCircle(goalX, goalY, -goalCircleRadius);
			if (distanceToPreviousCircleCenter < ballRadius && relativeVelocity < .2) {
				state = shots = 0; // STATE_NOTHING
				ballX = 50;
				ballY = 150;
				++level;
			}
		}
	}

	infoElement.value = `Level: ${level + 1}, Shots: ${shots}`;
	ctx[fillStyle_string = "fillStyle"] = white = "#fff";
	ctx[fillRect_string = "fillRect"](0, 0, canvasWidth, canvasHeight);

	ctx[fillStyle_string] = "tan";
	ctx[fillRect_string](0, canvasHeight / 2 - halfTrackHeight, circleRectangleIntersectionX = 539, halfTrackHeight * 2)
	drawCircle(goalX, canvasHeight / 2, goalCircleRadius);

	ctx[fillStyle_string] = "red";
	drawCircle(goalX, goalY, ballRadius);

	ctx[fillStyle_string] = black = "#000";
	drawCircle(ballX, ballY, ballRadius);

	ctx[fillStyle_string] = black + 0x3E7;
	// drawCircle(testCircleX, testCircleY, testCircleRadius);

	for (tempNumber = numOfCircles; tempNumber--;) {
		if (level * 5 & 1 << tempNumber) {
			// console.log(tempNumber);
			drawCircle(circlesXData[tempNumber], circlesYData[tempNumber], circlesRadiusData[tempNumber]);
		}
	}

	ctx[fillStyle_string] = white;
	ctx[fillRect_string](0, 0, circleRectangleIntersectionX, canvasHeight / 2 - halfTrackHeight);
	ctx[fillRect_string](0, canvasHeight / 2 + halfTrackHeight, circleRectangleIntersectionX, canvasHeight / 2 - halfTrackHeight);
	// for (tempNumber = 0; tempNumber < 999; tempNumber += canvasHeight / 2 + halfTrackHeight) {
	// 	ctx[fillRect_string](0, tempNumber, circleRectangleIntersectionX, canvasHeight / 2 + halfTrackHeight);
	// }

	if (state == STATE_AIMING) {
		// ctx.lineCap = "round";
		// ctx.setLineDash([0, 20]);
		ctx.strokeStyle = black + 3;
		(/** @type {any} */ (ctx_beginPath))(ctx.lineWidth = ballRadius * 3);
		ctx.moveTo(ballX, ballY);
		ctx.lineTo(ballX + dirX / 3, ballY + dirY / 3);
		ctx.stroke();
	}

	// ctx.fillRect(circleRectangleIntersectionX, 0, 1, 600);

	prevTime = timestamp;

	if (DEBUG__FPS === "system") {
		requestAnimationFrame(draw);
	} else {
		setTimeout(() => draw(performance.now()), 1000 / DEBUG__FPS);
	}
};
onpointermove = (event) => {
	if (!state && event.buttons) {
		((/*!REMOVE_PREV*/ { x: pointerdownX, y: pointerdownY }
			= event /*!REMOVE_NEXT*/),
			state = STATE_AIMING);
	}
	// console.log(event);
	if (state == STATE_AIMING) {
		relativeVelocity = math_hypot(dirX = event.x - pointerdownX, dirY = event.y - pointerdownY) / 1000;
		return (ballAngle = math_atan2(dirY, dirX));
	} else {
		return false;
	}
};

onpointerup = (event) => {
	if (state == STATE_AIMING) {
		++shots;
		return (state = STATE_ROLLING);
	} else {
		return false;
	}
};


// level = 51;

draw(
	prevTime =
	// ballY =
	level =
	shots =
	state = 0 /* STATE_NOTHING */
);


// circumvents weird bug in Terser; this gets removed after compilation:
(/** @type {any} */ (black)) = 0;
(/** @type {any} */ (white)) = 0;
