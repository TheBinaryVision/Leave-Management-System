// @ts-nocheck
import { Console } from "console";
import { google } from "googleapis";
var path = require('path');
export async function GET(request: Request) {


  // const email = await request
  const { searchParams } = new URL(request.url);
  if(searchParams.get("email") == null){
    // console.log(searchParams.get("email"))
    return Response.json({ "data":"provide Email"})
  }
  // console.log(path.join(process.cwd(), 'sheet.json'))

  const auth = new google.auth.GoogleAuth({
    keyFile: `${path.join(process.cwd(), 'sheet.json')}`
    ,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  const sheets = google.sheets({ version: "v4", auth });


  try {

    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: "1_7C3R2LTSDdJtH9GEmSCHipZv8f1xaoIx9SXnKEYDxs",
      range:
        "Sheet1!A2:F",

    });
    console.log(" cells updated."+  result.data.values);
    const valuearr = []
    for (let i = 0; i < result.data.values.length; i++) {
      if(result.data.values[i][0] == searchParams.get("email") ){
        valuearr.push(result.data.values[i])
      }
    }
    if (valuearr.length == 0 ){
      return Response.json({ "data":"Something Went Wrong!"})
    }
    return Response.json({ "data":valuearr})
  } catch (err) {
    // TODO (Developer) - Handle exception
    console.log(err);
    return Response.json({ "data":"failed"})
  }



}

export async function POST(request: Request) {

  // {
  //   "email":"namex678@gmail.com",
  //   "type":"CL",
  //   "value":14
  // }

    const post = await request.json()
    console.log(post)

    const typed = {
      "CL":"B",
      "CEL":"C",
      "CML":"D",
      "ML":"E",
      "EL":"F",
    }
    const auth = new google.auth.GoogleAuth({
      keyFile:`${path.join(process.cwd(), 'sheet.json')}`,
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const sheets = google.sheets({ version: "v4", auth });

    let email = post.email
    let value = post.value
    let type = post.type

    try {

      const GetResult = await sheets.spreadsheets.values.get({
        spreadsheetId: "1_7C3R2LTSDdJtH9GEmSCHipZv8f1xaoIx9SXnKEYDxs",
        range:
          "Sheet1!A2:A",

      });
      console.log(GetResult.data.values);
      const arr = GetResult.data.values
      let i = 0;
      for(let j=0;j<arr.length;j++){
        if(email==arr[j][0]){
          i = j+2
        }
      }
      if(i!=0){
        const range = (typed[type]+i.toString());
        console.log(range)
        const result = await sheets.spreadsheets.values.batchUpdateByDataFilter({
          spreadsheetId:"1_7C3R2LTSDdJtH9GEmSCHipZv8f1xaoIx9SXnKEYDxs",
          resource: {
            data:[
              {
                dataFilter:{
                  "a1Range": range
                },
                "values":[
                  [value]
                ]
              }
            ],
            "valueInputOption":"RAW"
          },
        });
        console.log(result.data);
        return Response.json({ "msg":"success","data":result.data})

      }else{
        return Response.json({ "msg":"failed","data":"email not found"})
      }




    } catch (err) {
      // TODO (Developer) - Handle exception
      console.log(err);
      return Response.json({ "msg":"failed" })
    }



  }