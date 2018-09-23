/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import './shim.js';

import ecc from 'eosjs-ecc';
import Eos from 'eosjs';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/configureStore';
import { Spinner } from './src/components/common';
import Router from './src/Router';
import { get_info } from './EOS_example.js';
import config from './config';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      head_block_producer: 'Unloaded',
      chain_id: 'Unloaded',
      input: '',
      noteTable: [],
      report: {
        post: '',
        nonce: '',
        checksum: '',
        hasLoaded: false
      },
      encryptedMessage: '',
      nonce: '',
      checksum: null,
      hashedMessage: ''
    };
    this.handleFormEvent = this.handleFormEvent.bind(this);
  }

  // generic function to handle form events (e.g. "submit" / "reset")
  // push transactions to the blockchain by using eosjs
  async handleFormEvent() {
    this.encrypt();
    const jsonBody = { post: this.state.encryptedMessage };
    const pinataApiKey = config.pinata_api_key;
    const pinataSecretApiKey = config.pinata_secret_api_key;

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    axios
      .post(url, jsonBody, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey
        }
      })
      .then(response => {
        //handle response here
        console.log(response.data);
        console.log(response.data.IpfsHash);
        this.setState({ hashedMessage: response.data.IpfsHash });

        this.pushTransaction();
      })
      .catch(error => {
        //handle error here
        console.log('Error: ' + error);
      });
  }

  async pushTransaction() {
    // prepare variables for the switch below to send transactions
    let actionName = '';
    let actionData = {};

    // define actionName and action according to event type
    actionName = 'post';
    actionData = {
      _user: account,
      _hashedMessage: this.state.hashedMessage
    };

    // eosjs function call: connect to the blockchain
    const eos = Eos({ keyProvider: privateKey });
    const result = await eos.transaction({
      actions: [
        {
          account: 'testacc',
          name: actionName,
          authorization: [
            {
              actor: account,
              permission: 'active'
            }
          ],
          data: actionData
        }
      ]
    });

    console.log('end of pushTransaction');
    console.log(result);
    this.getTable();
  }

  // gets table data from the blockchain
  // and saves it into the component state: "noteTable"
  getTable() {
    const eos = Eos();
    eos
      .getTableRows({
        json: true,
        code: 'testacc', // contract who owns the table
        scope: 'testacc', // scope of the table
        table: 'reportstruct', // name of the table as specified by the contract abi
        limit: 100
      })
      .then(result => {
        console.log(result);
        this.setState({ noteTable: result.rows });
      });
  }

  encrypt() {
    //event.preventDefault();
    console.log('Encrypt!');
    const message = this.state.input;
    //let message = "GO FUCK YOurself Yeaeyesyeeyseeyeys.";
    const cyphertext = ecc.Aes.encrypt(privateKey, publicKey, message);

    console.log(this.binaryToString(cyphertext.message.toString()));
    this.setState({ encryptedMessage: cyphertext.message });
    this.setState({ nonce: cyphertext.nonce });
    this.setState({ checksum: cyphertext.checksum });
  }

  decrypt() {
    console.log('decrypt!!!');

    const plaintext = ecc.Aes.decrypt(
      privateKey,
      publicKey,
      this.state.nonce,
      this.state.encryptedMessage,
      this.state.checksum
    );

    console.log(this.binaryToString(plaintext.toString()));
  }

  textToBin(text) {
    const length = text.length;
    let output = [];
    for (let i = 0; i < length; i++) {
      const bin = text[i].charCodeAt().toString(2);
      output.push(Array(8 - bin.length + 1).join('0') + bin);
    }
    return output.join('');
  }

  binaryToString(str) {
    console.log('str: ', str);
    // Removes the spaces from the binary string
    str = str.replace(/\s+/g, '');
    // Pretty (correct) print binary (add a space every 8 characters)
    str = str.match(/.{1,8}/g).join(' ');

    var newBinary = str.split(' ');
    console.log('newBinary: ', newBinary);

    return newBinary.join('');
  }

  componentWillMount() {
    this.setState({ hasLoaded: true });
  }

  componentDidMount() {
    this.getTable();
    get_info().then(info => {
      this.setState({
        head_block_producer: info['head_block_producer'],
        chain_id: info['chain_id']
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.hasLoaded ? (
          <Router isLoggedIn={this.state.isLoggedIn} />
        ) : (
          <Spinner />
        )}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
