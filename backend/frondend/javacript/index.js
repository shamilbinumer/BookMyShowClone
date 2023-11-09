async function getMovie(){
    const task=await fetch("http://localhost:3004/BookMyShow/movies");
    const data=task.json();
   data.then((dt)=>{
    s="";
     dt.map(d=>{
        console.log(d);
        s+=`
            <div class="col-lg-3 col-md-6 col-sm-6">
                <a href="./pages/movei-details.html?id=${d._id}" title="link"><img src="${d.Movie_poster}" alt=""></a>
                <p class="movies-p1" id="play-now-para">${d.Movie_Title}</p>            
                <p class="movies-p2" id="play-now-para-2">${d.Languages}</p>
            </div>`
    });
    document.getElementById("row").innerHTML=s
   })

   const key= localStorage.key(0);
   const value=JSON.parse(localStorage.getItem(key));
   fetch("http://localhost:3004/BookMyShow/home",{
    headers:{Authorization: `Bearer ${value}`},
   })
   .then((res)=>res.json())
   .then((data)=>{
    const{msg}=data;
    document.getElementById("name").innerHTML=msg?`${msg}<button id="logout" onclick="logout()">Logout</button>
    <a href="./pages/register-movie.html" class="logout"><button>Register</button></a>`:
   `<a class="sgn" href="./register.html" class="logout"><button class="sgn-btn">Sign up</button></a>`
   })
   .catch((error)=>{
    console.log(error);
   })
    
   
}
getMovie();

async function searchFunction(){
    let inp=document.getElementById("search-bar");
    try{
       res=await fetch("http://localhost:3004/BookMyShow/movies")
        data=await res.json();
        console.log(data);
        s="";
        let text=inp.value
        data.filter((dt)=>{
            if(dt.Movie_Title.startsWith(text)){
              s+=`<div class="col-lg-3 col-md-6 col-sm-6">
              <a href="./pages/movei-details.html?id=${dt._id}" title="link"><img src="${dt.Movie_poster}" alt=""></a>
              <p class="movies-p1" id="play-now-para">${dt.Movie_Title}</p>            
              <p class="movies-p2" id="play-now-para-2">${dt.Languages}</p>
          </div>`
            }
           
        })
        document.getElementById("row").innerHTML=s
    }catch(error){
        console.log("error");
    }
}

function logout() {
    var confirmed = confirm("Are you sure you want to log out?");
    if (confirmed) {
        localStorage.clear();
        location.reload();  
    }
}