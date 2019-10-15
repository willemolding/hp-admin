import React, { useState } from 'react'
import cx from 'classnames'
import _ from 'lodash'
import { isEmpty } from 'lodash/fp'
import { useQuery, useMutation } from '@apollo/react-hooks'
import HolofuelCounterpartyQuery from 'graphql/HolofuelCounterpartyQuery.gql'
import HolofuelInboxCounterpartiesQuery from 'graphql/HolofuelInboxCounterpartiesQuery.gql'
import HolofuelActionableTransactionsQuery from 'graphql/HolofuelActionableTransactionsQuery.gql'
import HolofuelAcceptOfferMutation from 'graphql/HolofuelAcceptOfferMutation.gql'
import HolofuelOfferMutation from 'graphql/HolofuelOfferMutation.gql'
import HolofuelDeclineMutation from 'graphql/HolofuelDeclineMutation.gql'
import { TYPE } from 'models/Transaction'
import PrimaryLayout from 'holofuel/components/layout/PrimaryLayout'
import CopyAgentId from 'holofuel/components/CopyAgentId'
import Button from 'holofuel/components/Button'
import Modal from 'holofuel/components/Modal'
import './Inbox.module.css'
import { presentAgentId, presentHolofuelAmount, presentDateAndTime } from 'utils'

function useOffer () {
  const [offer] = useMutation(HolofuelOfferMutation)
  return ({ id, amount, counterparty }) => offer({
    variables: { amount, counterpartyId: counterparty.id, requestId: id },
    refetchQueries: [{
      query: HolofuelActionableTransactionsQuery
    }]
  })
}

function useDecline () {
  const [decline] = useMutation(HolofuelDeclineMutation)
  return ({ id }) => decline({
    variables: { transactionId: id },
    refetchQueries: [{
      query: HolofuelActionableTransactionsQuery
    }]
  })
}

function useFetchCounterparties () {
  const { data: { holofuelActionableTransactions = [] } = {} } = useQuery(HolofuelActionableTransactionsQuery)

  const { loading, error, data: { holofuelInboxCounterparties } = {}, client } = useQuery(HolofuelInboxCounterpartiesQuery)

  if (holofuelInboxCounterparties) {
    const filterTransactionsByAgentId = (agent, txListType) => txListType.filter(transaction => transaction.counterparty.id === agent.id)
    const updateTxListCounterparties = (txListType, counterpartyList) => counterpartyList.map(agent => {
      const matchingTx = filterTransactionsByAgentId(agent, txListType)
      return matchingTx.map(transaction => { Object.assign(transaction.counterparty, agent); return transaction })
    })

    const result = _.flatten(updateTxListCounterparties(holofuelActionableTransactions, holofuelInboxCounterparties))

    client.writeQuery({
      query: HolofuelActionableTransactionsQuery,
      data: {
        holofuelActionableTransactions: { ...result }
      }
    })
  }

  let response
  if (loading) response = { loading: true }
  if (error) response = { error: `Error: ${error}` }
  else response = holofuelInboxCounterparties
  return response
}

export default function Inbox () {
  const { data: { holofuelActionableTransactions: transactions = [] } = {} } = useQuery(HolofuelActionableTransactionsQuery)

  const payTransaction = useOffer()
  const declineTransaction = useDecline()
  const counterpartyList = useFetchCounterparties()
  const [modalTransaction, setModalTransaction] = useState()
  const isTransactionsEmpty = isEmpty(transactions)

  const pageTitle = `Inbox${isTransactionsEmpty ? '' : ` (${transactions.length})`}`

  const showConfirmationModal = (transaction, action) => {
    const modalTransaction = { ...transaction, action }
    setModalTransaction(modalTransaction)
  }

  return <PrimaryLayout headerProps={{ title: pageTitle }} inboxCount={transactions.length}>

    {!isTransactionsEmpty && <div styleName='transaction-list'>
      {transactions.map(transaction => <TransactionRow
        transaction={transaction}
        counterpartyList={counterpartyList}
        showConfirmationModal={showConfirmationModal}
        role='list'
        key={transaction.id} />)}
    </div>}

    <ConfirmationModal
      handleClose={() => setModalTransaction(null)}
      counterpartyList={counterpartyList}
      transaction={modalTransaction}
      payTransaction={payTransaction}
      declineTransaction={declineTransaction} />
  </PrimaryLayout>
}

export function TransactionRow ({ transaction, showConfirmationModal, counterpartyList }) {
  const { counterparty, amount, type, timestamp, notes } = transaction

  const isOffer = type === TYPE.offer
  const isRequest = !isOffer

  const { date, time } = presentDateAndTime(timestamp)

  const story = isOffer ? ' is offering' : ' is requesting'

  return <div styleName='transaction-row' role='listitem'>
    <div styleName='date-time'>
      <div styleName='date'>
        {date}
      </div>
      <div styleName='time'>
        {time}
      </div>
    </div>
    <div styleName='description-cell'>
      <div styleName='story'><span styleName='counterparty'>
        <CopyAgentId agent={counterparty}>
          {counterparty.nickname || presentAgentId(counterparty.id)}
        </CopyAgentId>
      </span>{story}</div>
      <div styleName='notes'>{notes}</div>
    </div>
    <AmountCell amount={amount} isRequest={isRequest} />

    <div styleName='actions'>
      {isOffer && <AcceptButton transaction={transaction} />}
      {isRequest && <PayButton transaction={transaction} showConfirmationModal={showConfirmationModal} />}
      <RejectButton transaction={transaction} showConfirmationModal={showConfirmationModal} />
    </div>
  </div>
}

function AmountCell ({ amount, isRequest }) {
  const amountDisplay = isRequest ? `(${presentHolofuelAmount(amount)})` : presentHolofuelAmount(amount)
  return <div styleName={cx('amount', { debit: isRequest })}>{amountDisplay}</div>
}

// these are pulled out into custom hooks ready for if we need to move them to their own file for re-use elsewhere
function useAcceptOffer (id) {
  const [acceptOffer] = useMutation(HolofuelAcceptOfferMutation)
  return () => acceptOffer({
    variables: { transactionId: id },
    refetchQueries: [{
      query: HolofuelActionableTransactionsQuery
    }]
  })
}

function AcceptButton ({ transaction: { id } }) {
  const acceptOffer = useAcceptOffer(id)
  return <Button
    onClick={acceptOffer}
    styleName='accept-button'>
    Accept
  </Button>
}

function PayButton ({ showConfirmationModal, transaction }) {
  const action = 'pay'
  return <Button
    onClick={() => showConfirmationModal(transaction, action)}
    styleName='pay-button'>
    Pay
  </Button>
}

function RejectButton ({ showConfirmationModal, transaction }) {
  const action = 'decline'
  return <Button
    onClick={() => showConfirmationModal(transaction, action)}
    styleName='reject-button'>
    Reject
  </Button>
}

export function ConfirmationModal ({ transaction, handleClose, declineTransaction, payTransaction, counterpartyList }) {
  if (!transaction) return null
  const { id, counterparty, amount, type, action } = transaction

  let counterpartyNick = 'Loading...'
  if (counterpartyList && !counterpartyList.loading) counterpartyNick = counterpartyList.find(agent => agent.id === counterparty.id).nickname

  let message, actionHook, actionParams, contentLabel
  switch (action) {
    case 'pay': {
      contentLabel = 'Pay request'
      actionParams = { id, amount, counterparty }
      actionHook = payTransaction
      message = <div styleName='modal-text' data-testid='modal-message'>Pay {counterpartyNick} <span styleName='modal-amount'>{presentHolofuelAmount(amount)} HF</span>?</div>
      break
    }
    case 'decline': {
      contentLabel = `Reject ${type}?`
      actionParams = id
      actionHook = declineTransaction
      message = <div styleName='modal-text' data-testid='modal-message'>Reject {counterpartyNick}'s {type} of <span styleName='modal-amount'>{presentHolofuelAmount(amount)} HF</span>?</div>
      break
    }
    default:
      throw new Error('Error: Transaction action was not matched with a modal action. Current transaction action : ', action)
  }

  const onYes = () => {
    actionHook(actionParams)
    handleClose()
  }

  return <Modal
    contentLabel={contentLabel}
    isOpen={!!transaction}
    handleClose={handleClose}
    styleName='modal'>
    <div styleName='modal-title'>Are you sure?</div>
    {message}
    <div styleName='modal-buttons'>
      <Button
        onClick={handleClose}
        styleName='modal-button-no'>
        No
      </Button>
      <Button
        onClick={onYes}
        styleName='modal-button-yes'>
        Yes
      </Button>
    </div>
  </Modal>
}

export function RenderNickname ({ agentId, copyId }) {
  const { loading, error, data: { holofuelCounterparty = {} } = {} } = useQuery(HolofuelCounterpartyQuery, {
    variables: { agentId }
  })

  if ((loading || error || holofuelCounterparty === {}) && !copyId) return <>{presentAgentId(agentId)}</>
  else if ((loading || error || holofuelCounterparty === {}) && copyId) {
    return <CopyAgentId agent={{ id: agentId, nickname: '' }}>
      {presentAgentId(agentId)}
    </CopyAgentId>
  } else if (holofuelCounterparty.nickname && copyId) {
    return <CopyAgentId agent={holofuelCounterparty}>
      {holofuelCounterparty.nickname}
    </CopyAgentId>
  } else return <>{holofuelCounterparty.nickname}</>
}
