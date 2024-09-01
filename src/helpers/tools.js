export function truncateText(txt,maximumLength=12){
  if(typeof txt === "string" && txt?.length && txt?.length > maximumLength){
    return txt.slice(0,maximumLength) + "..."
  }else{
    return txt
  }
}