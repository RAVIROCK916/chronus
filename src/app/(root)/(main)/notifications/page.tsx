"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { NotificationList } from "@/components/main/notifications-list";
import { NotificationDisplay } from "@/components/main/notification-display";
import Loader from "@/components/shared/loader";
import { useNotification } from "@/hooks/use-notification";
import { gql, useQuery } from "@apollo/client";
import { Notification } from "@/types";
import { useEffect, useState } from "react";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notification = useNotification();

  const { data, loading } = useQuery(gql`
    query Notifications {
      notifications {
        id
        title
        message
        category
        is_read
        created_at
      }
    }
  `);

  useEffect(() => {
    if (data) {
      const newNotifications = [...data.notifications];
      newNotifications.sort(
        (a: Notification, b: Notification) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      setNotifications(newNotifications);
    }
  }, [data]);

  console.log("notifications", data);

  return (
    <ResizablePanelGroup direction="horizontal" className="mt-[1.5px] border-t">
      <ResizablePanel minSize={30}>
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            {/* <h1 className="text-xl font-bold">Notifications</h1> */}
            <TabsList className="ml-auto h-auto bg-background-tertiary p-1 dark:bg-background-quaternary">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          {loading ? (
            <div className="flex h-screen items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              <TabsContent value="all">
                <NotificationList items={notifications} />
              </TabsContent>
              <TabsContent value="unread">
                <NotificationList
                  items={notifications.filter((val) => !val.is_read)}
                />
              </TabsContent>
            </>
          )}
        </Tabs>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel minSize={30}>
        <NotificationDisplay
          notification={
            notifications.find((val) => val.id === notification.selected) ||
            null
          }
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
