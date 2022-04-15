import request from "request"

export default function handler(req, res) {
    if (req.method === "GET") {
        request.get(
            {
                url: `https://api.symbl.ai/v1/conversations/${req.query.id}/messages`,
                headers: { Authorization: `Bearer ${process.env.AUTH_TOKEN}` },
                json: true
            },
            (err, response, body) => {
                res.send(body)
            }
        )
    }
}
