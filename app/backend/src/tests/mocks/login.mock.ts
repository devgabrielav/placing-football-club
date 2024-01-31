const validEmail = 'user@user.com';
const validPassword = 'secret_user';
const hashedPassword = '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO';
const noEmailBody = { email: '', password: validPassword };
const noPasswordBody = { email: validEmail, password: '' };
const invalidEmailBody = { email: 'wrong@email.com', password: validPassword };
const invalidFormatEmail = { email: 'abc', password: validPassword };
const invalidPasswordBody = { email: validEmail, password: 'wrongPassword' };
const invalidLengthPassword = { email: validEmail, password: 'a' };
const validLogin = { email: validEmail, password: validPassword };

const existingUser = {
  id: 1,
  username: 'User',
  role: 'user',
  email: validEmail,
  password: hashedPassword,
};

export default {
  noEmailBody,
  noPasswordBody,
  invalidEmailBody,
  invalidFormatEmail,
  invalidPasswordBody,
  invalidLengthPassword,
  validLogin,
  existingUser,
}