import React, {useEffect, useRef, useState} from 'react';
import './VisualizationContainer.css'
import * as visualization from "./logic/visualization";
import {useDispatch, useSelector} from "react-redux";
import * as thunks from "../../../../redux/thunks";


export default function VisualizationContainer() {
    const currentR = useSelector(state => state.points.currentR);
    const [isClicked, setClicked] = useState(false);
    const points = useSelector(state => state.points.points);
    const dispatch = useDispatch();
    const errorStyle = {
        borderColor: "#94002D",
        boxShadow: "4px 4px 4px #E40045, -4px -4px 4px #E40045, 4px -4px 4px #E40045, -4px 4px 4px #E40045"
    };
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        visualization.setup(canvas, currentR, points);
        visualization.repaint();
    });

    const canvasClickHandler = (e) => {
        if ([1, 2, 3, 4].includes(currentR)) {
            const canvas = canvasRef.current;
            const point = visualization.normalizeCoordinates(
                (e.pageX - canvas.offsetLeft) - canvas.width / 2,
                canvas.height / 2 - (e.pageY - canvas.offsetTop),
                currentR
            );
            dispatch(thunks.sendPoint(point));
        } else {
            setClicked(true);
            setTimeout(() => {
                setClicked(false);
            }, 3000);
        }
    };
    return (
        <div className="column" style={![1, 2, 3, 4].includes(currentR) && isClicked ? errorStyle : {}}>
            <div id="visualization_container">
                <canvas
                    id="areas"
                    onClick={canvasClickHandler}
                    ref={canvasRef}
                />
            </div>
        </div>
    )
}