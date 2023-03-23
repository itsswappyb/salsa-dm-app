import Form from "@/components/Form";
import { User } from "@prisma/client";
import React from "react";

export async function getServerSideProps() {
  try {
    const user: User | null = await prisma.user.findFirst();
    const recipient: User | null = await prisma.user.findUnique({
      where: { id: 2 },
    });

    if (user && recipient) {
      return {
        props: {
          user,
          recipient,
        },
      };
    }
    return {
      props: {},
    };
  } catch (err: any) {
    console.error(err);
  }
}

type Props = {
  user?: User;
  recipient?: User;
};

const Create = ({ user, recipient }: Props) => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default Create;
