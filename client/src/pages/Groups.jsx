import React, { Suspense, memo, useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChat } from "../components/constants/sampleData";
import { lazy } from "react";
import UserItem from "../components/shared/UserItem";

const Groups = () => {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const isAddMember = false;

  const ConfirmDeleteDialog = lazy(() =>
    import("../components/shared/ConfirmDeleteDialog")
  );
  const AddMemberDialog = lazy(() =>
    import("../components/shared/AddMemberDialog")
  );

  const chatId = useSearchParams()[0].get("group");
  console.log(chatId);

  const removeMemberHandler = (id) => {
console.log("Remove mem id: ", id);
  }

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => setIsMobileMenuOpen(false);

  const updateGroupName = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  const openAddMemberHandler = () => {
    console.log("Member added");
  };

  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    console.log("Deleted Member");
  };

  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };

  const deleteHandler = () => {
    closeConfirmDeleteHandler();
    console.log("Delete handler");
  };

  useEffect(() => {
    if(chatId){
      setGroupName(`Gc ka name ${chatId}`);
    setGroupNameUpdatedValue(`Gc ka updated name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconBtns = // Hamburger button when small screen & full grup list when desktop
    (
      <>
        <Box
          sx={{
            display: {
              xs: "block",
              sm: "none",
              position: "fixed",
              top: "1rem",
              right: "1rem",
            },
          }}
        >
          <IconButton onClick={handleMobile}>
            <MenuIcon />
          </IconButton>
        </Box>

        <Tooltip title="Back">
          <IconButton
            sx={{
              position: "absolute",
              top: "2rem",
              left: "2rem",
              bgcolor: "darkgreen",
              color: "white",
              "&:hover": {
                bgcolor: "lightgreen",
                color: "darkgreen",
              },
            }}
            onClick={navigateBack}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Tooltip>
      </>
    );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );

  const ButtonGroup = (
    <>
      <Stack
        direction={{
          xs: "column-reverse",
          sm: "row",
        }}
        spacing={"1rem"}
        p={{
          xs: "0",
          sm: "1rem",
          md: "1rem 4rem",
        }}
      >
        <Button
          onClick={openAddMemberHandler}
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          style={{
            margin: "8px",
            borderRadius: "20px",
            padding: "10px 20px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#2E8B57", // Sea Green
            color: "white",
            "&:hover": {
              backgroundColor: "#3CB371", // Medium Sea Green on hover
            },
          }}
        >
          Add Member
        </Button>
        <Button
          onClick={openConfirmDeleteHandler}
          startIcon={<DeleteIcon />}
          variant="contained"
          color="secondary"
          style={{
            margin: "8px",
            borderRadius: "20px",
            padding: "10px 20px",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#FF6347", // Tomato
            color: "white",
            "&:hover": {
              backgroundColor: "#FF4500", // Orange Red on hover
            },
          }}
        >
          Delete Group
        </Button>
      </Stack>
    </>
  );

  return (
    //Left side grup list
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
            backgroundColor: "white",
            borderRight: "2px solid #9EE5D6",
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={sampleChat} chatId={chatId} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        backgroundColor={"#C8FBE8"}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}

        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              variant="body1"
              alignSelf={"flex-start"}
            >
              Members
            </Typography>

            <Stack
              maxWidth={"40rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              // bgcolor={"#E6E6FA"}
              overflow={"auto"}
              borderRadius={"1rem"}
              height={"50vh"}
            >
              {/* Member  */}
              {sampleChat.map((i) => (
                <UserItem
                key={i._id}
                  user={i}
                  isAdded
                  handler={removeMemberHandler}
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)  ",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {confirmDeleteDialog && (
        <>
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        </>
      )}

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList w={"50vw"} myGroups={sampleChat}  chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w}
  sx={{
    
    backgroundColor: "lightseagreen",
    height: "100vh",
    overflow: "auto",
    overflowX: "hidden",
     
    
  }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItems group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        Oops! You don't have any groups
      </Typography>
    )}
  </Stack>
);

const GroupListItems = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <Stack
        direction={"row"}
        spacing={"1rem"}
        padding={"0.7rem"}
        alignItems={"center"}

      

      >
        <AvatarCard avatar={avatar}></AvatarCard>
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups;
