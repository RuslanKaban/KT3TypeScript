type Point = number; 
type Distance = number; 
type Angle = number; 
type Position = { x: Point; y: Point }; 
enum CarriageState { 
  UP, 
  DOWN 
} 
enum LineColor { 
  GREEN = "зелёный" 
} 
type PlotterState = { 
  position: Position; 
  angle: Angle; 
  color: LineColor; 
  carriageState: CarriageState; 
}; 
type Printer = (s: string) => void; 
 
 
function drawLine(prt: Printer, from: Position, to: Position, color: LineColor): void { 
  prt(`...Чертим линию из (${from.x}, ${from.y}) в (${to.x}, ${to.y}) используя ${color} цвет.`); 
} 
 
function calcNewPosition(distance: Distance, angle: Angle, current: Position): Position { 
  // Преобразуем градусы в радианы при 180.0 градусов = 1 pi радиан 
  const angle_in_rads = angle * (Math.PI / 180.0) * 1.0; 
  // новая позиция 
  const x = current.x + distance * Math.cos(angle_in_rads); 
  const y = current.y + distance * Math.sin(angle_in_rads); 
  // возвращаем новую позицию 
  return { x: Math.round(x), y: Math.round(y) }; 
} 
 
function move(prt: Printer, distance: Distance, state: PlotterState): PlotterState { 
  // вычисляем новую позицию 
  let newPosition = calcNewPosition(distance, state.angle, state.position); 
  // draw line if needed 
  if (state.carriageState === CarriageState.DOWN) { 
    // Здесь следует отрисовка линии 
    drawLine(prt, state.position, newPosition, state.color); 
  } else { 
    prt(`Передвигаем на ${distance} от точки (${state.position.x}, ${state.position.y})`); 
  } 
  // изменяем состояние 
  return { ...state, position: newPosition }; 
} 
 
function turn(prt: Printer, angle: Angle, state: PlotterState): PlotterState { 
  prt(`Поворачиваем на ${angle} градусов`); 
  // вычисляем новый угол 
  const newAngle = (state.angle + angle) % 360.0; 
  // изменяем состояние 
  return { ...state, angle: newAngle }; 
} 
 
function carriageUp(prt: Printer, state: PlotterState): PlotterState { 
  prt("Поднимаем каретку"); 
  // изменяем состояние 
  return { ...state, carriageState: CarriageState.UP }; 
} 
 
function carriageDown(prt: Printer, state: PlotterState): PlotterState { 
  prt("Опускаем каретку"); 
  // изменяем состояние 
  return { ...state, carriageState: CarriageState.DOWN }; 
} 
 
function setColor(prt: Printer, color: LineColor, state: PlotterState): PlotterState { 
  prt(`Устанавливаем ${color} цвет линии.`); 
  // изменяем состояние 
  return { ...state, color: color }; 
} 
 
function setPosition(prt: Printer, position: Position, state: PlotterState): PlotterState { 
  prt(`Устанавливаем позицию каретки в (${position.x}, ${position.y}).`); 
  // изменяем состояние 
  return { ...state, position: position }; 
} 
 
function drawTriangle(plt: PlotterState, size: Distance): PlotterState { 
  plt = setColor(console.log, LineColor.GREEN, plt); 
  for (let i = 0; i < 3; ++i) { 
    plt = carriageDown(console.log, plt); 
    plt = move(console.log, size, plt); 
    plt = carriageUp(console.log, plt); 
    plt = turn(console.log, 120.0, plt); 
  } 
  return plt; 
} 
 
const printer: Printer = console.log; 
 
function initializePlotterState(position: Position, angle: Angle, color: LineColor, carriageState: CarriageState): PlotterState { 
  return { 
    position: position, 
    angle: angle, 
    color: color, 
    carriageState: carriageState 
  }; 
} 
 
let initPosition: Position = { x: 0.0, y: 0.0 }; 
let initColor: LineColor = LineColor.GREEN; 
let initAngle: Angle = 0.0; 
let initCarriageState: CarriageState = CarriageState.UP; 
 
let plotterState = initializePlotterState(initPosition, initAngle, initColor, initCarriageState); 
 
plotterState = drawTriangle(plotterState, 100.0); 
