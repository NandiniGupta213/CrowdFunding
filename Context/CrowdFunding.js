
import React ,{useState, useEffect} from "react";
import Wenb3Modal from "web3modal";
import {ethers} from "ethers";

import { CrowdFundingABI,CrowdFundingAddress } from "./contants";

const fetchContract = (signedOrProvider) => 
    new ethers.Contract(CrowdFundingAddress,CrowdFundingABI,signedOrProvider);
export const CrowdFundingContext = React.createContext();
export const CrowdFundingProvider = ({children})=>{
    const titleDate = "Crowd Funding Contract";
    const [currentAccount,setCurrentAccount] = useState("");
    const createCampaign = async (campaign) =>{
        const {title,description ,amount, deadline} = campaign;
        const web3Modal = new Wenb3Modal;
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        console.log(currentAccount);
        try{
            const transaction = await contract.createCampaign(
                currentAccount ,
                title,
                description,
                ethers.utils.parseUnits(amount,18),
                new Date(deadline).getTime()
            );
            await transaction.wait();
            console.log("contract call succes", transaction);  
        }
        catch(error){
            console.log("contract call failure",error);
        }
    };
    const getCampaigns = async () => {
        const provider =new ethers .providers.JsonRcpProvider();
        const parsedCampaigns = campaigns.map((campaign,i) =>({
            owner : campaign.owner,
            title:campaign.title,
            description:campaign.description,
            target:ethers.utils.formatEther(campaign.target.toString()),
            deadline:campaign.deadline.toNumber(),
            amountCollected:ethers.utils.formatEther(
                campaign.amountCollected.toString()
            ),
            pId:i,
        }));
        return parsedCampaigns;
    };
    const getUserCampaigns = async()=>{
        const provider = new ethers.providers.JsonRcpProvider();
        const contract = fetchContract(provider);
        const allCampaigns = await contract.getCampaigns();
        const account= await window.ethereum.request({
           method:"eth_accounts", 
        });
        const currentUser =acoount[0];
        const filteredCampaigns = allCampaigns.filter(
            (campaign) =>
                campaign.owner ===""
        );
        const userData = filteredCampaigns.map((campaign,i) =>({
        owner:campaign.owner,
        title:campaign.title,
        description : campaign.description,
        target:ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected:ethers.utils.formatEther(
            campaign.amountCollected.toString()
        ),
        pId:i,
    }));
    return userData;
};
   const donate = async (pId,amount)=>{
    const web3Modal = new Wenb3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchContract(signer);
    const campaignData = await contract.donateToCampaign(PId,{
        value:ethers.utils.parseEther(amount),
    });
    await campaignData.wait();
    location.reload();
    return campaignData;
   };
   const getDonations = async(pId)=> {
     const provider = new ethers.providers.JsonRcpProvider();
     const contarct = fetchContract(provider);
     const donations= await contarct.getDonators(pId);
     const numberOfDonations = donation[0].length;
     const parseDonations = [];
     for (let i =0;i<numberOfDonations; i++){
        parsedDonations.push({
            donators:donations[0][i],
            donation:ethers.utils.formatEther(donations[i][i].toString()),
        });
     }
     return parseedDonations;

   };
   const checkIfWalletConnected = async () =>{
    try{
        if(!window.ethereum)
            return setOpenError(true), SetError("Install Methamask");
        const accounts= await window.ethereum.request({
            method:"eth-accounts",
        });
        if(accounts.length){
            setCurrentAccount(account[0]);
        }
        else{
            console.log("Not Account Found");
        }
    }
    catch(error){
        console.log("Something wrong while connecting to wallet");
    }
   };
   useEffect(()=>{
    checkIfWallet();
   }, []);
   const connectWallet = async () => {
    try{
        if(!wimdow.ethereum) return console.log("Install Metamask");

        const accounts = await window.etherum.request({
            method:"eth_requestAccounts",
        });
        setCurrentAccount(account[0]);
    }
    catch(error){
        console.log("Error while connecting to wallet");
     }
   };
   return (
    <CrowdFundingContext.Provider
    value ={{
        titleDate,
        currentAccount,
        createCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        connectWallet,
    }}
    >
        {children}
        </CrowdFundingContext.Provider>
   );
};

