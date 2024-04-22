import {jwtDecode} from 'jwt-decode';
const getApiUrl = () => {
  const { protocol, hostname } = window.location;
    if (protocol === 'http:' && hostname === 'localhost') {
    return 'http://localhost:4000';
  } else {
    return 'https://api-26qu.onrender.com'; // Endre til din faktiske produksjons-URL
  }
};
export default getApiUrl;



export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function convertToLocaleTime(dateTimeString: any) {
  const dateTime = new Date(dateTimeString);
  const localTime = dateTime.toLocaleString();
  const localTimeWithDashes = localTime.replace(/\//g, '-');

  return localTimeWithDashes;
}
export function convertDateToLocale(dateString: any) {
  const date = new Date(dateString);
  const localDate = date.toLocaleDateString();
  const localDateWithDashes = localDate.replace(/\//g, '-');

  return localDateWithDashes;
}

export function getUserDetailsFromToken() {
  const token = getToken();
  if (!token) return null;

  try {
    // Type assertion her for å håndtere tilpassede claims
    const decoded = jwtDecode(token) as {
      exp: number;
      iat: number;
      userId: number; 
      userEmail: string;
      userFirstName: string;
      userLastName: string;
      userRole?: string;
      userProfilePictureId?: string;
      userProfilePictureType?: string;
      userProfilePictureName?: string;
    };
    return decoded; // Returnerer hele decoded objektet, men kan også velge å returnere spesifikke verdier
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}
export const getUrl = () => {
  const { protocol, hostname } = window.location;
  if (protocol === 'http:' && hostname === 'localhost') {
    return 'http://localhost:3000';
  } else {
    return 'https://inovix.no'; // Endre til din faktiske produksjons-URL
  }
}

export const logoutUser = () => {
  localStorage.removeItem('token');
  window.location.href = getUrl();
};