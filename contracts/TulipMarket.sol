pragma solidity >=0.4.25 <0.7.0;

interface TulipMarket {

    // Check if a request with the specified request identifier is defined.
    function isRequestDefined(uint requestIdentifier) external view returns (bool);

    // Check if a defined request with the specified request identifier is closed.
    function isRequestClosed(uint requestIdentifier) external view returns (bool);

    // Get the general stipulations of a request.
    function getRequest(uint requestIdentifier) external view returns (uint tulipID, uint price, uint deadline);

    // By specifiying the tulip identifier, the proposed price, and the deadline of the request, tulip owners
    // can add a new request to sell their tulip. The request will have a unique identifier and others will
    // be able to buy the tulip (only the tulip owner can access this function).
    function submitRequest(uint tulipID, uint price, uint deadline) external returns (uint requestID);

    // Close a request, so no more buy offers would be accepted for it (Only the request maker can access
    // this function).
    function closeRequest(uint requestIdentifier) external;

    // By sending the identifier of a request, and the required money, one can buy the proposed tulip.
    function buyTulip(uint requestIdentifier) external payable returns (uint tulipID);

}
