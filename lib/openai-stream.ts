import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser"


export type ChatGPTAgent="user"|"system"
export interface ChatGPTMessage{
  role:ChatGPTAgent,
  content:string
}

export interface OpenAIStreamPayload{
  model:string,
  messages:ChatGPTMessage[],
  temperature:number,
  top_p:number,
  frequency_penalty:number,
  presence_penalty:number,
  max_tokens:number,
  stream:boolean,
  n:number,
}

export async function OpenAIStream(payload:OpenAIStreamPayload){
  const encoder=new TextEncoder()
  const decoder=new TextDecoder()
  let counter=0
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error from OpenAI API:', res.status, errorText);
    throw new Error(`OpenAI API error: ${res.status} ${errorText}`);
  }


  const stream=new ReadableStream({
    async start(controller){
      function onParse(event:ParsedEvent|ReconnectInterval){
        if(event.type==="event"){
          const data=event.data;
          if(data==='[DONE]'){
            controller.close()
            return
          }
          try{
            const json=JSON.parse(data)
            const text=json.choices[0].delta?.content || ''
            // console.log(text);
            if(counter<2 && (text.match(/\n/)|| []).length){
              return
            }
            const queue=encoder.encode(text)
            controller.enqueue(queue)
            counter++;
          }catch(err){
            controller.error(err)
          }
        }

      }
      const parser=createParser(onParse)
      for await (const chunk of res.body as any){
        parser.feed(decoder.decode(chunk))
      }
    }
  })
  return stream
  
}