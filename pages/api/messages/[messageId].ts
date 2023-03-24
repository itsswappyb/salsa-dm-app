import type { Message } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type ResponseData<T = Message | any> = T & {
  error?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  switch (req.method) {
    case "PUT":
      return await updateMessage(req, res);
    case "DELETE":
      return await deleteMessage(req, res);
    default:
      return res.status(405).end();
  }
}

async function updateMessage(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { messageId } = req.query;
  const { status } = req.body;

  try {
    const updatedMessage: Message = await prisma.message.update({
      where: {
        id: Number(messageId),
      },
      data: {
        status: status,
      },
    });
    return res.status(200).json({ ...updatedMessage });
  } catch (err: any) {
    console.error("Request error:", err);
    res.status(500).json({
      error: "Error updating message",
      message: err.message || "Error updating message",
    });
  }
}

async function deleteMessage(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const { messageId } = req.query;

  try {
    const deletedMessage: Message = await prisma.message.delete({
      where: {
        id: Number(messageId),
      },
    });
    return res.status(200).json({ ...deletedMessage });
  } catch (err: any) {
    console.error("Request error:", err);
    res.status(500).json({
      error: "Error deleting message",
      message: err.message || "Error deleting message",
    });
  }
}
