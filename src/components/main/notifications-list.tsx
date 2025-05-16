"use client";

import { ComponentProps, useState } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useDispatch } from "react-redux";
import { setCurrentNotification } from "@/state/features/notification/notificationSlice";
import { useNotification } from "@/hooks/use-notification";
import { Notification } from "@/types";
import { gql, useMutation } from "@apollo/client";

export const accounts = [
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Vercel</title>
        <path d="M24 22.525H0l12-21.05 12 21.05z" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Gmail</title>
        <path
          d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "Alicia Koch",
    email: "alicia@example.com",
    icon: (
      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>iCloud</title>
        <path
          d="M13.762 4.29a6.51 6.51 0 0 0-5.669 3.332 3.571 3.571 0 0 0-1.558-.36 3.571 3.571 0 0 0-3.516 3A4.918 4.918 0 0 0 0 14.796a4.918 4.918 0 0 0 4.92 4.914 4.93 4.93 0 0 0 .617-.045h14.42c2.305-.272 4.041-2.258 4.043-4.589v-.009a4.594 4.594 0 0 0-3.727-4.508 6.51 6.51 0 0 0-6.511-6.27z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export type Account = (typeof accounts)[number];

export const contacts = [
  {
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
  },
  {
    name: "Liam Wilson",
    email: "liam.wilson@example.com",
  },
  {
    name: "Olivia Davis",
    email: "olivia.davis@example.com",
  },
  {
    name: "Noah Martinez",
    email: "noah.martinez@example.com",
  },
  {
    name: "Ava Taylor",
    email: "ava.taylor@example.com",
  },
  {
    name: "Lucas Brown",
    email: "lucas.brown@example.com",
  },
  {
    name: "Sophia Smith",
    email: "sophia.smith@example.com",
  },
  {
    name: "Ethan Wilson",
    email: "ethan.wilson@example.com",
  },
  {
    name: "Isabella Jackson",
    email: "isabella.jackson@example.com",
  },
  {
    name: "Mia Clark",
    email: "mia.clark@example.com",
  },
  {
    name: "Mason Lee",
    email: "mason.lee@example.com",
  },
  {
    name: "Layla Harris",
    email: "layla.harris@example.com",
  },
  {
    name: "William Anderson",
    email: "william.anderson@example.com",
  },
  {
    name: "Ella White",
    email: "ella.white@example.com",
  },
  {
    name: "James Thomas",
    email: "james.thomas@example.com",
  },
  {
    name: "Harper Lewis",
    email: "harper.lewis@example.com",
  },
  {
    name: "Benjamin Moore",
    email: "benjamin.moore@example.com",
  },
  {
    name: "Aria Hall",
    email: "aria.hall@example.com",
  },
  {
    name: "Henry Turner",
    email: "henry.turner@example.com",
  },
  {
    name: "Scarlett Adams",
    email: "scarlett.adams@example.com",
  },
];

export type Contact = (typeof contacts)[number];

interface NotificationListProps {
  items: Notification[];
}

export function NotificationList({ items }: NotificationListProps) {
  const notification = useNotification();
  const dispatch = useDispatch();

  const [updateNotification] = useMutation(gql`
    mutation UpdateNotification(
      $id: ID!
      $title: String
      $message: String
      $category: String
      $is_read: Boolean
    ) {
      updateNotification(
        id: $id
        title: $title
        message: $message
        category: $category
        is_read: $is_read
      ) {
        id
        title
        message
        category
        is_read
        created_at
      }
    }
  `);

  if (!items.length)
    return (
      <div className="-mt-2 p-8 text-center text-muted-foreground">
        No Notifications
      </div>
    );

  return (
    <ScrollArea className="h-screen">
      <div className="flex flex-col gap-2 p-4 pt-1">
        {items.map((item) => (
          <button
            key={item.id}
            className={cn(
              "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-background-hover",
              // !item.is_read &&
              //   "bg-background-tertiary hover:bg-background-tertiary/90",
              notification.selected === item.id && "bg-muted hover:bg-muted/90",
            )}
            onClick={() => {
              dispatch(setCurrentNotification(item.id));
              if (!item.is_read) {
                updateNotification({
                  variables: {
                    id: item.id,
                    is_read: true,
                  },
                });
              }
            }}
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{item.title}</div>
                  {!item.is_read && (
                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  )}
                </div>
                <div
                  className={cn(
                    "ml-auto text-xs",
                    notification.selected === item.id
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              {/* <div className="text-xs font-medium">{item.title}</div> */}
            </div>
            <div className="line-clamp-2 text-xs text-muted-foreground">
              {item.message.substring(0, 300)}
            </div>
            {item.category.length ? (
              <div className="flex items-center gap-2">
                {/* {item.labels.map((label) => ( */}
                <Badge
                  key={item.category}
                  variant={getBadgeVariantFromLabel(item.category)}
                >
                  {item.category}
                </Badge>
                {/* ))} */}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}

function getBadgeVariantFromLabel(
  label: string,
): ComponentProps<typeof Badge>["variant"] {
  // if (["reminder"].includes(label.toLowerCase())) {
  //   return "default";
  // }

  if (["general"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
}
