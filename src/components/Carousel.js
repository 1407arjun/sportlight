import "bootstrap/dist/css/bootstrap.css"
import { useEffect } from "react"
import ReactPlayer from "react-player"
import Highlight from "./Highlight"

export default function Carousel(props) {
    useEffect(() => {
        import("bootstrap")
    }, [])
    return (
        <div
            id="highlights"
            className="carousel slide"
            data-bs-interval="false">
            <div className="carousel-inner">
                {props.data.keys.map((i, j) => {
                    if (j === 0)
                        return (
                            <Highlight
                                key={j}
                                id={"v" + j}
                                time={i}
                                video={props.video}
                                active={true}
                            />
                        )
                    return (
                        <Highlight
                            key={j}
                            id={"v" + j}
                            time={i}
                            video={props.video}
                            active={false}
                        />
                    )
                })}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#highlights"
                data-bs-slide="prev">
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#highlights"
                data-bs-slide="next">
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
