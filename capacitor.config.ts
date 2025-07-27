import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.06b945e5034a463ea819fb5285361cd7',
  appName: 'circl-ai',
  webDir: 'dist',
  server: {
    url: 'https://06b945e5-034a-463e-a819-fb5285361cd7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1a1a1a',
      showSpinner: true,
      spinnerColor: '#8b5cf6'
    }
  }
};

export default config;