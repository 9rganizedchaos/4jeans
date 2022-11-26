import { useState } from 'react';
import styles from "./PhotoCard.module.scss";
import { MapPin, Heart, ArrowUpCircle } from "react-feather";

interface PhotoCardProps {
  imgUrl: string;
  altText?: string;
  profileUrl: string;
  username: string;
  bio: string;
  location: string;
  color: string;
}

const PhotoCard = ({imgUrl, altText, profileUrl, username, bio, location, color }: PhotoCardProps) => {
  const [isInfoBoxOn, setIsInfoBoxOn] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleInfoBoxToggleClick = () => {
    setIsInfoBoxOn(!isInfoBoxOn);
  }
  const handleLikeIconClick = () => {
    setIsLiked(!isLiked);
  }

  return (
    <article className={styles.card_wrapper}>
      <div className={styles.image_container} style={{backgroundColor: color}}>
        <img src={imgUrl} alt={altText}/>
      </div>
      <div className={styles.card_front}>
        <div className={styles.card_header}>
          <button onClick={handleLikeIconClick}>
            <Heart width={24} height={24} className={`${isLiked ? styles.on : styles.off}`} />
          </button>
        </div>
        <div className={`${styles.card_info_box} ${isInfoBoxOn ? styles.on : styles.off}`}>
          <div className={styles.info_header}>
            <div className={styles.profile}>
              <img src={profileUrl} alt={`${username}'s profile pic`}/>
              <p>{username}</p>
            </div>
            <button className={`${isInfoBoxOn ? styles.on : styles.off}`} onClick={handleInfoBoxToggleClick}>
              <ArrowUpCircle />
            </button>
          </div>
          <p className={styles.bio}>{bio}</p>
          <div className={styles.details}>
            <div className={styles.location}>
              <MapPin width={16} height={16} />
              <p>{location}</p>
            </div>
            <button>
              <em>more</em>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PhotoCard;
