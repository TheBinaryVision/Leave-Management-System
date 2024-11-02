// @ts-nocheck
const admins = [
  {
    "uid":"1FrSCT208PWb55sOnQUrCwruPZA2",
    "dep":"CSE"
  },
  {
    "uid":"qriALLhY2IVpE5WMxn0P18jFdTS2",
    "dep":"IT"
  },
]


export async function POST(request: Request) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API-Key': process.env.DATA_API_KEY,
    //   },
    // })
    // const product = await res.json()

    const data = await request.json()
    console.log(data)
    let res = "False"
    admins.forEach((a)=>{

      if (data.uid == a.uid){
        console.log(a.uid)
        res = a.dep
        // return Response.json({ "dep":a.dep })
      }
    })

    return Response.json({ "dep":res})


  }