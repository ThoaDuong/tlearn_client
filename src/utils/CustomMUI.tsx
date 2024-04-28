import { LinearProgress, Tooltip, TooltipProps, keyframes, styled, tooltipClasses } from "@mui/material";


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