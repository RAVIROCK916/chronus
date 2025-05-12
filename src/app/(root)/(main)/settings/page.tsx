"use client";

import Setting from "@/components/shared/setting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "@/lib/apollo/client/user";
import { UserContext, useUserContext } from "@/state/context";
import { z } from "zod";

import { useId } from "react";
import { CheckIcon, MinusIcon } from "lucide-react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = [
  { name: "Account", href: "#account" },
  { name: "Accessibility", href: "#accessibility" },
  { name: "Integrations", href: "#integrations" },
  { name: "Preferences", href: "#preferences" },
];

export default function SettingsPage() {
  const { data, loading } = useQuery(GET_USER);
  if (loading) return <SettingsSkeleton />;
  if (!data?.currentUser) return <div>No user found</div>;
  return (
    <div>
      <UserContext.Provider value={data?.currentUser}>
        <Tabs defaultValue="Account" className="items-center bg-transparent">
          <div className="space-y-6">
            <div className="px-10">
              <h1 className="text-4xl">Settings</h1>
            </div>
            <TabsList className="h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent py-1 pl-10 pr-0 text-foreground">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.name}
                  value={tab.name}
                  className="relative font-normal text-text-tertiary after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="Account">
            <AccountSettingsTab />
          </TabsContent>
          <TabsContent value="Accessibility">
            <p className="p-4 text-center text-xs text-muted-foreground">
              Content for Tab 7
            </p>
          </TabsContent>
          <TabsContent value="Preferences">
            <PreferencesSettingsTab />
          </TabsContent>
          <TabsContent value="Integrations">
            <p className="p-4 text-center text-xs text-muted-foreground">
              Content for Tab 5
            </p>
          </TabsContent>
        </Tabs>
      </UserContext.Provider>
    </div>
  );
}

function AccountSettingsTab() {
  const user = useUserContext();
  const [updateUser] = useMutation(UPDATE_USER);

  const nameSchema = z.object({
    name: z.string().min(1, "Name is required"),
  });

  const emailSchema = z.object({
    email: z.string().email("Invalid email"),
  });

  const handleNameSave = async (value: string) => {
    await updateUser({
      variables: {
        id: user.id,
        name: value,
      },
    });
    console.log("Save");
  };

  const handleEmailSave = async (value: string) => {
    await updateUser({
      variables: {
        id: user.id,
        email: value,
      },
    });
    console.log("Save");
  };

  return (
    <div>
      <Setting.Root>
        <Setting.Header>
          <Setting.Title>Profile Picture</Setting.Title>
          <Setting.Description>
            Update your profile picture.
          </Setting.Description>
        </Setting.Header>
        <Setting.Content>
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.profile_picture} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Setting.Content>
      </Setting.Root>
      <Setting.Root>
        <Setting.Header>
          <Setting.Title>Name & Email</Setting.Title>
          <Setting.Description>
            Update your name and email address.
          </Setting.Description>
        </Setting.Header>
        <Setting.Content className="space-y-4">
          <div className="flex items-center gap-2">
            <Setting.Input
              name="name"
              label="Name"
              initialValue={user.name}
              formSchema={nameSchema}
              onSave={handleNameSave}
            />
          </div>
          <div className="flex items-center gap-2">
            <Setting.Input
              name="email"
              label="Email"
              initialValue={user.email}
              formSchema={emailSchema}
              onSave={handleEmailSave}
            />
          </div>
        </Setting.Content>
      </Setting.Root>
      <Setting.Root>
        <Setting.Header>
          <Setting.Title>Timezone</Setting.Title>
          <Setting.Description>Update your timezone.</Setting.Description>
        </Setting.Header>
        <Setting.Content>
          <Setting.Select
            label="Timezone"
            options={Intl.supportedValuesOf("timeZone")}
            initialValue={"UTC"}
            // onSave={async (newTimezone) => {
            //   await updateUserSettingInDB({ timezone: newTimezone });
            // }}
          />
        </Setting.Content>
      </Setting.Root>
    </div>
  );
}

function PreferencesSettingsTab() {
  const items = [
    { value: "light", label: "Light", image: "/ui-light.png" },
    { value: "dark", label: "Dark", image: "/ui-dark.png" },
    { value: "system", label: "System", image: "/ui-system.png" },
  ];

  const id = useId();
  const { theme, setTheme } = useTheme();
  console.log("theme", theme);
  return (
    <fieldset className="space-y-4">
      <Setting.Root>
        <Setting.Header>
          <Setting.Title>Theme</Setting.Title>
          <Setting.Description>
            Choose light/dark theme for your app.
          </Setting.Description>
        </Setting.Header>
        <Setting.Content>
          <RadioGroup
            className="flex gap-6"
            defaultValue="1"
            value={theme}
            onValueChange={(value) => {
              setTheme(value);
              console.log("value", value);
            }}
          >
            {items.map((item) => (
              <label key={`${id}-${item.value}`}>
                <RadioGroupItem
                  id={`${id}-${item.value}`}
                  value={item.value}
                  className="peer sr-only after:absolute after:inset-0"
                />
                <Image
                  src={item.image}
                  alt={item.label}
                  width={120}
                  height={100}
                  className="shadow-xs peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50 relative h-32 w-48 cursor-pointer overflow-hidden rounded-md border-2 border-input outline-none transition-[color,border,box-shadow] peer-focus-visible:ring-2 peer-focus-visible:ring-ring/50 peer-data-[state=checked]:border-ring peer-data-[state=checked]:bg-accent"
                />
                <span className="group mt-2 flex items-center gap-1 peer-data-[state=unchecked]:text-muted-foreground/70">
                  <CheckIcon
                    size={16}
                    className="group-peer-data-[state=unchecked]:hidden"
                    aria-hidden="true"
                  />
                  <MinusIcon
                    size={16}
                    className="group-peer-data-[state=checked]:hidden"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
        </Setting.Content>
      </Setting.Root>
    </fieldset>
  );
}

export function SettingsSkeleton() {
  return (
    <div>
      <Tabs defaultValue="Account" className="items-center bg-transparent">
        <div className="space-y-6">
          <div className="px-10 pt-6">
            <h1 className="text-4xl">Settings</h1>
          </div>
          <TabsList className="h-auto w-full justify-start gap-4 rounded-none border-b bg-transparent py-1 pl-10 pr-0 text-foreground">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.name}
                value={tab.name}
                className="relative font-normal text-text-tertiary after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="Account">
          <AccountSettingsTabSkeleton />
        </TabsContent>
        <TabsContent value="Preferences">
          <PreferencesSettingsTabSkeleton />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AccountSettingsTabSkeleton() {
  return (
    <div>
      {/* Profile Picture Setting */}
      <div className="border-b px-10 py-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="sm:w-[60%]">
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>
        </div>
      </div>

      {/* Name & Email Setting */}
      <div className="border-b px-10 py-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="space-y-4 sm:w-[60%]">
            <div className="flex items-center gap-2">
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timezone Setting */}
      <div className="border-b px-10 py-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="sm:w-[60%]">
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreferencesSettingsTabSkeleton() {
  return (
    <fieldset className="space-y-4">
      <div className="border-b px-10 py-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex gap-6">
            {Array(3)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <Skeleton className="h-32 w-48 rounded-md" />
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </fieldset>
  );
}
