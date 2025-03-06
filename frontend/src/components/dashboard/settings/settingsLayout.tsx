'use client';

import React from 'react';
import SettingsSideBar from './settingsSideBar';

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SettingsSideBar />
      <main className="flex-1">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
}
