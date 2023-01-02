import React, { useEffect, useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import { Avatar, Stack } from "@mui/material";
import AvatarService from "../Services/Avatar/Avatar.service";
import { Helpers } from "../Utility/Helpers";

const AvatarPicker = ({
  openTeamForm,
  openTeamFormUpdate,
  setTeamAvatar,
  setTeam,
  teamAvatar,
  team
}) => {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [avatarImages, setAvatarImages] = useState([]);
  const headers = Helpers.useHeader();
  useEffect(() => {
    async function getAvatar() {
      try {
        const result = await AvatarService.GetAllAvatar(headers);
        setAvatarImages(result.data);
      } catch (error) {
        console.log("Err:", error);
      }
    }

    getAvatar();
  }, []);

  const handleRightClick = () => {
    setAvatarIndex((avatarIndex + 1) % avatarImages.length);
  };

  const handleLeftClick = () => {
    setAvatarIndex(
      (avatarIndex + avatarImages.length - 1) % avatarImages.length
    );
  };
  useEffect(() => {
    setTeamAvatar(avatarImages[avatarIndex]?.id);
  }, [avatarIndex]);

  useEffect(() => {
    if (!teamAvatar) {
      return;
    }
    setTeam((prev) => ({
      ...prev,
      avatarImageId: teamAvatar,
    }));
  }, [teamAvatar]);
  return (
    <Stack alignSelf={"center"} alignItems={"center"} direction={"row"}>
      {(openTeamForm || openTeamFormUpdate) && (
        <KeyboardArrowLeftIcon onClick={handleLeftClick} />
      )}

      <Avatar
        sx={{ width: "64px", height: "64px" }}
        src={avatarImages.find((e) => e.id === team?.avatarImageId)?.url 
          
          
        }
      />

      {(openTeamForm || openTeamFormUpdate) && (
        <KeyboardArrowRightIcon onClick={handleRightClick} />
      )}
    </Stack>
  );
};

export default AvatarPicker;
