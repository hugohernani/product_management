import yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character',
    ),
  passwordConfirmation: yup
    .string()
    .required('Please confirm your password')
    .when('password', {
      is: (password: string) => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], "Password doesn't match"),
    }),
});

export default validationSchema;
