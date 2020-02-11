console.log('js is loaded')




var weatherForm = document.querySelector('form')
var search = document.querySelector('input')
var message1 = document.querySelector('#message-1')
var message2 = document.querySelector('#message-2')





weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    var location = search.value
    message1.textContent = 'Loading...';
    message2.textContent = '';

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then(({error,location,forecastData}={})=>{
       if (error){
        message1.textContent = (error);
        message2.textContent = '';  
       }else{
        message1.textContent = (location);
        message2.textContent = forecastData;
            
       }


    })
})
})