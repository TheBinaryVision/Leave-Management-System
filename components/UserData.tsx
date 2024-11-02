// @ts-nocheck

import React from 'react'
import { Payment,columns } from './table/columns'
import { DataTable } from './ui/data-table'



function UserData({data}) {
    // console.log(data)
  return (
    <div className="m-10 w-[100%] p-5 rounded-sm">

        {/* requests */}
        {/* {data.length != 0 && data.map((e:any)=>{
            console.log(e.uid);

})} */}
        <div className="container mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
    </div>
  )
}

export default UserData