import eBay from "ebay-node-api";

let ebay;

export const instantiateApi = () => {
  const appID_prod = process.env.appID_prod;
  const clientSecret_prod = process.env.clientSecret_prod;

  ebay = new eBay({
    clientID: appID_prod,
    clientSecret: clientSecret_prod,
    env: "PRODUCTION",
    //env: 'SANDBOX',
    body: {
      grant_type: "client_credentials",
      scope: "https://api.ebay.com/oauth/api_scope",
    },
  });
};

export const getEbayObject = () => {
  return ebay;
};
