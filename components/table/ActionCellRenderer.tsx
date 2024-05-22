import React from 'react';
import { ShadcnModal } from '../ShadcnModal';
import { DeleteOutline, ModeEditOutline } from '@mui/icons-material';

export const ActionCellRenderer = (props: any) => {
  const [open, setOpen] = React.useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    // handle delete logic here
  };

  return (
    <div>
        <ModeEditOutline className="text-[16px] inline-block mr-5 text-[#2196f3]
        cursor-pointer bg-[#2196f34f] w-6 h-6 p-[3px] rounded-[5px] "  onClick={handleEdit}/>
      <ShadcnModal open={open} setOpen={setOpen} />
          <DeleteOutline className="text-[16px] inline-block mr-5 text-[red]
        cursor-pointer bg-[#ff00004a] w-6 h-6 p-[3px] rounded-[5px] "   onClick={handleDelete}/>
    </div>
  );
};