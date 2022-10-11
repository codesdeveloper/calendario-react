import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header';
import { Year } from './Year';
import { Month } from './Month';
import { Day } from './Day';
import { Week } from './Week';
import { Subheader } from './Subheader';
import { Task } from './Task';

export const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
export const week_names = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

const data = JSON.parse(window.localStorage.getItem('list_tasks'));
export let list_tasks = (data != null) ? data : [];


export function remove_task(i){
  list_tasks = list_tasks.slice(i, 1);
}

export function tasks_change(){
  window.localStorage.setItem('list_tasks', JSON.stringify(list_tasks));
  list_tasks.sort((a, b) => {
    if(a.year > b.year) return -1;
    else if(b.year > a.year) return 1;
    else if(a.month > b.month) return - 1;
    else if(b.month > a.month) return 1;
    else if(a.day > b.day)return -1;
    else if(b.day > b.day)return 1;
    else if(a.hour > b.hour) return -1
    else return 1;
});
}


function App() {

  tasks_change();

  const [type, setType] = useState('task');
  const [anim, setAnim] = useState(false);
  const [current, setCurrent] = useState(new Date());

  useEffect(() => {
    if (anim) {
      document.documentElement.style.overflow = 'hidden';
      setTimeout(() => {
        document.documentElement.style.overflow = 'overlay';
        setAnim(false);
      }, 400);
    }

  });

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
              (type == 'year') ? <Year animation={setAnim} setType={setType} current={current} setCurrent={setCurrent} /> :
                (type == 'month') ? <Month animation={setAnim} setType={setType} current={current} setCurrent={setCurrent} /> :
                  (type == 'day') ? <Day animation={setAnim} current={current} /> :
                    (type == 'week') ? <Week animation={setAnim} setType={setType} current={current} /> :
                      (type == 'task') ? <Task animation={setAnim}/> : ''
            }
          </section>
          <footer>
            <span>&#169; 2022 - Todos os direitos reservados</span>
          </footer>
        </div>

        

      </div>
    </div>
  );
}

export default App;
