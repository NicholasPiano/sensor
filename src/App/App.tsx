import React, { FunctionComponent, useState, useCallback, useEffect, useMemo } from 'react';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';

import { ESortableFields, EFields, TSensor } from './types';
import { useDebounce } from './utilities';
import { DataTable, Dropzone, Filters, NewEntryForm } from './components';
import StyledApp from './App.style';

const App: FunctionComponent = () => {
  const [data, setData] = useState<TSensor[]>([]);
  const handleAppendData = useCallback((newData: TSensor[]) => {
    setData([...data, ...newData]);
  }, [data]);
  const [sortField, setSortField] = useState<ESortableFields>(ESortableFields.READING_TIME);
  const [sortAscending, setSortAscending] = useState(true);
  const [nameFilter, setNameFilter] = useState<string | null>(null);
  const debouncedNameFilter = useDebounce(nameFilter, 500);
  const [sensorTypes, setSensorTypes] = useState<string[]>([]);
  const [processedIndex, setProcessedIndex] = useState(0);

  useEffect(() => {
    if (!isEmpty(data) && data.length > processedIndex) {
      const dataToProcess = data.slice(processedIndex);
      const newSensorTypes = dataToProcess.reduce(
        (acc: string[], datum: TSensor) => {
          const { [EFields.SENSOR_TYPE]: sensorType } = datum;

          if (!includes(acc, sensorType)) {
            return [...acc, sensorType];
          }

          return acc;
        },
        [],
      );

      setSensorTypes([...sensorTypes, ...newSensorTypes]);
      setProcessedIndex(data.length);
    }
  }, [data, processedIndex, sensorTypes]);

  const [sensorTypeFilter, setSensorTypeFilter] = useState<string | null>(null);
  const displayData = useMemo(() => {
    const sortedData = data.sort(
      ({ [sortField]: fieldA }, { [sortField]: fieldB }) => {
        if (fieldA < fieldB) {
          return sortAscending ? 1 : -1;
        }

        return sortAscending ? -1 : 1;
      },
    );
    const getNameFilteredData = () => {
      if (!debouncedNameFilter) {
        return sortedData;
      }

      return sortedData.filter(
        ({ [EFields.NAME]: name }) => includes(
          name.toLowerCase(),
          debouncedNameFilter.toLowerCase(),
        ),
      );
    };
    const getSensorTypeFilteredData = () => {
      const nameFilteredData = getNameFilteredData();

      if (!sensorTypeFilter) {
        return nameFilteredData;
      }

      return nameFilteredData.filter(
        ({ [EFields.SENSOR_TYPE]: sensorType }) => sensorType === sensorTypeFilter,
      );
    };

    return getSensorTypeFilteredData();
  }, [data, sortField, sortAscending, debouncedNameFilter, sensorTypeFilter]);

  return (
    <StyledApp>
      <Dropzone onAppendData={handleAppendData} />
      <NewEntryForm onAppendData={handleAppendData} />
      <Filters
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        sensorTypes={sensorTypes}
        sensorTypeFilter={sensorTypeFilter}
        setSensorTypeFilter={setSensorTypeFilter}
      />
      <DataTable
        data={displayData}
        sortField={sortField}
        setSortField={setSortField}
        sortAscending={sortAscending}
        setSortAscending={setSortAscending}
      />
    </StyledApp>
  );
};

export default App;
