import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import '../styles/globals.css'
import { useEffect, useState, useRef} from "react";
import './reactCOIServiceWorker';
import ZkappWorkerClient from './zkappWorkerClient';

import {
  PublicKey,
  PrivateKey,
  Field,
} from 'snarkyjs'

let transactionFee = 0.1;

export default function App() {

  let [state, setState] = useState({
    zkappWorkerClient: null as null | ZkappWorkerClient,
    hasWallet: null as null | boolean,
    hasBeenSetup: false,
    accountExists: false,
    currentNum: null as null | Field,
    publicKey: null as null | PublicKey,
    zkappPublicKey: null as null | PublicKey,
    creatingTransaction: false,
  });

// --------------------------------------------------------
// Status

  const status1 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "block";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status2 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "block";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status3 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "block";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status4 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "block";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status5 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "block";
	const el6 = document.getElementById("status6")!
	el6.style.display = "none";
  }
  
   const status6 = () => {
    const el = document.getElementById("status1")!
	el.style.display = "none";
	const el2 = document.getElementById("status2")!
	el2.style.display = "none";
	const el3 = document.getElementById("status3")!
	el3.style.display = "none";
	const el4 = document.getElementById("status4")!
	el4.style.display = "none";
	const el5 = document.getElementById("status5")!
	el5.style.display = "none";
	const el6 = document.getElementById("status6")!
	el6.style.display = "block";
  }
  
   const send1 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "block";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send2 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "block";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send3 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "block";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
  }
  
  const send4 = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "block";
  }
  
  const donesend = () => {
    const el = document.getElementById("send1")!
	el.style.display = "none";
	const el2 = document.getElementById("send2")!
	el2.style.display = "none";
	const el3 = document.getElementById("send3")!
	el3.style.display = "none";
	const el4 = document.getElementById("send4")!
	el4.style.display = "none";
	const el5 = document.getElementById("sendLoading")!
	el5.style.display = "none";
	const el6 = document.getElementById("sendDone")!
	el6.style.display = "block";
	// const el7 = document.getElementById("sendCheck")!
	// el7.style.display = "block";
	const el8 = document.getElementById("closeSend")!
	el8.style.display = "block";
  }
	
  // -------------------------------------------------------
  // Do Setup
  const connectWallet = async () => {
      if (!state.hasBeenSetup) {
        const zkappWorkerClient = new ZkappWorkerClient();
        
        console.log('Loading SnarkyJS...');
		status1();
        await zkappWorkerClient.loadSnarkyJS();
        console.log('done');

        await zkappWorkerClient.setActiveInstanceToBerkeley();

        const mina = (window as any).mina;
		status2();

        if (mina == null) {
          setState({ ...state, hasWallet: false });
		  return;
        }

        const publicKeyBase58 : string = (await mina.requestAccounts())[0];
        const publicKey = PublicKey.fromBase58(publicKeyBase58);

        console.log('using key', publicKey.toBase58());

        console.log('checking if account exists...');
        const res = await zkappWorkerClient.fetchAccount({ publicKey: publicKey! });
        const accountExists = res.error == null;

        await zkappWorkerClient.loadContract();

        console.log('compiling zkApp');
		status3();
        await zkappWorkerClient.compileContract();
        console.log('zkApp compiled');

        const zkappPublicKey = PublicKey.fromBase58('B62qrDe16LotjQhPRMwG12xZ8Yf5ES8ehNzZ25toJV28tE9FmeGq23A');

        await zkappWorkerClient.initZkappInstance(zkappPublicKey);

        console.log('getting zkApp state...');
        await zkappWorkerClient.fetchAccount({ publicKey: zkappPublicKey })
        const currentNum = await zkappWorkerClient.getNum();
        console.log('current state:', currentNum.toString());

        setState({ 
            ...state, 
            zkappWorkerClient, 
            hasWallet: true,
            hasBeenSetup: true, 
            publicKey, 
            zkappPublicKey, 
            accountExists, 
            currentNum
        });
      }
  };

  // -------------------------------------------------------
  // Newwwwww
  const connectBtnclick = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "block";
	const el2 = document.getElementById("connectBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("loading")!
	el3.style.display = "block";
	const el4 = document.getElementById("banner")!
	el4.style.display = "none";
	const el5 = document.getElementById("banner2")!
	el5.style.display = "none";
  };
  
  const hideloadingBtn = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
	const el2 = document.getElementById("loading")!
	el2.style.display = "none";
	const el3 = document.getElementById("succes")!
	el3.style.display = "block";
  };
  
  const closeGetclick = () => {
    const el = document.getElementById("getscreen")!
	el.style.display = "none";
	const el2 = document.getElementById("getBtnDisable")!
	el2.style.display = "none";
	const el3 = document.getElementById("getBtn")!
	el3.style.display = "block";
	const el4 = document.getElementById("sendBtnDisable")!
	el4.style.display = "none";
	const el5 = document.getElementById("sendBtn")!
	el5.style.display = "block";
  };
  
  const closeSendclick = () => {
    const el = document.getElementById("sendscreen")!
	el.style.display = "none";
	const el2 = document.getElementById("sendBtnDisable")!
	el2.style.display = "none";
	const el3 = document.getElementById("sendBtn")!
	el3.style.display = "block";
	const el4 = document.getElementById("getBtnDisable")!
	el4.style.display = "none";
	const el5 = document.getElementById("getBtn")!
	el5.style.display = "block";
	const el6 = document.getElementById("sendDone")!
	el6.style.display = "none";
    // const el7 = document.getElementById("sendCheck")!
	// el7.style.display = "none";
    const el8 = document.getElementById("closeSend")!
	el8.style.display = "none";
  };
  
  const getscreenShow = () => {
	const el = document.getElementById("getscreen")!
	el.style.display = "block";
	const el2 = document.getElementById("getBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("getBtnDisable")!
	el3.style.display = "block";
	const el4 = document.getElementById("sendBtnDisable")!
	el4.style.display = "block";
	const el5 = document.getElementById("sendBtn")!
	el5.style.display = "none";
  };
  
  const sendscreenShow = () => {
	const el = document.getElementById("sendscreen")!
	el.style.display = "block";
	const el2 = document.getElementById("sendBtn")!
	el2.style.display = "none";
	const el3 = document.getElementById("sendBtnDisable")!
	el3.style.display = "block";
	const el4 = document.getElementById("getBtnDisable")!
	el4.style.display = "block";
	const el5 = document.getElementById("getBtn")!
	el5.style.display = "none";
    const el6 = document.getElementById("sendLoading")!
	el6.style.display = "block";
  };
  
  const noAccount = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
    const el2 = document.getElementById("caution")!
	el2.style.display = "block";
    const el3 = document.getElementById("ftxt")!
	el3.style.display = "block";
	const el4 = document.getElementById("backNoAccount")!
	el4.style.display = "block";
    const el5 = document.getElementById("loading")!
	el5.style.display = "none";
  }
  
  const backNoAccountClick = () => {
    location.reload();
  }
  
  const backNoWalletClick = () => {
    location.reload();
  }
  
  const noWallet = () => {
    const el = document.getElementById("loadingBtn")!
	el.style.display = "none";
    const el2 = document.getElementById("caution")!
	el2.style.display = "block";
    const el3 = document.getElementById("walletTxt")!
	el3.style.display = "block";
	const el4 = document.getElementById("backNoWallet")!
	el4.style.display = "block";
    const el5 = document.getElementById("loading")!
	el5.style.display = "none";
  }
  
  const getload = () => {
    const el = document.getElementById("getLoading")!
	el.style.display = "block";
	const el2 = document.getElementById("gettext")!
	el2.style.display = "none";
	const el3 = document.getElementById("getnumber")!
	el3.style.display = "none";
  }
  
  const getdone = () => {
    const el = document.getElementById("getLoading")!
	el.style.display = "none";
	const el2 = document.getElementById("gettext")!
	el2.style.display = "block";
	const el3 = document.getElementById("getnumber")!
	el3.style.display = "block";
  }
  // -------------------------------------------------------
 
   // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async () => {
    setState({ ...state, creatingTransaction: true });
	send1();
    console.log('sending a transaction...');

    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.publicKey! });

    await state.zkappWorkerClient!.createUpdateTransaction();

    console.log('creating proof...');
	send2();
    await state.zkappWorkerClient!.proveUpdateTransaction();

    console.log('getting Transaction JSON...');
	send3();
    const transactionJSON = await state.zkappWorkerClient!.getTransactionJSON()

    console.log('requesting send transaction...');
	send4();
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: '',
      },
    });

    console.log(
      'See transaction at https://berkeley.minaexplorer.com/transaction/' + hash
    );

	donesend();

    setState({ ...state, creatingTransaction: false });
  }
  
   // -------------------------------------------------------
  // Refresh the current state

  const onRefreshCurrentNum = async () => {
    console.log('getting zkApp state...');
	getload();
    await state.zkappWorkerClient!.fetchAccount({ publicKey: state.zkappPublicKey! })
    const currentNum = await state.zkappWorkerClient!.getNum();
    console.log('current state:', currentNum.toString());
	getdone();

    setState({ ...state, currentNum });
  }
 
  let hasWallet;
  if (state.hasWallet != null && !state.hasWallet) {
    const auroLink = 'https://www.aurowallet.com/';
    hasWallet = <a id="walletLink" style={{display: 'block'}} href={auroLink} target="_blank" rel="noreferrer">
		<h1 className={styles.walletLink}>[[CLICK HERE]]</h1>
	</a>
	status4();
	noWallet();

  }

  let setupText = state.hasBeenSetup ? 'SnarkyJS Ready' : 'Loading...';
  let setup = <div id="setup" style={{display: 'block'}}> { setupText } { hasWallet }</div>
  
  let accountDoesNotExist;
  if (state.hasBeenSetup && !state.accountExists) {
	  const faucetLink = "https://faucet.minaprotocol.com/?address=" + state.publicKey!.toBase58();
	accountDoesNotExist = <a id="flink" style={{display: 'block'}} href={faucetLink} target="_blank" rel="noreferrer">
		<h1 className={styles.faucetHere}>[[CLICK HERE]]</h1>
	</a>
	status5();
	noAccount();
	hasBeenSetup: false;
  }
  
  let mainContent;
  if (state.hasBeenSetup && state.accountExists) {	
    mainContent =
		<div>
			<a id="sendBtn" style={{display: 'block'}} onClick={() => {onSendTransaction(); sendscreenShow(); }}>
					<span className={styles.sendBtn}> </span>
			</a>
			
			<a id="getBtn" style={{display: 'block'}} onClick={() => {onRefreshCurrentNum(); getscreenShow(); }}>
					<span className={styles.getBtn}></span>
			</a>
			
			<span id="getBtnDisable" style={{display: 'none'}} className={styles.getBtnDisable}></span>
			<span id="sendBtnDisable" style={{display: 'none'}} className={styles.sendBtnDisable}></span>
			
			<h1 className={styles.txtAddrs}>Address<br/>{  state.publicKey!.toBase58() } </h1>
			{/*<h1 className={styles.addrs}>Address :</h1>*/}
			
			<div id="getscreen" style={{display: 'none'}} className={styles.getscreen}>
				<span className={styles.getscreenBlack}> </span>
				<span className={styles.getscreenImg}> </span>
				
				<a id="closeGet" style={{display: 'block'}} onClick={() => {closeGetclick(); }}>
					<span className={styles.closeGet}> </span>
				</a>
				
				<span id="getLoading" style={{display: 'none'}} className={styles.getLoading}> </span>
				
				<h1 id="gettext" style={{display: 'none'}} className={styles.txtState}>Current Number in ZkApp :</h1>
				<h1 id="getnumber" style={{display: 'none'}} className={styles.numState}>{ state.currentNum!.toString() } </h1>
			</div>
			
			<div id="sendscreen" style={{display: 'none'}} className={styles.sendscreen}>
				<span className={styles.sendscreenBlack}> </span>
				<span className={styles.sendscreenImg}> </span>
				
				<a id="closeSend" style={{display: 'none'}} onClick={() => {closeSendclick(); }}>
					<span className={styles.closeSend}> </span>
				</a>
				
				<span id="sendLoading" style={{display: 'none'}} className={styles.sendLoading}> </span>
				{/*<span id="sendCheck" style={{display: 'none'}} className={styles.sendCheck}> </span>*/}
				<span id="sendDone" style={{display: 'none'}} className={styles.sendDone}> </span>
				
				<h1 id="send1" style={{display: 'none'}} className={styles.statusSendTxt}>Sending a Transaction...</h1>
				<h1 id="send2" style={{display: 'none'}} className={styles.statusSendTxt}>Creating Proof...</h1>
				<h1 id="send3" style={{display: 'none'}} className={styles.statusSendTxt}>Getting Transaction JSON...</h1>
				<h1 id="send4" style={{display: 'none'}} className={styles.statusSendTxt}>Requesting Send Transaction...</h1>


			</div>

		</div>
	hideloadingBtn();
	status6();
  }
	
  return (
	<div className={styles.container}>	
	  <Head>
        <title>zkApp Connect App [algaroow]</title>
        <meta name="description" content="ZkApp By algaroow" />
		<meta name="viewport" content="width=1024"/>
        <link href="data:image/vnd.microsoft.icon;base64,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AAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/wCAAvlj6Fj5Xu65+VvzKgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAQAAAQAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAQAAAAAAAAAAAKpVqwP5XvQu/Fr4SgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==" rel="icon" type="image/x-icon" />
	  </Head>
	  
		<main className={styles.main}>
		
			<div id="homepage" className={styles.homepage}>
				<span className={styles.homepageImg}> </span>
				<a id="connectBtn" style={{display: 'block'}} onClick={() => {connectBtnclick(); connectWallet();}}>
					<span className={styles.connectBtn}> </span>
				</a>
				
					<span id="loadingBtn" style={{display: 'none'}} className={styles.loadingBtn}> </span>
					<span id="loading" style={{display: 'none'}} className={styles.loading}> </span>
					
					<h1 id="status1" style={{display: 'none'}} className={styles.statusTxt}>Status<br/>Sync & Checking Wallet ...</h1>
					<h1 id="status2" style={{display: 'none'}} className={styles.statusTxt}>Status<br/>Sync DONE! Connect to Wallet...</h1>
					<h1 id="status3" style={{display: 'none'}} className={styles.statusTxt}>Status<br/>Checking & Validation Address...</h1>
					<h1 id="status4" style={{display: 'none'}} className={styles.statusTxt}>Status<br/>Wallet Extension Not Found!</h1>
					<h1 id="status5" style={{display: 'none'}} className={styles.statusTxt}>Status<br/>Address Not Valid or No Balance!</h1>
					<h1 id="status6" style={{display: 'none'}} className={styles.statusTxt}>Status<br/>READY FOR TRANSACTION!!!</h1>
					
					<span id="caution" style={{display: 'none'}} className={styles.caution}> </span>
					
					<span id="succes" style={{display: 'none'}} className={styles.succes}> </span>

					<h1 id="ftxt" style={{display: 'none'}} className={styles.faucetTxt}>Invalid Account or No Balance!! Please check and fund on this link </h1>
					
					<h1 id="walletTxt" style={{display: 'none'}} className={styles.walletTxt}>Could not find a wallet. Please Install Auro wallet and Re-Connect!! </h1>
					
					<a id="backNoAccount" style={{display: 'none'}} onClick={() => {backNoAccountClick(); }}>
						<span className={styles.backNoAccount}> </span>
					</a>
					
					<a id="backNoWallet" style={{display: 'none'}} onClick={() => {backNoWalletClick(); }}>
						<span className={styles.backNoWallet}> </span>
					</a>
					
					<span id="banner" style={{display: 'block'}} className={styles.banner}> </span>
					<span id="banner2" style={{display: 'block'}} className={styles.banner2}> </span>
					
				{mainContent}
				{accountDoesNotExist}
				{hasWallet}
				
			<div id="footer" style={{display: 'block'}} >	
				<span id="footerbg" style={{display: 'block'}} className={styles.footerbg}> </span>
				<a style={{display: 'block'}} href="https://t.me/algaroow" target="_blank" rel="noopener noreferrer" >
						<span className={styles.teleIcon}> </span>
					</a>
					
				<a style={{display: 'block'}} href="https://discordapp.com/users/465451308854542348" target="_blank" rel="noopener noreferrer" >
						<span className={styles.dcIcon}> </span>
					</a>
					
				<a style={{display: 'block'}} href="https://github.com/nafidinara" target="_blank" rel="noopener noreferrer" >
						<span className={styles.gitIcon}> </span>
					</a>
					
				<a style={{display: 'block'}} href="https://web.facebook.com/alfaraaa.nd" target="_blank" rel="noopener noreferrer" >
						<span className={styles.fbIcon}> </span>
					</a>
					
				<span id="blank" style={{visibility: 'hidden'}} className={styles.blank}> </span>
			</div>
					
			</div>
		</main>
		
	<footer className={styles.footer}>
		</footer>


	</div>
  );
}
