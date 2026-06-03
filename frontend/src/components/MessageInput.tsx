type MessageInputProps= {
    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

function MessageInput(
    {message, setMessage}:MessageInputProps
){
    return(
        <div>
        <input type="text"
        placeholder="digite uma mensagem"
        value={message}
        onChange={(event)=> setMessage(event.target.value)} />
        <p>mensagem atual: {message}</p>
        </div>
    )
}

export default MessageInput;