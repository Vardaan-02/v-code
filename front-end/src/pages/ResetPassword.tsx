import { useEffect } from "react";
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
import { Progress } from "@/components/ui/progress";
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
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/types/auth";
import { Toaster } from "@/components/ui/sonner";
import {
  calculatePasswordStrength,
  getPasswordStrengthText,
} from "@/utils/password-strength";
import { useResetPassword } from "@/hooks/useAuth";

export default function ResetPasswordPage() {
const [searchParams] = useSearchParams();
const token = searchParams.get("token");


  const {
    mutateAsync,
    isPending: isLoading,
    error,
    status,
    showPassword,
    showConfirmPassword,
    setShowPassword,
    setShowConfirmPassword,
    passwordStrength,
    setPasswordStrength,
  } = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: token ?? "",
    },
  });

  const watchPassword = form.watch("password");

  useEffect(() => {
    const strength = calculatePasswordStrength(watchPassword || "");
    setPasswordStrength(strength);
  }, [watchPassword, setPasswordStrength]);

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await mutateAsync(data);
    } catch (err) {
      console.error("Reset password error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_60%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(239,68,68,0.1),transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
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
              <Shield className="w-4 h-4 mr-2 text-blue-500" />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Reset Password
              </span>
            </Badge>
          </div>

          <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
            {status !== "success" ? (
              <>
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Create New Password
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Choose a strong password to secure your account
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
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              New Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Enter your new password"
                                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                                  {...field}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    setPasswordStrength(
                                      calculatePasswordStrength(e.target.value)
                                    );
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            {watchPassword && (
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="text-muted-foreground">
                                    Password strength
                                  </span>
                                  <span
                                    className={`font-medium ${
                                      passwordStrength >= 75
                                        ? "text-blue-500"
                                        : passwordStrength >= 50
                                        ? "text-yellow-500"
                                        : "text-blue-500"
                                    }`}
                                  >
                                    {getPasswordStrengthText(passwordStrength)}
                                  </span>
                                </div>
                                <Progress
                                  value={passwordStrength}
                                  className="h-2"
                                />
                              </div>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Confirm New Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm your new password"
                                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary/50 transition-all duration-300"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                  ) : (
                                    <Eye className="h-4 w-4" />
                                  )}
                                </button>
                                {field.value && (
                                  <div className="absolute right-10 top-3">
                                    {watchPassword === field.value ? (
                                      <CheckCircle className="h-4 w-4 text-blue-500" />
                                    ) : (
                                      <AlertCircle className="h-4 w-4 text-blue-500" />
                                    )}
                                  </div>
                                )}
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
                            <span>Updating password...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <span>Update Password</span>
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
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-blue-500/20">
                    <CheckCircle className="w-8 h-8 text-blue-500" />
                  </div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                    Password Updated!
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your password has been successfully updated. You can now
                    sign in with your new password.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Alert className="border-blue-500/50 bg-blue-500/10">
                    <CheckCircle className="h-4 w-4 text-blue-500" />
                    <AlertDescription className="text-blue-700">
                      For security reasons, you'll need to sign in again with
                      your new password.
                    </AlertDescription>
                  </Alert>
                </CardContent>

                <CardFooter>
                  <Link to={"/sign-in"} className="flex w-full">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span>Continue to Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Button>
                  </Link>
                </CardFooter>
              </>
            )}

            {status !== "success" && (
              <CardFooter className="text-center">
                <Link
                  to={"/sign-in"}
                  className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Sign In</span>
                </Link>
              </CardFooter>
            )}
          </Card>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
