export interface IToast {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}
