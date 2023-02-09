
const INIT_TIMER_DELAY      = 2000;
const ONEMIN_TIMER          = (60 * 1000);
const ONE_HR_TIMER          = (60 * ONEMIN_TIMER);

function productTimer() {
    


    setTimeout(productTimer, ONE_HR_TIMER);
}



function initTimer() {
    productTimer();
}






setTimeout(initTimer, INIT_TIMER_DELAY);