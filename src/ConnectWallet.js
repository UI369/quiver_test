import { formatAddress, useWallet } from '@raidguild/quiver'

const ConnectWallet = () => {
  const { connectWallet, isConnecting, isConnected, disconnect, address } =
    useWallet()
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
        </>
      )}
    </>
  )
}

export default ConnectWallet
