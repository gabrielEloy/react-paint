import { RootState } from './types';

export const currentStrokeSelector = (state: RootState) => state.currentStroke

export const strokesSelector = (state: RootState) => ({
    strokes: state.strokes,
    historyIndex: state.historyIndex,
});

export const historyIndexSelector = (state:RootState) => state.historyIndex;