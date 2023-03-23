import { Message, User } from "@prisma/client";
import clsx from "clsx";
import React, { FC } from "react";

type CardProps = {
  content: Message;
  user?: User;
  recipient?: User;
  className?: string;
};

async function handleAccept(messageId: number, status: string = "ACCEPTED") {
  try {
    const response = await fetch(`api/messages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageId,
        status,
      }),
    });
    const data = await response.json();
    console.log("data: ", data);
  } catch (err: any) {
    console.error(err);
  }
}

async function handleDelete(messageId: number) {
  try {
    const response = await fetch(`api/messages/?messageId=${messageId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log("data: ", data);
  } catch (err: any) {
    console.error(err);
  }
}

const Card: FC<CardProps> = ({ content, user, recipient, className }) => {
  return (
    <div
      className={clsx(
        className,
        "card my-6 w-96 bg-neutral text-neutral-content",
      )}
    >
      <div className="card-body items-center text-center">
        <h2 className="card-title">{content?.text}</h2>
        <p>From:&nbsp;{recipient?.username}</p>
        <p>To:&nbsp;{user?.username}</p>
        <div className="card-actions justify-end">
          <button
            className="btn-primary btn"
            onClick={() => handleAccept(content.id)}
            type="button"
          >
            Accept
          </button>
          <button
            className="btn hover:btn-error"
            onClick={() => handleDelete(content.id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
