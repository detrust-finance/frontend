import { useRouter } from 'next/router'
import React from 'react'
import Claim from '.'

const ClaimFund: React.FC = () => {
  const router = useRouter()
  const { params } = router.query

  if (!params) return null
  return <Claim contractId={params[0]} releaseToAddress={params[1]} />
}

export default ClaimFund
