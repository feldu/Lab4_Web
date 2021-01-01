import React from 'react';
import './ResultTable.css';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useSelector} from "react-redux";

export default function ResultTable() {
    const points = useSelector(state => state.points.points);
    return (
        <div className="column">
            <div className="result_table">
                <DataTable value={points} resizableColumns columnResizeMode="fit">
                    <Column field="x" header="X" style={{width: '20%'}}/>
                    <Column field="y" header="Y" style={{width: '20%'}}/>
                    <Column field="r" header="R" style={{width: '20%'}}/>
                    <Column field="result" header="Результат" style={{width: '40%'}}/>
                </DataTable>
            </div>
        </div>
    )
}