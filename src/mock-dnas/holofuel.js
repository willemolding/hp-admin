const transactionList = {
  "ledger": {
    "balance": "1000.00",
    "credit": "0",
    "payable": "242.0201",
    "receivable": "0",
    "fees": "0"
  },
  "older": {
    "state": null,
    "since": null,
    "until": "2019-08-30T00:18:00+00:00",
    "limit": null
  },
  "newer": {
    "state": null, // NOTE: IF State is left blank, it returns ALL TRANSACIONS by default.
    "since": "2019-08-30T11:45:10+00:00",
    "until": null,
    "limit": null
  },
  "cover": {
    "first": 0,
    "count": 5,
    "total": 5
  },
  "transactions": [
    {
      "index": 4,
      "state": "outgoing/approved",
      "origin": "QmYNt6DYMiymJtf8oeZ4qn86yWANurFEuAzKuzMQGhsnDd",
      "event": {
        "Promise": {
          "tx": {
            "from": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
            "to": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
            "amount": "40.01",
            "fee": "0",
            "deadline": "2020-01-22T00:00:00-02:00",
            "notes": null,
            "synchronous": null
          },
          "request": null
        }
      },
      "timestamp": {
        "origin": "2019-08-30T11:45:10+00:00",
        "event": "2019-08-30T11:45:10+00:00"
      },
      "adjustment": {
        "balance": {
          "Ok": "0"
        },
        "payable": {
          "Ok": "40.01"
        },
        "receivable": {
          "Ok": "0"
        },
        "fees": {
          "Ok": "0"
        }
      }
    },
    {
      "index": 2,
      "state": "incoming/completed",
      "origin": "Qmbm4B1u3rN8ua39QwDkjmxssmcKzj4nMngbqnxU7fDfQE",
      "event": {
        "Receipt": {
          "cheque": {
            "invoice": {
              "promise": {
                "tx": {
                  "from": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
                  "to": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
                  "amount": "10.01",
                  "fee": "0",
                  "deadline": "2020-02-02T00:00:00+00:00",
                  "notes": null,
                  "synchronous": null
                },
                "request": "Qmbm4B1u3rN8ua39QwDkjmxssmcKzj4nMngbqnxU7fDfQE"
              },
              "promise_sig": "gcAT6bIvN5wd11OS3gxd1mmimtf/5c9niLhL7eWruG1Kd3kg+CfclsbI/dG69NSXBQbvhwj1u4DLhdSMHutRAQ==",
              "promise_commit": "QmXTCCEMeobd97tiMTyqZsGGVFHL6MWyStxnePSc6MCGes"
            },
            "invoice_sig": "S6PuR1MnOB9GuOniJ018oWC6DLTB0oiyu4NjR2a0CkiKtmdMIyeePIwgBbpx6uiDlN2CQTznwzdo7Ee9/yygAQ==",
            "invoice_commit": "QmRCS3aPbfJb7GTyrGFsP8JMvFmvaD43BcXGpA9mhmtpYC",
            "invoice_proof": "QmVEQhMp7w4BEzXfCnTWGfritiWAgfWamMxmLQ2n3SdACt"
          },
          "cheque_sig": "HxhqdPgh+h1XwiNxsGf336l1PpZF+dUQ+J2wNQlKADGt0yZg7yNbKU5sujRTFR3saP5eBpnAA3hjuC7HkhVaBg==",
          "cheque_commit": "QmSXG9G8hNnfZbXBUQ6cMSNn6Y33ywLG5m6czvTLNs2VQn",
          "cheque_proof": "QmVEQhMp7w4BEzXfCnTWGfritiWAgfWamMxmLQ2n3SdACt"
        }
      },
      "timestamp": {
        "origin": "2019-08-30T11:16:12+00:00",
        "event": "2019-08-30T11:19:33+00:00"
      },
      "adjustment": {
        "balance": {
          "Ok": "10.01"
        },
        "payable": {
          "Ok": "0"
        },
        "receivable": {
          "Ok": "0"
        },
        "fees": {
          "Ok": "0"
        }
      }
    },
    {
      "index": 3,
      "state": "outgoing/completed",
      "origin": "QmXTCCEMeobd97tiMTyqZsGGVFHL6MWyStxnePSc6MCGes",
      "event": {
        "Cheque": {
          "invoice": {
            "promise": {
              "tx": {
                "from": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
                "to": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
                "amount": "10.01",
                "fee": "0",
                "deadline": "2020-02-02T00:00:00+00:00",
                "notes": null,
                "synchronous": null
              },
              "request": "Qmbm4B1u3rN8ua39QwDkjmxssmcKzj4nMngbqnxU7fDfQE"
            },
            "promise_sig": "gcAT6bIvN5wd11OS3gxd1mmimtf/5c9niLhL7eWruG1Kd3kg+CfclsbI/dG69NSXBQbvhwj1u4DLhdSMHutRAQ==",
            "promise_commit": "QmXTCCEMeobd97tiMTyqZsGGVFHL6MWyStxnePSc6MCGes"
          },
          "invoice_sig": "S6PuR1MnOB9GuOniJ018oWC6DLTB0oiyu4NjR2a0CkiKtmdMIyeePIwgBbpx6uiDlN2CQTznwzdo7Ee9/yygAQ==",
          "invoice_commit": "QmRCS3aPbfJb7GTyrGFsP8JMvFmvaD43BcXGpA9mhmtpYC",
          "invoice_proof": "QmVEQhMp7w4BEzXfCnTWGfritiWAgfWamMxmLQ2n3SdACt"
        }
      },
      "timestamp": {
        "origin": "2019-08-30T11:17:16+00:00",
        "event": "2019-08-30T11:19:32+00:00"
      },
      "adjustment": {
        "balance": {
          "Ok": "-10.01"
        },
        "payable": {
          "Ok": "0"
        },
        "receivable": {
          "Ok": "0"
        },
        "fees": {
          "Ok": "0"
        }
      }
    },
    {
      "index": 1,
      "state": "outgoing/approved",
      "origin": "QmVGe2MVJeVLpXZfWMXPLZuH6fPBQbtcbPuh9fzBFEDQxj",
      "event": {
        "Promise": {
          "tx": {
            "from": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
            "to": "HcScic3VAmEP9ucmrw4MMFKVARIvvdn43k6xi3d75PwnOswdaIE3BKFEUr3eozi",
            "amount": "200.01",
            "fee": "2.0001",
            "deadline": "2020-12-01T00:00:00+00:00",
            "notes": null,
            "synchronous": null
          },
          "request": null
        }
      },
      "timestamp": {
        "origin": "2019-08-30T10:57:29+00:00",
        "event": "2019-08-30T10:57:29+00:00"
      },
      "adjustment": {
        "balance": {
          "Ok": "0"
        },
        "payable": {
          "Ok": "202.0101"
        },
        "receivable": {
          "Ok": "0"
        },
        "fees": {
          "Ok": "0"
        }
      }
    },
    {
      "index": 0,
      "state": "incoming/requested",
      "origin": "QmZR4u634UN9TtwaHvcS1vUkh6VdhmxUfkzTHjmKxZMryz",
      "event": {
        "Request": {
          "from": "HcScic3VAmEP9ucmrw4MMFKVARIvvdn43k6xi3d75PwnOswdaIE3BKFEUr3eozi",
          "to": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
          "amount": "200",
          "fee": "2",
          "deadline": "2020-12-02T00:00:00+00:00",
          "notes": null,
          "synchronous": null
        }
      },
      "timestamp": {
        "origin": "2019-08-30T00:18:00+00:00",
        "event": "2019-08-30T00:18:00+00:00"
      },
      "adjustment": {
        "balance": {
          "Ok": "0"
        },
        "payable": {
          "Ok": "0"
        },
        "receivable": {
          "Ok": "0"
        },
        "fees": {
          "Ok": "0"
        }
      }
    }
  ]
}

const pendingList = {
  "requests": [
    {
      "event": [
        "QmZR4u634UN9TtwaHvcS1vUkh6VdhmxUfkzTHjmKxZMryz",
        "2019-08-30T00:18:00+00:00",
        {
          "Request": {
            "from": "HcScic3VAmEP9ucmrw4MMFKVARIvvdn43k6xi3d75PwnOswdaIE3BKFEUr3eozi",
            "to": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
            "amount": "200",
            "fee": "2",
            "deadline": "2020-12-02T00:00:00+00:00",
            "notes": null,
            "synchronous": null
          }
        }
      ],
      "provenance": [
        "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
        "JSnAoopQg0fVHsA3dQIvJ3tRl5CRdtBbCAjzUZLMaWsD51G8nieRhoKK8JIKqkjscsprJe+j+ceun9oPpoc3AA=="
      ]
    }
  ],
  "promises": [
    {
      "event": [
        "QmYNt6DYMiymJtf8oeZ4qn86yWANurFEuAzKuzMQGhsnDd",
        "2019-08-30T11:45:10+00:00",
        {
          "Promise": {
            "tx": {
              "from": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
              "to": "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
              "amount": "40.01",
              "fee": "0",
              "deadline": "2020-01-22T00:00:00-02:00",
              "notes": null,
              "synchronous": null
            },
            "request": null
          }
        }
      ],
      "provenance": [
        "HcSCIgoBpzRmvnvq538iqbu39h9whsr6agZa6c9WPh9xujkb4dXBydEPaikvc5r",
        "3+BrqUuu3sC4bZmub4qGvkmfeKnkJfkm5qZGOM88uompxM0/gE2KNpvTyxpGg44MCbNMB8i8vHBmhTIDMjFwAQ=="
      ]
    }
  ]
}

const holofuel = {
  transactions: {
    list_transactions: transactionList,
    list_pending: pendingList,
    request: ({ from, amount, deadline }) => '1MNMQcEsd3BkQpaFUyZrViQ26axooErWtc', // NOTE: import a encryption to hash these for deterministic testing
    promise: ({ to, amount, request, deadline }) => '1DEiFZ1kThW4AVtDmL1w2oDyEKYKcqBcRB',
    receive_payment: ({ origin }) => 'asdfas8HCijlkmxKUBN7tQHTu75FNp439joi'
  }
}

export default holofuel