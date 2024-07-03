"use client";

import React from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Account } from "@prisma/client";

import { authenticateGoogle } from "./_actions/authenticate-google";
import { useUserDetailsStore } from "@/lib/zustand/user-details-store";

// Components
import Button from "./_components/button";
import IntegrationCard from "./_components/card";

// Assets
import { GoogleIconSvg } from "../../search/google-search/_assets";
import {
  GoogleAdsSvg,
  GoogleSearchConsoleSvg,
  GreenCheckmarkRound,
} from "@/assets/icons";
import SteppedProgressBar from "./_components/google-connection-step-progress";

const Page = () => {
  const accountDetails = useUserDetailsStore((state) => state.accountDetails);

  let decodedToken: jwt.JwtPayload | null = null;
  if (accountDetails && accountDetails.id_token) {
    decodedToken = jwt.decode(accountDetails.id_token) as jwt.JwtPayload;
  }

  return (
    <>
      <div className="mb-16">
        <h2 className="font-semibold text-2xl text-gray-800">
          Integration & Authorization Settings
        </h2>
        <p className="max-w-[650px] text-base leading-6 font-normal text-gray-500">
          Set the appropriate authorizations to securely access the necessary
          features and integrations for your workflow
        </p>
      </div>
      <div className="mb-6">
        <SteppedProgressBar accountDetails={accountDetails} />
      </div>
      <div className="grid grid-cols-3 gap-8">
        <GoogleAccountCard
          scope="openid email profile"
          Icon={GoogleIconSvg}
          heading="Google Account"
          subHeading="Manage your account details and preferences here."
          accountDetails={accountDetails}
          currentlyAvailable={true}
        />
        <GoogleServiceCard
          scope="https://www.googleapis.com/auth/webmasters.readonly"
          Icon={GoogleSearchConsoleSvg}
          heading="Google Search Console"
          subHeading="Manage your account details and preferences here."
          decodedToken={decodedToken}
          accountDetails={accountDetails}
          currentlyAvailable={true}
        />
        {/* <GoogleServiceCard
          scope="https://www.googleapis.com/auth/adwords"
          Icon={GoogleAdsSvg}
          heading="Google Ads"
          subHeading="Manage your account details and preferences here."
          decodedToken={decodedToken}
          accountDetails={accountDetails}
          currentlyAvailable={true}
        /> */}
        <IntegrationCard
          heading="Google Ads"
          subHeading="Manage your account details and preferences here."
          Icon={GoogleAdsSvg}
        >
          <Button 
            variant="connect" 
            onClick={() => {
              window.location.href = "http://127.0.0.1:5000/authorize";
            }}
          />
        </IntegrationCard>
      </div>
    </>
  );
};

export default Page;

interface GoogleCardProps {
  heading: string;
  subHeading: string;
  Icon: React.ElementType;
  scope: string;
  decodedToken?: JwtPayload | null;
  accountDetails?: Account | null;
  currentlyAvailable: boolean;
}

const GoogleServiceCard: React.FC<GoogleCardProps> = ({
  heading,
  subHeading,
  Icon,
  scope,
  decodedToken,
  accountDetails,
  currentlyAvailable,
}) => {
  // No Google Account is connected
  if (!accountDetails) {
    return (
      <IntegrationCard
        heading={heading}
        subHeading="Connect google account before Search"
        Icon={Icon}
      >
        <Button variant="unavailable" disabled />
      </IntegrationCard>
    );
  }

  // Google Account is connected and user already has the scope
  if (accountDetails?.scope?.includes(scope)) {
    return (
      <IntegrationCard heading={heading} subHeading={subHeading} Icon={Icon}>
        {currentlyAvailable ? (
          <Button variant="connected" disabled />
        ) : (
          <Button variant="unavailable" disabled />
        )}
      </IntegrationCard>
    );
  }

  // Google Account is connected but user does not have the scope
  if (decodedToken?.email) {
    return (
      <IntegrationCard heading={heading} subHeading={subHeading} Icon={Icon}>
        {currentlyAvailable ? (
          <Button
            variant="connect"
            onClick={() =>
              authenticateGoogle({
                scope,
                login_hint: decodedToken.email,
                currentScope: accountDetails.scope,
              })
            }
          />
        ) : (
          <Button variant="unavailable" disabled />
        )}
      </IntegrationCard>
    );
  }
};

const GoogleAccountCard: React.FC<GoogleCardProps> = ({
  heading,
  subHeading,
  Icon,
  scope,
  accountDetails,
}) => {
  if (!accountDetails || !accountDetails?.id_token) {
    return (
      <IntegrationCard heading={heading} subHeading={subHeading} Icon={Icon}>
        <Button
          variant="connect"
          onClick={() => authenticateGoogle({ scope })}
        />
      </IntegrationCard>
    );
  }

  return (
    <IntegrationCard heading={heading} subHeading={subHeading} Icon={Icon}>
      <Button variant="connected" disabled />
    </IntegrationCard>
  );
};
