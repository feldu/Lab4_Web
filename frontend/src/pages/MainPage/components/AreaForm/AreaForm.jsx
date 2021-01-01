import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import './AreaForm.css'
import * as thunks from "../../../../redux/thunks";
import {changeR} from "../../../../redux/actions";

export default function AreaForm() {
    const [X, setX] = useState(null);
    const [Y, setY] = useState('');
    const [R, setR] = useState(null);

    const dispatch = useDispatch();
    const invalidInputs = useSelector(state => state.points.invalidInputs);

    const submitHandler = (e) => {
        e.preventDefault();
        const point = {X, Y: Y.replace(',', '.'), R};
        dispatch(thunks.addPoint(point));
    };

    const errorStyle = {
        backgroundColor: '#E40045',
        borderColor: '#94002D',
        boxShadow: '0 4px 4px #94002D'
    };

    return (
        <div className="column">
            <form className="send_form" onSubmit={submitHandler}>
                <div className="x_block coordinate_block">
                    <label>X: </label>
                    <Dropdown
                        className="x_select"
                        style={invalidInputs.xField ? errorStyle : {}}
                        placeholder="Выберите X"
                        options={[
                            {label: '-4', value: '-4'},
                            {label: '-3', value: '-3'},
                            {label: '-2', value: '-2'},
                            {label: '-1', value: '-1'},
                            {label: '0', value: '0'},
                            {label: '1', value: '1'},
                            {label: '2', value: '2'},
                            {label: '3', value: '3'},
                            {label: '4', value: '4'}
                        ]}
                        value={X}
                        onChange={(e) => {
                            setX(e.target.value)
                        }}
                    />
                </div>
                <div className="y_block coordinate_block">
                    <label>Y: </label>
                    <InputText
                        className="y_select"
                        style={invalidInputs.yField ? errorStyle : {}}
                        maxLength="6"
                        placeholder="Число в диапазоне (-5; 3)"
                        autoComplete="off"
                        value={Y}
                        onChange={e => setY(e.target.value)}
                    />
                </div>
                <div className="r_block coordinate_block">
                    <label>R: </label>
                    <Dropdown
                        className="r_select"
                        style={invalidInputs.rField ? errorStyle : {}}
                        placeholder="Выберите R"
                        options={[
                            {label: '1', value: '1'},
                            {label: '2', value: '2'},
                            {label: '3', value: '3'},
                            {label: '4', value: '4'}
                        ]}
                        value={R}
                        onChange={(e) => {
                            setR(e.target.value);
                            dispatch(changeR(e.target.value));
                        }}
                    />
                </div>
                <div className="send_button_block">
                    <Button className="send_button">Отправить</Button>
                </div>
            </form>
        </div>
    )
}