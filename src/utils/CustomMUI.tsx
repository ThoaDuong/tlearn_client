import { Box, LinearProgress, Tooltip, TooltipProps, Typography, keyframes, styled, tooltipClasses } from "@mui/material";


const indeterminate1Keyframes = keyframes({
    "0%": {
        left: "-35%",
        right: "100%"
    },
    "100%": {
        left: "0%",
        right: "0%"
    }
});

// custom countdown timer: 3s
export const StyledLinearProgress = styled(LinearProgress)({
    "& .MuiLinearProgress-bar1Indeterminate": {
        width: "auto",
        animation: `${indeterminate1Keyframes} 3s linear forwards`
    },
    "& .MuiLinearProgress-bar2Indeterminate": {
        display: "none"
    }
});

// custom tooltip
export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }}
        enterDelay={500}
        leaveDelay={200}
        placement="bottom-start"
        slotProps={{ 
            popper: { modifiers: [{
                name: 'offset',
                options: {offset: [0, -14]}
            }]},
        }}
    />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 240,
    },
  });


// custom CSS ellipsis when reach "line"
type MultilineTruncateType = {
    text: string,
    line: number
}
export const MultilineTruncate = ({ text, line }: MultilineTruncateType) => {
    return (
        <Box sx={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: 2,
            lineClamp: line,
            maxHeight: '3em', // Adjust based on the line height
        }}>
            <Typography variant="body1" sx={{ fontSize: 14 }}>
                {text}
            </Typography>
        </Box>
    );
};



// blue, green, pink, purple, 
// red, orange, green cold, light brown, 
// gray, dark pink, light orange, dark blue
export const colors = [
    '#008DDA', '#41B06E', '#FF76CE', '#7469B6', 
    '#C40C0C', '#FFC100', '#135D66', '#AF8260', 
    '#607274', '#C23373', '#FFAF45', '#387ADF'
];