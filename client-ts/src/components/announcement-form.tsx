
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRef } from "react";
import Announcement from "../models/Announcement";

interface Prop {
  announcement: Partial<Announcement>
  callbackFn: (ann: Partial<Announcement>) => void
}

function AnnouncementForm(props: Prop) {
  const topicRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLInputElement>(null)
  const remarkIfPositive = useRef<HTMLInputElement>(null)
  const remarkIfNegative = useRef<HTMLInputElement>(null)

  const onSubmit = () => {
    props.callbackFn({
      id: props.announcement.id,
      topic: topicRef.current?.value,
      description: descriptionRef.current?.value,
      remarkIfPositive: remarkIfPositive.current?.value,
      remarkIfNegative: remarkIfNegative.current?.value
    })
  }

  return (
    <Box>
      <div style={{ margin: 20 }}>
        <TextField fullWidth sx={{ minWidth: 120 }} label="Topic" variant="outlined" defaultValue={props.announcement.topic} inputRef={topicRef} />
      </div>
      <div style={{ margin: 20 }}>
        <TextField fullWidth multiline sx={{ minWidth: 120 }} rows={4} label="Description" variant="outlined" defaultValue={props.announcement.description} inputRef={descriptionRef} />
      </div>
      <div style={{ margin: 20 }}>
        <TextField fullWidth multiline sx={{ minWidth: 120 }} rows={4} label="Remark (Positive)" variant="outlined" defaultValue={props.announcement.remarkIfPositive} inputRef={remarkIfPositive} />
      </div>
      <div style={{ margin: 20 }}>
        <TextField fullWidth multiline sx={{ minWidth: 120 }} rows={4} label="Remark (Negative)" variant="outlined" defaultValue={props.announcement.remarkIfNegative} inputRef={remarkIfNegative} />
      </div>
      <div style={{ margin: 20 }}>
        <Button variant="contained" sx={{ mb: 1, float: 'right', verticalAlign: 'bottom' }} onClick={onSubmit}>{props.announcement.id ? 'Update' : 'Create'}</Button>
      </div>
    </Box>
  )
}

export default AnnouncementForm;