import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MyLineAreaChart from "../charts/AreaAndLineChart";
import Image from "next/image";
import userStore from "@/store";
import { UserImagePlaceholder } from "@/data/data";
import { UserCard } from "./UserInfo";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AdminTab() {
  const { data } = userStore();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  // useLagRadar();

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Users Status Information" {...a11yProps(0)} />
          <Tab label="User events" {...a11yProps(1)} />
          <Tab label="Messages" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* PANE ONE */}
      <CustomTabPanel value={value} index={0}>
        <div className="grid grid-cols-10 gap-2 text-[12px]">
          <div className="col-span-4 md:col-span-5 lg:col-span-3">
            <h1>Administrators</h1>
            <UserCard users={data?.users} />
          </div>

          <div className="flex flex-col bg-white justify-start items-center col-span-4 md:col-span-5 lg:col-span-3">
            <h3>Line Chart of Students Admitted against each month</h3>
            <MyLineAreaChart />
          </div>

          <div className="col-span-4 md:col-span-5 lg:col-span-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
            corrupti accusantium fuga autem deleniti nihil perspiciatis ut sunt
            sed, possimus maxime quaerat aperiam exercitationem iure eum. Totam
            non nisi iste! Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Dicta corrupti accusantium fuga autem deleniti nihil
            perspiciatis ut sunt sed, possimus maxime quaerat aperiam
            exercitationem iure eum. Totam non nisi iste!
          </div>
        </div>
      </CustomTabPanel>

      {/* PANE TWO */}
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>

      {/* PANE THREE */}
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

