import { type User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type ResponseData<T = User | any> = T & {
  error?: string;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method === "GET") {
    try {
      const user: User | null = await prisma.user.findFirst({
        where: {
          username: req.query.username as string,
        },
      });

      if (user) {
        res.status(200).json({
          data: user,
        });
      }
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: "Couldn't get user" });
    }
  }
}
