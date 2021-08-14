import { useRouter } from 'next/router'
import React from 'react'
import TopUpFund from '.'

const TopUpFundById: React.FC = () => {
  const router = useRouter()
  const { trustId } = router.query

  return <TopUpFund trustId={trustId} />
}

export default TopUpFundById
