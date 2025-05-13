import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedSubscribeButton } from "../magicui/animated-subscribe-button";
import { CheckIcon, ChevronRightIcon } from "lucide-react";

export function HighlightNotificationCard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Card>
      <CardHeader className="space-y-0.5 p-3">
        <CardDescription className="text-xs">Work in progress</CardDescription>
        <CardTitle className="text-lg font-medium">Stay tuned</CardTitle>
      </CardHeader>
      {/* <CardContent className="p-3 pt-0">
        This is the content of the card
      </CardContent> */}
      <CardFooter className="p-3 pt-0">
        {/* <Button variant="secondary" className="w-full">
          Subscribe
        </Button> */}
        <AnimatedSubscribeButton className="w-full bg-background-quaternary text-sm font-normal text-primary">
          <span className="group inline-flex items-center">
            Follow
            <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          <span className="group inline-flex items-center text-green-500">
            <CheckIcon className="mr-2 size-4" />
            Subscribed
          </span>
        </AnimatedSubscribeButton>
      </CardFooter>
    </Card>
  );
}
