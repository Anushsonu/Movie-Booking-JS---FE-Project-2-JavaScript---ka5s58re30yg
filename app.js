import {availibility, database, fetchMovieAvailability, fetchMovieList} from "./api.js"
const loader= document.getElementById('loader');

// loader and moviefetch

window.onload=function async (){
    fetchMovieList().then(res=>{
        res.forEach((movie,i)=>{
            const moviecontainer= document.querySelector(".movie-holder")
            const anchor= document.createElement("a");
            anchor.classList.add("movie-link");
            anchor.id=`movie-link-${i}`
            anchor.innerHTML=`
                <div class="movie" >
                    <div class="movie-img-wrapper" style="
                        background-image: url(${movie.imgUrl})" data-d="${movie.name}">
                    </div>
                    <h4>${movie.name}</h4>
                </div>
            `
            moviecontainer.appendChild(anchor);
            document.getElementById(`movie-link-${i}`).addEventListener("click",(e)=>{
                // console.log(e.target.dataset.d);
                const seatSelector=document.getElementsByClassName("v-none")
                if(seatSelector.length)
                    seatSelector[0].classList.remove("v-none");
                fetchMovieAvailability(e.target.dataset.d).then(res=>{
                    const booking= document.getElementsByClassName("booking-grid")
                    booking[0].innerHTML=""
                    booking[1].innerHTML=""
                    for(let i=1; i<=24; i++){
                        const el=document
                            .createElement("div")
                            el.innerHTML=`
                            <p>${i}</p>
                        `
                        el.classList.add(`booking-grid-${i}`)
                        el.classList.add(`available-seat`)
                        if(res.find((er)=>er===i)){
                            el.classList.add('unavailable-seat')
                            
                        }
                        
                        if(i<=12){
                            
                            booking[0].appendChild(el)
                            
                        }
                        else{
                            booking[1].appendChild(el)
                        }
                    }
                })
                document.getElementById("booker").classList.add("show")
                //console.log({i},1)
                const currentSeat= document.getElementById(`booker-grid-holder`)
                currentSeat.addEventListener("click",(e)=>{
                    if(e.target.classList.contains('available-seat') && !e.target.classList.contains('unavailable-seat')){
                        e.target.classList.toggle('active-seat')
                        
                        const activeSeat= document.getElementsByClassName("active-seat")
                        console.log(activeSeat)
                        if (activeSeat.length){
                            document.getElementById("book-ticket-btn").classList.remove("v-none")
                        }
                        else{
                            document.getElementById("book-ticket-btn").classList.add("v-none")
                        }
                    }
                    
                })

                document.getElementById("book-ticket-btn").addEventListener("click",()=>{
                    //document.getElementById("booker").classList.add("v-none");
                    
                    //console.log(123)
                    const main= document.getElementById("booker");
                    const seat= document.getElementsByClassName("active-seat")
                    const seats=[]
                    Array.from(seat).forEach((el)=>{
                        const curr=(el.children[0].innerHTML);
                        seats.push(curr)
                    })
                    seats.toString();
                    document.getElementById("booker").innerHTML='';

                    const purchaseForm= document.createElement('div');
                    purchaseForm.id="confirm-purchase";
                    purchaseForm.innerHTML=`
                    <h3>Confirm your booking for seat numbers:${seats}</h3>
                    <form id="customer-detail-form">
                        <input type="email" id="email" placeholder= "email" required><br>
                        <input type="tel" id="number" placeholder= "phone" required>
                        <button type="button" id="submit" >Submit</button>
                    </form>`
                    main.appendChild(purchaseForm);

                    document.getElementById("submit").addEventListener("click",()=>{
                        console.log(2);
                        
                        console.log(112);
                        const email= document.getElementById("email").value
                        const number= document.getElementById("number").value
                        document.getElementById("booker").innerHTML='';
                        const success= document.createElement('div')
                        success.id="success"
                        success.innerHTML=`
                            <h3>Booking details</h3><br>
                            <h5>Seats: ${seats}</h5>
                            <h5>Phone number: ${number}</h5>
                            <h5>Email: ${email}</h5>
                        `
                        document.getElementById("booker").appendChild(success)
                    })
                })
            })
        })
        
        document.getElementById('loader').remove();
        }
    );
}

// display grid after anchor click



// get availability of seats

// function async(){
//     fetchMovieAvailability().then(movie=>{
//         movie.forEach(seat=>{
//             const booking = document.getElementByClassName("booking-grid")
            
//         })
//     })
// }






























