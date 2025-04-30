
import React from 'react';
import { User, Settings, Bell, CreditCard, Shield, HelpCircle, LogOut } from 'lucide-react';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';

export default function Profile() {
  const menuItems = [
    { icon: Settings, label: 'Account Settings' },
    { icon: Bell, label: 'Notifications' },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: Shield, label: 'Privacy & Security' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: LogOut, label: 'Sign Out' }
  ];

  return (
    <div className="flex flex-1 flex-col bg-apple-gray">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="px-5 py-5">
          <h1 className="text-2xl font-medium">Profile</h1>
          <p className="text-sm text-gray-500">Manage your account and preferences</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* User profile card */}
        <div className="m-4 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="bg-apple-blue p-6 text-center text-white">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
              <User className="h-10 w-10" />
            </div>
            <h2 className="mt-3 text-xl font-medium">John Appleseed</h2>
            <p className="text-sm text-white/80">San Francisco, CA</p>
          </div>
          
          <div className="px-6 py-4">
            <div className="flex justify-around">
              <div className="text-center">
                <p className="text-xl font-medium">12</p>
                <p className="text-xs text-gray-500">Trips</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="text-center">
                <p className="text-xl font-medium">8</p>
                <p className="text-xs text-gray-500">Countries</p>
              </div>
              <Separator orientation="vertical" className="h-10" />
              <div className="text-center">
                <p className="text-xl font-medium">24,500</p>
                <p className="text-xs text-gray-500">Miles</p>
              </div>
            </div>
            
            <button className="mt-4 w-full rounded-full border border-apple-blue px-4 py-2 text-sm font-medium text-apple-blue">
              Edit Profile
            </button>
          </div>
        </div>
        
        {/* Travel preferences */}
        <div className="m-4 overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="p-4">
            <h3 className="mb-3 text-lg font-medium">Travel Preferences</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm">Preferred airline</p>
                <p className="text-sm font-medium">Air France</p>
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <p className="text-sm">Seat preference</p>
                <p className="text-sm font-medium">Window</p>
              </div>
              <Separator />
              
              <div className="flex items-center justify-between">
                <p className="text-sm">Meal preference</p>
                <p className="text-sm font-medium">Vegetarian</p>
              </div>
            </div>
            
            <button className="mt-4 w-full rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              Update Preferences
            </button>
          </div>
        </div>
        
        {/* Menu items */}
        <div className="m-4 overflow-hidden rounded-xl bg-white shadow-sm">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <div 
                className={cn(
                  "flex cursor-pointer items-center px-6 py-4",
                  "transition-colors hover:bg-gray-50"
                )}
              >
                <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                <span>{item.label}</span>
              </div>
              {index < menuItems.length - 1 && <Separator />}
            </React.Fragment>
          ))}
        </div>
        
        {/* App info */}
        <div className="m-4 mb-20 text-center text-xs text-gray-500">
          <p>Apple Journeys</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
