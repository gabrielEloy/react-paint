export type Point = {
    x: number;
    y: number;
}

export type Stroke = {
    points: Poinnt[];
    color: string;
}

export type RootState = {
    currentStroke: Stroke;
    strokes: Stroke[];
    historyIndex: number;
}