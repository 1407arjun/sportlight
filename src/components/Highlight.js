import { useEffect } from "react"

export default function Highlight(props) {
    useEffect(() => {
        var video = document.getElementById(props.id)
        video.addEventListener(
            "loadedmetadata",
            function () {
                this.currentTime = Math.round(Number(props.time) - 3)
                video.play()
                setInterval(function () {
                    if (
                        video.currentTime > Math.round(Number(props.time) + 3)
                    ) {
                        video.pause()
                    }
                }, 1000)
            },
            false
        )
    })
    return (
        <div
            className={props.active ? "carousel-item active" : "carousel-item"}>
            <video width="1600" controls id={props.id}>
                <source src={props.video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
