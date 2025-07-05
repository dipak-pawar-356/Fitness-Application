// import { Card, CardContent, Grid, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router';
// import { getActivities } from '../services/api';

// const ActivityList = () => {

//     // This component will fetch and display a list of activities
//     const [activities, setActivities] = useState([]);
//     const navigate = useNavigate();

//     const fetchActivities = async () => {
//         try {
//             const response = await getActivities();
//             setActivities(response.data);
//         } catch (error) {
//             console.error("Error fetching activities:", error); 
//         }
//     }

//     // Fetch activities when the component mounts
//     useEffect(() => {
//         fetchActivities();
//     }, []);


//   return (
//     <Grid container spacing={2} >

//         {activities.map((activity) => (
//             <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//                 <Card sx={{cursor: 'pointer' }}
//                     onClick={() => navigate(`/activities/${activity.id}`)}
//                     >
//                         <CardContent>
//                             <Typography variant='h6'>{activity.type}</Typography>
//                             <Typography >Duration: {activity.duration}</Typography>
//                             <Typography >Calories: {activity.caloriesBurned}</Typography>
//                         </CardContent>
//                 </Card>
//             </Grid>
//         ))}

//     </Grid>
//   )
// }

// export default ActivityList













import { Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { getActivities } from '../services/api';

const ActivityList = () => {

    // This component will fetch and display a list of activities
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    const fetchActivities = async () => {
        try {
            const response = await getActivities();
            setActivities(response.data);
        } catch (error) {
            console.error("Error fetching activities:", error); 
        }
    }

    // Fetch activities when the component mounts
    useEffect(() => {
        fetchActivities();
    }, []);



return (
    <Grid container columns={12} spacing={2}>
        {activities.map((activity) => (
            <Grid key={activity.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
                <Card sx={{cursor: 'pointer' }}
                    onClick={() => navigate(`/activities/${activity.id}`)}
                >
                    <CardContent>
                        <Typography variant='h6'>{activity.type}</Typography>
                        <Typography>Duration: {activity.duration}</Typography>
                        <Typography>Calories: {activity.caloriesBurned}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))}
    </Grid>
)
}

export default ActivityList