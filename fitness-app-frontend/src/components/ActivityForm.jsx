import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { addActivity } from '../services/api';



const ActivityForm = ({ onActivityAdded }) => {

    const [activity, setActivity] = React.useState({
        type: "RUNNING",
        duration: '',
        caloriesBurned: '',
        additionalMetrics: {}
    });



    const handleSubmit = async (e) => {
            e.preventDefault();
        try{
            await addActivity(activity);
            onActivityAdded();
            setActivity({type: "RUNNING", duration: '', caloriesBurned: ''});
        }catch (error) {
            console.error("Error adding activity:", error);
            }
    }


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4}}>
        <FormControl fullWidth sx={{mb: 2}}>
            <InputLabel>Activity Type</InputLabel>
            <Select
                value={activity.type}
                onChange={(e) => setActivity({...activity, type: e.target.value})}
                label="Activity"
            >
            <MenuItem value="RUNNING">Running</MenuItem>
            <MenuItem value="WALKING">Walking</MenuItem>
            <MenuItem value="CYCLING">Cycling</MenuItem>
            </Select>
        </FormControl>
        <TextField fullWidth
            label="Duration (minutes)"
            type="number"
            value={activity.duration}
            onChange={(e) => setActivity({...activity, duration: e.target.value})}
            sx={{ mb: 2 }}
        />
        <TextField fullWidth
            label="Calories Burned"
            type="number"
            value={activity.caloriesBurned}
            onChange={(e) => setActivity({...activity, caloriesBurned: e.target.value})}
            sx={{ mb: 2 }}
        />

        {/* <TextField fullWidth
            label="Additional Metrics (JSON)"
            type="text"
            value={JSON.stringify(activity.additionalMetrics)}
            onChange={(e) => setActivity({...activity, additionalMetrics: JSON.parse(e.target.value)})}
            sx={{ mb: 2 }}
        /> */}
        <Button type='submit' variant="contained" color="primary">Add Activity</Button>
    </Box>
  )
}

export default ActivityForm
