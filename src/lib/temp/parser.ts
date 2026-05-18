export const parserRequestsMock = [
  {
    id: "ac44302b-7af0-47f5-90c7-c70819a067d6",
    status: "processed",
    createdAt: "2026-05-18T16:56:19.113935+00:00",
    startedAt: null,
    finishedAt: null,
    errorMessage: null,
    jobs: [
      {
        id: "job-6",
        status: "processed",
        createdAt: "2026-05-18T16:56:19.113935+00:00",
        file: {
          originalName: "tax_doc.pdf",
          url: "uploads/parse_requests/463b9da1-1c7e-4e24-8958-cfb448a57f7f/38dd95e7-a295-41a2-99ff-c89cb97acad4.pdf",
          key: "parse_requests/463b9da1-1c7e-4e24-8958-cfb448a57f7f/38dd95e7-a295-41a2-99ff-c89cb97acad4.pdf",
        },
        tables: [
          {
            header: [
              "Invoice ID",
              "Customer",
              "Amount",
              "Tax Rate",
              "Tax Amount",
              "Total",
            ],
            rows: [
              [
                "INV-1001",
                "Acme Corp",
                "$1,200.00",
                "19%",
                "$228.00",
                "$1,428.00",
              ],
              [
                "INV-1002",
                "Nova Systems",
                "$850.00",
                "19%",
                "$161.50",
                "$1,011.50",
              ],
              [
                "INV-1003",
                "Pixel Retail",
                "$430.00",
                "5%",
                "$21.50",
                "$451.50",
              ],
              [
                "INV-1004",
                "Global Imports",
                "$2,100.00",
                "19%",
                "$399.00",
                "$2,499.00",
              ],
              [
                "INV-1005",
                "Luna Foods",
                "$675.00",
                "0%",
                "$0.00",
                "$675.00",
              ],
            ],
          },
          {
            header: ["Metric", "Value"],
            rows: [
              ["Total Revenue", "$5,255.00"],
              ["Total Tax Collected", "$810.00"],
              ["Net Amount", "$6,065.00"],
            ],
          },
        ],
        errorMessage: null,
      },
    ],
  },
  {
    id: "f0f31d10-c395-4a59-bb65-1fb790fb7ea8",
    status: "processing",
    createdAt: "2026-05-18T15:21:08.000000+00:00",
    startedAt: "2026-05-18T15:21:14.000000+00:00",
    finishedAt: null,
    errorMessage: null,
    jobs: [
      {
        id: "job-7",
        status: "processing",
        createdAt: "2026-05-18T15:21:08.000000+00:00",
        file: {
          originalName: "bank_statement.pdf",
          url: "uploads/parse_requests/bank_statement.pdf",
          key: "parse_requests/bank_statement.pdf",
        },
        tables: [],
        errorMessage: null,
      },
      {
        id: "job-8",
        status: "queued",
        createdAt: "2026-05-18T15:21:08.000000+00:00",
        file: {
          originalName: "expenses_q2.pdf",
          url: "uploads/parse_requests/expenses_q2.pdf",
          key: "parse_requests/expenses_q2.pdf",
        },
        tables: [],
        errorMessage: null,
      },
    ],
  },
] as const;
