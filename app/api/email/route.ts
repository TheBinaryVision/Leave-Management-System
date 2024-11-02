// @ts-nocheck
import { mailOptions, transporter } from "@/lib/nodemail";

export async function POST(req: Request){
    console.log(req.body);

        const data = await req.json()
        //////////////////////////add the other remaining validation
        if (!data.name ||  !data.email || !data.reason || !data.from) {
            console.log("failed");
            return Response.json({ message: "Bad Request" });
        }

        try {
            if (data.status == "rejected") {
                await transporter.sendMail({
                    ...mailOptions,
                    to: data.email,
                    subject: `About Your Leave from ${data.from}`,
                    html: `<p>Hello ${
                        data.name
                    }👋,<br/> Your request for reason ${data.reason} has been Rejected!
                     <br/>
                     <br/>
                     <br/>
                     thank You 🙌
          </p>`,
                });
            } else {

                    await transporter.sendMail({
                        ...mailOptions,
                        to: data.email,
                        subject: `About Your Leave ${data.from}`,
                        html: `<p>Hello ${
                            data.name
                        }👋,<br/> Your request for reason ${data.reason} has been Accepted!
                         <br/>
                         <br/>
                         <br/>
                         thank You 🙌
              </p>`,
                    });
                }


            return Response.json({ success: true });
        } catch (error) {
            console.log(error);
            return Response.json({ message: error.message });
        }


    // return Response.json({ message: "Bad Request" });
}