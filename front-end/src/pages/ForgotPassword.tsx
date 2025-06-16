import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Code2,
  Mail,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/types/auth";
import { Toaster } from "@/components/ui/sonner";
import { useForgotPassword } from "@/hooks/useAuth";

export default function ForgotPasswordPage() {
  const {
    mutateAsync,
    isPending: isLoading,
    error,
    status,
  } = useForgotPassword();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    mutateAsync(data);
  };

  const handleResendEmail = async () => {
    const values = form.getValues();
    if (!values.email) return;
    await mutateAsync({ email: values.email });
  };

  const watchEmail = form.watch("email");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <Link to="/" className="flex items-center space-x-2 w-fit">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-50 animate-pulse" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            V-Code
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] p-4">
        <div className="w-full max-w-md">
          {/* Badge */}
          <div className="text-center mb-8">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 px-4 py-2 backdrop-blur-sm"
            >
              <KeyRound className="w-4 h-4 mr-2 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Password Recovery
              </span>
            </Badge>
          </div>

          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
            {status !== "success" ? (
              <>
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Forgot Password?
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    No worries! Enter your email and we'll send you reset
                    instructions
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {error && (
                    <Alert className="border-destructive/50 bg-destructive/10">
                      <AlertCircle className="h-4 w-4 text-destructive" />
                      <AlertDescription className="text-destructive">
                        {error.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Enter your email address"
                                  className="pl-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl group"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send className="w-4 h-4" />
                            <span>Send Reset Link</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-green-500/20">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Check Your Email
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    We've sent password reset instructions to
                    <br />
                    <span className="font-medium text-foreground">
                      {watchEmail}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Alert className="border-green-500/50 bg-green-500/10">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-700">
                      If you don't see the email, check your spam folder or try
                      resending.
                    </AlertDescription>
                  </Alert>

                  <Button
                    onClick={handleResendEmail}
                    variant="outline"
                    className="w-full bg-background/50 border-border/50 hover:bg-muted/50 transition-all duration-300 hover:scale-[1.02]"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                        <span>Resending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Resend Email</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </>
            )}

            <CardFooter className="text-center">
              <Link
                to="/sign-in"
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </Link>
            </CardFooter>
          </Card>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
