
import './App.css';
import {useEffect,useState} from 'react';


function App(){

  const [name, setname] = useState("");
  const [pic, setpic] = useState("");
  const [user1, setUser1] = useState([]);

 // console.log(user1)
  //var names=["Parth" , " rohit" , "Raj"]

  //const [names, setnames] = useState(" ");

  useEffect(() => {
    getUsers();
  }, []);


  const getUsers=()=> {

    fetch("https://60ebd304e9647b0017cdde45.mockapi.io/users", {
      method: "GET"
    })
      .then((data) => data.json())
      .then((people) =>   setUser1(people));
      
  };






  const adduser = () => {
   

    fetch("https://60ebd304e9647b0017cdde45.mockapi.io/users",{
    method: "POST",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       name:name,
       pic:pic
      })
    }).then(()=>getUsers())
      
   
  }


  
 

  return (
   
    <div className="App">
       <form>
        <input
          className="input"
          value={name}
          placeholder="enter name"
          onChange={(event) => setname(event.target.value)}
        ></input>
        
        <br />
        
        <input
          value={pic}
          placeholder="url"
          onChange={(event) => setpic(event.target.value)}
        ></input>


       <button
          className="bt"
          onClick={
           adduser            //setUser1([...user1, { name, pic }]);
          }
        >

          Add User
        </button>
              
      </form>       
       
    {user1.map((ur)=>(
    
      <User  key={ur.id}  name={ur.name} pic={ur.pic} id={ur.id} getUsers={getUsers}  ></User>
    ))
}
    
    </div>

  );
  }              

function User({ name, pic, id, getUsers }) {
  
  console.log(name,id)

  const Delete = () => {
    fetch("https://60ebd304e9647b0017cdde45.mockapi.io/users/"+id, {
      method: "DELETE"
    }).then(() =>getUsers());
  };



  


 const [edit,setedit]=useState(false);

  return (
    //   alternative to  use props , we can use destructuring
    <>
      
         <div className="usercard"  >
         <img
           className="userpic"
           src={pic}
           alt={name}
           height="100px"
           //width="50px"
         />{" "}
         <div>
            {" "}
           <p className="username"> {name}</p>
           <button onClick={Delete}>Delete</button>
           <button onClick={()=>setedit(!edit)} >Edit</button>
         </div>
       </div>
          {  edit? <Edit name={name} pic={pic} id={id} getUsers={getUsers}    setedit={setedit}    ></Edit>: ""  } 
      
      </>
  )
}



function Edit({name,pic,id,getUsers ,setedit}){
  
  const [name1,setname]=useState(name);
  const [pic1,setpic]=useState(pic)
  
  

  const edit = () => {
    //1.fetch
    //2.body-new user-stringify it
    //3.header -json data we are going to send
    setedit(false)
    fetch("https://60ebd304e9647b0017cdde45.mockapi.io/users/" + id, {
    method: "PUT",
      header: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
       name:name1,
       pic:pic1
      })
    }).then(()=>getUsers())
      
   
  }


  return(
   
   <div className="App">
    <form>
     <input
       className="input"
       value={name1}
       placeholder="enter name"
       onChange={(event) => setname(event.target.value)}
     ></input>
     
     <br />
     
     <input
       value={pic1}
       placeholder="url"
       onChange={(event) => setpic(event.target.value)}
     ></input>


    <button
       className="bt"
       onClick={
        edit         //setUser1([...user1, { name, pic }]);
       }
     >

       Edit User
     </button>
           
   </form>       
  </div>

  )
  }













export default App;
