"use client";
import { Suspense } from "react";
import WebsiteWizard from "@/components/WebsiteWizard";

export default function WizardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-crux-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <WebsiteWizard />
    </Suspense>
  );
}
