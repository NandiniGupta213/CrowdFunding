import React from "react";

const Card = ({ allcampaign, setOpenModel, setDonate, title }) => {
  console.log(allcampaign);

  const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
    return remainingDays.toFixed(0);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <p className="py-16 text-2xl font-bold leading-5"> {title}</p>
      <div className="grid gap-5 lg:grid-cols-3 sm:max-w-sm mx-auto lg:max-w-full">
        {allcampaign?.map((campaign, i) => (
          <div
            key={i}
            className="p-5 border border-gray-300 rounded-lg shadow-md"
            onClick={() => {
              setDonate(campaign);
              setOpenModel(true);
            }}
          >
            <h2 className="text-lg font-bold">{campaign.title}</h2>
            <p>{campaign.description}</p>
            <p>Days left: {daysLeft(campaign.deadline)}</p>
            <p>Goal: {campaign.goal}</p>
            <p>Amount Raised: {campaign.amountRaised}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;