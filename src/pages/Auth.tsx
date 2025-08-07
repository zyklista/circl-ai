import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { authSchema, type AuthInput } from '@/lib/validations';
import { Eye, EyeOff, MessageCircle, Shield, ArrowLeft, KeyRound } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [formData, setFormData] = useState<AuthInput>({
    email: '',
    password: '',
    displayName: ''
  });
  const [errors, setErrors] = useState<Partial<AuthInput>>({});

  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const validateForm = () => {
    try {
      authSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Partial<AuthInput> = {};
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err: any) => {
          if (err.path && err.path[0]) {
            fieldErrors[err.path[0] as keyof AuthInput] = err.message;
          }
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent, type: 'signin' | 'signup') => {
    e.preventDefault();
    console.log('Form submitted:', { type, formData });
    
    // For sign-in, only validate email and password
    if (type === 'signin') {
      if (!formData.email || !formData.password) {
        setErrors({
          email: !formData.email ? 'Email is required' : undefined,
          password: !formData.password ? 'Password is required' : undefined,
        });
        return;
      }
      setErrors({});
    } else if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      let result;
      if (type === 'signup') {
        result = await signUp(formData.email, formData.password, formData.displayName);
      } else {
        result = await signIn(formData.email, formData.password);
      }

      console.log('Auth result:', result);

      if (result.error) {
        toast({
          title: 'Error',
          description: result.error.message,
          variant: 'destructive',
        });
      } else if (type === 'signup') {
        toast({
          title: 'Success',
          description: 'Account created successfully! Please check your email to verify your account.',
        });
      } else {
        // Sign-in successful
        toast({
          title: 'Success',
          description: 'Signed in successfully!',
        });
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof AuthInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotPasswordEmail) {
      toast({
        title: 'Error',
        description: 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      // Add forgot password logic here
      toast({
        title: 'Reset Link Sent',
        description: 'If an account exists with this email, you will receive a password reset link.',
      });
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="flex min-h-screen">
        {/* Left Panel - NAS Style */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-accent/10 items-center justify-center p-12">
          <div className="max-w-md text-center space-y-8">
            {/* 6 Colored Dots Icon */}
            <div className="flex justify-center mb-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500"></div>
                <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                <div className="w-6 h-6 rounded-full bg-green-500"></div>
                <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                <div className="w-6 h-6 rounded-full bg-pink-500"></div>
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-foreground">Circl</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your personal network storage for communities, events, and marketplace
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <MessageCircle className="w-8 h-8 text-primary mb-2" />
                  <p className="text-sm font-medium">Secure Messaging</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                  <Shield className="w-8 h-8 text-accent mb-2" />
                  <p className="text-sm font-medium">Privacy Protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center space-y-4">
              {/* 6 Colored Dots Icon */}
              <div className="flex justify-center mb-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <div className="w-4 h-4 rounded-full bg-purple-500"></div>
                  <div className="w-4 h-4 rounded-full bg-pink-500"></div>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground">Welcome to Circl</h1>
            </div>

            {showForgotPassword ? (
              /* Forgot Password Form */
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center space-y-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowForgotPassword(false)}
                      className="p-1"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <CardTitle className="flex-1">Reset Password</CardTitle>
                  </div>
                  <CardDescription>
                    Enter your email to receive a password reset link
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email Address</Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="Enter your email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button 
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg transition-all"
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              /* Main Auth Form */
              <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
                <CardHeader className="text-center space-y-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 h-12 bg-muted/30">
                      <TabsTrigger value="signin" className="font-medium">Sign In</TabsTrigger>
                      <TabsTrigger value="signup" className="font-medium">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="signin" className="space-y-2">
                      <CardTitle className="text-2xl">Welcome back</CardTitle>
                    </TabsContent>
                    
                    <TabsContent value="signup" className="space-y-2">
                      <CardTitle className="text-2xl">Create account</CardTitle>
                    </TabsContent>
                  </Tabs>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsContent value="signin">
                      <form onSubmit={(e) => handleSubmit(e, 'signin')} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="font-medium">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`h-12 ${errors.email ? 'border-destructive' : ''}`}
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="font-medium">Password</Label>
                            <Button
                              type="button"
                              variant="link"
                              className="p-0 h-auto text-sm text-primary hover:text-primary/80"
                              onClick={() => setShowForgotPassword(true)}
                            >
                              Forgot password?
                            </Button>
                          </div>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              className={`h-12 pr-12 ${errors.password ? 'border-destructive' : ''}`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg transition-all" 
                          disabled={isLoading}
                        >
                          {isLoading ? 'Signing in...' : 'Sign In'}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="signup">
                      <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="displayName" className="font-medium">Display Name</Label>
                          <Input
                            id="displayName"
                            type="text"
                            placeholder="How should we call you?"
                            value={formData.displayName || ''}
                            onChange={(e) => handleInputChange('displayName', e.target.value)}
                            className={`h-12 ${errors.displayName ? 'border-destructive' : ''}`}
                          />
                          {errors.displayName && <p className="text-sm text-destructive">{errors.displayName}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-email" className="font-medium">Email Address</Label>
                          <Input
                            id="signup-email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className={`h-12 ${errors.email ? 'border-destructive' : ''}`}
                          />
                          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="signup-password" className="font-medium">Password</Label>
                          <div className="relative">
                            <Input
                              id="signup-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a strong password"
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              className={`h-12 pr-12 ${errors.password ? 'border-destructive' : ''}`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-12 px-3 hover:bg-transparent"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                          {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                        </div>

                        <Button 
                          type="submit" 
                          className="w-full h-12 bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg transition-all" 
                          disabled={isLoading}
                        >
                          {isLoading ? 'Creating account...' : 'Create Account'}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            
            {/* Mobile Features */}
            <div className="lg:hidden grid grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Secure Messaging</p>
              </div>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center">
                <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Privacy Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}