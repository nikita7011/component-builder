"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select"
import { Card } from "../ui/card";
import { useState } from "react";
const RequestBar = ()=>{
    const [method, setMethod] = useState("GET")
    const [url, setUrl] = useState("")
    return(
        <>
        <Card>
       <Select value={method} onValueChange={setMethod}>
       <SelectTrigger>
        <SelectValue />
       </SelectTrigger>
       <SelectContent> 
        <SelectItem value="GET">GET</SelectItem>
        <SelectItem value="PUT">PUT</SelectItem>
        <SelectItem value="POST">POST</SelectItem>
        <SelectItem value="DELETE">DELETE</SelectItem>
       </SelectContent>
       </Select>
        <Input placeholder="Enter request url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        />
        <Button>Send</Button>
        </Card>
        </>
    )
}
export default RequestBar;