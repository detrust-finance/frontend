import { useRouter } from 'next/router'
import React from 'react'
import Claim from '.'

const ClaimFund: React.FC = () => {
  const router = useRouter()
  const { params } = router.query

  if (!params) return null
  let fundName = params[2]
  if (fundName) {
    fundName = decodeURIComponent(fundName)
  }
  return <Claim trustId={params[0]} releaseToAddress={params[1]} fundName={fundName} />
}

export default ClaimFund
