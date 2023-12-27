// const getRandomToken = () => {
//     const randomToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
//     return randomToken;
//   };
    
    
  import crypto from 'crypto';

  const generateCsrfToken = () => {
    return crypto.randomBytes(100).toString('hex');
  }
  
  export const csrfToken = generateCsrfToken();