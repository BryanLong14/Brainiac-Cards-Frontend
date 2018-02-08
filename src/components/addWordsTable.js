import { Grid, Input, Select } from "react-spreadsheet-grid";
import React from "react";


class UserSpreadsheet extends React.Component {
  render() {
    return (
      <Grid 
        columns={[
          {
            title: () => 'Name', 
            value: (row, { focus }) => {
                return (
                    <Input  
                      value={row.name}
                      focus={focus}
                    />
                );
            }
          }, {
            title: () => 'Position',
            value: (row, { focus }) => {
                return (
                    <Select  
                      value={row.positionId}
                      isOpen={focus}
                      // items={somePositions}
                    />
                );
            }
          }
        ]}
        
        getRowKey={row => row.id}
      />
    )
  }
}

export default UserSpreadsheet;