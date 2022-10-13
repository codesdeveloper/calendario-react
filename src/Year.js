import { months, week_names} from "./App";

export function Year(props) {

    let current = props.current;

    function days_list(ind) {
        const list = [];

        let dayStart = new Date(current.getFullYear(), ind, 1).getDay();
        let dayCount = new Date(current.getFullYear(), ind + 1, 0).getDate();

        //adicionando espacos vazios
        for (let i = 0; i < dayStart; ++i)
            list.push(<span class=""></span>);

        //adicionando dias do mes
        for (let i = 1; i <= dayCount; ++i) {

            let isTask = false;
            props.tasks.map((val) => {
                if (val.year == current.getFullYear() && val.month == ind && val.day == i) {
                    isTask = true;
                }
            })

            list.push(<span className="day" onClick={a => { click_month(ind, i) }}>
                {(isTask) ? <span style={{ color: '#0f0' }}>{((i < 10 ? '0' : '') + i)}</span> : ((i < 10 ? '0' : '') + i)}
            </span>);
        }
        return list;
    }

    function click_month(ind, day) {
        current.setMonth(ind);
        if (day) {
            current.setDate(day);
            props.setType('day');
        } else props.setType('month');
        props.animation(true);
    }

    return (
        <div className="box-year">
            {
                months.map((val, ind) => {
                    return (
                        <div className="box">
                            <h2 onClick={a => { click_month(ind) }}>{val}</h2>
                            <div className="box-title">
                                {week_names.map((i) => {
                                    return (<span>{i}</span>)
                                })}
                            </div>
                            <div className="box-content">
                                {days_list(ind)
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}