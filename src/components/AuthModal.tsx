import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogClose
} from '@/components/ui/dialog';
import { Tabs } from '@/components/ui/vercel-tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X, Eye, EyeOff, CircleCheck, Users, ShoppingCart, RefreshCw, Headphones } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn?: (data: SignInFormData) => void;
  onSignUp?: (data: SignUpFormData) => void;
}

// Form schemas
const signInSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
  keepSignedIn: z.boolean().optional(),
});

const signUpSchema = z.object({
  title: z.string().min(1, 'Select title'),
  firstName: z.string().min(2, 'Min 2 characters'),
  lastName: z.string().min(2, 'Min 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
  marketingConsent: z.boolean().optional(),
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;

const titles = [
  { value: 'mr', label: 'Mr.' },
  { value: 'mrs', label: 'Mrs.' },
  { value: 'ms', label: 'Ms.' },
  { value: 'dr', label: 'Dr.' },
];

const benefits = [
  {
    icon: CircleCheck,
    title: 'Special offers for Flights, Hotels, Flight+ Hotel & Holidays',
  },
  {
    icon: Users,
    title: 'Add and store traveller\'s information of family or friends',
  },
  {
    icon: ShoppingCart,
    title: 'Easy and quick checkout',
  },
  {
    icon: RefreshCw,
    title: 'Manage Your Booking',
  },
  {
    icon: Headphones,
    title: 'Get immediate refund to wallet',
  },
];

export default function AuthModal({ isOpen, onClose, onSignIn, onSignUp }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
      keepSignedIn: false,
    },
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      title: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      marketingConsent: false,
    },
  });

  const handleSignIn = (data: SignInFormData) => {
    console.log('Sign In:', data);
    onSignIn?.(data);
    onClose();
  };

  const handleSignUp = (data: SignUpFormData) => {
    console.log('Sign Up:', data);
    onSignUp?.(data);
    onClose();
  };

  const handleGoogleSignIn = () => {
    console.log('Google Sign In');
    // Implement Google OAuth
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-white rounded-lg overflow-hidden">
        <div className="flex min-h-[500px]">
          {/* Left side - Benefits */}
          <div className="w-2/5 bg-gradient-to-br from-[#194a8f] to-[#143a7a] p-6 text-white flex flex-col justify-center">
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold mb-1">Register with flyin</h2>
                <p className="text-blue-100 text-sm">& get following benefits</p>
              </div>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <benefit.icon className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-50 leading-relaxed">{benefit.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="w-3/5 p-6 flex items-center justify-center">
            <div className="w-full max-w-md">
              <Tabs 
                tabs={[
                  { id: 'signin', label: 'Sign In' },
                  { id: 'signup', label: 'Sign Up' }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                className="mb-6"
              />

              {activeTab === 'signin' && (
                <div className="space-y-3">
                <Button 
                  onClick={handleGoogleSignIn}
                  className="w-full bg-red-500 hover:bg-red-600 text-white h-9 text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>

                <div className="flex items-center gap-4 my-3">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs text-gray-500">OR</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <Form {...signInForm}>
                  <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-3">
                    <FormField
                      control={signInForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your Email-ID"
                              className="h-8 text-sm border-gray-300 focus:border-[#194a8f]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signInForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="h-8 text-sm border-gray-300 focus:border-[#194a8f] pr-8"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center justify-between">
                      <FormField
                        control={signInForm.control}
                        name="keepSignedIn"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="h-3 w-3"
                              />
                            </FormControl>
                            <FormLabel className="text-xs text-gray-600 cursor-pointer">
                              Keep me signed in
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      <a href="#" className="text-xs text-[#194a8f] hover:underline">
                        Forgot Password?
                      </a>
                    </div>

                    <p className="text-xs text-gray-500">
                      By signing in, you agree to Flyin's{' '}
                      <a href="#" className="text-[#194a8f] hover:underline">Terms of Use</a>
                      {' '}and{' '}
                      <a href="#" className="text-[#194a8f] hover:underline">Privacy Policy</a>.
                    </p>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#194a8f] hover:bg-[#143a7a] text-white h-9 text-sm font-medium"
                    >
                      Sign In
                    </Button>
                  </form>
                </Form>
                </div>
              )}

              {activeTab === 'signup' && (
                <div className="space-y-3">
                <Button 
                  onClick={handleGoogleSignIn}
                  className="w-full bg-red-500 hover:bg-red-600 text-white h-9 text-sm font-medium"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </Button>

                <div className="flex items-center gap-4 my-3">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs text-gray-500">OR</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <Form {...signUpForm}>
                  <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-3">
                    <div className="grid grid-cols-5 gap-2">
                      <FormField
                        control={signUpForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="col-span-1">
                            <FormControl>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="h-8 text-sm border-gray-300 focus:border-[#194a8f]">
                                  <SelectValue placeholder="Title" />
                                </SelectTrigger>
                                <SelectContent>
                                  {titles.map((title) => (
                                    <SelectItem key={title.value} value={title.value}>
                                      {title.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signUpForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormControl>
                              <Input
                                placeholder="First Name"
                                className="h-8 text-sm border-gray-300 focus:border-[#194a8f]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={signUpForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormControl>
                              <Input
                                placeholder="Last Name"
                                className="h-8 text-sm border-gray-300 focus:border-[#194a8f]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={signUpForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your Email-ID"
                              className="h-8 text-sm border-gray-300 focus:border-[#194a8f]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={signUpForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                className="h-8 text-sm border-gray-300 focus:border-[#194a8f] pr-8"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <p className="text-xs text-gray-500">
                      By continuing Signup, you agree to Flyin's{' '}
                      <a href="#" className="text-[#194a8f] hover:underline">Terms of Use</a>
                      {' '}and{' '}
                      <a href="#" className="text-[#194a8f] hover:underline">Privacy Policy</a>.
                    </p>

                    <FormField
                      control={signUpForm.control}
                      name="marketingConsent"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="h-3 w-3 mt-0.5"
                            />
                          </FormControl>
                          <FormLabel className="text-xs text-gray-600 cursor-pointer leading-tight">
                            Send me travel offers, deals, and news by email and message
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-[#194a8f] hover:bg-[#143a7a] text-white h-9 text-sm font-medium"
                    >
                      Sign Up
                    </Button>
                  </form>
                </Form>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 