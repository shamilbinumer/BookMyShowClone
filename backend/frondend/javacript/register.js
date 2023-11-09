import convertToBase64 from './base64.js';
let btn=document.getElementById("submit-btn");
   
document.getElementById("frm").addEventListener("submit",async (e)=>{
    e.preventDefault();
    // console.log(e.target[6].files[0]);
    const banner=await convertToBase64(e.target[6].files[0])
    console.log(banner);
    const poster=await convertToBase64(e.target[7].files[0])
    console.log(poster);
    let moviename=document.getElementById("movie-name").value;
    let moviecategory=document.getElementById("category").value;
    let rating=document.getElementById("rating").value;
    let rDate=document.getElementById("r-date").value;
    let languages=document.getElementById("languages").value;
    let description=document.getElementById("description").value;
    // let uploadBanner=document.getElementById("upload-banner").value;
    // let uploadPoster=document.getElementById("upload-poster").value;
    
 
    fetch("http://localhost:3004/BookMyShow/register",{
     method:"POST",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({
        Movie_Title:moviename,
        Category:moviecategory,
        Rating:rating,
        Release_date:rDate,
        Languages:languages,
        Description:description,
        Movie_banner:banner,
        Movie_poster:poster
       })
 }).then(()=>{
     alert("Movie Added");
 }).catch("Error")   
})
