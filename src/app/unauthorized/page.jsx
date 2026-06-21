"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react"; // Updated for standard HeroUI v3 bundle
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="max-w-md w-full text-center space-y-8 p-8 rounded-2xl border border-default-100 bg-content1 shadow-sm">
        {/* Icon & Visual Alert */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-danger-50 text-danger rounded-full animate-pulse">
            <ShieldAlert size={48} strokeWidth={1.5} />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-danger-50 text-danger border border-danger-100">
            Error 403: Forbidden
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Access Denied
          </h1>
          <p className="text-sm text-default-500 leading-relaxed">
            You do not have permission to view this dashboard. It looks like you
            tried to access another organizer or attendee's private workspace.
          </p>
        </div>

        {/* Info Box */}
        <div className="text-xs text-left p-3.5 rounded-xl bg-default-50 text-default-600 border border-default-200/60">
          <p className="font-semibold mb-1">Why am I seeing this?</p>
          <ul className="list-disc list-inside space-y-1 text-default-500">
            <li>You are logged in with a different account.</li>
            <li>The URL belongs to another registered user.</li>
            <li>Your current session token lacks required scope.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            className="w-full sm:flex-1 font-medium"
            variant="bordered"
            startContent={<ArrowLeft size={18} />}
            onPress={() => router.back()}
          >
            Go Back
          </Button>

          
        </div>
      </div>
    </div>
  );
}
