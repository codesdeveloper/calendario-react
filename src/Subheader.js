import { useState, useEffect } from "react";
import { months } from "./App";


export function Subheader(props) {

    let values =  [];

    if (props.type == 'year') {
        for (let i = -10; i <= 10; ++i)
            values.push(<option selected={i == 0}>{props.current.year + i}</option>);
    }

    if (props.type == 'month') {
        months.map((val, i) => {
            values.push(<option selected={i == props.current.month}>{val}</option>);
        })
    }

    if (props.type == 'day') {
        for (let i = 1; i < new Date(props.current.year, props.current.month + 1, 0).getDate() + 1; ++i)
            values.push(<option selected={i == props.current.day}>{(i < 10 ? '0' : '') + i}</option>);

    }

    if (props.type == 'week') {
        for (let i = 1; i <= 52; ++i)
            values.push(<option selected={i == props.current.week}>semana {(i < 10 ? '0' : '') + i}</option>);
    }

    function prev() {

        let curr = props.current;

        if (props.type == 'year') curr.year -= 1;

        else if (props.type == 'month') {
            if (curr.month == 0) {
                curr.month = 11;
                curr.year -= 1;
            } else curr.month -= 1;
        }

        else if (props.type == 'day') {
            if (curr.day == 1) {
                curr.day = new Date(curr.year, curr.month, 0).getDate();
                if (curr.month == 0) {
                    curr.month = 11;
                    curr.year -= 1;
                } else curr.month -= 1;

            } else curr.day -= 1;
        }

        props.setCurrent(curr);
        props.animation(true);
    }

    function change() {
        let val = parseInt(document.getElementById('select').value);

        let curr = props.current;

        if (props.type == 'year') curr.year = val;
        else if (props.type == 'month') curr.month = val;
        else if (props.type == 'day') curr.day = val;

        props.setCurrent(curr);
        props.animation(true);        
    }

    function next() {

        let curr = props.current;

        if (props.type == 'year') curr.year += 1;

        else if (props.type == 'month') {
            if (curr.month == 11) {
                curr.month = 0;
                curr.year += 1;
            } else curr.month += 1;
        }

        else if (props.type == 'day') {
            if (curr.day == new Date(curr.year, curr.month + 1, 0).getDate()) {
                if (curr.month == 11) {
                    curr.month = 0;
                    curr.year += 1;
                } else curr.month += 1;
                curr.day = 1;
            } else curr.day += 1;
        }

        props.setCurrent(curr);
        props.animation(true);
    }

    return (
        <div className="alter">

            {(props.type != 'task') ? <span onClick={prev} id="prev">&#60;</span> : ''}

            {(props.type != 'task') ? <div className="title-date">

                {(props.type != 'year') ? <div className="title-year">{props.current.year}</div> : ''}

                <select onChange={change} id="select">
                    {values}
                </select>

                {(props.type != 'year' && props.type != 'month') ? <div className="title-month">{months[props.current.month]}</div> : ''}

            </div> : ''
            }


            {(props.type == 'task') ? <button id='add' onclick='addTask()' className="add-task">Adicionar</button> : ''}
            {(props.type != 'task') ? <span onClick={next} id="next">&#62;</span> : ''}

        </div>
    )
}