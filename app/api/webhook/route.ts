/* eslint-disable camelcase */
import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const NEXT_CLERK_WEBHOOK_SECRET = process.env.NEXT_CLERK_WEBHOOK_SECRET;

  if (!NEXT_CLERK_WEBHOOK_SECRET) {
    throw new Error(
      "Please add NEXT_CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(NEXT_CLERK_WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const eventType = evt.type;

  if (eventType === "user.created") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const userData = {
      clerkID: id,
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
      picture: image_url,
    };

    axios
      .post(
        "https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/sign-up",
        userData
      )
      .then((response) => {
        NextResponse.json({ message: "success", user: response.data });
      })
      .catch((error) => {
        console.error("Error making API request!!!:", error);
      });

    return new Response("", { status: 200 });
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    const userUpdate = {
      updateData: {
        email: email_addresses[0].email_address,
        firstName: first_name,
        lastName: last_name,
        picture: image_url,
      },
    };

    axios
      .put(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/user/${id}`,
        userUpdate
      )
      .then((response) => {
        NextResponse.json({ message: "success", user: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    return new Response("", { status: 200 });
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data;

    axios
      .delete(
        `https://dev-overflow-backend-1a8b01b9d384.herokuapp.com/api/v1/user/${id}`
      )
      .then((response) => {
        NextResponse.json({ message: "success", user: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    return new Response("", { status: 200 });
  }
}
