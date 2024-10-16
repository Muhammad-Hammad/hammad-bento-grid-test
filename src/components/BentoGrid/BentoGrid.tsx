import React from "react";
import "./BentoGrid.css";
import first from "/assets/first-item.png";
import second from "/assets/second-item.png";
import third from "/assets/third-item.png";
import sixth from "/assets/sixth-item.png";
import seventh from "/assets/seventh-item.png";
import ninth from "/assets/ninth-item.png";

interface BentoItem {
    id: string;
    content: JSX.Element;
}

const bentoItems: BentoItem[] = [
    {
        id: "first",
        content: (
            <img
                style={{
                    height: "300px",
                    borderRadius: 20,
                    display: "flex",
                    flexGrow: 1,
                    objectFit: "cover",
                     aspectRatio: "9/16"
                }}
                src={first}
            />
        ),
    },
    {
        id: "second",
        content: (
            <img
                style={{
                    height: "160px",
                    display: "flex",
                    flexGrow: 1,
                    borderRadius: 20,
                    objectFit: "cover", 
                }}
                src={second}
            />
        ),
    },
    {
        id: "third",
        content: (
            <img
                style={{
                    height: "160px",
                    display: "flex",
                    flexGrow: 1,
                    borderRadius: 20,
                    objectFit: "cover", 
                }}
                src={third}
            />
        ),
    },
    {
        id: "fourth",
        content: <p style={{padding: 20,fontSize: 44}}>Lorem ipsum dolor</p>,
    },
    {
        id: "fifth",
        content: (
            <div className="relative" style={{ width: "100%", height: "100%", borderRadius: 20 }}>
                <video
                    className="video"
                    src="/assets/big_buck_bunny_720p_2mb.mp4" // Replace with your video source
                    autoPlay
                    loop
                    muted
                />
                <div
                   className="overlay"
                ></div>
                <button
                    className="absolute layout-button"
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translate(-50%, -50%) scale(1.1)";
                        e.currentTarget.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.5)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translate(-50%, -50%) scale(1)";
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.3)";
                    }}
                >
                    My Button
                </button>
            </div>
        ),
    },
    {
        id: "sixth",
        content: (
            <img
                style={{
                    height: "250px",
                    display: "flex",
                    flexGrow: 1,
                     borderRadius: 20,
                    objectFit: "cover",
                }}
                src={sixth}
            />
        ),
    },
    {
        id: "seventh",
        content: (
            <img
                style={{
                    height: "480px",
                    display: "flex",
                    flexGrow: 1,
                     borderRadius: 20,
                    objectFit: "cover",
                }}
                src={seventh}
            />
        ),
    },
    {
        id: "eighth",
        content: (
           <p style={{padding: 20, fontSize: 44}}><i>"Comparison is the thief of joy!"</i></p>
        ),
    },
    {
        id: "ninth",
        content: (
            <img
                style={{
                    height: "200px",
                    display: "flex",
                    flexGrow: 1,
                     borderRadius: 20,
                    objectFit: "cover",
                }}
                src={ninth}
            />
        ),
    },
];

const BentoGrid: React.FC = () => {
    return (
        <div className="bento-grid">
            {bentoItems.map((item) => (
                <div key={item.id} className={`bento-item ${item.id}`}>
                    {item.content}
                </div>
            ))}
        </div>
    );
};

export default BentoGrid;
