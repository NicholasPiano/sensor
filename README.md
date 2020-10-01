# Installation

1. Install `yarn`: https://classic.yarnpkg.com/en/docs/install

Yarn version: 1.22.4

2. In root folder, run `yarn`.
3. In root folder, run `yarn start`.
4. Browser window will open.

Any JSON file in a valid JSON format and containing the correct fields will have its data displayed. The original format of the `sensor_readings.json`, while it is technically valid JSON, is not a widely accepted format, and cannot be parsed by `JSON.parse`.

# Design choices

I used a few packages I have used before, such as `react-dropzone`, `semantic-ui-react`, `react-final-form`, and `styled-components`.

Some improvements could be made when handling large amounts of data. Currently, there are no loading indicators, for example. There should probably also be pagination for very large datasets.
