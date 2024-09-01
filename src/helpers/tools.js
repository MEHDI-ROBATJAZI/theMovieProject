export function truncateText(txt,maximumLength){
  if(txt.length > maximumLength){
    return txt.slice(0,maximumLength) + "..."
  }else{
    return txt
  }
}