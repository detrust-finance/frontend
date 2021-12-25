import { useRouter } from 'next/router'
import React from 'react'
import SetIrrevocable from '.'

const RevokeById: React.FC = () => {
  const router = useRouter()
  const { trustId } = router.query

  return <SetIrrevocable trustId={trustId} />
}

export default RevokeById
