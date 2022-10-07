import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header';
import { Year } from './Year';
import { Month } from './Month';
import {Day} from './Day';
import {Week} from './Week';
import { Subheader } from './Subheader';

export const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
export const week_names = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
export const list_tasks = [
  {
      name: 'Corta o cabelo',
      description: 'Salão de seu Zé',
      day: 7,
      month: 0,
      year: 2022,
      hours: 13
  },
  {
      name: 'Viajar para o sul',
      description: 'Passeia com a família fim de ano',
      day: 20,
      month: 11,
      year: 2020,
      hours: 3
  },
  {
      name: 'Cortar grama',
      description: 'Usar maquina nova para o serviço',
      day: 8,
      month: 0,
      year: 2022,
      hours: 3
  },
  {
      name: 'Fazer um curso',
      description: 'Na area que mais gosto',
      day: 14,
      month: 1,
      year: 2022,
      hours: 15
  },
  {
      name: 'Entrar na academia',
      description: 'Mudança de vida',
      day: 3,
      month: 6,
      year: 2013,
      hours: 15,  
  }
];


function App() {

  const [type, setType] = useState('year')
  const [anim, setAnim] = useState(false);
  const [current, setCurrent] = useState({
    year: 2022,
    month: 9,
    day: 7,
    hour: 7,
    week: 0
  });

  useEffect(() => {
    if (anim) {
      setTimeout(() => {
        setAnim(false);
      }, 400);
    }

    //gerar numero da semana
    var currentdate = new Date(current.year, current.month, current.day - 1);
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    current.week = Math.ceil((numberOfDays) / 7);
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
          <Header type={type} setType={setType} animation={setAnim}/>
          <Subheader type={type} animation={setAnim} current={current} setCurrent={setCurrent}/>
          <hr/>
          <section>
            {
              (type == 'year') ? <Year animation={setAnim} setType={setType} current={current} setCurrent={setCurrent} /> :
              (type == 'month') ? <Month animation={setAnim} setType={setType} current={current} setCurrent={setCurrent} /> :
              (type == 'day') ? <Day current={current}/>:
              (type == 'week') ? <Week current={current}/>:
              ''
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
