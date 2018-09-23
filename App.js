/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import './shim.js'

import ecc from 'eosjs-ecc'
import Eos from 'eosjs'
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { get_info } from './EOS_example.js';
import axios from 'axios';
//import axios from 'axios';
import config from './config';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const account = "testacc";
const privateKey = "5JkyvMymW2rrWjYDJf2Czq2nBCTxYCLBFLRgqbmfFgF2Rzjd6tf";
const publicKey = "EOS6ZM6GZxn12w9RojRHfYJHP8A3MyhDNgGKPUGvxT43WFFJBUK3y";

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'head_block_producer': 'Unloaded',
      'chain_id': 'Unloaded',
      input: '',
      noteTable: [],
      report: {
        post: "",
        nonce: "",
        checksum: ""
      },
      encryptedMessage: "",
      nonce: "",
      checksum: null,
      hashedMessage: ""
    };
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent() {

    this.encrypt();
    let jsonBody = { "post": this.state.encryptedMessage };
    var pinata_api_key = config.pinata_api_key;
    var pinata_secret_api_key = config.pinata_secret_api_key;

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    axios
      .post(
        url,
        jsonBody,
        {
          headers: {
            'pinata_api_key': pinata_api_key,
            'pinata_secret_api_key': pinata_secret_api_key
          }
        }
      ).then(response => {
        //handle response here
        console.log(response.data);
        console.log(response.data.IpfsHash);
        this.setState({ hashedMessage: response.data.IpfsHash });

        this.pushTransaction();

      })
      .catch(function (error) {
        //handle error here
        console.log("Error: " + error)
      });

  }

  async pushTransaction() {
    // prepare variables for the switch below to send transactions
    let actionName = "";
    let actionData = {};

    // define actionName and action according to event type
    actionName = "post";
    actionData = {
      _user: account,
      _hashedMessage: this.state.hashedMessage,
    }

    // eosjs function call: connect to the blockchain
    const eos = Eos({ keyProvider: privateKey });
    const result = await eos.transaction({
      actions: [{
        account: "testacc",
        name: actionName,
        authorization: [{
          actor: account,
          permission: 'active',
        }],
        data: actionData,
      }],
    });

    console.log("end of pushTransaction");
    console.log(result);
    this.getTable();
  }

  // gets table data from the blockchain
  // and saves it into the component state: "noteTable"
  getTable() {
    const eos = Eos();
    eos.getTableRows({
      "json": true,
      "code": "testacc",   // contract who owns the table
      "scope": "testacc",  // scope of the table
      "table": "reportstruct",    // name of the table as specified by the contract abi
      "limit": 100,
    }).then(result => {
      console.log(result)
      this.setState({ noteTable: result.rows })
    }
    );
  }

  encrypt() {
    //event.preventDefault();
    console.log("Encrypt!");
    let message = this.state.input;
    //let message = "GO FUCK YOurself Yeaeyesyeeyseeyeys.";
    let cyphertext = ecc.Aes.encrypt(privateKey, publicKey, message);

    console.log(this.binaryToString(cyphertext.message.toString()));
    this.setState({ encryptedMessage: cyphertext.message });
    this.setState({ nonce: cyphertext.nonce });
    this.setState({ checksum: cyphertext.checksum });

  };

  decrypt() {
    console.log("decrypt!!!");

    let plaintext = ecc.Aes.decrypt(privateKey, publicKey,
      this.state.nonce, this.state.encryptedMessage, this.state.checksum);

    console.log(this.binaryToString(plaintext.toString()));
  }

  textToBin(text) {
    var length = text.length,
      output = [];
    for (var i = 0; i < length; i++) {
      var bin = text[i].charCodeAt().toString(2);
      output.push(Array(8 - bin.length + 1).join("0") + bin);
    }
    return output.join("");
  }

  binaryToString(str) {
    console.log("str: ", str);
    // Removes the spaces from the binary string
    str = str.replace(/\s+/g, '');
    // Pretty (correct) print binary (add a space every 8 characters)
    str = str.match(/.{1,8}/g).join(" ");

    var newBinary = str.split(" ");
    console.log("newBinary: ", newBinary);

    return newBinary.join("");
  }

  componentDidMount() {
    this.getTable();
    get_info().then(info => {
      this.setState({
        'head_block_producer': info['head_block_producer'],
        'chain_id': info['chain_id']
      })
    });
  }

  render() {

    const { noteTable } = this.state;
    const { classes } = this.props;

    const generateCard = (key, user, note) => (
      <View>
        <Text> {user}</Text>
        <Text>{note}</Text>
      </View>
    );

    let noteCards = noteTable.map((row, i) =>
      generateCard(i, row.user, row.hashedMessage));

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Witness</Text>
        {noteCards}
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ "input": text })}
          value={this.state.input}
        />
        <TextInput
          name="note"
          autoComplete="off"
          label="Tell us about your harassment"
        />
        <Button
          onPress={() => this.handleFormEvent()}
          title="Add/Update note"
        />
        <Text style={styles.instructions}>Head Block Producer: {this.state.head_block_producer}</Text>
        <Text style={styles.instructions}>Chain Id {this.state.chain_id}</Text>
        <Button
          onPress={() => this.decrypt()}
          title="decrypt"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
