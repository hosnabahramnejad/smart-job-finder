async function getExchangeRate(fcurrency, tcurrency) {
    const response = await fetch(`https://api.frankfurter.dev/v1/latest?from=${fcurrency}&to=${tcurrency}`);
    const exchangedata = await response.json();
    return exchangedata;
}

async function getCountryInfo(countryName) {
    const response = await fetch(`https://api.restcountries.com/countries/v5?q=${countryName}`,
        { headers: { 'Authorization': 'Bearer rc_live_4139ee292ad643b2b85957276c977fff' } }
    );
    const data = await response.json();
    let result = data.data.objects[0];
     return result; 
}