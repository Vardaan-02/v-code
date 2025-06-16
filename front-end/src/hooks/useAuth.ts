import { forgotPassword } from "@/api/auth/forgot-password";
import { login } from "@/api/auth/login";
import { register } from "@/api/auth/register";
import { resetPassword } from "@/api/auth/reset-password";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const navigate = useNavigate();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Registeration Completed");
      navigate("/sign-in");
    },
    onError: (error) => {
      console.error("❌ Failed to Register", error);
      toast.error("Failed");
    },
  });
  return {
    showConfirmPassword,
    setShowConfirmPassword,
    showPassword,
    setShowPassword,
    passwordStrength,
    setPasswordStrength,
    mutateAsync,
    isPending,
    error,
  };
};

export const useLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Welcome Back");
      navigate("/code");
    },
    onError: (error) => {
      console.error("❌ Failed to Login", error);
      toast.error("Failed");
    },
  });

  return { showPassword, setShowPassword, mutateAsync, isPending, error };
};

export const useForgotPassword = () => {
  const { mutateAsync, isPending, error, status } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Verfication Link Sent");
    },
    onError: (error) => {
      console.error("❌ Failed to send verification link", error);
      toast.error("Failed");
    },
  });

  return { mutateAsync, isPending, error, status };
};

export const useResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const { mutateAsync, isPending, error, status } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password Changed");
    },
    onError: (error) => {
      console.error("❌ Failed to reset password", error);
      toast.error("Failed");
    },
  });

  return {
    showConfirmPassword,
    setShowConfirmPassword,
    showPassword,
    setShowPassword,
    passwordStrength,
    setPasswordStrength,
    mutateAsync,
    isPending,
    error,
    status
  };
};
