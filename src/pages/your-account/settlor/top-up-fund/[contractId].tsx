import { useRouter } from 'next/router'
import React from 'react'
import TopUpFund from '.'

const TopUpFundById: React.FC = () => {
  const router = useRouter()
  const { contractId } = router.query

  return <TopUpFund contractId={contractId} />
}

export default TopUpFundById
