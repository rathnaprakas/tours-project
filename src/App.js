import { useEffect, useState } from "react"
import Tours from "./Tours";
import Loading from "./Loading";

let url='https://course-api.com/react-tours-project'

function App() {
  let [data,setData]=useState([]);
  let [loading,setLoading]=useState(true);
  let fetchData= async ()=>{
    let raw=await fetch(url)
    let info=await raw.json()
    setData(info)
    setLoading(false)
  }
  useEffect(()=>{fetchData()},[])
  let removeTour=(id)=>{
    let newdata=data.filter(i=>i.id!==id)
    setData(newdata)
  }

  if (loading){
    return <main>
      <Loading/>
    </main>
  }
  if (data.length===0){
    return <main>
      <div className="title">
      <h2>No Tours Left</h2>
      <button className="btn" onClick={()=>{fetchData()}}>refresh</button>
      </div>
    </main>
  }
  return (
    <main>
    <section>
      <div className="title">      
      <h2>Our Tours</h2>
      <div className="underline"></div></div>
      <div>
      {data.map(i=><Tours {...i} removeTour={removeTour} key={i.id}/>)}
      </div>
    </section>
    </main>
  );
}

export default App;
