"use client"
import {
    Tabs, 
    TabsContent,
    TabsList,
    TabsTrigger
} from "../ui/tabs"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import {
    Table,
    TableBody,
    TableCell,
    TableRow
} from "../ui/table"
import { Checkbox } from "../ui/checkbox"
 const RequestTabs = () =>{
    return(
        <Tabs>
            <TabsList>
                <TabsTrigger value="params">Params</TabsTrigger>
                 <TabsTrigger value="headers">Headers</TabsTrigger>
                  <TabsTrigger value="body">Body</TabsTrigger>
                   <TabsTrigger value="auth">Auth</TabsTrigger>
            </TabsList>
            {/* params */}

            <TabsContent value="params">
                <Table>
                    <TableBody>
                        {[1, 2, 3].map((row) => (
                            <TableRow key={row}>
                                <TableCell>
                                    <Input placeholder="Key"/>
                                </TableCell>
                                <TableCell>
                                    <Input placeholder="Value"/>
                                </TableCell>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>

          {/* headers */}
           <TabsContent value="headers">
                <Table>
                    <TableBody>
                        {[1, 2, 3].map((row) => (
                            <TableRow key={row}>
                                <TableCell>
                                    <Input placeholder="Header Key"/>
                                </TableCell>
                                <TableCell>
                                    <Input placeholder="Header Value"/>
                                </TableCell>
                                <TableCell>
                                    <Checkbox/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
          

          {/* body */}

          <TabsContent value="body">
            <Textarea placeholder="Enter JSON request body"></Textarea>
          </TabsContent>

          {/* auth */}

          <TabsContent value="auth">
            <div>
                <Input placeholder="Username"/>
                <Input placeholder="Password" type="password"/>
            </div>
          </TabsContent>
        </Tabs>
    )
       

    
 }
 export default RequestTabs