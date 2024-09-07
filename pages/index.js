import React, { useEffect, useContext, useState } from "react";
import { CrowdFundingContext } from "../Context/Crowdfunding";
import { Hero, Card, PopUp } from "../Components";

const Index = () => {
  const {
    titleDate,
    getCamapaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDoantions,
  } = useContext(CrowdFundingContext);

  const [allCampaign, setAllCampaign] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);

  // Fetch campaign data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getCamapaigns();
        const userData = await getUserCampaigns();
        setAllCampaign(allData);
        setUserCampaign(userData);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchData();
  }, [getCamapaigns, getUserCampaigns]);

  return (
    <>
      <Hero titleDate={titleDate} createCampaign={createCampaign} />
      <Card
        title="All Listed Campaigns"
        allCampaign={allCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />
      <Card
        title="Your Created Campaigns"
        allCampaign={userCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />
      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDoantions={getDoantions}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default Index;
