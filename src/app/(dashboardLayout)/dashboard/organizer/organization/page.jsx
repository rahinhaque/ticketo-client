import DashboardHeading from '@/components/DashboardHeading';
import React from 'react';

const OrganizationPage = () => {
  return (
    <div>
      <DashboardHeading
        title="My Organization Profile"
        description={
          <>
            Update organization <span className="text-pink-400/80">logo</span> •{" "}
            <span className="text-pink-400/80">profile</span> •{" "}
            <span className="text-pink-400/80">website</span> •{" "}
            <span className="text-pink-400/80">description</span>
          </>
        }
      />
    </div>
  );
};

export default OrganizationPage;
