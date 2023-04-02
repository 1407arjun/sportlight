import axios from "axios"

export default async function handler(req, res) {
    if (req.method === "POST") {
        console.log(req.body.data)
        try {
            const data = await axios.post(
                `http://172.17.47.236:8080/`,
                req.body.data
            )
            res.send(data.data)
        } catch (e) {
            console.log(e)
        }
    }
}
