import logo from './logo.png'

export function Header(props){

    function changer(){
        let value = document.getElementById('header-type').value;
        props.setType(value);
        props.animation(true);
    }

    document.activeElement.blur();

    return(
         <header>
                <div className="box-type">
                    <select onChange={changer} value={props.type} id="header-type" name="type">
                        <option value="year">Ano</option>
                        <option value="month">Mes</option>
                        <option value="week">Semana</option>
                        <option value="day">Dia</option>
                        <option value="task">Tarefas</option>
                    </select>
                </div>

                <div className="title">
                    <h2>Calendario</h2>
                </div>

                <div className="logo">
                    <img src={logo}/>
                </div>
            </header>
    )
}