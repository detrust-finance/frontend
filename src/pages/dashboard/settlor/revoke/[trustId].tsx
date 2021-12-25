import { useRouter } from 'next/router'
import React from 'react'
import Revoke from '.'

const RevokeById: React.FC = () => {
  const router = useRouter()
  const { trustId } = router.query

  return <Revoke trustId={trustId} />
}

export default RevokeById
