

import convertToBase64 from './base64.js';

const url = window.location.href;
const search = new URLSearchParams(url.split("?")[1]);
var id = search.get("id");
let bnr, pstr;


fetch(`http://localhost:3004/BookMyShow/MovieDetails/${id}`,{
  method:"POST"})
  .then((res)=>res.json())
  .then((data)=>{
    pstr=data.Movie_poster;
    bnr=data.Movie_banner;
    document.getElementById("main").innerHTML=`<form action="" class="form" id="frm"> 
          <label for="">Movie Title</label>
          <div><input type="text" value="${data.Movie_Title}" placeholder="Enter the Movie Name" class="m-name" id="movie-name"></div>
          <label for="">Movie Category</label>
          <div><input type="text" value="${data.Category}" placeholder="Enter the Category of Movie" class="m-name" id="category"></div>
          <div class="row">
            <div class="col-lg-6">
              <label for="">Rating</label>
              <div><input type="text" value="${data.Rating}" placeholder="Rating Out of 10" class="rating" id="rating"></div>
            </div>
            <div class="col-lg-6">
              <label for="">Release Date</label>
              <div><input type="date" value="${data.Release_date}" placeholder="dd/mm/yy" class="r-date" id="r-date"></div>
            </div>
          </div>
          <label for="" class="lng">Languages</label>
          <div><input type="text"  value="${data.Languages}" title="lnag" placeholder="Available languages" class="languages" id="languages"></div> 
          <textarea id="description" cols="31" rows="7" title="des" placeholder="Enter the short description about the movie"></textarea> 
          <div>
            <label for="">Upload Movie Banner</label>
            <input type="file" title="file" class="file" id="upload-banner">
            <div class="view-banner"><img src="${bnr}" id="bnr" alt="" class="edit-background-image"></div>
          </div> 
          <div>
            <label for="">Upload Movie Poster</label>
            <input type="file" title="file" class="file" id="upload-poster">
            <div class="view-poster" id="aaa"><img src="${pstr}" alt="" id="pstr" class="edit-poster-image"></div>
          </div> 
          <div class="sbmt-btn">
          <button id="submit-btn"> <a href="../index.html">Submit</a> </button>
          </div>
        </form>`;

        document.getElementById("upload-banner").addEventListener('change',async (e) => {
          const res = await convertToBase64(e.target.files[0]);
          bnr = res;
          document.getElementById("bnr").src = bnr;
                });
          
                document.getElementById("upload-poster").addEventListener('change',async (e) => {
                  const res = await convertToBase64(e.target.files[0]);
                  pstr = res;
                  document.getElementById("pstr").src = pstr;
                });

                  document.getElementById("submit-btn").addEventListener('click',
                  (e)=>{

                    e.preventDefault();
                    const Movie_Title=document.getElementById("movie-name").value;
                    const Category=document.getElementById("category").value;
                    const Rating=document.getElementById("rating").value;
                    const Release_date=document.getElementById("r-date").value;
                    const Languages=document.getElementById("languages").value;
                    const Description=document.getElementById("description").value;

                    fetch(`http://localhost:3004/BookMyShow/edit/${id}`,{
                      method:"PATCH",
                      headers: { "Content-Type": "application/json" },
                      body:JSON.stringify({
                        Movie_Title,
                        Category,
                        Rating,
                        Release_date,
                        Languages,
                        Description,
                        Movie_banner: bnr,
                        Movie_poster: pstr,
                      }),
                    })
                    .then((res) => {
                      consolec.log(res.status);
                      if (res.status !==404 ) {
                        alert("Data Added");
                      } else {
                        alert("Data not added");
                      }
                    })
                    .catch((error) => {
                      alert("Server not connected");
                    });
                });
              })
              .catch((error) => {
                alert("Server not connected");
              });
