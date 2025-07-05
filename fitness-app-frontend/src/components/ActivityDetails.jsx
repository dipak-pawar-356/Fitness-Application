// import React, { useEffect, useState } from 'react'
// import { getActivityDetail, getActivityDetails } from '../services/api';
// import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

// const ActivityDetails = () => {
//   const { id } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [recommendation, setRecommendation] = useState(null);

//   useEffect(() => {
//     const fetchActivityDetail = async () => {
//         try {
//             const response = await getActivityDetail(id);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             setActivity(response.data);
//             setRecommendation(response.data.recommendation);
//         } catch (error) {
//             console.error('Error fetching activity details:', error);
//         }
//     }
//     fetchActivityDetail();
//   }, [id]);

//   if (!activity) {
//     return <Typography>Loading...</Typography>;
//     }
        

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
//         <Card sx={{ mb: 2 }}>
//             <CardContent>
//                 <Typography variant="h5" component="div" gutterBottom>Activity Details</Typography>
//                 <Typography>Type: {activity.type}</Typography>
//                 <Typography>Duration: {activity.duration} minutes</Typography>
//                 <Typography>Calories Burned: {activity.caloriesBurned}</Typography>
//                 <Typography>Date: {new Date(activity.createdAt).toLocaleString()}</Typography>
//             </CardContent>

//         </Card>

//         {recommendation && (
//             <Card>
//                 <CardContent>
//                     <Typography variant="h6" component="div" gutterBottom>AI Recommendation</Typography>
//                     <Typography variant='h6'>Analysis:</Typography>
//                     <Typography paragraph>{activity.recommendation}</Typography>

//                     <Divider sx={{ my: 2 }} />
//                     <Typography variant='h6'>Improvements:</Typography>
//                     {
//                         activity?.improvements?.map((improvement, index) => (
//                             <Typography key={index} paragraph> {activity.improvements} </Typography>
//                     ))}


//                 </CardContent>
//             </Card>
//         )}

//     </Box>
//   )
// }

// export default ActivityDetails


















import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getActivityDetail } from '../services/api';
import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

const ActivityDetails = () => {
  const { id } = useParams();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const response = await getActivityDetail(id);
        setRecommendation(response.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          console.error('Error fetching activity details:', error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchActivityDetail();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (notFound || !recommendation) {
    return <Typography>No recommendation found for this activity.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Activity Details
          </Typography>
          <Typography>Type: {recommendation.activityType}</Typography>
          <Typography>Duration: {recommendation.duration || '-'} minutes</Typography>
          <Typography>Calories Burned: {recommendation.caloriesBurned || '-'}</Typography>
          <Typography>
            Date: {recommendation.createdAt ? new Date(recommendation.createdAt).toLocaleString() : '-'}
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            AI Recommendation
          </Typography>
          {recommendation.recommendation && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Analysis:
              </Typography>
              <Typography paragraph>{recommendation.recommendation}</Typography>
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {recommendation.improvements && recommendation.improvements.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Improvements:
              </Typography>
              {recommendation.improvements.map((improvement, idx) => (
                <Typography key={idx} paragraph>
                  {improvement}
                </Typography>
              ))}
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {recommendation.suggestions && recommendation.suggestions.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Suggestions:
              </Typography>
              {recommendation.suggestions.map((suggestion, idx) => (
                <Typography key={idx} paragraph>
                  {suggestion.workout
                    ? `${suggestion.workout}: ${suggestion.description}`
                    : suggestion}
                </Typography>
              ))}
              <Divider sx={{ my: 2 }} />
            </>
          )}

          {recommendation.safety && recommendation.safety.length > 0 && (
            <>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Safety Tips:
              </Typography>
              {recommendation.safety.map((tip, idx) => (
                <Typography key={idx} paragraph>
                  {tip}
                </Typography>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityDetails;