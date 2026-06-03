import type { Messege as Messagetype } from "../types/message"

type Messageprops={
message: Messagetype
}

function Message ({message}:Messageprops){
return(
<div className="message">
    <strong>{message.author}</strong>
<p>{message.text}</p>
<small>{message.time}</small>
</div>
)
}

export default Message