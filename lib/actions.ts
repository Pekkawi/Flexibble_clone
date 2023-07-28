import { GraphQLClient } from "graphql-request";
import { getUserQuery } from "@/graphql";

const isProduction = process.env.NODE_ENV === "production"; //production ready env
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || "" //if we are in production
  : "http://127.0.0.1:4000/graphql ";

const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";

const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

// the 4 constants above are to make sure that everything works even if it's in production or localhost

const client = new GraphQLClient(apiUrl);

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    return error;
  }
};

export const getUser = (email: string) => {
  return makeGraphQLRequest(getUserQuery, { email }); //we are passing the email as a variable
};
