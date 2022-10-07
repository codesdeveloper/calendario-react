import { months, week_names, list_tasks } from "./App";

export function Year(props) {

    function days_list(ind) {
        const list = [];

        let dayStart = new Date(props.current.year, ind, 1).getDay();
        let dayCount = new Date(props.current.year, ind + 1, 0).getDate();

        //adicionando espacos vazios
        for (let i = 0; i < dayStart; ++i)
            list.push(<span class=""></span>);

        //adicionando dias do mes
        for (let i = 1; i <= dayCount; ++i) {

            let isTask = false;
            list_tasks.map((val) => {
                if (val.year == props.current.year && val.month == ind && val.day == i) {
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
        props.current.month = ind;
        if (day) {
            props.current.day = day;
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