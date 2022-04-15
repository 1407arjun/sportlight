import axios from "axios"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const data = await axios.post(
            `https://sportlight-api.herokuapp.com/`,
            req.body.data
        )
        res.send(data.data)
    }
}
