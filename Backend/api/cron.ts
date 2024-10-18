import { CronJob } from "cron";

 const backendUrl = 'https://peakcamp-api.onrender.com'; 
 export const job = new CronJob('*/14 * * * *', function () {  
    console.log('Restarting server'); 
    fetch(backendUrl)
        .then((res)=>{
            if (!res.ok) {
                throw new Error(`Response status: ${res.status}`);
            }
            return res.text()
        }) 
        .catch((err)=>{
            console.log(err)
        })
});

    