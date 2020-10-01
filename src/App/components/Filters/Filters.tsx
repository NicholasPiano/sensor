import React, { FunctionComponent, useMemo } from 'react';
import { Form } from 'semantic-ui-react';

import { NameInput, SensorTypeDropdown } from './components';
import StyledFilters from './Filters.style';

interface IFiltersProps {
  nameFilter: string | null;
  setNameFilter: (data: string | null) => void;
  sensorTypes: string[];
  sensorTypeFilter: string | null;
  setSensorTypeFilter: (data: string | null) => void;
}

const CLEAR_FILTER = '__CLEAR_FILTER__';

const Filters: FunctionComponent<IFiltersProps> = ({
  nameFilter,
  setNameFilter,
  sensorTypes,
  sensorTypeFilter,
  setSensorTypeFilter,
}) => {
  const sensorTypeOptions = useMemo(
    () => {
      const options = sensorTypes.map(
        sensorType => ({
          key: sensorType,
          text: sensorType,
          value: sensorType,
        }),
      );
      const clear = {
        key: CLEAR_FILTER,
        text: 'Clear filter',
        value: CLEAR_FILTER,
      };

      return [clear, ...options];
    },
    [sensorTypes],
  );
  const handleSensorTypeChange = (event: Event, { value }: { value: string }) => {
    if (value === CLEAR_FILTER) {
      return setSensorTypeFilter(null);
    }

    return setSensorTypeFilter(value);
  };
  const handleNameChange = (event: Event, { value }: { value: string }) => {
    if (value === '') {
      return setNameFilter(null);
    }

    return setNameFilter(value);
  };

  return (
    <StyledFilters>
      <Form.Group>
        <Form.Field>
          <SensorTypeDropdown
            placeholder="Select sensor type"
            selection
            options={sensorTypeOptions}
            value={sensorTypeFilter}
            onChange={handleSensorTypeChange}
          />
        </Form.Field>
        <Form.Field>
          <NameInput
            placeholder="Filter by name"
            value={nameFilter || ''}
            onChange={handleNameChange}
          />
        </Form.Field>
      </Form.Group>
    </StyledFilters>
  );
};

export default Filters;
