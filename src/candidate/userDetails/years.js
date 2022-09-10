const myDate = new Date();

    let myYear = myDate.getFullYear();

    myYear--;

    export let currentYear = [];

    for(myYear; myYear > 1950 ; myYear--){
        currentYear.push(myYear);
    }