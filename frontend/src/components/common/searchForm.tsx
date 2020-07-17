import React, {useEffect, useState} from 'react';
import {Box, Button, Form, FormField, Select, TextInput} from 'grommet';
import {api, axios} from '../../utils/api';

export default function SearchForm(props: any) {
  const defaultState = props.defaultState || {
    text: '',
    location: '',
    category: '',
  };
  const [searchKeywords, setSearchKeywords] = useState(defaultState);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await axios.get(api.CATEGORIES);
      const data = allCategories?.data?.data || [];
      setCategories(['', ...data]);
    };
    fetchCategories();
  }, []);

  return (
    <Box width="full" margin={{ vertical: 'medium' }}>
      <Form
        value={searchKeywords}
        onChange={(nextValue) => setSearchKeywords(nextValue)}
        onReset={() => setSearchKeywords(defaultState)}
        onSubmit={props.onSubmit}
      >
        <Box direction="row" justify="center" gap="large">
          <FormField width="medium" htmlFor="text-id">
            <TextInput id="text-id" name="text" placeholder="Keyword (e.g Leadership)" />
          </FormField>
          <FormField htmlFor="location-id">
            <TextInput id="location-id" name="location" placeholder="Location" />
          </FormField>
          <FormField>
            <Select name="category" options={categories} />
          </FormField>
          <Button label="Search" type="submit" primary />
        </Box>
      </Form>
    </Box>
  );
}
