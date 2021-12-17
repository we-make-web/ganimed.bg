import { format } from 'date-fns';
import React from 'react';

const MAX_LENGTH = 170;

export const formatText = (text: string, maxLength = MAX_LENGTH): string => {
  if (!text) return;

  if (text.length > maxLength) {
    return text.substring(0, maxLength).trim() + '...';
  } else {
    return text;
  }
};

export const formatDate = (date: string | Date): string => {
  if (!date) return;

  return format(date instanceof Date ? date : new Date(date), 'MMMM dd, yyyy');
};

export const formatDateShort = (date: string | Date): string => {
  if (!date) return;

  return format(date instanceof Date ? date : new Date(date), 'dd/MM');
};

export const formatDateTime = (date: Date): string => {
  if (!date) return;

  const [hours, minutes] = date.toTimeString().split(':');
  return `${date.toLocaleDateString()} ${hours}:${minutes}`;
};

export const formatTime = (date: string | Date): string =>
  format(date instanceof Date ? date : new Date(date), 'hh:mm');

export const formatCurrency = (input: number | string | null): string => {
  if (!input) return;

  return Number(input).toFixed(2);
};

export const getFileName = (input: string) => {
  if (!input || !input.includes('/')) return;

  return input.substring(input.lastIndexOf('/') + 1);
};

export const validationError = (error, field, customMessage = '') => {
  if (!error) return null;

  return (
    <div className="invalid-feedback">
      {error?.type === 'validate' && (error?.message || customMessage || `${field} is invalid`)}
      {error?.type === 'required' && (customMessage || `${field} is required`)}
      {error?.type === 'maxLength' && (customMessage || `${field} is too long`)}
      {error?.type === 'minLength' && (customMessage || `${field} is too short`)}
      {error?.type === 'pattern' && error.message}
    </div>
  );
};

export const capitalizeName = (name) => {
  if (!name) return;

  return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
};

export const findLocalItems = (query) => {
  const key = Object.keys(localStorage).find((x) => x.match(query));

  if (key) return localStorage[key];
};

export const getHeaders = () => {
  const tokenRegex = /CognitoIdentityServiceProvider(.*)idToken/g;
  const idToken = findLocalItems(tokenRegex);

  if (idToken) {
    return { Authorization: `Bearer ${idToken}` };
  }
};

const getCurrentUserGroups = (user): any[] => {
  const tokenPayload = user?.signInUserSession?.idToken?.payload;
  if (!tokenPayload) return [];

  return tokenPayload['cognito:groups'] || [];
};

export const isAdmin = (user) => getCurrentUserGroups(user).includes('admins');
export const isClient = (user) => getCurrentUserGroups(user).includes('clients');
export const isCustomer = (user) => getCurrentUserGroups(user).length === 0;
export const isAdminOrClient = (user) => isAdmin(user) || isClient(user);
