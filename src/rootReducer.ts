import { RootState } from './types';
import { Action, BEGIN_STROKE, UPDATE_STROKE, END_STROKE, SET_STROKE_COLOR, REDO_ACTION, UNDO_ACTION } from './actions';

const initialState: RootState = {
    currentStroke: { points: [], color: '#000' },
    strokes: [],
    historyIndex: 0
}

export const rootReducer = (
    state: RootState = initialState,
    action: Action
) => {
    switch (action.type) {
        case BEGIN_STROKE: {
            return {
                ...state,
                currentStroke: {
                    ...state.currentStroke,
                    points: [action.payload]
                }
            }
        }
        case UPDATE_STROKE:
            return {
                ...state,
                currentStroke: {
                    ...state.currentStroke,
                    points: [...state.currentStroke.points, action.payload]
                }
            }
        case END_STROKE: {
            if (!state.currentStroke.points.length) {
                return state;
            }

            if (state.historyIndex !== 0) {
                const newStrokesEnd = (state.strokes.length - state.historyIndex)
                
                return {
                    ...state,
                    currentStroke: { ...state.currentStroke, points: [] },
                    strokes: [...state.strokes.slice(0,newStrokesEnd), state.currentStroke],
                    historyIndex: 0
                }
            }


            return {
                ...state,
                currentStroke: { ...state.currentStroke, points: [] },
                strokes: [...state.strokes, state.currentStroke]
            }
        }
        case SET_STROKE_COLOR:
            return {
                ...state,
                currentStroke: {
                    ...state.currentStroke,
                    color: action.payload
                }
            }
        case UNDO_ACTION: {
            if(state.historyIndex === state.strokes.length){
                return state;
            }

            return {
                ...state,
                historyIndex: state.historyIndex + 1
            }
        }
        case REDO_ACTION: {
            if(state.historyIndex <= 0){
                return state;
            }
            
            return {
                ...state,
                historyIndex: state.historyIndex - 1
            }
        }
        default:
            return state;
    }
}