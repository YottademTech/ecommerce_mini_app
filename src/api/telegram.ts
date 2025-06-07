export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

export function getTelegramUser(): TelegramUser | null {
  // @ts-ignore
  if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe && window.Telegram.WebApp.initDataUnsafe.user) {
    // @ts-ignore
    return window.Telegram.WebApp.initDataUnsafe.user as TelegramUser;
  }
  return null;
} 