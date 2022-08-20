

import { ethers } from 'ethers'
import { version } from 'os'
import EIP712SDK from '../lib/EIP712SDK'
 import fs from 'fs'
 
 
 require('dotenv').config()
 
const networkConfig: any = require("./networkConfig.json")
let SIGNER_KEY = process.env.SIGNER_KEY

if(!SIGNER_KEY){
  throw new Error("Missing SIGNER_KEY from env")
}

if(!SIGNER_KEY.startsWith('0x')){
  SIGNER_KEY = '0x'.concat(SIGNER_KEY)
}

const verifierContractABI =require('../abi/EASVerifier.json')

function getWeb3ProviderURIFromChainId(chainId: number): string | undefined {
  if (chainId == 137) {
    return process.env.POLYGON_RPC_URL
  }

  if (chainId == 5) {
    return process.env.GOERLI_RPC_URL
  }

  if (chainId == 4) {
    return process.env.RINKEBY_RPC_URL
  }

  return process.env.MAINNET_RPC_URL
}

/*


yarn task generateAttestation goerli 1 borrower 0x....


*/


export async function generateAttestation(args: string[]): Promise<any> {

  let networkName = args[0]
  let marketId = parseInt(args[1])
  let attestationType = args[2]
  let recipientAddress = args[3]

  if(!networkName){
    throw new Error("Missing arg: networkName")
  }

  let signingKey = SIGNER_KEY

  if(!signingKey){
    throw new Error("Missing signer key file")
  }

  let localNetworkConfig:any = networkConfig[networkName]

  if(!localNetworkConfig){
    throw new Error(`invalid network config for network ${networkName} `  )
  }



  let version = localNetworkConfig.version 

  let chainId = localNetworkConfig.chainId
  let schemaId = attestationType == 'borrower'
  ? localNetworkConfig.borrowerSchemaId
  : localNetworkConfig.lenderSchemaId


  let verifierContractAddress = localNetworkConfig.verifierContractAddress


  const web3ProviderURI = getWeb3ProviderURIFromChainId(chainId)

  if(!web3ProviderURI){
    throw new Error("Invalid RPC URI ")
  }


  const web3Provider = new ethers.providers.JsonRpcProvider(web3ProviderURI)


  const verifierContractInstance = new ethers.Contract(
    verifierContractAddress,
    verifierContractABI,
    web3Provider
  )
  

  let eip712SDK = new EIP712SDK (
    signingKey,
    marketId,
    chainId,
    verifierContractInstance,
    version,
    schemaId
  );


 
  return await eip712SDK.generateSignedAttestation({recipientAddress, marketId})

}
