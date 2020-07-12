import React from 'react';
import './workshop.css';
import DescriptionCard from './DescriptionCard';
import InstructorCard from './InstuctorCard';
import ReservationCard from './ReservationCard';
import ReviewsCard from './ReviewsCard';

const description = '    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' + '\n' + 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

export default function Workshop() {
  return (
    <div className="root" >
      <div className="firstCol">
        <DescriptionCard description={description}/>
        <ReviewsCard />
      </div>

      <div className="secondCol">
        <InstructorCard instructor={{name: 'root', id: '1', email: "root@gmail.com"}}/>
        <ReservationCard />
      </div>
    </div>
  );
}
