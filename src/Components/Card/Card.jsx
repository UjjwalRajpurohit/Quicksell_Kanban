// import React from 'react';
// import './Card.css';
// import prof from '../../icons/portrait-man-laughing_23-2148859448.avif'

// const Card = ({ id, title, profile, feature }) => {
//   return (
//     <div className="card-container">
//       <div className="card-header">
//         <span className="card-id">{id}</span>
//         <img 
//           src={prof} 
//           alt="profile" 
//           className="profile-pic" 
//         />
//       </div>
//       <h2 className="card-title">{title}</h2>
//       <div className="card-footer">
//         <span className="icon-box">!</span>
//         <span className="feature-request">{feature}</span>
//       </div>
//     </div>
//   );
// };

// export default Card;
import React from 'react';
import './Card.css';
import prof from '../../icons/portrait-man-laughing_23-2148859448.avif';
import bot from '../../icons/No-priority.svg'
import xyz  from '../../icons/Backlog.svg';

const Card = ({ id, title, profile, feature }) => {
  // Limit the title to 8 words
  const truncatedTitle = title.split(' ').slice(0, 8).join(' ') + (title.split(' ').length > 8 ? ' ...' : '');

  return (
    <div className="card-container">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <img 
          src={prof} 
          alt="profile" 
          className="profile-pic" 
        />
      </div>
      <div className='aa'>
      <img className="i" src={xyz}/>
      <h2 className="card-title">{truncatedTitle}</h2>
      </div>
      <div className="card-footer">
        <span className="icon-box" style={{border:"none"}}><img style={{background:"white"}} src={bot}/></span>
        <span className="feature-request">{feature}</span>
      </div>
    </div>
  );
};

export default Card;
