
import { resetPasswordApi } from '../api/resetPassword';

const resetPassword = (data) => {
  console.log('sign in data in action -----', data);
  return () => {
    resetPasswordApi(data).then((response) => {
      // TODO.....

      console.log('response ----', response);
      // dispatch(openAction(response))
    })
      .catch((error) => {
        console.log('error-----', error);
      });
  };
};

export default resetPassword;
