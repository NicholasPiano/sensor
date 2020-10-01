import React, { FunctionComponent, ChangeEvent } from 'react';
import { Input, Button, Form } from 'semantic-ui-react';
import { Form as FinalForm, Field } from 'react-final-form';

import { capitalize } from '../../utilities';
import { EFields, TSensor } from '../../types';
import StyledNewEntryForm from './NewEntryForm.style';

interface INewEntryFormProps {
  onAppendData: (data: TSensor[]) => void;
}

const NewEntryForm: FunctionComponent<INewEntryFormProps> = ({
  onAppendData,
}) => {
  const renderFields = () => {
    return Object.values(EFields).map(
      field => (
        <Field name={field} key={field}>
          {({ input: { value, onChange } }) => {
            const handleChange = (
              event: ChangeEvent,
              { value: newValue }: { value: string },
            ) => onChange(newValue);

            return (
              <Input
                placeholder={capitalize(field)}
                value={value}
                onChange={handleChange}
              />
            );
          }}
        </Field>
      )
    );
  };
  const handleSubmit = (result: TSensor) => {
    onAppendData([result]);
  };

  return (
    <FinalForm onSubmit={handleSubmit}>
      {({ form: { reset }, handleSubmit: handleSubmitForm }) => {
        const handleSubmitWithReset = () => {
          handleSubmitForm();
          reset();
        }

        return (
          <StyledNewEntryForm>
            <Form.Group widths="equal">
              {renderFields()}
            </Form.Group>
            <Form.Group>
              <Button onClick={handleSubmitWithReset}>
                Add new record
              </Button>
            </Form.Group>
          </StyledNewEntryForm>
        );
      }}
    </FinalForm>
  );
};

export default NewEntryForm;
