import { Box, Typography } from "@mui/material";

const InfoCard = ({ title, description, icon: Icon }) => {
    return (<>
        <Box
            sx={{
                position: "relative",
                p: "2rem",
                textAlign: "left",
            }}
        >
            {/* Background Icon */}
            <Box
                sx={{
                    position: "absolute",
                    top: "10px",
                    left: 0,
                    opacity: 0.1,
                    fontSize: "4rem",
                }}
            >
                <Icon fontSize="inherit" />
            </Box>

            {/* Title */}
            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ textTransform: "uppercase", letterSpacing: "1px" }}
            >
                {title}
            </Typography>

            {/* Description */}
            <Typography
                variant="body1"
                sx={{
                    mt: 1,
                    lineHeight: 1.6,
                    letterSpacing: "1px",
                }}
            >
                {description}
            </Typography>
        </Box>
    </>
    );
};

export default InfoCard;
