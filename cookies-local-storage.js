class cookiesLocalStorage{
    url = 'https://api.openweathermap.org/data/2.5/weather?q=Brasov,ro&appid=f4d56e0eb5c06ebf7878120125559571';
    temperature;
    
    getTemp() {
        fetch(this.url)
        .then((res) => res.json())
        .then(temp);

        let measure = localStorage.getItem('unit') || document.cookie.split('=')[1];
        
        function temp(data){
                if (measure === 'C'){
                    cookiesLocalStorage.temperature = data.main.temp - 273.15;
                }
                else {
                    cookiesLocalStorage.temperature = (data.main.temp - 273.15) *9/5 +32;
                }
           
        const p = document.querySelector('p');
        p.innerHTML='The temperature in Brasov is: ' + cookiesLocalStorage.temperature.toFixed(1) + 
                    '&deg ' + (measure || "F");            
        }
    }
};
   
    const c = new cookiesLocalStorage();
    c.getTemp();
    document.addEventListener('change', handleChange);

    function handleChange(e) {
        if(e.target.name === 'unit') {
                // localStorage.setItem('unit', e.target.value);
                localStorage.clear();
                document.cookie = 'unit=' + e.target.value;
                document.querySelector('p').innerHTML = "";
                c.getTemp();
        }
    }






