import {availibility, database, fetchMovieAvailability, fetchMovieList} from "./api.js"
const loader= document.getElementById('loader');

window.onload=function async (){
    fetchMovieList().then(res=>{
        res.forEach(movie=>{
            const moviecontainer= document.querySelector(".movie-holder")
            const anchor= document.createElement("a");
            anchor.classList.add("movie-link");
            anchor.id="movie-link"
            anchor.innerHTML=`
                <div class="movie">
                    <div class="movie-img-wrapper" style="
                        background-image: url(${movie.imgUrl})">
                    </div>
                    <h4>${movie.name}</h4>
                </div>
            `
            moviecontainer.appendChild(anchor);
        })
        document.getElementById('loader').remove();
    }
        );
}

document.getElementById("movie-link").addEventListener("click",()=>{
    document.getElementById("booker").classList.toggle("show")
})

