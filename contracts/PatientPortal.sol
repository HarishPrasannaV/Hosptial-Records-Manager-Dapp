// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract PatientPortal {
    address private admin;
    address payable hospital_address =
        payable(0x13614Ae805684C0d5a719D647498b61CA5BB649A);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "Only the administratior can add user profiles"
        );
        _;
    }

    struct transactions {
        string Name;
        string Message;
        address from;
    }

    struct patientAdmin {
        //Personal Details
        string userID;
        string password;
        string Name;
        uint256 Age;
        string Gender;
        uint256 Aadhar_no;
        //Biometrics
        uint256 Height;
        uint256 Weight;
        uint256 AmountPayable;
    }
    struct patientUser {
        //Personal Details
        string Name;
        uint256 Age;
        string Gender;
        uint256 Aadhar_no;
        //Biometrics
        uint256 Height;
        uint256 Weight;
        uint256 AmountPayable;
    }
    mapping(string => mapping(string => patientUser))
        public RetrieveUserRecords;

    patientAdmin[] private patients;
    transactions[] private trans;

    function addPatient(
        string memory _userID,
        string memory _password,
        string memory _Name,
        uint256 _Age,
        string memory _Gender,
        uint256 _Aadhar_no,
        uint256 _Height,
        uint256 _Weight,
        uint256 _AmountPayable
    ) public onlyAdmin {
        patients.push(
            patientAdmin(
                _userID,
                _password,
                _Name,
                _Age,
                _Gender,
                _Aadhar_no,
                _Height,
                _Weight,
                _AmountPayable
            )
        );
        RetrieveUserRecords[_userID][_password] = patientUser(
            _Name,
            _Age,
            _Gender,
            _Aadhar_no,
            _Height,
            _Weight,
            _AmountPayable
        );
    }

    function fund_hospital(
        string calldata name,
        string calldata message
    ) public payable {
        require(msg.value >= 0, "You're broke");
        hospital_address.transfer(msg.value);
        trans.push(transactions(name, message, msg.sender));
    }

    function viewTransactions()
        public
        view
        onlyAdmin
        returns (transactions[] memory)
    {
        return trans;
    }
}
