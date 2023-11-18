import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import MUICard from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import en from "../../utils/en.json";
import { Craftsman } from "@not-so-software/shared";

const Card: React.FC<Craftsman> = ({ name, rankingScore, distance }) => {
  const [randomNum] = useState(Math.floor(Math.random() * 100));
  const randomUserImageUrl = `https://randomuser.me/api/portraits/men/${randomNum}.jpg`;

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <MUICard
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
          // make the card resizable for demo
          overflow: "auto",
          resize: "horizontal",
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img src={randomUserImageUrl} loading="lazy" alt="" />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            {name}
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                {en.card.distance}
              </Typography>
              <Typography fontWeight="lg">{`${distance} KM`}</Typography>
            </div>

            <div>
              <Typography level="body-xs" fontWeight="lg">
                {en.card.rating}
              </Typography>
              <Typography fontWeight="lg">{rankingScore}</Typography>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            <Button variant="outlined" color="neutral">
              {en.card.chat}
            </Button>
            <Button variant="solid" color="primary">
              {en.card.book}
            </Button>
          </Box>
        </CardContent>
      </MUICard>
    </Box>
  );
};

export default Card;
