import { useState, useEffect } from 'react'
import {
  formatAddress,
  useWallet,
  useTokenBalance,
  formatToken,
} from '@raidguild/quiver'

import { BigNumber } from '@ethersproject/bignumber'

const ConnectWallet = () => {
  const {
    connectWallet,
    isConnecting,
    isConnected,
    disconnect,
    address,
    provider,
  } = useWallet()
  const [ethBalance, setEthBalance] = useState(BigNumber.from(0))

  useEffect(() => {
    if (!address) return
    if (!provider) return

    const getEthBalance = async (address) => {
      const balance = await provider.getBalance(address) // can also set a custom address
      setEthBalance(balance)
    }
    getEthBalance(address) // can be a custom address
  }, [provider, address])

  return (
    <>
      {!isConnected && (
        <button
          disabled={isConnecting}
          onClick={() => !isConnected && connectWallet()}
        >
          {isConnecting
            ? 'Connecting...'
            : isConnected
            ? 'Connected'
            : 'Connect Wallet'}
        </button>
      )}
      {isConnected && (
        <>
          <h4 style={{ display: 'inline' }}>{formatAddress(address)}</h4>
          <button onClick={() => disconnect()}>Disconnect</button>
          <p>Here is the balance: {formatToken(ethBalance)}</p>
        </>
      )}
    </>
  )
}

export default ConnectWallet
