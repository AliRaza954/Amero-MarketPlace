import { useRouter } from 'next/router';

const nft = () => {
  const router = useRouter()
  const { nft_id } = router.query

  return <p>nft: {nft_id}</p>
};

export default nft;
