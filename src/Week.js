

export function Week(props) {

    //gerar dias da semana
    const week_days = [];


    let dayStart = new Date(props.current.year, props.current.month, props.current.day).getDay();
    let dayCount = new Date(props.current.year, props.current.month + 1, 0).getDate();

     //adicionando espacos vazios
     for (let i = -dayStart; i <= 0; ++i)
        week_days.push(<span>{props.current.day + i}</span>);

     //adicionando dias do mes
     for (let i = 1; i < 7 - dayStart; ++i){
        var ii = props.current.day + i;
        if(ii > dayCount){
            week_days.push(<span>0{ii - dayCount}</span>);
        }else week_days.push(<span>{ii < 10 ? '0' : ''}{ii}</span>);
     }





   /* for(var i = 0;i < 7; ++i){
        var ind = props.current.week * 7;
        week_days.push(<span>{ind}</span>);
    }*/

    

    var tt = new Date(props.current.year, props.current.month, props.current.day - 1);



    console.clear();
    //console.log(currentdate, result);


    return (



        <div className="box-week">
            <div className="week-list">
                {week_days}
            </div>
            <div className="week-container">
                <div className="week-hour">
                    {/*24 dias*/}
                </div>
                <div className="week-content">
                    {/* 168 dias*/}

                </div>
            </div>



            {/*
        //para teste de implementoção
    let sem = [28, 29, 30, 1, 2, 3, 4];
    let semId = 25;

    let opts = ``;
    for (var i = -10; i <= 10; ++i)
        opts += `<option value="${i}" ${(i == 0) ? 'selected' : ''}>sem. ${semId + i}</option>`;
    $('.alter #select').html(opts)

    let week = $('.box-week');
    week.css('display', 'flex')
    let txt_list = '<div class="week-list">';

    for (var i = 0; i < 7; ++i) txt_list += `<span>${(sem[i] < 10) ? ('0' + sem[i]) : sem[i]}</span>`;

    txt_list += '</div><div class="week-container"><div class="week-hour">';
    for (var i = 0; i < 24; ++i)txt_list += '<span>' + (i < 10 ? ("0" + i) : i) + '</span>';
    
    txt_list += '</div><div class="week-content">';
    for (var i = 0; i < 168; ++i)txt_list += '<span>não ha tarefas</span>';


    txt_list += '</div></div>';
    week.html(txt_list);
    */}


        </div>
    )
}