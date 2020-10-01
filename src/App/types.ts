export enum ESortableFields {
  SENSOR_TYPE = 'sensor_type',
  READING_TIME = 'reading_ts',
}

export enum EFields {
  ID = 'id',
  BOX_ID = 'box_id',
  SENSOR_TYPE = 'sensor_type',
  NAME = 'name',
  RANGE_LOWER_BOUND = 'range_l',
  RANGE_UPPER_BOUND = 'range_u',
  LONGITUDE = 'longitude',
  LATITUDE = 'latitude',
  READING = 'reading',
  UNIT = 'unit',
  READING_TIME = 'reading_ts',
}

export type TSensor = {
  [EFields.ID]: string;
  [EFields.BOX_ID]: string;
  [ESortableFields.SENSOR_TYPE]: string;
  [EFields.NAME]: string;
  [EFields.RANGE_LOWER_BOUND]: number;
  [EFields.RANGE_UPPER_BOUND]: number;
  [EFields.LONGITUDE]: number;
  [EFields.LATITUDE]: number;
  [EFields.READING]: number;
  [EFields.UNIT]: string;
  [ESortableFields.READING_TIME]: string;
};
