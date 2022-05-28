(impl-trait .comission-trait.commission)

(define-constant CURREN_PRINCIPAL_COMMISSION_NOT_VALID (err 100))

(define-data-var comm1 principal tx-sender)
(define-data-var comm2 principal tx-sender)

(define-public (set-comm1 (new-comm1 principal))
    (begin 
        (asserts! (is-eq (var-get comm1) tx-sender) CURREN_PRINCIPAL_COMMISSION_NOT_VALID)
        (ok (var-set comm1 new-comm1))
    )
)


(define-public (pay (id uint) (price uint) (agent principal))
    (begin
        (try! (stx-transfer? (/ (* price u50) u10000) tx-sender agent))
        (ok true)))