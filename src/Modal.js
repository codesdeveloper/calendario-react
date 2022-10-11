import {list_tasks, remove_task, tasks_change } from "./App";

export function Modal(props) {

    let data = props.data;

    function close() {
        props.open(false);
    }

    function submit() {
        let name = document.querySelector('.modal-content input[type=text]').value;
        let desc = document.querySelector('.modal-content textarea').value;
        let date = document.querySelector('.modal-content input[type=date]').value;
        let time = document.querySelector('.modal-content input[type=time]').value;
        let erro = document.querySelector('.modal-erro');

        if (name == '') erro.innerText = 'Digite um nome válido!'
        else if (desc == '') erro.innerText = "Digite uma descrição válida!"
        else if (date == '') erro.innerText = 'Digite uma data válida!';
        else if (time == '') erro.innerText = 'Digite uma hora válida!';
        else {
            let arr = date.split('-');
            props.sucess({
                id: new Date().getTime(),
                name: name,
                description: desc,
                year: parseInt(arr[0]),
                month: parseInt(arr[1]) - 1,
                day: parseInt(arr[2]),
                hour: parseInt(time.split(':')[0])
            })
            close();
        }

    }

    function remove(){
        list_tasks.map((e, i) => {
            if(e.id == props.data.id) remove_task(i);
        })

        tasks_change();
        close();
    }

    return (
        <div className='modal'>
            <div onClick={close} className='modal-container'></div>


            <div className='modal-content'>
                <span className='modal-title'>{props.title}</span>
                <span onClick={close} className='modal-close'><i class="bi bi-x"></i></span>

                {(props.type != 'remove') ?
                    <div>
                        <label>Nome:
                            <input placeholder='Digite o nome da tarefa...' type='text' maxLength='30' />
                        </label>
                        <label>Descrição:
                            <textarea placeholder='Digite a descrição da tarefa...' maxLength='110'>{(props.data != null) ? props.data.description : ''}</textarea>
                        </label>

                        <div className='modal-infos'>
                            <label for='moda-date'>Data:</label>
                            <span className='modal-erro'></span>
                            <label for='modal-time'>Horas:</label>
                        </div>

                        <div className='modal-date'>
                            <input value='2022-10-09' contenteditable='true' id='moda-date' type='date' />
                            <input id="modal-time" type='time' />
                        </div>
                        <button onClick={e => submit()}>Salvar</button>
                    </div>

                    :
                    <div>
                        <span className="modal-name">{props.data.name}</span>
                        <span className="modal-desc">{props.data.description}</span>
                        <button onClick={close} className="btn-remove" style={{ background: 'green' }}>Não</button>
                        <button onClick={remove} className="btn-remove" style={{ background: 'red' }}>Sim</button>
                    </div>
                }



            </div>


        </div>
    )
}