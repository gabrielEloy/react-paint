import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { historyIndexSelector } from "../selectors"
import { undo, redo } from "../actions"


export const ControlPanel = () => {
  const dispatch = useDispatch()
  const historyIndex = useSelector(historyIndexSelector);

  const handleRedo = () => {
    
  }

  const isUndoDisabled = false;
  const isRedoDisabled = false;

  return (
    <div className="window edit">
      <div className="title-bar">
        <div className="title-bar-text">Edit</div>
      </div>
      <div className="window-body">
        <div className="field-row">
          <button
            className="button redo"
            disabled={isUndoDisabled}
            onClick={() => dispatch(undo())}
          >
            Undo
          </button>
          <button
            className="button undo"
            disabled={isRedoDisabled}
            onClick={() => dispatch(redo())}
          >
            Redo
          </button>
        </div>
      </div>
    </div>
  )
}
