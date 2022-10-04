import logo from './logo.png'

export function Header(props){


    function changer(){
        let value = document.getElementById('header-type').value;
        props.setType(value);
    }

    return(
         <header>
                <div className="box-type">
                    <h2>Tipo de data</h2>
                    <select onChange={changer} value={props.type} id="header-type" name="type">
                        <option value="ano">Ano</option>
                        <option value="mes">Mes</option>
                        <option value="semana">Semana</option>
                        <option value="dia">Dia</option>
                        <option value="tarefas">Tarefas</option>
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