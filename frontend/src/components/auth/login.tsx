import axios from 'axios';
import { Box, Button, Form, FormField, Heading, Text, TextInput } from 'grommet';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import api from '../../utils/api';
import ErrorBox from '../common/error';
import { RouterAnchor } from '../common/routerLinks';

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data: Inputs) => {
    try {
      setApiError(null);
      const resp = await axios.post(api.LOGIN_INSTRUCTOR, data);
      window.localStorage.setItem('token', resp.data.data.token);
      history.go(-1);
    } catch (error) {
      setApiError(error.response.data?.message);
    }
  };
  return (
    <Box width="full" pad={{ horizontal: '15%', vertical: 'medium' }} fill>
      <Heading size="medium" textAlign="center" style={{ maxWidth: '100%' }}>
        Login to your Instructor account
      </Heading>
      <Text textAlign="center">
        <RouterAnchor path="/auth/register" label="No account? Register Now" />
      </Text>

      {apiError && <ErrorBox text={apiError} />}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Email">
          <TextInput
            name="email"
            placeholder="johndoe@gmail.com"
            ref={register({
              required: {
                value: true,
                message: 'email is required.',
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'invalid email address.',
              },
            })}
          />
        </FormField>
        <div className="errors">{errors.email && errors.email.message}</div>

        <FormField label="Password">
          <TextInput
            name="password"
            type="password"
            ref={register({
              required: { value: true, message: 'password cannot be empty.' },
              minLength: {
                value: 8,
                message: 'password must be at least 8 chars long.',
              },
            })}
          />
        </FormField>
        <div className="errors">{errors.password && errors.password.message}</div>

        <Box direction="row" gap="medium" fill>
          <Button type="submit" size="medium" primary label="Login" />
        </Box>
      </Form>
    </Box>
  );
}
