import React, {useState,useEffect,useCallback} from 'react';
import Search from './Search';
import './Issues.css';
import Pagination from './Pagination';
interface getIssues{
    id:number,
    description:string,
    name:string,
}
    const Issues: React.FC = () => {
        const [currentIssues, setcurrentIssues] = useState<getIssues[]>([]); 
        const[currentPage,setCurrentPage] =useState<number>(1);
        const[issuesPerPage,setIssuesPerPage]=useState<number>(5);    
        useEffect(()=>{
            const loadedissues:{id:number,description:string,name:string}[]=[];
            fetch('https://api.github.com/repos/facebook/react/issues')
            .then(response=>response.json())
            .then(responseData=>{
                for(const key in responseData){
                    loadedissues.push({
                        id:responseData[key].number,
                        description:responseData[key].title,
                        name:responseData[key].user.login,
                    })
                }
                setcurrentIssues(loadedissues);
            })     
        },[])
        const filteredIssues= useCallback(filteredIssues => {
            setcurrentIssues(filteredIssues);
          }, []);
          const indexOfLastIssue=currentPage*issuesPerPage;
          const indexOfFirstIssue=indexOfLastIssue-issuesPerPage;
          const IssuesInPage=currentIssues.slice(indexOfFirstIssue,indexOfLastIssue);
    return (<div>
        
      <Search onLoadIssues={filteredIssues}/>    
      
          <table>
           <tr>
           <th>id</th>
           <th>description</th>
           <th>name</th>
       </tr>
        {IssuesInPage.map(issue=>(
           
           <tr key={issue.id}>
               <td >{issue.id}</td>
               <td>{issue.description}</td>
               <td>{issue.name}</td>
           </tr> 
           
        ))}
          </table>   
           
         
          <Pagination 
           issuesPerPage= {issuesPerPage} 
            paginate= {(pageNumber)=>{setCurrentPage(pageNumber);} } 
            totalIssues={currentIssues.length} />
          
    </div>
)
}
export default Issues;