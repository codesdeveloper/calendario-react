import { months } from "./App";

export function Subheader(props) {

    let current = props.current;
    let values = [];
    let week_ind = 0;

    if (props.type == 'year') {
        for (let i = -15; i <= 15; ++i)
            values.push(<option selected={i == 0}>{current.getFullYear() + i}</option>);
        var select = document.getElementById('select');
        if (select != null) select.selectedIndex = 15;
    }

    else if (props.type == 'month') {
        months.map((val, i) => {
            values.push(<option value={i} selected={i == current.getMonth()}>{val}</option>);
        })
    }

    else if (props.type == 'day') {
        for (let i = 1; i < new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate() + 1; ++i)
            values.push(<option selected={i == current.getDate()}>{(i < 10 ? '0' : '') + i}</option>);

    }

    else if (props.type == 'week') {

        //gerar numero da semana
        let currentdate = new Date(current.getFullYear(), current.getMonth(), current.getDate() - 1);
        let oneJan = new Date(currentdate.getFullYear(), 0, 1);
        let numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
        week_ind = Math.ceil((numberOfDays) / 7);

        for (let i = 1; i <= 52; ++i)
            values.push(<option value={i} selected={i == week_ind}>semana {(i < 10 ? '0' : '') + i}</option>);
    }

    function prev() {
        if (props.type == 'year') current.setFullYear(current.getFullYear() - 1);
        else if (props.type == 'month') current.setMonth(current.getMonth() - 1);
        else if (props.type == 'day') current.setDate(current.getDate() - 1);
        else if (props.type == 'week') current.setDate(current.getDate() - 7);
        props.setCurrent(current);
        props.animation(true);
    }

    function change() {
        let val = parseInt(document.getElementById('select').value);
        if (props.type == 'year') current.setFullYear(val);
        else if (props.type == 'month') current.setMonth(val)
        else if (props.type == 'day') current.setDate(val);
        else if (props.type == 'week') {
            let cout = (val - week_ind) * 7;
            current.setDate(current.getDate() + cout);
        }
        props.setCurrent(current);
        props.animation(true);
    }

    function next() {
        if (props.type == 'year') current.setFullYear(current.getFullYear() + 1);
        else if (props.type == 'month') current.setMonth(current.getMonth() + 1)
        else if (props.type == 'day') current.setDate(current.getDate() + 1);
        else if (props.type == 'week') current.setDate(current.getDate() + 7);
        props.setCurrent(current);
        props.animation(true);
    }

    return (
        <div className="alter">
            <span onClick={prev} id="prev">&#60;</span>
            <div className="title-date">
                {(props.type != 'year') ? <div className="title-year">{current.getFullYear()}</div> : ''}
                <select onChange={change} id="select">
                    {values}
                </select>
                {(props.type != 'year' && props.type != 'month') ? <div className="title-month">{months[current.getMonth()]}</div> : ''}
            </div>
         <span onClick={next} id="next">&#62;</span>

        </div>
    )
}