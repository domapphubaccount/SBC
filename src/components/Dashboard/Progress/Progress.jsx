"use client";

import { Progress } from "flowbite-react";

export function ProgressLoading({progress}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-base font-medium dark:text-white">Small</div>
      <Progress progress={45} size="sm" color="dark" />
    </div>
  );
}
