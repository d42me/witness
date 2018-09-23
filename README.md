# Witness

77 percent of people who experienced rape or sexual assault say they did not tell police. 

In a moment of crisis, many people face an impossible choice about coming forward. They may fear physical retaliation, public shaming, or even being kicked out of their home despite the fact that they’ve done nothing wrong. Bringing charges is not always easy decision and people shouldn’t have to make it overnight. 

Yet victims who do come forward months or years after the crime face a double assault on their credibility - why didn’t they report it sooner? and what’s their motive for coming forward now?

Blockchain can help. 

Witness allows users to create a private, encrypted record of an encounter. The record is immutable, it’s timestamped, and can be decrypted and revealed years later with mathematical proof that the story hasn’t changed. 

Witness protects a user's privacy and security in a moment of crisis and protects their credibility when they come forward publicly.

In order to make optimal use of the chain, Witness stores the full encrypted record of each incident on IPFS and our smart contract writes the IPFS hash to the EOS blockchain. This makes the content immutable and trustless. 

Smart contracts are also used to manage multi-signature Witness rights, in cases where multiple users may want to sign a single statement or Witnesses want to grant read access to people they trust. 

The system is designed to be simple and usable for people from all walks of life. We want to ensure that the user onboarding experience is familiar and easy - so we’ll add integrations to Google, Facebook and other common login systems. 

Here in the UK, the government estimates that 12.1% of adults aged 16 to 59 have experienced sexual assault. That’s millions of people in the UK alone - and probably over a billion people around the world.

Let’s shift the balance of power away from attackers and towards their victims.


## Gets started

./quick_start.sh

cleos wallet create --to-console

cleos wallet import --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

cleos create key --to-console
testacc owner Public Key: "EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV",
testacc owner Private Key: "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"

cleos create key --to-console
testacc active Public Key: "EOS7EzCEh94uN2k59wznzsZDcFVnpZ3wuiYvPSbb8bXDS6U7twKQF",
testacc active Public Key: "5JKrSzsuztAPvTzghi9VU4522sT49SeE3XVHbB8HsfC3ikifJRf"

cleos create account eosio testacc pubkey1 pubkey2

eosiocpp -o /opt/eosio/bin/contracts/report/report.wast /opt/eosio/bin/contracts/report/report.cpp

eosiocpp -g /opt/eosio/bin/contracts/report/report.abi /opt/eosio/bin/contracts/report/report.cpp

cleos set contract testacc /opt/eosio/bin/contracts/report/ --permission testacc@active

Also you have to add a config.js in the root directory with this format:

var config = {
    pinata_api_key: 'YOUR_PINATA_API_KEY',
    pinata_secret_api_key: 'YOUR_SECRET_PINATA_API_KEY',
    account: 'testacc',
    privateKey: 'YOUR_GENERETATED_PRIVATE_KEY',
    publicKey: 'YOUR_GENERETATED_PUBLIC_KEY'
}
module.exports = config;


PS: We will probably put that in a script, but just for now as a reminder ;) 
