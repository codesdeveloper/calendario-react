import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header';
import { Year } from './Year';
import { Month } from './Month';
import { Day } from './Day';
import { Week } from './Week';
import { Subheader } from './Subheader';
import { Task } from './Task';
import { Modal } from "./Modal";

export const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
export const week_names = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

//const data = JSON.parse(window.localStorage.getItem('list_tasks'));
//export let list_tasks = (data != null) ? data : [];


/*
export function tasks_change(){
  //window.localStorage.setItem('list_tasks', JSON.stringify(list_tasks));
  tasks.sort((a, b) => {
    if(a.year > b.year) return -1;
    else if(b.year > a.year) return 1;
    else if(a.month > b.month) return - 1;
    else if(b.month > a.month) return 1;
    else if(a.day > b.day)return -1;
    else if(b.day > b.day)return 1;
    else if(a.hour > b.hour) return -1
    else return 1;
});
}*/


function App() {

  const [tasks, setTasks] = useState(null);
  const [type, setType] = useState('task');
  const [anim, setAnim] = useState(false);
  const [current, setCurrent] = useState(new Date());
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (anim) {
      document.documentElement.style.overflow = 'hidden';
      setTimeout(() => {
        document.documentElement.style.overflow = 'overlay';
        setAnim(false);
      }, 400);
    }

    tasks.sort((a, b) => {
      if (a.year > b.year) return -1;
      else if (b.year > a.year) return 1;
      else if (a.month > b.month) return - 1;
      else if (b.month > a.month) return 1;
      else if (a.day > b.day) return -1;
      else if (b.day > b.day) return 1;
      else if (a.hour > b.hour) return -1
      else return 1;
    });

    window.localStorage.setItem('list_tasks', JSON.stringify(tasks));

  });

  if (tasks == null) setTasks(JSON.parse(window.localStorage.getItem('list_tasks')));

  return (
    <div className="App">
      <div className="container">

        {
          (anim) ? <div className="animation">
            <div className="rotate"></div>
          </div> : ''
        }

        <div className='content'>
          <Header type={type} setType={setType} animation={setAnim} />

          {(type != 'task') ? <Subheader type={type} animation={setAnim} current={current} setCurrent={setCurrent} /> : ''}

          <hr />
          <section>
            {
              (type == 'year') ? <Year tasks={tasks} animation={setAnim} setType={setType} current={current} setCurrent={setCurrent} /> :
                (type == 'month') ? <Month tasks={tasks} animation={setAnim} setType={setType} current={current} setCurrent={setCurrent} /> :
                  (type == 'day') ? <Day tasks={tasks} setModal={setModal} animation={setAnim} current={current} /> :
                    (type == 'week') ? <Week tasks={tasks} setModal={setModal} animation={setAnim} setType={setType} current={current} /> :
                      (type == 'task') ? <Task setTasks={setTasks} tasks={tasks} animation={setAnim} setModal={setModal} /> : ''
            }
          </section>
          <footer>
            <span>&#169; 2022 - Todos os direitos reservados</span>
          </footer>
        </div>

        {
          (modal != null) ? <Modal data={modal} close={() => { setModal(null) }} /> : ''
        }


      </div>
    </div>
  );
}

export default App;
