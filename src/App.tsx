import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { currentStrokeSelector, strokesSelector} from './selectors';
import { beginStroke, updateStroke, endStroke } from './actions';
import { drawStroke, clearCanvas } from './canvasUtils';
import { ColorPanel } from './ColorPanel';
import { ControlPanel } from './ControlPanel'

const App = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const currentStroke = useSelector(currentStrokeSelector);
  const { historyIndex, strokes } = useSelector(strokesSelector)

  const dispatch = useDispatch();

  const isDrawing = Boolean(currentStroke.points.length);

  useEffect(() => {
    const { context, canvas } = getCanvasWithContext();

    if (!context || !canvas) {
      return;
    }

    requestAnimationFrame(() => {
      drawStroke(
        context,
        currentStroke.points,
        currentStroke.color
        )
    })
  }, [currentStroke]);


  useEffect(() => {
    const { context, canvas } = getCanvasWithContext();

    if (!context || !canvas) {
      return;
    }

    clearCanvas(canvas);

    requestAnimationFrame(() => {
      const shownStrokes = strokes.slice(0, strokes.length - historyIndex)
      shownStrokes.forEach(stroke => drawStroke(
        context,
        stroke.points,
        stroke.color
        ))
      
    })
  }, [historyIndex]);

  const getCanvasWithContext = (canvas = canvasRef.current) => ({
    canvas, context: canvas?.getContext('2d')
  })

  const startDrawing = ({ nativeEvent }: React.MouseEvent) => {
    const { offsetX, offsetY } = nativeEvent;
    console.log({ offsetX, offsetY })
    dispatch(beginStroke(offsetX, offsetY))
  }

  const endDrawing = () => {
    if (isDrawing) {
      dispatch(endStroke());
    }
  }

  const draw = ({ nativeEvent }: React.MouseEvent) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    dispatch(updateStroke(offsetX, offsetY));
  }


  return (
    <div className="window">
      <ColorPanel />
      <ControlPanel />
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onMouseMove={draw}
        height={window.innerHeight}
        width={window.innerWidth}
      />
    </div>
  )
}

export default App;