import { Box, Button, Form, FormField, Heading, Text, TextArea, TextInput } from 'grommet';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { axios, api } from '../../utils/api';
import ErrorBox from '../common/error';
import { RouterAnchor } from '../common/routerLinks';

type Inputs = {
  name: string;
  email: string;
  password: string;
  description: string;
  phone: string;
};

export default function Register() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const [apiError, setApiError] = useState(null);

  const onSubmit = async (data: Inputs) => {
    try {
      setApiError(null);
      const resp = await axios.post(api.REGISTER_INSTRUCTOR, data);
      window.localStorage.setItem('token', resp.data.data.token);
      window.scrollTo({ top: 0 });
      toast.success('Registration Successful! Redirecting to dashboard');
      setTimeout(() => history.go(0), 1000);
    } catch (error) {
      setApiError(error.response.data?.message);
    }
  };

  return (
    <Box width="full" pad={{ horizontal: '15%', vertical: 'medium' }} fill>
      <Heading size="medium" textAlign="center" style={{ maxWidth: '100%' }}>
        Apply for an Instructor account
      </Heading>
      <Text textAlign="center">
        <RouterAnchor path="/auth/login" label="Already Registered? Login Now" />
      </Text>

      <Box margin="medium">{apiError && <ErrorBox text={apiError} />}</Box>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField label="Name">
          <TextInput
            name="name"
            placeholder="John Doe"
            ref={register({ required: { value: true, message: 'name is required.' } })}
          />
        </FormField>
        <div className="errors">{errors.name && errors.name.message}</div>

        <FormField label="Email">
          <TextInput
            name="email"
            type="email"
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

        <FormField label="Phone">
          <TextInput
            name="phone"
            ref={register({
              required: { value: true, message: 'phone is required.' },
              pattern: {
                value: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
                message: 'invalid phone number.',
              },
            })}
          />
        </FormField>
        <div className="errors">{errors.phone && errors.phone.message}</div>

        <FormField label="Description">
          <TextArea
            name="description"
            placeholder="Description of the instructor ex: Specialized in Communication Skills"
            rows={5}
            ref={register()}
          />
        </FormField>
        <Box direction="row" gap="medium">
          <Button type="submit" primary label="Register" />
          <Button type="reset" label="Reset" />
        </Box>
      </Form>
    </Box>
  );
}
