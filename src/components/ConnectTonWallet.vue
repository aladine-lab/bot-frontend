<template>
    <div class="connect-wallet-page">
      <h1>Connect to TON Wallet via Telegram</h1>
      
      <!-- Connect Button -->
      <button v-if="!walletConnected" @click="connectWallet" class="connect-button">
        Connect Wallet
      </button>
      
      <!-- Wallet Info Displayed After Connection -->
      <div v-if="walletConnected" class="wallet-info">
        <p><strong>Connected Address:</strong> {{ walletAddress }}</p>
        <p><strong>Balance:</strong> {{ walletBalance }} TON</p>
        <button @click="disconnectWallet" class="disconnect-button">Disconnect Wallet</button>
      </div>
    </div>
  </template>
  
  <script>
  import { TonConnect } from '@tonconnect/sdk';
  
  export default {
    data() {
      return {
        tonConnect: null,         // TonConnect instance
        walletConnected: false,   // Track wallet connection status
        walletAddress: '',        // User's wallet address
        walletBalance: '',        // User's wallet balance
      };
    },
    mounted() {
      this.initializeTonConnect();
    },
    methods: {
      async initializeTonConnect() {
        // Initialize TonConnect
        this.tonConnect = new TonConnect({
          manifestUrl: 'https://tonkeeper.com/tonconnect-manifest.json', // Use Tonkeeper's manifest
        });
  
        // Listen for connection status changes
        this.tonConnect.onStatusChange(async (wallet) => {
          if (wallet) {
            this.walletConnected = true;
            this.walletAddress = wallet.account.address;
            await this.updateWalletBalance();
          } else {
            this.walletConnected = false;
            this.walletAddress = '';
            this.walletBalance = '';
          }
        });
  
        // Auto-connect if the user previously connected
        const wallet = await this.tonConnect.restoreConnection();
        if (wallet) {
          this.walletConnected = true;
          this.walletAddress = wallet.account.address;
          await this.updateWalletBalance();
        }
      },
      async connectWallet() {
        // Trigger TonConnect modal for wallet selection and connection
        try {
          const wallet = await this.tonConnect.connect();
          if (wallet) {
            this.walletConnected = true;
            this.walletAddress = wallet.account.address;
            await this.updateWalletBalance();
          }
        } catch (error) {
          console.error('Wallet connection failed:', error);
        }
      },
      async disconnectWallet() {
        // Disconnect from the wallet
        await this.tonConnect.disconnect();
        this.walletConnected = false;
        this.walletAddress = '';
        this.walletBalance = '';
      },
      async updateWalletBalance() {
        // Fetch and display wallet balance (example placeholder logic)
        const balance = await this.tonConnect.getBalance(this.walletAddress);
        this.walletBalance = (balance / 1e9).toFixed(2); // Convert to TON
      },
    },
  };
  </script>
  
  <style scoped>
  .connect-wallet-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 20px;
    text-align: center;
    background-color: #f5f5f5;
  }
  
  .connect-button, .disconnect-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  .connect-button:hover, .disconnect-button:hover {
    background-color: #005bb5;
  }
  
  .wallet-info {
    margin-top: 20px;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .wallet-info p {
    margin: 10px 0;
  }
  </style>
  