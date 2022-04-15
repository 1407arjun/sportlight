import axios from "axios"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = await axios.post(
            `http://5ccd-136-233-9-107.ngrok.io/`,
            req.body.data
        )
        res.send(data.data)
    }
}
