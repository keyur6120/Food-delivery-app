import React from "react";
import "./profie.css"
import {useNavigate} from 'react-router-dom'
import video from '../../utils/Images/9207047-hd_1080_1350_25fps.mp4'


const ProfilePage = () => {
  const navigate = useNavigate()
  const userId =  localStorage.getItem('user_Id')
  return (
    <div className="profile-container">
      <div className="profile-header">
        <video autoPlay muted loop>
          <source src={video} sizes="0.6s"/>
        </video>
        <div className="profile-avatar">G</div>
        <h1 className="profile-name">your Name</h1>
      </div>
      <div className="profile-stats">
        <div className="stat-item">
          <p>0</p>
          <p>Reviews</p>
        </div>
        <div className="stat-item">
          <p>0</p>
          <p>Photos</p>
        </div>
        <div className="stat-item">
          <p>0</p>
          <p>Followers</p>
        </div>
      </div>
      <div className="main-container">
        <div className="activity-menu">
          <div className="menu-item" onClick={()=>window.location.href = `http://localhost:5173/orders?userId=${userId}`}>admin</div>
          <div className="menu-item">Reviews</div>
          <div className="menu-item">Photos</div>
          <div className="menu-item">your Addresses</div>
          <div className="menu-item">Recently Viewed</div>
          <div className="menu-item">Bookmarks</div>
          <div className="menu-item">Blog Posts</div>
        </div>
        <div className="content-container">
          <div className="empty-content">
            <div className="empty-content-icon">📝</div>
            <p>Nothing here yet</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
