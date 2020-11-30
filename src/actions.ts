import { Point } from "./types";

export type Action = 
| {
    type: typeof BEGIN_STROKE
    payload: Point
}
| {
    type: typeof UPDATE_STROKE
    payload: Point
}
| {
    type: typeof END_STROKE
} 
| {
    type: typeof SET_STROKE_COLOR
    payload: string
}
| {
    type: typeof UNDO_ACTION
}
| {
    type: typeof REDO_ACTION
}

export const BEGIN_STROKE = 'BEGIN_STROKE';
export const UPDATE_STROKE = 'UPDATE_STROKE';
export const END_STROKE = 'END_STROKE';
export const SET_STROKE_COLOR = 'SET_STROKE_COLOR';
export const REDO_ACTION = 'REDO_ACTION'
export const UNDO_ACTION = 'UNDO_ACTION'

export const beginStroke = (x: number, y: number) => ({
    type: BEGIN_STROKE,
    payload: {x,  y}
})
export const updateStroke = (x: number, y: number) => ({
    type: UPDATE_STROKE,
    payload: {x,  y}
})
export const endStroke = () => ({
    type: END_STROKE,
})
export const setStrokeColor = (payload: string) => ({
    type: SET_STROKE_COLOR,
    payload
})
export const undo = () => ({type: UNDO_ACTION})
export const redo = () => ({type: REDO_ACTION})