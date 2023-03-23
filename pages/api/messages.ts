import type { Message } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { messageValidationSchema } from "@/types";

type ResponseData<T = Message | any> = T & {
  error?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  switch (req.method) {
    case "GET":
      return await getMessages(req, res);
    case "POST":
      return await createMessage(req, res);
    case "PUT":
    //   return await updateMessage(req, res);
    case "DELETE":
    //   return await deleteMessage(req, res);
    default:
      return res.status(405).end();
  }
}

async function getMessages(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  try {
    const messages: Message[] = await prisma.message.findMany({
      where: {
        recipientId: Number(req.query.recipientId),
      },
    });
    return res.status(200).json({ data: messages });
  } catch (err: any) {
    console.error("Request error:", err);
    res.status(500).json({
      error: "Error getting messages",
      message: err.message || "Error getting messages",
    });
  }
}

async function createMessage(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { body } = req;
  // validate the request body
  const result = await messageValidationSchema.safeParseAsync(body);
  if (!result.success) {
    return res.status(400).json({
      error: "Invalid request body",
      message: result.error.message || "Invalid request body",
    });
  }
  // create the message
  try {
    const newMessage: Message = await prisma.message.create({
      data: {
        text: body.text,
        senderId: body.sender,
        recipientId: body.recipient,
      },
    });
    return res.status(200).json({ ...newMessage });
  } catch (err: any) {
    console.error("Request error:", err);
    res.status(500).json({
      error: "Error creating message",
      message: err.message,
    });
  }
}
