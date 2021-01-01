let canvas;
let context;
let R;
let points;

const AXES_PADDING = 10;
const MAX_AXE_LENGTH = 12;
let MAX_MARK_COORDINATE,
    MIN_MARK_COORDINATE;

const AREAS_COLOR = "rgba(255, 146, 0, 0.85)",
    AXES_COLOR = "white";

export function setup(currentCanvas, currentR, currentPoints) {
    points = currentPoints;
    R = currentR;
    canvas = currentCanvas;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    context = canvas.getContext('2d');
    MAX_MARK_COORDINATE = canvas.width - (AXES_PADDING + canvas.width / MAX_AXE_LENGTH);
    MIN_MARK_COORDINATE = (AXES_PADDING + canvas.width / MAX_AXE_LENGTH);
}

export function repaint() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawAreas();
    drawAxes();
    drawPoints();
}

export function normalizeCoordinates(canvasX, canvasY, R) {
    return {
        X: (canvasX / (MAX_MARK_COORDINATE - canvas.width / 2) * R).toFixed(3),
        Y: (canvasY / (canvas.height / 2 - MIN_MARK_COORDINATE) * R).toFixed(3),
        R
    }
}

function drawPoints() {
    if (R != null) {
        points.forEach(point => {
            context.beginPath();
            let x = point.x * (MAX_MARK_COORDINATE - canvas.width / 2) / R + canvas.width / 2,
                y = canvas.height / 2 - point.y * (canvas.height / 2 - MIN_MARK_COORDINATE) / R,
                r = point.r;
            context.arc(x, y, 3, 0, 2 * Math.PI);
            point.result === "Попала" ? context.fillStyle = "#67E300" : context.fillStyle = "#E40045";
            if (r !== R)
                context.globalAlpha = 1 - Math.abs(R - r) * 0.2;
            else
                context.globalAlpha = 1;

            context.fill();
            context.closePath();
        })
    }
}

function drawAxes() {
    context.strokeStyle = AXES_COLOR;
    context.fillStyle = AXES_COLOR;
    context.beginPath();
    //arrow X
    context.moveTo(AXES_PADDING, canvas.height / 2);
    context.lineTo(canvas.width - AXES_PADDING, canvas.height / 2);
    context.lineTo(canvas.width - AXES_PADDING - 10, canvas.height / 2 + 5);
    context.moveTo(canvas.width - AXES_PADDING, canvas.height / 2);
    context.lineTo(canvas.width - AXES_PADDING - 10, canvas.height / 2 - 5);

    //arrow Y
    context.moveTo(canvas.width / 2, canvas.height - AXES_PADDING);
    context.lineTo(canvas.width / 2, AXES_PADDING);
    context.lineTo(canvas.width / 2 + 5, AXES_PADDING + 10);
    context.moveTo(canvas.width / 2, AXES_PADDING);
    context.lineTo(canvas.width / 2 - 5, AXES_PADDING + 10);
    let xMarkCoordinate,
        yMarkCoordinate;
    context.fillText("0", canvas.width / 2 - 10, canvas.height / 2 + 15);
    for (let i = 1; i <= R; i++) {
        xMarkCoordinate = canvas.width / 2 + i * (MAX_MARK_COORDINATE - canvas.width / 2) / R;
        //positive x axe marks
        context.moveTo(xMarkCoordinate, canvas.height / 2 + 3);
        context.lineTo(xMarkCoordinate, canvas.height / 2 - 3);
        context.fillText(i.toString(), xMarkCoordinate - 3, canvas.height / 2 + 15);
        //negative x axe marks
        xMarkCoordinate = canvas.width / 2 - i * (canvas.width / 2 - MIN_MARK_COORDINATE) / R;
        context.moveTo(xMarkCoordinate, canvas.height / 2 + 3);
        context.lineTo(xMarkCoordinate, canvas.height / 2 - 3);
        context.fillText((-i).toString(), xMarkCoordinate - 5, canvas.height / 2 + 15);
        //negative y axe marks
        yMarkCoordinate = canvas.height / 2 + i * (MAX_MARK_COORDINATE - canvas.height / 2) / R;
        context.moveTo(canvas.width / 2 - 3, yMarkCoordinate);
        context.lineTo(canvas.width / 2 + 3, yMarkCoordinate);
        context.fillText((-i).toString(), canvas.width / 2 + 5, yMarkCoordinate + 3);
        //positive y axe marks
        yMarkCoordinate = canvas.height / 2 - i * (canvas.height / 2 - MIN_MARK_COORDINATE) / R;
        context.moveTo(canvas.width / 2 - 3, yMarkCoordinate);
        context.lineTo(canvas.width / 2 + 3, yMarkCoordinate);
        context.fillText(i.toString(), canvas.width / 2 + 5, yMarkCoordinate + 3);
    }
    context.fillText('X', canvas.width - AXES_PADDING - 3, canvas.height / 2 + 15);
    context.fillText('Y', canvas.width / 2 + 5, AXES_PADDING + 3);
    context.stroke();
    context.closePath();
}

function drawAreas() {
    context.fillStyle = AREAS_COLOR;
    context.beginPath();
    //rectangle
    context.fillRect(MIN_MARK_COORDINATE, canvas.height / 2 + (MAX_MARK_COORDINATE - canvas.height / 2), canvas.width / 2 - MIN_MARK_COORDINATE, (MIN_MARK_COORDINATE - canvas.height / 2));
    //triangle
    context.moveTo(canvas.width / 2, canvas.height / 2);
    context.lineTo(canvas.width / 2, canvas.height / 2 - (MAX_MARK_COORDINATE - canvas.height / 2));
    context.lineTo(MAX_MARK_COORDINATE, canvas.height / 2);
    //circle
    context.arc(canvas.width / 2, canvas.height / 2, (MAX_MARK_COORDINATE - canvas.width / 2) / 2, 0, Math.PI / 2);
    context.fill();
    context.closePath();
}