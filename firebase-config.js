export const firebaseConfig = {
  apiKey: "AIzaSyAsKBA1sC3bziykboVojGGFMgLV3zKR_ww",
  authDomain: "oyo-compass-live.firebaseapp.com",
  projectId: "oyo-compass-live",
  storageBucket: "oyo-compass-live.firebasestorage.app",
  messagingSenderId: "221309153934",
  appId: "1:221309153934:web:3d23e684858dc9a597cfdf",
  measurementId: "G-5T4DSCHSGG"
};

export const adminEmails = [
  "legacybuildersyyc@gmail.com"
];

export const premiumTesterEmails = [];

export const appLinks = {
  lwa: "PASTE_YOUR_LWA_LINK_HERE",
  premiumPayment: "PASTE_YOUR_PREMIUM_PAYMENT_LINK_HERE"
};

export const appFeatures = {
  useLiveAICoach: false
};

export function hasFirebaseConfig() {
  return !Object.values(firebaseConfig).some((value) => value.startsWith("PASTE_"));
}

export function isAdminEmail(email) {
  return adminEmails.includes(String(email || "").trim().toLowerCase());
}

export function isPremiumTesterEmail(email) {
  return premiumTesterEmails.includes(String(email || "").trim().toLowerCase());
}

export function getAppLink(name) {
  const value = appLinks[name] || "";
  return value.startsWith("http") ? value : "";
}
