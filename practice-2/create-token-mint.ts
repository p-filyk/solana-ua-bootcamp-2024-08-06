import "dotenv/config";
import {
  getExplorerLink,
} from "@solana-developers/helpers";
import {
  Keypair,
  clusterApiUrl,
  Connection,
} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

let privateKey = process.env["SECRET_KEY"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

const tokenMint = await createMint(
    connection,
    sender,
    sender.publicKey,
    null,
    2
  );

const searchParams: Record<string, string> = {};
searchParams["cluster"] = "devnet"


const url = new URL(`https://explorer.solana.com/address/${tokenMint.toString()}`);
url.search = new URLSearchParams(searchParams).toString();


  
const link = url.toString();

console.log(`✅ Token Mint: ${link}`);