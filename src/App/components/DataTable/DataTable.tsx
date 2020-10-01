import React, { FunctionComponent, useCallback } from 'react';
import { Table } from 'semantic-ui-react';
import includes from 'lodash/includes';

import { ESortableFields, EFields, TSensor } from '../../types';
import { capitalize } from '../../utilities';

interface IDataTableProps {
  data: TSensor[];
  sortField: ESortableFields;
  setSortField: (field: ESortableFields) => void;
  sortAscending: boolean;
  setSortAscending: (sortAscending: boolean) => void;
}

const DataTable: FunctionComponent<IDataTableProps> = ({
  data,
  sortField,
  setSortField,
  sortAscending,
  setSortAscending,
}) => {
  const renderHeaders = useCallback(() => {
    const fields = Object.values(EFields);

    return fields.map(
      (field: string) => {
        const getSorted = () => {
          if (sortField !== field) {
            return undefined;
          }

          return sortAscending ? 'ascending' : 'descending';
        };
        const handleClick = () => {
          if (!includes(ESortableFields, field)) {
            return null;
          }

          if (sortField !== field) {
            setSortAscending(true);
            setSortField(field as ESortableFields);
          } else {
            setSortAscending(!sortAscending);
          }
        };

        return (
          <Table.HeaderCell
            key={field}
            sorted={getSorted()}
            onClick={handleClick}
          >
            {capitalize(field)}
          </Table.HeaderCell>
        );
      },
    );
  }, [sortField, setSortField, sortAscending, setSortAscending]);
  const renderData = useCallback(
    () => data.map(
      datum => {
        const renderCells = () => Object.values(EFields).map(
          field => <Table.Cell key={field}>{datum[field]}</Table.Cell>
        );
        const key = `${datum[EFields.ID]}${datum[EFields.READING_TIME]}`;

        return (
          <Table.Row key={key}>
            {renderCells()}
          </Table.Row>
        )
      },
    ),
    [data],
  );

  return (
    <Table sortable celled fixed>
      <Table.Header>
        <Table.Row>
          {renderHeaders()}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {renderData()}
      </Table.Body>
    </Table>
  );
};

export default DataTable;
