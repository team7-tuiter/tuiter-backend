import admin from 'firebase-admin';

/*
 * The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
 * `Authorization: Bearer <Firebase ID Token>`.
 * when decoded successfully, the ID Token uid  will be returned, else
 * if null is returned then its unauthorized.
 */
const validateFirebaseToken = async (idToken) => {
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    return decodedIdToken.uid;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    return null;
  }
};

export default validateFirebaseToken;