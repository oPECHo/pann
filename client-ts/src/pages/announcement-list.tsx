import { useState, useEffect, ChangeEvent } from "react";
import { Button, Dialog, DialogTitle, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Add, Close } from '@mui/icons-material/';
import { useAuth } from "react-oidc-context";
import AnnouncementCard from "../components/announcement-card";
import PannAppBar from "../components/pann-app-bar";
import AnnouncementForm from "../components/announcement-form";
import Announcement from "../models/Announcement";
import Repo from '../repositories'

function AnnouncementList() {
  const auth = useAuth();
  const [announcementList, setAnnouncementList] = useState<Announcement[]>([])
  const [searchFilter, setSearchFilter] = useState('');
  const [createFormPopup, setCreateFormPopup] = useState(false);

  const fetchAnnouncementList = async () => {
    let params = {
      keyword: searchFilter
    }
    const result = await Repo.announcements.getAll(params)
    if (result) {
      if (announcementList.length) {
        setAnnouncementList([])
      }
      setAnnouncementList(result)
    }
  }

  const handleChangeSearchFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(event.target.value);
  }

  const onCreateAnnouncement = async (ann: Partial<Announcement>) => {
    ann.userCode = auth.user?.profile.preferred_username
    await Repo.announcements.create(ann)
    fetchAnnouncementList()
    setCreateFormPopup(false)
  }

  useEffect(() => {
    fetchAnnouncementList()
  }, [searchFilter])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <PannAppBar></PannAppBar>
      <TextField sx={{ m: 2, minWidth: 120 }} label="Search" placeholder="Topic, Description" variant="outlined" value={searchFilter} onChange={handleChangeSearchFilter} />
      <Button sx={{ m: 2, float: 'right' }} variant="contained" onClick={() => setCreateFormPopup(true)}>
        <Add /> Announcement
      </Button>
      {announcementList.length
        ?
        <Grid container sx={{ p: 2 }} spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12, lg: 12, xl: 10 }}>
          {announcementList.map((ann, index) =>
            <Grid item xs={2} sm={4} md={4} lg={3} xl={2} key={index}>
              <AnnouncementCard announcement={ann} callbackFetchFn={fetchAnnouncementList}></AnnouncementCard>
            </Grid>
          )}
        </Grid>
        :
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
          <Typography variant="body2" color="text.secondary">No Announcement Found</Typography>
        </Box>
      }


      <Dialog PaperProps={{ sx: { minWidth: "50%" } }} open={createFormPopup} onClose={() => setCreateFormPopup(false)}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
          Create Announcement
          <IconButton onClick={() => setCreateFormPopup(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <AnnouncementForm announcement={{}} callbackFn={onCreateAnnouncement}></AnnouncementForm>
      </Dialog>
    </Box>
  );
}

export default AnnouncementList;