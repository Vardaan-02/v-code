import { Router } from "express";
import { register } from "../controllers/auth/register.controller";
import { login } from "../controllers/auth/login.controller";
import { logout } from "../controllers/auth/logout.controller";
import { getMe } from "../controllers/auth/me.controller";
import { forgotPassword } from "../controllers/auth/forgot-password.controller";
import { resetPassword } from "../controllers/auth/reset-password.controller";
import { changePassword } from "../controllers/auth/change-password.controller";
import { oauthHandler } from "../controllers/auth/oauth.controller";
import { verifyEmail } from "../controllers/auth/verify-email.controller";
import { authenticate } from "../middelware/auth.middleware";

const router = Router();

// ✅ Implementing now
router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", authenticate, changePassword);

router.get("/oauth/:provider", oauthHandler); //pending

router.get("/verify-email", verifyEmail);

// ❌ Not implementing now

// router.post("/enable-2fa", authenticate, enable2FA);
// router.post("/verify-2fa", verify2FA);
// router.post("/disable-2fa", authenticate, disable2FA);

// router.get("/sessions", authenticate, getActiveSessions);
// router.post("/revoke-session", authenticate, revokeSession);
// router.post("/revoke-all", authenticate, revokeAllSessions);

// router.post("/lock-account", lockAccount);
// router.post("/unlock-account", unlockAccount);

// router.delete("/delete-account", authenticate, deleteAccount);

export default router;
