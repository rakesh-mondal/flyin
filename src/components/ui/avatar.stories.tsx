import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Badge } from './badge';
import { User, Star, Shield, Mic, HeadphonesIcon } from 'lucide-react';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

// Basic avatar example
export const Basic: Story = {
  args: {
    className: 'h-12 w-12',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

// With fallback
export const WithFallback: Story = {
  args: {
    className: 'h-12 w-12',
  },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/broken-image.jpg" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};

// User profile avatar
export function UserProfileAvatar() {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16 border-2 border-primary">
        <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Arun Kumar" />
        <AvatarFallback className="bg-primary text-primary-foreground text-xl">AK</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold text-lg">Arun Kumar</h3>
        <p className="text-muted-foreground text-sm">Gold Tier Member</p>
      </div>
    </div>
  );
}

// Customer service representative
export function CustomerServiceAvatar() {
  return (
    <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://i.pravatar.cc/150?img=44" alt="Priya Singh" />
          <AvatarFallback className="bg-blue-100 text-blue-600">PS</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-background"></div>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium">Priya Singh</p>
          <Badge variant="outline" className="font-normal text-xs flex items-center gap-1">
            <HeadphonesIcon className="h-3 w-3" />
            <span>Support</span>
          </Badge>
        </div>
        <p className="text-muted-foreground text-xs">Customer Service • Delhi Hub</p>
      </div>
    </div>
  );
}

// Flight crew
export function FlightCrewAvatars() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
        <Avatar className="h-14 w-14">
          <AvatarImage src="https://i.pravatar.cc/150?img=59" alt="Captain Rajiv Sharma" />
          <AvatarFallback className="bg-blue-100 text-blue-600">RS</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">Captain Rajiv Sharma</p>
            <Badge className="bg-blue-600">Pilot</Badge>
          </div>
          <p className="text-muted-foreground text-xs mt-1">20+ years experience • Air India</p>
          <div className="flex text-amber-500 mt-1">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
        <Avatar className="h-14 w-14">
          <AvatarImage src="https://i.pravatar.cc/150?img=48" alt="Sarika Patel" />
          <AvatarFallback className="bg-blue-100 text-blue-600">SP</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">Sarika Patel</p>
            <Badge className="bg-indigo-600">Cabin Crew</Badge>
          </div>
          <p className="text-muted-foreground text-xs mt-1">8 years experience • IndiGo</p>
          <div className="flex text-amber-500 mt-1">
            {Array(4).fill(0).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current" />
            ))}
            <Star className="h-3 w-3 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Airport staff
export function AirportStaffAvatars() {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-xl">
      <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarImage src="https://i.pravatar.cc/150?img=50" alt="Amit Verma" />
          <AvatarFallback className="bg-blue-100 text-blue-600">AV</AvatarFallback>
        </Avatar>
        <p className="font-medium text-center">Amit Verma</p>
        <Badge variant="outline" className="mt-1 font-normal">
          Check-in Counter
        </Badge>
        <p className="text-xs text-muted-foreground mt-2 text-center">Terminal 3, Bengaluru</p>
      </div>
      
      <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarImage src="https://i.pravatar.cc/150?img=32" alt="Neha Sharma" />
          <AvatarFallback className="bg-blue-100 text-blue-600">NS</AvatarFallback>
        </Avatar>
        <p className="font-medium text-center">Neha Sharma</p>
        <Badge variant="outline" className="mt-1 font-normal">
          Boarding Gate
        </Badge>
        <p className="text-xs text-muted-foreground mt-2 text-center">Gate 14B, Bengaluru</p>
      </div>
      
      <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarImage src="https://i.pravatar.cc/150?img=61" alt="Vikram Singh" />
          <AvatarFallback className="bg-blue-100 text-blue-600">VS</AvatarFallback>
        </Avatar>
        <p className="font-medium text-center">Vikram Singh</p>
        <Badge variant="outline" className="mt-1 font-normal">
          Security Officer
        </Badge>
        <p className="text-xs text-muted-foreground mt-2 text-center">Security Checkpoint, Delhi</p>
      </div>
      
      <div className="flex flex-col items-center p-4 bg-muted/30 rounded-lg">
        <Avatar className="h-16 w-16 mb-2">
          <AvatarImage src="https://i.pravatar.cc/150?img=25" alt="Meera Iyer" />
          <AvatarFallback className="bg-blue-100 text-blue-600">MI</AvatarFallback>
        </Avatar>
        <p className="font-medium text-center">Meera Iyer</p>
        <Badge variant="outline" className="mt-1 font-normal">
          Customer Support
        </Badge>
        <p className="text-xs text-muted-foreground mt-2 text-center">Information Desk, Delhi</p>
      </div>
    </div>
  );
}

// Avatar with badge
export function AvatarWithBadge() {
  return (
    <div className="flex space-x-4">
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://i.pravatar.cc/150?img=62" alt="Suresh Patel" />
          <AvatarFallback>SP</AvatarFallback>
        </Avatar>
        <span className="absolute top-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-white" />
      </div>
      
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://i.pravatar.cc/150?img=29" alt="Anita Desai" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-[8px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-background">
          3
        </div>
      </div>
      
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://i.pravatar.cc/150?img=53" alt="Dinesh Kumar" />
          <AvatarFallback>DK</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-background">
          <Shield className="h-4 w-4 text-blue-600 fill-blue-100" />
        </div>
      </div>
      
      <div className="relative">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://i.pravatar.cc/150?img=41" alt="Lakshmi Nair" />
          <AvatarFallback>LN</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-1 -right-1 rounded-full border-2 border-background">
          <Mic className="h-4 w-4 text-red-600 fill-red-100" />
        </div>
      </div>
    </div>
  );
}

// Passenger group
export function PassengerGroupAvatars() {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <h3 className="font-medium">Passenger Group</h3>
      <p className="text-sm text-muted-foreground">BLR → DEL • AI-505 • 23 Aug</p>
      
      <div className="flex -space-x-4 mt-2">
        <Avatar className="h-10 w-10 border-2 border-background">
          <AvatarImage src="https://i.pravatar.cc/150?img=67" alt="Raj Malhotra" />
          <AvatarFallback className="bg-red-100 text-red-600">RM</AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10 border-2 border-background">
          <AvatarImage src="https://i.pravatar.cc/150?img=47" alt="Aisha Malhotra" />
          <AvatarFallback className="bg-indigo-100 text-indigo-600">AM</AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10 border-2 border-background">
          <AvatarImage src="https://i.pravatar.cc/150?img=21" alt="Aryan Malhotra" />
          <AvatarFallback className="bg-green-100 text-green-600">AM</AvatarFallback>
        </Avatar>
        <Avatar className="h-10 w-10 border-2 border-background">
          <AvatarImage src="https://i.pravatar.cc/150?img=19" alt="Siya Malhotra" />
          <AvatarFallback className="bg-pink-100 text-pink-600">SM</AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-background bg-muted text-xs font-medium">
          +2
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t flex justify-between items-center">
        <span className="text-sm font-medium">Seats</span>
        <span className="text-sm text-muted-foreground">12A, 12B, 12C, 12D, 13A, 13B</span>
      </div>
    </div>
  );
} 