import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {checkToken} from './auth';

const withAuth = WrappedComponent => {
  return props => {
    const navigation = useNavigation();

    useEffect(() => {
      const validateToken = async () => {
        const isValid = await checkToken();
        if (!isValid) {
          navigation.replace('Login'); // Redirect ke Login jika token tidak valid
        }
      };

      validateToken();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
