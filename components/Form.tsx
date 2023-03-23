import React, { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "@prisma/client";

export const validationSchema = z.object({
  message: z.string().min(1, "Message is required"),
});

export type ValidationSchema = z.infer<typeof validationSchema>;

const Form: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
  });

  const submitForm: SubmitHandler<ValidationSchema> = async (data) => {
    // TODO: submit data to book API
    console.log("submitting...");
    console.log(data);

    const parsedBody = await validationSchema.safeParseAsync(data);
    if (!parsedBody.success) {
      console.error("Error: ", parsedBody.error);
      return;
    }

    try {
      const result = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: data.message,
          senderId: 1,
          recipientId: 2,
        }),
      });
      const resData = await result.json();
      console.log("resData: ", resData);
    } catch (e: any) {
      console.error("Error: ", e.message);
    }

    reset();
  };

  return (
    <div className="mx-auto my-12 w-full max-w-xs">
      <form
        className="mb-4 rounded bg-neutral px-8 pt-6 pb-8 shadow-md"
        onSubmit={handleSubmit(submitForm)}
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-white"
            htmlFor="message"
          >
            Message
          </label>
          <input
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight  shadow focus:outline-none"
            id="message"
            type="text"
            placeholder="Message"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs italic text-red-500">
              {errors.message?.message}
            </p>
          )}
        </div>
        {/* <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-white"
            htmlFor="recipient"
          >
            Recipient Username
          </label>
          <input
            className="focus:shadow-outline borde mb-3 w-full appearance-none rounded py-2 px-3 leading-tight  shadow focus:outline-none"
            id="recipient"
            type="text"
            placeholder="Recipient Username"
            {...register("recipient")}
          />
          {errors.recipient && (
            <p className="text-xs italic text-red-500">
              {errors.recipient?.message}
            </p>
          )}
        </div> */}
        <div className="flex items-center justify-center">
          <button
            className="focus:shadow-outline flex-1 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
