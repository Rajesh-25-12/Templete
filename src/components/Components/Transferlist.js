import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { Paper } from "@mui/material";

// Helper function to get items in 'a' that are not present in 'b'
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

// Helper function to get items that are common to both 'a' and 'b'
function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

// Helper function to get a union of 'a' and 'b'
function union(a, b) {
  return [...a, ...not(b, a)];
}

// TransferList component
export default function TransferList({ leftdata, rightdata, values, data }) {
  const [checked, setChecked] = React.useState([]); // Store the checked items
  const [left, setLeft] = React.useState(leftdata); // Store the items on the left side
  const [right, setRight] = React.useState(rightdata); // Store the items on the right side
  const leftChecked = intersection(checked, left); // Get the checked items on the left side
  const rightChecked = intersection(checked, right); // Get the checked items on the right side

  useEffect(() => {
    data(right); // Update the parent component with the items on the right side
  }, [right]);

  useEffect(() => {
    setLeft(leftdata); // Update the items on the left side
  }, [leftdata]);

  useEffect(() => {
    setRight(rightdata); // Update the items on the right side
  }, [rightdata]);

  // Toggle the checked state of an item
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value); // Add the item to checked items if it's not already checked
    } else {
      newChecked.splice(currentIndex, 1); // Remove the item from checked items if it's already checked
    }
    setChecked(newChecked);
  };

  // Get the number of checked items in a list
  const numberOfChecked = (items) => intersection(checked, items).length;

  // Toggle the checked state of all items in a list
  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items)); // Uncheck all items if all are already checked
    } else {
      setChecked(union(checked, items)); // Check all items if some or none are checked
    }
  };

  // Move checked items from left to right
  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked)); // Add checked items to the right side
    setLeft(not(left, leftChecked)); // Remove checked items from the left side
    setChecked(not(checked, leftChecked)); // Remove checked items from the checked list
  };

  // Move checked items from right to left
  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked)); // Add checked items to the left side
    setRight(not(right, rightChecked)); // Remove checked items from the right side
    setChecked(not(checked, rightChecked)); // Remove checked items from the checked list
  };

  // Render a custom list with checkboxes
  const customList = (title, items, text) => (
    <Card component={Paper} elevation={9}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={
          text === "Right"
            ? `${items.length} Chosen`
            : `${numberOfChecked(items)}/${items.length} selected`
        }
      />
      <Divider />
      <List
        sx={{
          height: 340,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem key={value} role="listitem" onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value[values]} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="left" alignItems="center">
      <Grid item xs={4}>
        {customList("Select All", left)}
      </Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            Assign &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt; Deassign
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        {customList("Select All", right, "Right")}
      </Grid>
    </Grid>
  );
}
