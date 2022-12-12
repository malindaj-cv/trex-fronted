import { NextPage } from "next";

const TokenIssur: NextPage = () => {
    return (
        <div>
        <h1>Token Issuer</h1>
        <ul>
            <li> add claim Topics </li>
            <li> remove claim Topics </li>
            <li> See Claim Topics </li>
            <li> add Trusted issuers </li>
            <li> remove Trusted issuers </li>
            <li> update issuer claim Topics </li>
            <li> getTrustedIssuerClaimTopics </li>
            <li> getTrustedIssuers </li>
            <li> isTrustedIssuer </li>
            <li> add agent for manage store registry </li>
            <li> modifyStoredInvestorCountry </li>
            <li> modifyStoredIdentity user </li>
            <li> remove agent </li>
            <li> check users stored identity </li>
            <li> check storedInvestorCountry </li>
            <li> add agent for manage identity registy </li>
            <li> register identity </li>
            <li> delete identity </li>
            <li> modify/update identity </li>
            <li> check identity </li>
            <li> check investor country </li>
            <li> add agent for manage Token </li>



        </ul>
        </div>
    );
};

export default TokenIssur;