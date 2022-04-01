const tasks = require('../model/task.model');
const webpush = require('web-push');

const subscription = {
    endpoint:"https://fcm.googleapis.com/fcm/send/dpfJ_1RDWVQ:APA91bFJeQLIUWXvqmnrJ8XZ8muWNoSS2FZlqQZBBBDUnpNhtv8X4f8LQRhGwflsyXb7jp2ON21Vz9ePwsU0ov-NKlCvTPI9VQoV8bR1OHUmzC8poTWN9QmqieOYKYA61WV47NuRa3UY",
    expirationTime:null,
    keys:{
        p256dh:"BMx2d_FvnLFP2-0HwXlVbVJs-I-V0GgL30qZ3eK352DcSYXK7EceM46WXiAii9o0wQ4HWa6Hrr8Q34HdUG4rNS4",
        auth:"noKAj0y7JQ9hZTW0a_h20Q"
    }
}

const payload = {
    notification: {
        title: 'Title',
        body: 'This is my body',
        icon: 'assets/icons/icon-384x384.png'
    },
};

const options = {
    vapidDetails: {
        subject: 'mailto:imshaileshr@gmail.com',
        publicKey: process.env.PUBLIC_KEY,
        privateKey: process.env.PRIVATE_KEY,
    },
    TTL: 60,
};

function postMessage(payload){
    webpush.sendNotification(subscription, JSON.stringify(payload), options)
        .then((_) => {
            console.log('SENT!!!');
            console.log(_);
        })
        .catch((_) => {
            console.log(_);
    });
}

function checkTasks(){
    tasks.findOne({status:''}).sort({due:1}).exec((err,data)=>{
        let diff = (new Date(data.due) - new Date()) / (1000 * 60);
        console.log(data,diff,new Date(data.due) - new Date());
        if(diff > 0 && diff < 5){
            postMessage({notification: {
                title: 'Times Up da',
                body: data.name,
                icon: 'assets/icons/icon-384x384.png'
            }})
        }
    });
}

module.exports = checkTasks;