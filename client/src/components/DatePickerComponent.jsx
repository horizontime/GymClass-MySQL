import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";

// MUI date picker component
const DatePickerComponent = ({ value, onChange }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label="Week of"
                value={value}
                onChange={onChange}
                renderInput={(params) => <TextField {...params} />}
                PopperProps={{
                    placement: "bottom-end",
                }}
            />
        </LocalizationProvider>
    );
};

export default DatePickerComponent;
