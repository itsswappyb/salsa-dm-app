import React, { FC } from "react";

const Card: FC = () => {
  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Cookies!</h2>
        <p>We are using cookies for no reason.</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Accept</button>
          <button className="btn hover:btn-error">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
