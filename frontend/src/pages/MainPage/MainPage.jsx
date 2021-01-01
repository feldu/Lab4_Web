import React from 'react';
import VisualizationContainer from "./components/VisualizationContainer/VisualizationContainer";
import AreaForm from "./components/AreaForm/AreaForm";
import Titles from "./components/Titles/Titles";
import ResultTable from "./components/ResultTable/ResultTable";
import './MainPage.css'


export default function MainPage() {
    return (
        <div className="main_wrapper">
            <Titles/>
            <div className="content_row">
                <VisualizationContainer/>
                <AreaForm/>
                <ResultTable/>
            </div>
        </div>
    );
}
