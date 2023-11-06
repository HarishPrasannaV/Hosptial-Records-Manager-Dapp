const contractAddress = "Paste Contract address here";
const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "RetrieveUserRecords",
    outputs: [
      {
        internalType: "string",
        name: "Name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "Age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "Gender",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "Aadhar_no",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "Height",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "Weight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "AmountPayable",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_userID",
        type: "string",
      },
      {
        internalType: "string",
        name: "_password",
        type: "string",
      },
      {
        internalType: "string",
        name: "_Name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_Age",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_Gender",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_Aadhar_no",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_Height",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_Weight",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_AmountPayable",
        type: "uint256",
      },
    ],
    name: "addPatient",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "fund_hospital",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "viewTransactions",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "Name",
            type: "string",
          },
          {
            internalType: "string",
            name: "Message",
            type: "string",
          },
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
        ],
        internalType: "struct PatientPortal.transactions[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
//==========================================================================================================================================
import { ethers, utils } from "./ethers-5.2.esm.min.js";

const metaButton = document.getElementById("meta_button");
metaButton.onclick = connect;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    metaButton.innerHTML = "Connected";
  } else {
    metaButton.innerHTML = "Metamask not found";
  }
}

const addPatientButton = document.getElementById("add_patient_button");
addPatientButton.onclick = addNewPatient;

async function addNewPatient() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  const withSigner = contract.connect(signer);
  const userID = document.getElementById("user_id").value;
  const password = document.getElementById("pass").value;
  const Name = document.getElementById("name").value;
  const Age = document.getElementById("age").value;
  const Gender = document.getElementById("gen").value;
  const Anum = document.getElementById("aadhar").value;
  const Height = document.getElementById("height").value;
  const Weight = document.getElementById("weight").value;
  const AmountPayable = document.getElementById("dues").value;

  try {
    await withSigner.addPatient(
      userID,
      password,
      Name,
      Age,
      Gender,
      Anum,
      Height,
      Weight,
      AmountPayable
    );
    displayLog("Patient added successfully.");
  } catch (error) {
    console.error(error);
    displayLog("Error: Could not add user details.");
  }
}

function displayLog(message) {
  const logtext = document.getElementById("mes_text");
  logtext.innerText = message;
}

const vdButton = document.getElementById("view_button");
vdButton.onclick = viewDetails;

async function viewDetails() {
  const userID = document.getElementById("inp_user").value;
  const password = document.getElementById("inp_pass").value;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);
  try {
    const result = await contract.RetrieveUserRecords(userID, password);
    displayResult(result);
    console.log(parseInt(result[1]._hex, 16));
  } catch (error) {
    console.error(error);
    displayLog("Error: Could not retrieve user details.");
  }
}

function displayResult(result) {
  const resultDiv = document.getElementById("pat_div");
  resultDiv.innerHTML = `
                <svg viewBox="0 0 1024 1024" class="home-icon2">
                  <path
                    d="M809.003 291.328l-297.003 171.819-297.003-171.819 275.456-157.397c4.779-2.731 9.899-4.48 15.147-5.333 9.301-1.451 18.987 0.128 27.904 5.291zM491.776 979.669c6.016 3.243 12.928 5.077 20.224 5.077 7.381 0 14.336-1.877 20.395-5.163 15.189-2.475 29.909-7.68 43.392-15.36l298.709-170.709c26.368-15.232 45.269-38.315 55.424-64.597 5.675-14.592 8.619-30.165 8.747-46.251v-341.333c0-20.395-4.821-39.723-13.397-56.917-0.939-3.029-2.219-5.973-3.883-8.832-1.963-3.371-4.267-6.357-6.912-8.96-1.323-1.835-2.731-3.669-4.139-5.419-9.813-12.203-21.845-22.528-35.456-30.507l-299.051-170.88c-26.027-15.019-55.467-19.84-83.328-15.531-15.531 2.432-30.507 7.637-44.288 15.488l-298.709 170.709c-16.341 9.429-29.824 21.888-40.149 36.267-2.56 2.56-4.864 5.547-6.784 8.832-1.664 2.901-2.987 5.888-3.925 8.96-1.707 3.456-3.243 6.955-4.608 10.496-5.632 14.635-8.576 30.208-8.704 45.995v341.632c0.043 30.293 10.581 58.197 28.331 80.128 9.813 12.203 21.845 22.528 35.456 30.507l299.051 170.88c13.824 7.979 28.587 13.099 43.605 15.445zM469.333 537.045v340.949l-277.12-158.336c-4.736-2.773-8.832-6.315-12.16-10.411-5.931-7.381-9.387-16.512-9.387-26.581v-318.379zM554.667 877.995v-340.949l298.667-172.757v318.379c-0.043 5.163-1.067 10.496-2.987 15.445-3.413 8.789-9.6 16.384-18.176 21.333z"
                  ></path>
                </svg>
                <h2 class="home-text5">Patient Details:</h2>
                <p> Name : ${result[0]}</p>
                <p> Age : ${parseInt(result[1]._hex, 16)}</p>
                <p> Gender : ${result[2]}</p>
                <p> Aadhar Number: ${parseInt(result[3]._hex, 16)}</p>
                <p> Height : ${parseInt(result[4]._hex, 16)}</p>
                <p> Weight :${parseInt(result[5]._hex, 16)}</p>
                <p> Due Amount: ${parseInt(result[6]._hex, 16)}</p>
            `;
}

const fundButton = document.getElementById("fund_button");
fundButton.onclick = fund;

async function fund() {
  const ethAmount = document.getElementById("fund").value;
  const name = document.getElementById("p_name").value;
  const msg = document.getElementById("p_mess").value;

  console.log("Funding with", ethAmount);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const transactionResponse = await contract.fund_hospital(name, msg, {
        value: ethers.utils.parseEther(ethAmount),
      });
      displayLog("Done");
    } catch (error) {
      console.log(error);
    }
  }
}
