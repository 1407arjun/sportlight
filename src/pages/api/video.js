import request from "request"

const responses = {
    400: "Bad Request! Please refer docs for correct input fields.",
    401: "Unauthorized. Please generate a new access token.",
    404: "The conversation and/or it's metadata you asked could not be found, please check the input provided",
    429: "Maximum number of concurrent jobs reached. Please wait for some requests to complete.",
    500: "Something went wrong! Please contact support@symbl.ai"
}

export default function handler(req, res) {
    if (req.method === "GET") {
        const payload = {
            url: req.query.url, //https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4
            name: "BusinessMeeting",
            confidenceThreshold: 0.5
            //languageCode: "en-IN"
        }

        const videoOption = {
            url: "https://api-labs.symbl.ai/v1/process/video/url",
            headers: {
                Authorization: `Bearer ${process.env.AUTH_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }

        request.post(videoOption, (err, response, body) => {
            const statusCode = response.statusCode
            if (
                err ||
                Object.keys(responses).indexOf(statusCode.toString()) !== -1
            ) {
                throw new Error(responses[statusCode])
            }
            res.send(
                JSON.stringify({ statusCode, response: response.body }, null, 4)
            )
        })
    }
}
