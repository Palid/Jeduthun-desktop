function truncateString( n, useWordBoundary ){
    if (this.length <= n) { return this; }
    let subString = this.substr(0, n-1)
    return (useWordBoundary 
       ? subString.substr(0, subString.lastIndexOf(' ')) 
       : subString) + "..."
}

function secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60))
   
    let divisor_for_minutes = secs % (60 * 60)
    let minutes = Math.floor(divisor_for_minutes / 60)
 
    let divisor_for_seconds = divisor_for_minutes % 60
    let seconds = Math.ceil(divisor_for_seconds)
   
    let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    }
    return obj
}

export default {
  truncateString,
  secondsToTime
}