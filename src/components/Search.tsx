import React, {useState} from 'react';
interface searchProps{
onLoadIssues:(issues:{id:number,description:string,name:string}[])=>void;
}

const Search:React.FC<searchProps>=props=>{
let {onLoadIssues}=props;
const [enteredFilter,setEnteredFilter]=useState('');


const onChange=(value: React.SetStateAction<string>)=>{
    setEnteredFilter(value);                   
        }
        const onEnter=(event: { key: string; })=>{
            if(event.key==="Enter"){
                    fetch(`https://api.github.com/repos/facebook/react/issues${enteredFilter?`/${enteredFilter}`:''}`)
            .then(response=>response.json())
            .then(responseData=>{
                const loadedIngredients = [];
                console.log(responseData);
                if(enteredFilter === "")
                {
                    for(const key in responseData){
                        loadedIngredients.push({
                            id:responseData[key].number,
                            description:responseData[key].title,
                            name:responseData[key].user.login,
                        })
                    }
                }
                else
                {
                    loadedIngredients.push({
                        id:responseData.number,
                            description:responseData.title,
                            name:responseData.user.login,
                    })
                }
                onLoadIssues(loadedIngredients);
            })
            .catch(error=>{
                console.log(error);
            onLoadIssues([{
                id:0,
                description:'',
                name:'',
        }]);
    }); 
            }
        }
   


  return (
    <section className="search">
      
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFilter}
            onKeyDown={event => onEnter(event)}
            onChange={event=>onChange(event.target.value)}
          />
        </div>
      
    </section>
  );
};
export default Search;