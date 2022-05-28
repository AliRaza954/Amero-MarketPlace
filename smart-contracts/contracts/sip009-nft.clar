;; sip009-nft
;; A SIP009-compliant NFT with a mint function.

(impl-trait .sip009-nft-trait.sip009-nft-trait)

(define-constant contract-owner tx-sender)

(define-constant err-owner-only (err u100))
(define-constant err-token-id-failure (err u101))
(define-constant err-not-token-owner (err u102))

(define-non-fungible-token amero-nft uint)
(define-data-var token-id-nonce uint u0)

(define-map nft-data {nft_id: uint} {data_hash: (buff 32), token_uri: (optional (string-ascii 256))})

(define-read-only (get-last-token-id)
	(ok (var-get token-id-nonce))
)

(define-read-only (get-token-uri (token-id uint))
	(ok (unwrap-panic (get token_uri (map-get? nft-data {nft_id: token-id}))))
)

(define-read-only (get-owner (token-id uint))
	(ok (nft-get-owner? amero-nft token-id))
)

(define-read-only (get-data-hash (token-id uint)) 
	(get data_hash (map-get? nft-data {nft_id: token-id}))
)

(define-private (set-token-uri (token-id uint) (token_uri (optional (string-ascii 256)))) 
	(map-set nft-data {nft_id: token-id} {data_hash: (unwrap-panic (get-data-hash token-id)), token_uri: token_uri})
)

(define-private (set-data-hash (token-id uint) (data_hash (buff 32))) 
	(map-set nft-data {nft_id: token-id} {data_hash: data_hash, token_uri: (unwrap-panic (get-token-uri token-id))})
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
	(begin
		(asserts! (is-eq tx-sender sender) err-not-token-owner)
		(nft-transfer? amero-nft token-id sender recipient)
	)
)

(define-public (mint (recipient principal) (token_uri (optional (string-ascii 256))) (data_hash (buff 32)))
	(let ((token-id (+ (var-get token-id-nonce) u1)))
		(asserts! (is-eq tx-sender contract-owner) err-owner-only)
		(try! (nft-mint? amero-nft token-id recipient))
		(asserts! (var-set token-id-nonce token-id) err-token-id-failure)
		(set-token-uri token-id token_uri)
		(set-data-hash token-id data_hash)
		(ok token-id)
	)
)