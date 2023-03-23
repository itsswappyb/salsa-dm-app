import { Message, User } from "@prisma/client";
import React, { FC } from "react";

type CardProps = {
  content: Message;
  user?: User;
  recipient?: User;
};

const Card: FC<CardProps> = ({ content, user, recipient }) => {
  return (
    <div className="card w-96 bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">{content?.text}</h2>
        <p>From:&nbsp;{recipient?.username}</p>
        <p>To:&nbsp;{user?.username}</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Accept</button>
          <button className="btn hover:btn-error">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
