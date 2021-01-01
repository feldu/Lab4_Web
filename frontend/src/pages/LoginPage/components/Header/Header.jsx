import React from 'react';

import './Header.css';
import itmoLogo from '../../../../assets/itmo_logo.png';
import vtLogo from '../../../../assets/vt_logo.png';

export default function Header() {
    return (
        <header>
            <div className="logos_block column">
                <div className="vt_logo">
                    <a href="https://se.ifmo.ru/" target="_blank" rel="noreferrer noopener"><img src={vtLogo}
                                                                                                 width="130px"
                                                                                                 alt="vt_logo"/></a>
                </div>
                <div className="itmo_block">
                    <a href="https://ifmo.ru/" target="_blank" rel="noreferrer noopener"><img src={itmoLogo} width="80%"
                                                                                              alt="itmo_logo"/></a><br/>
                    Мегафакультет компьютерных технологий и управления <br/>
                    Факультет программной инженерии и компьютерной техники
                </div>
            </div>
            <div className="main_title column">
                Лабораторная работа №4<br/>
                по Веб-программированию<br/>
            </div>
            <div className="made_by column">
                Вариант: 86240<br/>
                Выполнил: Остряков Егор
                Александрович<br/>
                Группа: P3212
            </div>
        </header>
    );
}
