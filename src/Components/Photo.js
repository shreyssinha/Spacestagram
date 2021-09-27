import React, { useState, useEffect } from 'react'
import Heart from "react-animated-heart";

export default function Photo({ date }) {

    const [photoData, setPhotoData] = useState(null);
    const [isLiked, setLike] = useState(false);

    useEffect(() => {

        fetchPhoto()
    
        async function fetchPhoto() {
          const res = await fetch(
            `https://api.nasa.gov/planetary/apod?date=${date}&api_key=iTqzcLJSjAYrBEIUHVc8BTRYeimGYTdhYfc4gCyq`
          );
          const data = await res.json();
          setPhotoData(data);
          setLike(false);
        }
      }, [date]);

      if (!photoData) return <div>No Photo</div>

    return (
        <div>
        <div>
            <h1>{photoData.title}</h1>
            <p>{photoData.date}</p>
            <p>{photoData.copyright}</p>
            <p>{photoData.explanation}</p>
            {photoData.media_type === "image" ? (
                <img
                    src={photoData.url}
                    alt={photoData.title}
                    className="photo"
                />
            ) : (
                <iframe
                     title="space-video"
                    src={photoData.url}
                    frameBorder="0"
                    gesture="media"
                    allow="encrypted-media"
                    allowFullScreen
                    className="photo"
                />
            )}
        </div>
        <div className="Like">
            <Heart isClick={isLiked} onClick={() => setLike(!isLiked)} />
        </div>
        </div>
    )
}
