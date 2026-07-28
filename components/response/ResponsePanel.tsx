"use client"
import { Card } from "../ui/card"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { ScrollArea } from "../ui/scroll-area"

const mock = {
    status:200,
    time:"100 ms",
    size:"1.3 kb",
    data:{
        id:1,
        name:"john doe",
        email:"john@hi.com",
        role:"admin"
    }
}
const ResponsePanel=()=>{
    return(
        <Card>
            <div>
                <Badge>Status: {mock.status}</Badge>
                <span>
                    Time:{mock.time}
                </span>
                <span>
                    Size: {mock.size}
                </span>
            </div>
            <Separator/>
            <ScrollArea>
                <pre>
                    {JSON.stringify(mock.data, null, 2)}
                </pre>
            </ScrollArea>
        </Card>
    )
}
export default ResponsePanel