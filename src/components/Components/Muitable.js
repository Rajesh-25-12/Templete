import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Muitable = (props) => {
  return (
    <div>
      {props.data.map((item, index) => (
        <div>
            <div>
                Route no:
            </div>
            <div>
                Route name:
            </div>
            <TableContainer component={Paper}>
            <Table>
          <TableHead>
            <TableRow>
              <TableCell>Route No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>No</TableCell>
              <TableCell>Latitude</TableCell>
              <TableCell>Longitude</TableCell>
              <TableCell>Stop</TableCell>
              <TableCell>Details Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell>Drop</TableCell>
              <TableCell>Attribute</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {item.ro.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.routeno}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.details.no}</TableCell>
                <TableCell>{item.details.lat}</TableCell>
                <TableCell>{item.details.lng}</TableCell>
                <TableCell>{item.details.stop}</TableCell>
                <TableCell>{item.details.name}</TableCell>
                <TableCell>{item.details.loc}</TableCell>
                <TableCell>{item.details.pickup}</TableCell>
                <TableCell>{item.details.drop}</TableCell>
                <TableCell>{item.details.attr}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </TableContainer>
        </div>
      ))}
    </div>
  )
}

export default Muitable
