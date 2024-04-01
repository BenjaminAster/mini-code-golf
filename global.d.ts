
declare const canvas: HTMLCanvasElement;
declare const infoElement: HTMLInputElement;

declare var ctx: CanvasRenderingContext2D;
declare var ctx_beginPath: typeof CanvasRenderingContext2D.prototype.beginPath;
declare var ctx_closePath: typeof CanvasRenderingContext2D.prototype.closePath;

declare var ballX: number;
declare var ballY: number;

declare var dirX: number;
declare var dirY: number;
declare var relativeVelocity: number;

declare var goalX: number;
declare var halfCanvasHeight: number;

declare var pointerdownX: number;
declare var pointerdownY: number;

declare var ballX: number;
declare var ballY: number;
declare var ballAngle: number;

declare var level: number;
declare var shots: number;

declare var state: number;

declare var prevTime: number;
declare var deltaTime: number;

declare var draw: (timestamp: number) => void;

declare var math: typeof Math;
declare var math_atan2: typeof Math.atan2;
declare var math_hypot: typeof Math.hypot;

declare var drawCircle: (centerX: number, centerY: number, radius: number) => void;
declare var collisionWithCircle: (centerX: number, centerY: number, radius: number) => void;

declare var distanceToPreviousCircleCenter: number;
declare var fillStyle_string: "fillStyle";
declare var fillRect_string: "fillRect";
declare var black: "#000";
declare var white: "#fff";

declare var circleRectangleIntersectionX: number;

declare var circlesXData: number[];
declare var circlesYData: number[];
declare var circlesRadiusData: number[];

declare var tempNumber: number;
